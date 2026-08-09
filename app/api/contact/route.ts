import { NextResponse } from 'next/server';
import { validateContactForm } from '../../../lib/validators';
import { checkRateLimit } from '../../../lib/rate-limit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('host') || 'unknown';
  const rate = checkRateLimit(`contact-${ip}`);

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

  const { values, errors } = validateContactForm(body);
  if (Object.keys(errors).length > 0) {
    return new NextResponse(JSON.stringify({ errors }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new NextResponse(JSON.stringify({ success: true, message: 'Message received.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
