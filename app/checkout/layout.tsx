import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Checkout',
  description:
    'Complete your pre-order request for pickup in Oulu, Finland. Order chocolate brownies, cookies and small cakes from Suklaamo and we will confirm your pickup details.',
  alternates: { canonical: '/checkout' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Checkout | Suklaamo — Place Your Order',
    description:
      'Complete your pre-order request for pickup in Oulu, Finland. Chocolate brownies, cookies and small cakes.',
    images: [{ url: '/gallery/hero-2.webp', alt: 'Suklaamo chocolate treats baked in Oulu, Finland' }],
  },
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return children;
}