import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Your Cart',
  description:
    'Review your shopping cart before checkout. Pickup orders for fresh chocolate brownies, cookies and cakes from Suklaamo bakery in Oulu, Finland.',
  alternates: { canonical: '/cart' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Your Cart | Suklaamo — Chocolate Bakery in Oulu',
    description:
      'Review your shopping cart before checkout. Pickup orders for fresh chocolate treats from Suklaamo bakery in Oulu.',
    images: [{ url: '/gallery/hero-2.webp', alt: 'Suklaamo chocolate treats baked in Oulu, Finland' }],
  },
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return children;
}