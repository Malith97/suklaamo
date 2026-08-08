import Link from 'next/link';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#d9c8b1] bg-white/90 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-text-dark md:flex-row md:items-center md:justify-between md:px-8">
        <div className="space-y-2">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-primary">Suklaamo</p>
          <p className="max-w-xl text-sm text-[#4d3a2d]">A warm Finnish home bakery making brownies, cookies, and small cakes with chocolate first.</p>
        </div>

        <div className="flex flex-col gap-3 text-[#4d3a2d] md:items-end">
          <Link href="https://instagram.com/suklaamoo" target="_blank" rel="noreferrer" className="font-semibold text-primary">
            @suklaamoo
          </Link>
          <p>© {new Date().getFullYear()} Suklaamo. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-primary/80 hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
