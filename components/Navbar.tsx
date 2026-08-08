'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from './Button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-12 z-40 border-b border-white/80 bg-white/90 backdrop-blur-2xl shadow-soft">
      <div className="container mx-auto flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-black uppercase tracking-[0.35em] text-primary">
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

        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden md:inline-flex">
            <Button variant="primary">Order</Button>
          </Link>
          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((current) => !current)}
            className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9c8b1] bg-white text-primary shadow-soft transition hover:bg-[#fff5df] md:hidden"
          >
            <span className={`block h-0.5 w-5 rounded-full bg-current transition duration-300 ${isOpen ? 'translate-y-[0.45rem] rotate-45' : '-translate-y-1.5'}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-current transition duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-current transition duration-300 ${isOpen ? '-translate-y-[0.45rem] -rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-full z-30 overflow-hidden bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isOpen ? 'max-h-[calc(100vh-5rem)] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
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
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <Button variant="primary" className="w-full justify-center">
              Order now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
