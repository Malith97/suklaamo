import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { validateOrderForm } from '../../../lib/validators';
import { checkRateLimit } from '../../../lib/rate-limit';
import {
  buildCustomerConfirmationEmailText,
  buildCustomerConfirmationEmailHtml,
  buildOrderEmailText,
  calculateOrderTotalCents,
  formatEuro,
  formatSubmissionTimestamp,
  generateOrderNumber,
  sendResendEmail,
} from '../../../lib/order-email';

type OrderEmailEnv = {
  RESEND_API_KEY?: string;
  ORDER_NOTIFICATION_EMAIL?: string;
  ORDER_NOTIFICATION_EMAIL_CC?: string;
  RESEND_FROM_EMAIL?: string;
};

function getOrderEmailEnv(): OrderEmailEnv {
  try {
    return getRequestContext().env as OrderEmailEnv;
  } catch {
    return process.env as OrderEmailEnv;
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('host') || 'unknown';
  const rate = checkRateLimit(`order-${ip}`);

  if (!rate.allowed) {
    return new NextResponse(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return new NextResponse(JSON.stringify({ error: 'Invalid request payload.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { values, errors } = validateOrderForm(body);
  if (Object.keys(errors).length > 0) {
    return new NextResponse(JSON.stringify({ errors }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const env = getOrderEmailEnv();
  const resendApiKey = env.RESEND_API_KEY;
  const resendFrom = env.RESEND_FROM_EMAIL || 'Suklaamo <onboarding@resend.dev>';
  const primaryRecipient = env.ORDER_NOTIFICATION_EMAIL;
  const ccRecipient = env.ORDER_NOTIFICATION_EMAIL_CC;
  const recipients = [primaryRecipient, ccRecipient]
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .map((value) => value.trim());
  const uniqueRecipients = [...new Set(recipients)];
  const missingVariables = [
    !resendApiKey ? 'RESEND_API_KEY' : null,
    !primaryRecipient ? 'ORDER_NOTIFICATION_EMAIL' : null,
    !ccRecipient ? 'ORDER_NOTIFICATION_EMAIL_CC' : null,
  ].filter((value): value is string => value !== null);

  if (!resendApiKey || uniqueRecipients.length === 0) {
    console.error('Order email configuration missing.', {
      missingVariables,
      hasResendApiKey: Boolean(resendApiKey),
      hasPrimaryNotificationEmail: Boolean(primaryRecipient),
      hasCcNotificationEmail: Boolean(ccRecipient),
    });
    return new NextResponse(
      JSON.stringify({ error: 'Order service is temporarily unavailable. Please try again shortly.' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const now = new Date();
  const entropySource = [request.headers.get('cf-ray'), request.headers.get('x-request-id')]
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .join('|');
  const orderNumber = generateOrderNumber(now, entropySource);
  const submittedAt = formatSubmissionTimestamp(now);
  const policyAcceptedAt = submittedAt;
  const orderTotal = formatEuro(calculateOrderTotalCents(values.items));
  const subject = `🍫 New Suklaamo Order - ${orderNumber}`;
  const text = buildOrderEmailText({
    orderNumber,
    name: values.name,
    phone: values.phone,
    email: values.email,
    pickupDate: values.pickupDate,
    notes: values.notes,
    items: values.items,
    orderTotal,
    submittedAt,
    policyAccepted: values.policyAccepted,
    policyAcceptedAt,
  });

  const recipientResults = await Promise.all(
    uniqueRecipients.map(async (recipient) => {
      const result = await sendResendEmail({
        apiKey: resendApiKey,
        from: resendFrom,
        to: recipient,
        subject,
        text,
      });

      if (!result.ok) {
        console.error('Failed to send order notification email to recipient.', {
          orderNumber,
          recipient,
          error: result.error,
        });
      }

      return { recipient, result };
    }),
  );

  const successfulDeliveries = recipientResults.filter((entry) => entry.result.ok).length;

  if (successfulDeliveries === 0) {
    console.error('Failed to send order notification email to all recipients.', {
      orderNumber,
      recipients: uniqueRecipients,
    });
    return new NextResponse(
      JSON.stringify({ error: 'We could not submit your order right now. Please try again in a moment.' }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  if (successfulDeliveries < uniqueRecipients.length) {
    console.warn('Order email partially delivered.', {
      orderNumber,
      successfulDeliveries,
      totalRecipients: uniqueRecipients.length,
    });
  }

  const customerSubject = `🍫 Suklaamo Order Received - ${orderNumber}`;
  const customerText = buildCustomerConfirmationEmailText({
    orderNumber,
    name: values.name,
    phone: values.phone,
    email: values.email,
    pickupDate: values.pickupDate,
    notes: values.notes,
    items: values.items,
    orderTotal,
    submittedAt,
    policyAccepted: values.policyAccepted,
    policyAcceptedAt,
  });
  const customerHtml = buildCustomerConfirmationEmailHtml({
    orderNumber,
    name: values.name,
    phone: values.phone,
    email: values.email,
    pickupDate: values.pickupDate,
    notes: values.notes,
    items: values.items,
    orderTotal,
    submittedAt,
    policyAccepted: values.policyAccepted,
    policyAcceptedAt,
  });

  const customerEmailResult = await sendResendEmail({
    apiKey: resendApiKey,
    from: resendFrom,
    to: values.email,
    subject: customerSubject,
    text: customerText,
    html: customerHtml,
  });

  if (!customerEmailResult.ok) {
    console.error('Failed to send customer order confirmation email.', {
      orderNumber,
      recipient: values.email,
      error: customerEmailResult.error,
    });
  }

  return new NextResponse(JSON.stringify({ success: true, message: 'Order request received.', orderNumber }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
