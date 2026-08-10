import type { OrderLineItem } from './validators';

type OrderEmailPayload = {
  orderNumber: string;
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
  notes: string;
  items: OrderLineItem[];
  orderTotal: string;
  submittedAt: string;
  policyAccepted: boolean;
  policyAcceptedAt: string;
};

type ResendEmailParams = {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
};

const ORDER_NUMBER_CACHE_KEY = '__suklaamoOrderNumberCache';
const HELSINKI_TIMEZONE = 'Europe/Helsinki';

function formatDateKey(now: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: HELSINKI_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);

  const year = parts.find((part) => part.type === 'year')?.value ?? '0000';
  const month = parts.find((part) => part.type === 'month')?.value ?? '00';
  const day = parts.find((part) => part.type === 'day')?.value ?? '00';

  return `${year}${month}${day}`;
}

function getOrderNumberCache() {
  const globalStore = globalThis as typeof globalThis & {
    [ORDER_NUMBER_CACHE_KEY]?: Map<string, Set<string>>;
  };

  if (!globalStore[ORDER_NUMBER_CACHE_KEY]) {
    globalStore[ORDER_NUMBER_CACHE_KEY] = new Map<string, Set<string>>();
  }

  return globalStore[ORDER_NUMBER_CACHE_KEY] as Map<string, Set<string>>;
}

function formatOrderNumber(dateKey: string, timeKey: string, suffix = '') {
  return suffix ? `SUK-${dateKey}-${timeKey}-${suffix}` : `SUK-${dateKey}-${timeKey}`;
}

function createShortSuffix(seed: string) {
  let value = 0;

  for (let index = 0; index < seed.length; index += 1) {
    value = (value * 33 + seed.charCodeAt(index)) >>> 0;
  }

  return (value % 1296).toString(36).toUpperCase().padStart(2, '0');
}

export function generateOrderNumber(now = new Date(), entropySource = '') {
  const dateKey = formatDateKey(now);
  const timeParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: HELSINKI_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const hour = timeParts.find((part) => part.type === 'hour')?.value ?? '00';
  const minute = timeParts.find((part) => part.type === 'minute')?.value ?? '00';
  const timeKey = `${hour}${minute}`;
  const baseNumber = formatOrderNumber(dateKey, timeKey);
  const cache = getOrderNumberCache();
  const minuteKey = `${dateKey}-${timeKey}`;
  const generatedNumbers = cache.get(minuteKey) ?? new Set<string>();

  if (!generatedNumbers.has(baseNumber)) {
    generatedNumbers.add(baseNumber);
    cache.set(minuteKey, generatedNumbers);
    return baseNumber;
  }

  const baseSeed = `${entropySource}|${dateKey}|${timeKey}`;
  for (let attempt = 0; attempt < 1296; attempt += 1) {
    const suffix = createShortSuffix(`${baseSeed}|${attempt}`);
    const candidate = formatOrderNumber(dateKey, timeKey, suffix);
    if (!generatedNumbers.has(candidate)) {
      generatedNumbers.add(candidate);
      cache.set(minuteKey, generatedNumbers);
      return candidate;
    }
  }

  throw new Error('Unable to generate a unique order number.');
}

function parseEuroToCents(value: string) {
  const numeric = value.replace(/[^\d.,]/g, '').replace(',', '.');
  const parsed = Number(numeric);
  if (!Number.isFinite(parsed)) return 0;
  return Math.round(parsed * 100);
}

export function calculateOrderTotalCents(items: OrderLineItem[]) {
  return items.reduce((sum, item) => sum + parseEuroToCents(item.price) * item.quantity, 0);
}

export function formatEuro(cents: number) {
  if (cents % 100 === 0) return `€${cents / 100}`;
  return `€${(cents / 100).toFixed(2)}`;
}

