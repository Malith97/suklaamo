'use client';

import { useState, type ComponentType, type SVGProps } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag as ShoppingBagRaw } from 'iconoir-react';
import { useCart } from '../context/CartContext';

const ShoppingBag = ShoppingBagRaw as unknown as ComponentType<SVGProps<SVGSVGElement>>;

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const topLineVariants = {
  closed: { rotate: 0, y: -6, opacity: 1 },
  open: { rotate: 45, y: 0, opacity: 1 },
};

const middleLineVariants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

const bottomLineVariants = {
  closed: { rotate: 0, y: 6, opacity: 1 },
  open: { rotate: -45, y: 0, opacity: 1 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-12 z-40 border-b border-white/80 bg-white/90 backdrop-blur-2xl shadow-soft">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="min-w-0 text-xl font-black uppercase tracking-[0.35em] text-primary">
            SUKLAAMO
          </Link>
          <span className="hidden text-xs uppercase tracking-[0.4em] text-primary/70 md:inline-flex">
            Chocolate bakery
          </span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary text-white rounded-full px-4 py-2'
                    : 'text-primary/80 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link href="/cart" aria-label={`Cart (${itemCount})`} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-gold px-4 py-3 text-sm font-semibold text-primary shadow-soft transition hover:bg-[#d38a24] md:px-5">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="md:hidden">({itemCount})</span>
            <span className="hidden md:inline">Order ({itemCount})</span>
          </Link>
          <motion.button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((current) => !current)}
            className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9c8b1] bg-white text-primary shadow-soft transition hover:bg-[#fff5df] md:hidden"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute block h-0.5 w-5 rounded-full bg-current"
              variants={topLineVariants}
              animate={isOpen ? 'open' : 'closed'}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute block h-0.5 w-5 rounded-full bg-current"
              variants={middleLineVariants}
              animate={isOpen ? 'open' : 'closed'}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute block h-0.5 w-5 rounded-full bg-current"
              variants={bottomLineVariants}
              animate={isOpen ? 'open' : 'closed'}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            />
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="sync">
        {isOpen ? (
          <motion.div
            className="fixed inset-x-0 top-full z-30 overflow-hidden bg-white/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-[#e6d5c2]/80 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-3xl px-4 py-3 text-base font-semibold text-primary transition hover:bg-[#f6e0c4]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
