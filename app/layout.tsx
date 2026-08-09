import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Fredoka, Inter } from 'next/font/google';
import Analytics from '../components/Analytics';
import PromoTicker from '../components/PromoTicker';
import PageTransition from '../components/PageTransition';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-fredoka' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://suklaamo.fi'),
  title: 'Suklaamo | Premium Finnish chocolate bakery in Oulu',
  description:
    'Suklaamo is a Finnish home bakery in Oulu crafting small-batch chocolate brownies, cookies and small cakes for local pickup and pre-order.',
  keywords: [
    'Suklaamo',
    'Finnish bakery',
    'Oulu bakery',
    'chocolate brownies',
    'chocolate cookies',
    'small cakes',
    'home bakery',
    'pickup bakery',
    'handmade bakery',
    'bakery Oulu',
    'brownies Oulu',
    'cakes Oulu',
    'cookies Oulu',
  ],
  openGraph: {
    title: 'Suklaamo | Premium Finnish chocolate bakery in Oulu',
    description:
      'Handmade chocolate brownies and cakes from a Finnish home bakery in Oulu, ready for local pickup and pre-order.',
    type: 'website',
    siteName: 'Suklaamo',
    images: [{ url: '/gallery/hero-2.webp', alt: 'Suklaamo chocolate treats' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suklaamo | Premium Finnish chocolate bakery in Oulu',
    description:
      'Handmade chocolate brownies and cakes from a Finnish home bakery in Oulu, ready for local pickup and pre-order.',
    images: ['/gallery/hero-2.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/gallery/suklaamo.png',
    shortcut: '/gallery/suklaamo.png',
    apple: '/gallery/suklaamo.png',
  },
};

const localBusinessStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: 'Suklaamo',
  description:
    'Suklaamo is a Finnish home bakery in Oulu making chocolate brownies, cookies and small cakes for pickup and pre-order.',
  url: 'https://suklaamo.fi',
  telephone: '+358-40-000-0000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Peltolankaari 20',
    addressLocality: 'Oulu',
    postalCode: '90230',
    addressCountry: 'FI',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 65.0457456,
    longitude: 25.4319582,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday', 'Sunday'],
      opens: '16:00',
      closes: '21:00',
    },
  ],
  sameAs: ['https://instagram.com/suklaamoo'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="pt-12 bg-background text-text-dark">
        <Analytics />
        <PromoTicker />
        <PageTransition>{children}</PageTransition>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessStructuredData) }}
        />
      </body>
    </html>
  );
}
