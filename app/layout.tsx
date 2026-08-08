import './globals.css';
import type { Metadata } from 'next';
import { Fredoka, Inter } from 'next/font/google';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-fredoka' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Suklaamo | Artisan Finnish Chocolate Bakery',
  description: 'Suklaamo is a premium Finnish home bakery crafting small-batch chocolate brownies, cookies, and cakes for local pickup and pre-order.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