export function formatSubmissionTimestamp(now = new Date()) {
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: HELSINKI_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const year = parts.find((part) => part.type === 'year')?.value ?? '0000';
  const month = parts.find((part) => part.type === 'month')?.value ?? '00';
  const day = parts.find((part) => part.type === 'day')?.value ?? '00';
  const hour = parts.find((part) => part.type === 'hour')?.value ?? '00';
  const minute = parts.find((part) => part.type === 'minute')?.value ?? '00';

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export function buildOrderEmailText(payload: OrderEmailPayload) {
  const productLines = payload.items
    .map((item) => `${item.quantity} x ${item.name} (${item.price})`)
    .join('\n');

  return [
    'ORDER DETAILS',
    '---------------------',
    '',
    'Order Number:',
    payload.orderNumber,
    '',
    'Customer:',
    payload.name,
    '',
    'Phone:',
    payload.phone,
    '',
    'Email:',
    payload.email,
    '',
    'Pickup Date:',
    payload.pickupDate,
    '',
    'Products:',
    productLines,
    '',
    'Order Total:',
    payload.orderTotal,
    '',
    'Customer Notes:',
    payload.notes || 'No notes provided.',
    '',
    'Policy Acceptance:',
    payload.policyAccepted ? '✅ Accepted' : 'Not accepted',
    '',
    'Accepted At:',
    payload.policyAcceptedAt,
    '',
    'Submitted:',
    payload.submittedAt,
    '',
  ].join('\n');
}

export function buildCustomerConfirmationEmailText(payload: OrderEmailPayload) {
  const productLines = payload.items
    .map((item) => `${item.quantity} x ${item.name} (${item.price})`)
    .join('\n');

  return [
    'Thank you for your Suklaamo order request.',
    '',
    'ORDER DETAILS',
    '---------------------',
    '',
    'Order Number:',
    payload.orderNumber,
    '',
    'Customer Name:',
    payload.name,
    '',
    'Phone Number:',
    payload.phone,
    '',
    'Email:',
    payload.email,
    '',
    'Pickup Date:',
    payload.pickupDate,
    '',
    'Products:',
    productLines,
    '',
    'Order Total:',
    payload.orderTotal,
    '',
    'Customer Notes:',
    payload.notes || 'No notes provided.',
    '',
    'POLICY CONFIRMATION',
    '',
    'You confirmed that you have read and accepted:',
    '• Privacy Policy',
    '• Allergen Information Policy',
    '• Cancellation & Refund Policy',
    '',
    'Accepted At:',
    payload.policyAcceptedAt,
    '',
    'PAYMENT INFORMATION',
    '',
    'We currently accept:',
    '• MobilePay',
    '• Bank Transfer',
    '',
    'We currently do not accept card payments through the website.',
    '',
    'Payment instructions will be provided once your order has been reviewed and confirmed.',
    '',
    'Please do not make any payment until you receive a confirmation from Suklaamo.',
    '',
    'PICKUP INFORMATION',
    '',
    'Pickup times are currently available:',
    'Friday',
    'Saturday',
    'Sunday',
    '',
    'From 17:00 onwards (after 5:00 PM).',
    '',
    'Your final pickup details will be confirmed once your order has been reviewed.',
    '',
    'WHAT HAPPENS NEXT?',
    '',
    '1. We review your order request.',
    '2. We confirm product availability and pickup arrangements.',
    '3. We contact you with:',
    '   - Order confirmation',
    '   - Pickup details',
    '   - Payment instructions',
    '4. You complete the payment using MobilePay or Bank Transfer.',
    '5. Your order is prepared for the agreed pickup date.',
    '',
    'IMPORTANT',
    '',
    'Your order is not confirmed until you receive confirmation from Suklaamo.',
    '',
    'Please keep your order number for future reference.',
    '',
  ].join('\n');
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatProductLineHtml(item: OrderLineItem) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eadfce;color:#3a2317;font-size:15px;line-height:22px;">${escapeHtml(String(item.quantity))} × ${escapeHtml(item.name)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eadfce;color:#3a2317;font-size:15px;line-height:22px;text-align:right;white-space:nowrap;">${escapeHtml(item.price)}</td>
    </tr>
  `;
}

function infoCard(title: string, body: string) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;margin:0 0 18px 0;">
      <tr>
        <td style="background:#fff8ee;border:1px solid #eadfce;border-radius:22px;padding:22px 22px 20px 22px;">
          <p style="margin:0 0 12px 0;color:#8f6a43;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;letter-spacing:0.22em;text-transform:uppercase;font-weight:700;">${escapeHtml(title)}</p>
          ${body}
        </td>
      </tr>
    </table>
  `;
}

export function buildCustomerConfirmationEmailHtml(payload: OrderEmailPayload) {
  const productRows = payload.items.map(formatProductLineHtml).join('');

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="light only" />
      <meta name="supported-color-schemes" content="light only" />
      <title>Suklaamo Order Received</title>
    </head>
    <body style="margin:0;padding:0;background:#f6ecdf;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        Thank you for your Suklaamo order request. Your order number is ${escapeHtml(payload.orderNumber)}.
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background:#f6ecdf;width:100%;">
        <tr>
          <td align="center" style="padding:28px 14px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:680px;border-collapse:separate;">
              <tr>
                <td style="background:#2b1810;background-image:linear-gradient(135deg,#2b1810 0%,#3a2317 100%);border-radius:30px 30px 0 0;padding:28px 28px 24px 28px;text-align:center;">
                  <div style="display:inline-block;background:rgba(232,163,61,0.14);border:1px solid rgba(232,163,61,0.28);border-radius:999px;padding:8px 16px;margin-bottom:16px;">
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:11px;letter-spacing:0.28em;text-transform:uppercase;color:#e8a33d;font-weight:700;">Chocolate Bakery</span>
                  </div>
                  <h1 style="margin:0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:40px;font-weight:700;letter-spacing:-0.02em;">Thank you for your order</h1>
                  <p style="margin:14px auto 0 auto;max-width:520px;color:#eadfce;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;">Hi ${escapeHtml(payload.name)}, thank you for choosing Suklaamo. We have successfully received your order request and will review it shortly.</p>
                </td>
              </tr>
              <tr>
                <td style="background:#fffaf3;padding:24px 18px 18px 18px;border-left:1px solid #eadfce;border-right:1px solid #eadfce;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;margin:0 0 18px 0;">
                    <tr>
                      <td style="background:#fef3de;border:1px solid #f0d7aa;border-radius:22px;padding:22px;text-align:center;">
                        <p style="margin:0 0 8px 0;color:#8f6a43;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;letter-spacing:0.22em;text-transform:uppercase;font-weight:700;">Order Number</p>
                        <p style="margin:0;color:#2b1810;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:40px;font-weight:700;letter-spacing:0.02em;">${escapeHtml(payload.orderNumber)}</p>
                      </td>
                    </tr>
                  </table>

                  ${infoCard('Order Details', `
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                      <tr><td style="padding:0 0 10px 0;color:#8f6a43;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">Customer Name</td><td style="padding:0 0 10px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;text-align:right;">${escapeHtml(payload.name)}</td></tr>
                      <tr><td style="padding:0 0 10px 0;color:#8f6a43;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">Phone Number</td><td style="padding:0 0 10px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;text-align:right;">${escapeHtml(payload.phone)}</td></tr>
                      <tr><td style="padding:0 0 10px 0;color:#8f6a43;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">Email Address</td><td style="padding:0 0 10px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;text-align:right;">${escapeHtml(payload.email)}</td></tr>
                      <tr><td style="padding:0 0 10px 0;color:#8f6a43;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">Pickup Date</td><td style="padding:0 0 10px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;text-align:right;">${escapeHtml(payload.pickupDate)}</td></tr>
                    </table>
                    <div style="margin-top:16px;border-top:1px solid #eadfce;padding-top:14px;">
                      <p style="margin:0 0 10px 0;color:#8f6a43;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">Ordered Products</p>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${productRows}</table>
                    </div>
                    <div style="margin-top:18px;background:#2b1810;border-radius:18px;padding:18px 18px 16px 18px;">
                      <p style="margin:0 0 6px 0;color:#eadfce;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">Total</p>
                      <p style="margin:0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:34px;font-weight:700;">${escapeHtml(payload.orderTotal)}</p>
                    </div>
                    <div style="margin-top:18px;">
                      <p style="margin:0 0 10px 0;color:#8f6a43;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">Customer Notes</p>
                      <div style="color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;white-space:pre-line;">${escapeHtml(payload.notes || 'No notes provided.')}</div>
                    </div>
                  `)}

                  ${infoCard('What Happens Next?', `
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                      <tr><td style="padding:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">1. We review your order.</td></tr>
                      <tr><td style="padding:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">2. We confirm availability and pickup arrangements.</td></tr>
                      <tr><td style="padding:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">3. We send payment instructions.</td></tr>
                      <tr><td style="padding:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">4. Once payment is confirmed, your order is prepared.</td></tr>
                      <tr><td style="padding:0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">5. Your order is ready for pickup.</td></tr>
                    </table>
                  `)}

                  ${infoCard('Policy Confirmation', `
                    <p style="margin:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">You confirmed that you have read and accepted:</p>
                    <p style="margin:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">&#8226; Privacy Policy<br />&#8226; Allergen Information Policy<br />&#8226; Cancellation &amp; Refund Policy</p>
                    <p style="margin:0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;"><strong>Accepted At:</strong> ${escapeHtml(payload.policyAcceptedAt)}</p>
                  `)}

                  ${infoCard('Payment Information', `
                    <p style="margin:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">We currently accept:</p>
                    <p style="margin:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">&#10003; MobilePay<br />&#10003; Bank Transfer</p>
                    <p style="margin:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">Card payments are currently not available.</p>
                    <p style="margin:0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">Please do not make any payment until you receive confirmation from Suklaamo.</p>
                  `)}

                  ${infoCard('Pickup Information', `
                    <p style="margin:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">Pickup availability:</p>
                    <p style="margin:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">Friday<br />Saturday<br />Sunday</p>
                    <p style="margin:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">After 17:00 (5 PM)</p>
                    <p style="margin:0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">Final pickup details will be confirmed after order review.</p>
                  `)}

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;margin:0 0 18px 0;">
                    <tr>
                      <td style="background:#f3e2c4;border:1px solid #e3c98f;border-radius:22px;padding:22px;">
                        <p style="margin:0 0 12px 0;color:#8f6a43;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;letter-spacing:0.22em;text-transform:uppercase;font-weight:700;">Important Notice</p>
                        <p style="margin:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;font-weight:700;">Your order is not yet confirmed.</p>
                        <p style="margin:0 0 12px 0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">Please wait for confirmation and payment instructions from Suklaamo before making any payment.</p>
                        <p style="margin:0;color:#3a2317;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">Please keep your order number for future reference.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background:#2b1810;border-radius:0 0 30px 30px;padding:22px 28px 26px 28px;text-align:center;border-left:1px solid #eadfce;border-right:1px solid #eadfce;border-bottom:1px solid #eadfce;">
                  <p style="margin:0 0 8px 0;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;font-weight:700;">Suklaamo</p>
                  <p style="margin:0 0 14px 0;color:#eadfce;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;">Chocolate Bakery</p>
                  <p style="margin:0 0 10px 0;color:#eadfce;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;"><a href="https://suklaamo.fi" style="color:#e8a33d;text-decoration:none;">https://suklaamo.fi</a></p>
                  <p style="margin:0;color:#eadfce;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;">Questions? Reply directly to this suklaamo@gmail.com email.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

export async function sendResendEmail({ apiKey, from, to, subject, text, html }: ResendEmailParams) {
  let response: Response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        ...(html ? { html } : {}),
      }),
    });
  } catch (err) {
    return {
      ok: false as const,
      error: err instanceof Error ? err.message : 'Network error reaching email service.',
    };
  }

  const data = await response.json().catch(() => null) as
    | { id?: string; message?: string; error?: { message?: string } }
    | null;

  if (!response.ok) {
    return {
      ok: false as const,
      error: data?.message || data?.error?.message || 'Resend API request failed.',
    };
  }

  return {
    ok: true as const,
    id: data?.id ?? null,
  };
}
