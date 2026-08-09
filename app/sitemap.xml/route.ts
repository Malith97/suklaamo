import { NextResponse } from 'next/server';
import { products } from '../../data/products';

const SITE_URL = 'https://suklaamo.fi';
const staticPages = ['/', '/about', '/catalogue', '/contact', '/cart', '/checkout'];

export function GET() {
  const productUrls = products.map((product) => `${SITE_URL}/catalogue/${product.slug}`);
  const urls = [...staticPages.map((page) => `${SITE_URL}${page}`), ...productUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `<url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join('\n  ')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
