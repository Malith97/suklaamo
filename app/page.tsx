'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import CategoryPill from '../components/CategoryPill';
import TestimonialCard from '../components/TestimonialCard';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const featured = products[0];
const categories = [
  { label: 'Brownies', count: 12 },
  { label: 'Cookies', count: 9 },
  { label: 'Cakes', count: 6 },
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
              Home-baked Finnish
              <span className="block text-accent-cocoa">chocolate treats</span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[#5a4030] sm:text-lg">
              Every treat comes from my kitchen in Oulu. Brownies, cookies and small cakes made with good chocolate, a steady coffee and a warm welcome.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#d38a24]">
                Reserve a batch
              </Link>
              <Link href="/catalogue" className="inline-flex rounded-full border border-[#d9c8b1] bg-white px-6 py-3 text-sm font-semibold text-primary shadow-soft transition hover:bg-[#fff5df]">
                Explore menu
              </Link>
            </div>
            {/* <div className="grid gap-3 sm:grid-cols-3">
              {categories.map((category) => (
                <CategoryPill key={category.label} label={category.label} count={category.count} />
              ))}
            </div> */}
          </motion.div>

          <div className="relative overflow-hidden rounded-[3rem] bg-[#f7e8d6] shadow-soft lg:max-w-[640px]">
            <div className="absolute left-5 top-6 rounded-full bg-accent-sage/15 px-5 py-2 text-xs uppercase tracking-[0.3em] text-accent-sage shadow-soft">
              Warm batch
            </div>
            <div className="relative h-[420px] sm:h-[640px]">
              <Image src="/gallery/hero-2.webp" alt="Chocolate bakery product showcase" fill className="object-cover" />
            </div>
          </div>
        </div>
      </motion.section>

      <section className="container mx-auto space-y-10 py-10 lg:py-14">
        <motion.div variants={fadeSection}>
          <SectionHeading title="This week in the kitchen" subtitle="Treats that are ready to pick up and share." />
        </motion.div>

        <motion.div className="grid gap-6 lg:grid-cols-3" variants={staggers} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {products.slice(0, 3).map((item) => (
            <motion.div key={item.id} variants={cardReveal} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 24, duration: 0.22 }}>
              <ProductCard product={item} href="/catalogue" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="container mx-auto rounded-[3rem] bg-primary px-8 py-12 text-white shadow-soft sm:px-12 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#f3dec9]">The Suklaamo way</p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Simple chocolate, honest baking, warm moments</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#f3e0c8] sm:text-lg">
              I make each order in small batches with the kind of chocolate I love to eat myself.
            </p>
            <Link href="/about" className="mt-8 inline-flex rounded-full bg-accent-gold px-7 py-3 font-semibold text-white shadow-soft hover:bg-[#d38a24]">
              Discover our story
            </Link>
          </div>
          <div className="relative h-72 overflow-hidden rounded-[3rem] bg-[#f5e1cc] sm:h-80">
            <Image src="/products/img-01.webp" alt="Baking process presentation" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container mx-auto py-14">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[3rem] bg-white shadow-soft">
              <Image src="/products/img-02.webp" alt="Bakery gallery" width={1000} height={1000} className="h-72 w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[3rem] bg-white shadow-soft">
              <Image src="/products/img-03.webp" alt="Bakery gallery" width={1000} height={1000} className="h-72 w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[3rem] bg-white shadow-soft sm:col-span-2">
              <Image src="/products/img-06.webp" alt="Bakery gallery" width={1200} height={520} className="h-72 w-full object-cover" />
            </div>
          </div>
          <div className="rounded-[3rem] bg-white p-8 shadow-soft">
            <TestimonialCard quote="The brownies taste like a warm hug. decadent, fresh, and just perfect for a cozy evening." name="Minna, Oulu" />
          </div>
        </div>
      </section>

      <section className="container mx-auto rounded-[3rem] bg-[#f4e2d0] p-10 sm:p-12 mb-12 shadow-soft">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="uppercase tracking-[0.35em] text-primary">Loved by locals</p>
            <h2 className="mt-4 text-3xl font-black text-primary sm:text-4xl">Loved by locals across Oulu and beyond</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#5a4030]">
              These treats turn quiet coffee moments into something to look forward to. People bring brownies for birthdays, small cakes for family gatherings and cookies to share after a morning walk.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[2rem] bg-white p-6 text-sm leading-7 shadow-soft">
                <p className="font-semibold text-primary">Birthday boxes</p>
                <p className="mt-3 text-[#5a4030]">A small tray of favourites makes the celebration feel personal.</p>
              </div>
              <div className="rounded-[2rem] bg-white p-6 text-sm leading-7 shadow-soft">
                <p className="font-semibold text-primary">Coffee moments</p>
                <p className="mt-3 text-[#5a4030]">A little sweet to go with a morning cup or an afternoon break.</p>
              </div>
              <div className="rounded-[2rem] bg-white p-6 text-sm leading-7 shadow-soft">
                <p className="font-semibold text-primary">Family gatherings</p>
                <p className="mt-3 text-[#5a4030]">Small cakes and cookie boxes for the people you care about.</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[2.5rem] bg-white">
              <div className="relative h-[280px] sm:h-[360px]">
                <Image src="/products/img-05.webp" alt="Assorted baking treats" fill className="object-cover" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[2.5rem] bg-[#fff4df]">
                <div className="relative h-[180px]">
                  <Image src="/products/img-02.webp" alt="Chocolate cookies" fill className="object-cover" />
                </div>
              </div>
              <div className="overflow-hidden rounded-[2.5rem] bg-[#f1e7dd]">
                <div className="relative h-[180px]">
                  <Image src="/products/img-03.webp" alt="Chocolate brownie tray" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
