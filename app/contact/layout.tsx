import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Suklaamo chocolate bakery in Oulu, Finland. Pickup at Peltolankaari 20, Fri 17–21, Sat–Sun 16–20. Reserve brownies, cookies and cakes by form, email or Instagram.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Suklaamo — Pickup Bakery Oulu',
    description:
      'Contact Suklaamo chocolate bakery in Oulu, Finland. Pickup at Peltolankaari 20, Fri 17–21, Sat–Sun 16–20.',
    images: [{ url: '/gallery/hero-2.webp', alt: 'Suklaamo chocolate treats baked in Oulu, Finland' }],
  },
  twitter: {
    title: 'Contact | Suklaamo — Pickup Bakery Oulu',
    description:
      'Contact Suklaamo chocolate bakery in Oulu, Finland. Pickup at Peltolankaari 20, Fri 17–21, Sat–Sun 16–20.',
    images: ['/gallery/hero-2.webp'],
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}