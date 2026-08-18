'use client';

import { useState, type ComponentType, type SVGProps } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag as ShoppingBagRaw } from 'iconoir-react';
import { useCart } from '../context/CartContext';
import { useLocale, type Locale } from '../context/LocaleContext';
import type { NavKey } from '../lib/i18n';

const ShoppingBag = ShoppingBagRaw as unknown as ComponentType<SVGProps<SVGSVGElement>>;

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'catalogue', href: '/catalogue' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] satisfies Array<{ key: NavKey; href: string }>;

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
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="sticky top-12 z-40 border-b border-white/80 bg-white/90 backdrop-blur-2xl shadow-soft">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="min-w-0 text-xl font-black uppercase tracking-[0.35em] text-primary">
            SUKLAAMO
          </Link>
          <span className="hidden text-xs uppercase tracking-[0.4em] text-primary/70 md:inline-flex">
            {t.nav.chocolateBakery}
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
                {t.nav[link.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center rounded-full border border-[#d9c8b1] bg-white p-1 text-xs font-bold text-primary" aria-label="Language">
            {(['en', 'fi'] as Locale[]).map((option) => (
              <button key={option} type="button" onClick={() => setLocale(option)} className={`rounded-full px-2.5 py-1.5 transition ${locale === option ? 'bg-primary text-white' : 'hover:bg-[#fff5df]'}`} aria-pressed={locale === option}>
                {option.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/cart" aria-label={`${t.nav.cart} (${itemCount})`} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-gold px-4 py-3 text-sm font-semibold text-primary shadow-soft transition hover:bg-[#d38a24] md:px-5">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="md:hidden">({itemCount})</span>
            <span className="hidden md:inline">{t.nav.order} ({itemCount})</span>
          </Link>
          <motion.button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
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
                  {t.nav[link.key]}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
