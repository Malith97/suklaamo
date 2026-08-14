import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Fredoka, Inter } from 'next/font/google';
import PromoTicker from '../components/PromoTicker';
import Analytics from '../components/Analytics';
import JsonLd from '../components/JsonLd';
import {
  buildLocalBusinessSchema,
  buildWebsiteSchema,
  SITE_DESCRIPTION,
  SITE_TITLE_TEMPLATE,
  SITE_DEFAULT_TITLE,
  SITE_URL,
} from '../lib/site';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-fredoka' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: SITE_TITLE_TEMPLATE,
    default: SITE_DEFAULT_TITLE,
  },
  description: SITE_DESCRIPTION,
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
    'chocolate cake',
    'local pickup',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Suklaamo',
    locale: 'en_FI',
    url: SITE_URL,
    images: [
      {
        url: '/gallery/hero-2.webp',
        width: 1200,
        height: 630,
        alt: 'Suklaamo chocolate treats baked in Oulu, Finland',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@suklaamoo',
    creator: '@suklaamoo',
    images: ['/gallery/hero-2.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/gallery/suklaamo.png',
    shortcut: '/gallery/suklaamo.png',
    apple: '/gallery/suklaamo.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-FI" className={`${fredoka.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="pt-12 bg-background text-text-dark">
        <PromoTicker />
        <Analytics />
        <JsonLd data={buildLocalBusinessSchema()} />
        <JsonLd data={buildWebsiteSchema()} />
        {children}
      </body>
    </html>
  );
}
