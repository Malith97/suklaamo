import { NextResponse } from 'next/server';

export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: https://suklaamo.fi/sitemap.xml
Host: suklaamo.fi
`;
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
