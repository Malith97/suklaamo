import './globals.css';
import type { Metadata } from 'next';
import { Fredoka, Inter } from 'next/font/google';
import PromoTicker from '../components/PromoTicker';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-fredoka' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Suklaamo | Premium Finnish chocolate bakery in Oulu',
  description:
    'Suklaamo is a Finnish home bakery in Oulu crafting small-batch chocolate brownies, cookies and small cakes for local pickup and pre-order.',
  keywords: ['Suklaamo', 'Finnish bakery', 'Oulu bakery', 'chocolate brownies', 'chocolate cookies', 'small cakes', 'home bakery', 'pickup bakery', 'handmade bakery'],
  openGraph: {
    title: 'Suklaamo | Premium Finnish chocolate bakery in Oulu',
    description:
      'Handmade chocolate brownies, cookies and cakes from a Finnish home bakery in Oulu, ready for local pickup and pre-order.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${inter.variable}`}>
      <body className="pt-12 bg-background text-text-dark">
        <PromoTicker />
        {children}
      </body>
    </html>
  );
}
