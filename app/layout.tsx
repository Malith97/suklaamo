import './globals.css';
import type { Metadata } from 'next';
import { Fredoka, Inter } from 'next/font/google';
import PromoTicker from '../components/PromoTicker';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-fredoka' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Suklaamo | Finnish chocolate bakery',
  description: 'Suklaamo is a home bakery in Oulu making small-batch chocolate brownies, cookies, and cakes for local pickup and pre-order.',
  openGraph: {
    title: 'Suklaamo | Finnish chocolate bakery',
    description: 'A home bakery in Oulu offering small-batch chocolate brownies, cookies, and cakes for local pickup.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${inter.variable}`}>
      <body className="pt-12">
        <PromoTicker />
        {children}
      </body>
    </html>
  );
}
