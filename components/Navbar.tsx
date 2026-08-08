import Link from 'next/link';
import Button from './Button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between gap-4 py-4">
        <Link href="/" className="text-xl font-black uppercase tracking-[0.35em] text-primary">SUKLAAMO</Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-primary/80 transition hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="hidden md:inline-flex">
          <Button variant="primary">Order Now</Button>
        </Link>
      </div>
    </header>
  );
}
