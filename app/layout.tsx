import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Fredoka, Inter } from 'next/font/google';
import PromoTicker from '../components/PromoTicker';
import PageTransition from '../components/PageTransition';
import { CartProvider } from '../context/CartContext';

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
  ],
  openGraph: {
    title: 'Suklaamo | Premium Finnish chocolate bakery in Oulu',
    description:
      'Handmade chocolate brownies and cakes from a Finnish home bakery in Oulu, ready for local pickup and pre-order.',
    type: 'website',
    images: [{ url: '/gallery/suklaamo.png', alt: 'Suklaamo bakery logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/gallery/suklaamo.png'],
  },
  icons: {
    icon: '/gallery/suklaamo.png',
    shortcut: '/gallery/suklaamo.png',
    apple: '/gallery/suklaamo.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="pt-12 bg-background text-text-dark">
        <PromoTicker />
        <CartProvider>
          <PageTransition>{children}</PageTransition>
        </CartProvider>
      </body>
    </html>
  );
}
