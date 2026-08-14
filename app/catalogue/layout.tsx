import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Catalogue',
  description:
    "Browse Suklaamo's full catalogue of chocolate brownies, cookies and small cakes. Made fresh in Oulu, Finland, ready for local pickup and pre-order.",
  alternates: { canonical: '/catalogue' },
  openGraph: {
    title: 'Catalogue | Suklaamo — Chocolate Bakery in Oulu',
    description:
      "Browse Suklaamo's chocolate brownies, cookies and small cakes. Made fresh in Oulu, Finland, ready for local pickup and pre-order.",
    images: [{ url: '/gallery/hero-2.webp', alt: 'Suklaamo chocolate treats' }],
  },
  twitter: {
    title: 'Catalogue | Suklaamo — Chocolate Bakery in Oulu',
    description:
      "Browse Suklaamo's chocolate brownies, cookies and small cakes. Made fresh in Oulu, Finland, ready for local pickup and pre-order.",
    images: ['/gallery/hero-2.webp'],
  },
};

export default function CatalogueLayout({ children }: { children: ReactNode }) {
  return children;
}