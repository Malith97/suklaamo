'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import CategoryPill from '../components/CategoryPill';
import TestimonialCard from '../components/TestimonialCard';
import ProductCard from '../components/ProductCard';
import SmartImage from '../components/SmartImage';
import { products } from '../data/products';
import { getLocalizedProducts } from '../lib/i18n';
import { useLocale } from '../context/LocaleContext';

const featured = products[0];
const heroSlides = products.slice(0, 4).map((product) => ({
  src: product.image,
  alt: `${product.name} — Suklaamo chocolate bakery in Oulu`,
}));
const heroSlideDurations = [4200, 5000, 5400, 4600];
const stats = [
  { value: '24', label: 'Orders Fulfilled' },
  { value: '9', label: 'Happy Customers' },
  { value: '36', label: 'Chocolate Treats Made' },
];
const categories = [
  { label: 'Brownies', count: 1 },
  { label: 'Cookies', count: 1 },
  { label: 'Cakes', count: 1 },
];

const fadeSection = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

const staggers = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.14 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const { locale, t } = useLocale();
  const localizedProducts = getLocalizedProducts(products, locale);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, heroSlideDurations[heroIndex]);

    return () => window.clearTimeout(timeout);
  }, [heroIndex]);

  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />

      <motion.section
        className="container mx-auto relative overflow-hidden py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="pointer-events-none absolute left-0 top-8 z-0 h-36 w-36 rounded-full bg-accent-gold/20 blur-3xl"
          animate={{ y: [0, 14, 0], opacity: [0.18, 0.24, 0.18] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="pointer-events-none absolute right-0 top-24 z-0 h-28 w-28 rounded-full bg-accent-sage/15 blur-3xl"
          animate={{ y: [0, -12, 0], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div className="space-y-6" variants={fadeSection}>
            <p className="text-sm uppercase tracking-[0.45em] text-accent-gold">Suklaamo</p>
            <h1 className="text-5xl font-black uppercase leading-tight tracking-[-0.05em] text-primary sm:text-6xl lg:text-7xl">
              {locale === 'fi' ? 'Kotitekoisia suomalaisia' : 'Home-baked Finnish'}
              <span className="block text-accent-cocoa">{locale === 'fi' ? 'suklaherkkuja' : 'chocolate treats'}</span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[#5a4030] sm:text-lg">
              {locale === 'fi' ? 'Jokainen herkku tulee keittiöstäni Oulussa. Browniet, keksit ja pienet kakut syntyvät hyvästä suklaasta, vahvasta kahvista ja lämpimästä vastaanotosta.' : 'Every treat comes from my kitchen in Oulu. Brownies, cookies and small cakes made with good chocolate, a steady coffee and a warm welcome.'}
            </p>
            <div className="inline-flex rounded-full border border-accent-gold/30 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-soft sm:text-sm">
              🍫 {locale === 'fi' ? 'Otan vastaan tilauksia tälle viikonlopulle' : 'Now taking orders for this weekend'}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#d38a24]">
                {locale === 'fi' ? 'Varaa erä' : 'Reserve a batch'}
              </Link>
              <Link href="/catalogue" className="inline-flex rounded-full border border-[#d9c8b1] bg-white px-6 py-3 text-sm font-semibold text-primary shadow-soft transition hover:bg-[#fff5df]">
                {locale === 'fi' ? 'Tutustu valikoimaan' : 'Explore menu'}
              </Link>
            </div>
            {/* <div className="grid gap-3 sm:grid-cols-3">
              {categories.map((category) => (
                <CategoryPill key={category.label} label={category.label} count={category.count} />
              ))}
            </div> */}
          </motion.div>

          <div className="relative overflow-hidden rounded-[3rem] bg-[#f7e8d6] shadow-soft lg:max-w-[640px]">
            <div className="absolute left-3 top-3 z-20 rounded-full bg-accent-sage/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-accent-sage shadow-soft sm:left-5 sm:top-6 sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.3em]">
              {locale === 'fi' ? 'Lämmin erä' : 'Warm batch'}
            </div>
            <div className="relative aspect-[4/3] min-h-[320px] overflow-hidden sm:min-h-[420px]">
              {heroSlides.map((slide, index) => (
                <motion.div
                  key={slide.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === heroIndex ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  <SmartImage
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    wrapperClassName="h-full w-full"
                    imgClassName="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <section className="container mx-auto pb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-[2.25rem] bg-white p-6 text-center shadow-soft"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <p className="text-4xl font-black text-primary sm:text-5xl">{stat.value}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.28em] text-text-muted">{locale === 'fi' ? ['Tilaukset toimitettu', 'Tyytyväiset asiakkaat', 'Tehdyt suklaaherkut'][index] : stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto space-y-10 py-10 lg:py-14">
        <motion.div variants={fadeSection}>
          <SectionHeading title={locale === 'fi' ? 'Tällä viikolla keittiössä' : 'This week in the kitchen'} subtitle={locale === 'fi' ? 'Herkkuja, jotka ovat valmiita noudettaviksi ja jaettaviksi.' : 'Treats that are ready to pick up and share.'} />
        </motion.div>

        <motion.div className="grid gap-6 lg:grid-cols-3" variants={staggers} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {localizedProducts.slice(0, 3).map((item) => (
            <motion.div key={item.id} variants={cardReveal} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 24, duration: 0.22 }}>
              <ProductCard product={item} href={`/catalogue/${item.slug}`} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="container mx-auto py-16 lg:py-20">
        <div className="overflow-hidden rounded-[3rem] bg-[#1e130c] p-6 shadow-soft sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-accent-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute left-0 bottom-10 h-36 w-36 rounded-full bg-accent-sage/15 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.95fr] lg:items-center">
            <motion.div
              className="group relative overflow-hidden rounded-[3rem] bg-[#2b1810] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)]"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cocoa/20 via-transparent to-accent-berry/10 opacity-90" />
              <SmartImage
              src="/products/img-03.webp"

              alt="Death by Chocolate layer cake — Suklaamo bakery Oulu"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              wrapperClassName="aspect-[4/5] sm:aspect-[5/6]"
              imgClassName="object-cover transition duration-500 group-hover:scale-105"
            />
              <div className="absolute left-6 top-6 rounded-full border border-accent-sage/40 bg-[#1f120c]/80 px-4 py-2 text-xs uppercase tracking-[0.35em] text-accent-sage shadow-soft">
                {locale === 'fi' ? 'Visuaalinen päärooli' : 'Visual hero'}
              </div>
            </motion.div>

            <div className="relative overflow-hidden rounded-[3rem] border border-accent-sage/20 bg-[#1f120b] p-8 shadow-soft sm:p-10">
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-accent-gold/20 to-transparent opacity-50" />
              <div className="relative z-10 space-y-8">
                <p className="text-xs uppercase tracking-[0.35em] text-accent-gold">{locale === 'fi' ? 'SUOSIKKIMME' : 'OUR FAVOURITES'}</p>
                <h2 className="max-w-xl text-4xl font-black leading-tight tracking-[-0.03em] text-white sm:text-5xl">
                  {locale === 'fi' ? 'Leivottu pienissä erissä. Tehty jaettavaksi.' : 'Baked in small batches. Made to be shared.'}
                </h2>
                <p className="max-w-xl text-base leading-8 text-[#d7c2aa] sm:text-lg">
                  {locale === 'fi' ? 'Kaakaoiduista brownieista kahvihetkiin tehtyihin kerroskakkuihin jokainen leivonnainen valmistetaan huolella Oulun lämpimiä pöytiä ja hitaita keskusteluja varten.' : 'From brownies dusted with cocoa to layered cakes made for coffee moments, every bake is carefully shaped for warm tables and slow conversations in Oulu.'}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-[2rem] bg-accent-berry/10 p-4">
                    <div className="mt-1 h-3.5 w-3.5 rounded-full bg-accent-gold" />
                    <p className="text-sm font-semibold text-[#f2e5d6]">{locale === 'fi' ? 'Leivonta pienissä erissä' : 'Small batch baking'}</p>
                  </div>
                  <div className="flex items-start gap-4 rounded-[2rem] bg-accent-sage/10 p-4">
                    <div className="mt-1 h-3.5 w-3.5 rounded-full bg-accent-sage" />
                    <p className="text-sm font-semibold text-[#f2e5d6]">{locale === 'fi' ? 'Aitoa suklaata jokaisessa leivonnaisessa' : 'Real chocolate in every bake'}</p>
                  </div>
                  <div className="flex items-start gap-4 rounded-[2rem] bg-accent-gold/10 p-4">
                    <div className="mt-1 h-3.5 w-3.5 rounded-full bg-accent-cocoa" />
                    <p className="text-sm font-semibold text-[#f2e5d6]">{locale === 'fi' ? 'Valmistettu tuoreena Oulussa' : 'Made fresh in Oulu'}</p>
                  </div>
                </div>

                <Link
                  href="/catalogue"
                  className="inline-flex rounded-full bg-accent-gold px-7 py-3 text-sm font-semibold text-[#2f1609] shadow-soft transition hover:bg-[#d59b38]"
                >
                  {locale === 'fi' ? 'Tutustu valikoimaan' : 'Explore Catalogue'}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-[2.5rem] bg-[#24150f]/80 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-accent-sage">{locale === 'fi' ? 'Leipomon esittely' : 'Bakery showcase'}</p>
                <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">{locale === 'fi' ? 'Kolme keittiön suosikkia' : 'Three favourites from the kitchen'}</h3>
              </div>
              <div className="hidden h-px flex-1 bg-accent-sage/20 sm:block" />
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {localizedProducts.slice(1, 4).map((item) => (
                <motion.div
                  key={item.id}
                  className="group overflow-hidden rounded-[2.5rem] bg-[#503126] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)]"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      wrapperClassName="h-full w-full"
                      imgClassName="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1b0f0a] via-transparent to-transparent" />
                  </div>
                  <div className="space-y-3 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-accent-berry">{item.category}</p>
                    <h4 className="text-lg font-black text-white">{item.name}</h4>
                    <p className="text-sm font-semibold text-accent-gold">{item.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto rounded-[3rem] bg-[#f4e2d0] p-10 sm:p-12 mb-12 shadow-soft">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="uppercase tracking-[0.35em] text-primary">{locale === 'fi' ? 'Paikallisten suosikki' : 'Loved by locals'}</p>
            <h2 className="mt-4 text-3xl font-black text-primary sm:text-4xl">{locale === 'fi' ? 'Paikallisten suosikki Oulussa ja sen ympärillä' : 'Loved by locals across Oulu and beyond'}</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#5a4030]">
              {locale === 'fi' ? 'Nämä herkut tekevät rauhallisista kahvihetkistä odottamisen arvoisia. Brownieita tuodaan syntymäpäiville, pieniä kakkuja perhejuhliin ja keksejä jaettavaksi aamulenkin jälkeen.' : 'These treats turn quiet coffee moments into something to look forward to. People bring brownies for birthdays, small cakes for family gatherings and cookies to share after a morning walk.'}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[2rem] bg-white p-6 text-sm leading-7 shadow-soft">
                <p className="font-semibold text-primary">{locale === 'fi' ? 'Syntymäpäivärasiat' : 'Birthday boxes'}</p>
                <p className="mt-3 text-[#5a4030]">{locale === 'fi' ? 'Pieni tarjotin suosikkeja tekee juhlasta henkilökohtaisen.' : 'A small tray of favourites makes the celebration feel personal.'}</p>
              </div>
              <div className="rounded-[2rem] bg-white p-6 text-sm leading-7 shadow-soft">
                <p className="font-semibold text-primary">{locale === 'fi' ? 'Kahvihetket' : 'Coffee moments'}</p>
                <p className="mt-3 text-[#5a4030]">{locale === 'fi' ? 'Pieni makea aamukahvin tai iltapäivän tauon seuraksi.' : 'A little sweet to go with a morning cup or an afternoon break.'}</p>
              </div>
              <div className="rounded-[2rem] bg-white p-6 text-sm leading-7 shadow-soft">
                <p className="font-semibold text-primary">{locale === 'fi' ? 'Perhejuhlat' : 'Family gatherings'}</p>
                <p className="mt-3 text-[#5a4030]">{locale === 'fi' ? 'Pieniä kakkuja ja keksirasioita tärkeille ihmisille.' : 'Small cakes and cookie boxes for the people you care about.'}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[2.5rem] bg-white">
              <SmartImage
              src="/products/img-05.webp"
              alt="Assorted Suklaamo chocolate treats on a wooden table"
              fill
              sizes="100vw"
              wrapperClassName="h-[280px] sm:h-[360px]"
              imgClassName="object-cover"
            />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[2.5rem] bg-[#fff4df]">
                <SmartImage
                  src="/products/img-02.webp"
                  alt="Chocolate cookies — Suklaamo home-baked treat, Oulu"
                  fill
                  sizes="(max-width: 640px) 100vw, 45vw"
                  wrapperClassName="h-[180px]"
                  imgClassName="object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[2.5rem] bg-[#f1e7dd]">
                <SmartImage
                  src="/products/img-04.webp"
                  alt="Fudgy chocolate brownies — Suklaamo bakery Oulu"
                  fill
                  sizes="(max-width: 640px) 100vw, 45vw"
                  wrapperClassName="h-[180px]"
                  imgClassName="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
