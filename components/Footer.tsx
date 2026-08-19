import Link from 'next/link';
import { BUSINESS_TELEPHONE } from '../lib/site';
import { useLocale } from '../context/LocaleContext';
import type { NavKey } from '../lib/i18n';

const links = [
  { key: 'home', href: '/' },
  { key: 'catalogue', href: '/catalogue' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] satisfies Array<{ key: NavKey; href: string }>;

export default function Footer() {
  const { locale, t } = useLocale();
  return (
    <footer className="border-t border-[#d9c8b1] bg-white/90 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-text-dark md:flex-row md:items-center md:justify-between md:px-8">
        <div className="space-y-2">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-primary">Suklaamo</p>
          <p className="max-w-xl text-sm text-[#4d3a2d]">{locale === 'fi' ? 'Lämmin suomalainen kotileipomo, jossa browniet, keksit ja pienet kakut syntyvät niin, että suklaa on aina pääosassa. Nouto Oulussa.' : 'A warm Finnish home bakery making brownies, cookies, and small cakes with chocolate first. Pickup in Oulu, Finland.'}</p>
          {BUSINESS_TELEPHONE ? (
            <p className="pt-1 text-sm text-[#4d3a2d]">
              <span className="font-semibold">{locale === 'fi' ? 'Puhelin:' : 'Phone:'}</span>{' '}
              <a href={`tel:${BUSINESS_TELEPHONE.replace(/\s/g, '')}`} className="text-primary hover:text-accent-cocoa">
                {BUSINESS_TELEPHONE}
              </a>
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 text-[#4d3a2d] md:items-end">
          <Link href="https://instagram.com/suklaamoo" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">
            @suklaamoo
          </Link>
          <p>© {new Date().getFullYear()} Suklaamo. {locale === 'fi' ? 'Kaikki oikeudet pidätetään.' : 'All rights reserved.'}</p>
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-primary/80 hover:text-primary">
                {t.nav[link.key]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
