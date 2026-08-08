import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PromoTicker from '../components/PromoTicker';
import SectionHeading from '../components/SectionHeading';
import CategoryPill from '../components/CategoryPill';
import Badge from '../components/Badge';
import TestimonialCard from '../components/TestimonialCard';
import { products } from '../data/products';

const featured = products[0];
const categories = [
  { label: 'Brownies', count: 12 },
  { label: 'Cookies', count: 9 },
  { label: 'Cakes', count: 6 },
];
const carouselItems = products.slice(0, 3);

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-dark">
      <PromoTicker />
      <Navbar />

      <section className="container mx-auto py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="rounded-[3rem] bg-[#fff3df] p-8 shadow-soft sm:p-10">
              <p className="text-sm uppercase tracking-[0.4em] text-primary">Suklaamo</p>
              <h1 className="mt-4 text-4xl font-black uppercase leading-tight tracking-[-0.04em] text-primary sm:text-5xl lg:text-6xl">
                Artisan Finnish
                <span className="block text-accent-gold">Chocolate Bakery</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#5a4030] sm:text-lg">
                Small-batch brownies, cookies, and cakes handcrafted in Oulu. Warm premium treats designed for local pickup and pre-order with a chocolate-first approach.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Link href="/contact" className="inline-flex rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#d38a24]">
                  Order Now
                </Link>
                <Link href="/catalogue" className="inline-flex rounded-full border border-[#d9c8b1] bg-white px-6 py-3 text-sm font-semibold text-primary shadow-soft transition hover:bg-[#fff5df]">
                  See Catalogue
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[3rem] bg-white p-6 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-primary">Featured</p>
                <h2 className="mt-4 text-2xl font-bold text-primary">{featured.name}</h2>
                <p className="mt-3 text-sm leading-7 text-[#5a4030]">{featured.description}</p>
                <p className="mt-5 text-lg font-semibold text-primary">{featured.price}</p>
              </div>
              <div className="rounded-[3rem] bg-[#fff6e5] p-6 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-primary">Why Suklaamo</p>
                <p className="mt-4 text-sm leading-7 text-[#5a4030]">
                  Each piece is made with real chocolate, slow-baked in small batches, and wrapped in cozy Finnish hospitality.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <CategoryPill key={category.label} label={category.label} count={category.count} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[3rem] bg-[#f7e8d6] shadow-soft">
            <div className="absolute left-0 top-6 rounded-full bg-accent-sage/15 px-5 py-3 text-xs uppercase tracking-[0.3em] text-accent-sage shadow-soft">
              Fresh batch
            </div>
            <div className="relative h-[420px] sm:h-[520px]">
              <Image src="/products/hero.svg" alt="Premium bakery product placeholder" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-10 py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {carouselItems.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-[3rem] bg-white p-5 shadow-soft">
              <div className="relative h-72 overflow-hidden rounded-[2.5rem] bg-[#f2e5d4]">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="mt-5 space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-primary/80">{item.category}</p>
                <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                <p className="text-sm leading-6 text-[#5a4030]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto rounded-[3rem] bg-primary px-8 py-12 text-white shadow-soft sm:px-12 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#f3dec9]">Our philosophy</p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Why we bake with real chocolate</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#f3e0c8] sm:text-lg">
              From hearty brownies to soft cookies and intimate cakes, every recipe is built around premium chocolate and slow craft.
            </p>
            <Link href="/about" className="mt-8 inline-flex rounded-full bg-accent-gold px-7 py-3 font-semibold text-white shadow-soft hover:bg-[#d38a24]">
              Read our story
            </Link>
          </div>
          <div className="relative h-72 overflow-hidden rounded-[3rem] bg-[#f5e1cc] sm:h-80">
            <Image src="/products/photo-01.svg" alt="Baking process placeholder" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container mx-auto py-14">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[3rem] bg-white shadow-soft">
              <Image src="/gallery/photo-01.svg" alt="Gallery placeholder" width={1000} height={1000} className="h-72 w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[3rem] bg-white shadow-soft">
              <Image src="/gallery/photo-02.svg" alt="Gallery placeholder" width={1000} height={1000} className="h-72 w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[3rem] bg-white shadow-soft sm:col-span-2">
              <Image src="/gallery/photo-03.svg" alt="Gallery placeholder" width={1200} height={520} className="h-72 w-full object-cover" />
            </div>
          </div>
          <div className="rounded-[3rem] bg-white p-8 shadow-soft">
            <TestimonialCard quote="The brownies taste like a warm hug — decadent, fresh, and just perfect for a cozy evening." name="Milla, Helsinki" />
          </div>
        </div>
      </section>

      <section className="container mx-auto rounded-[3rem] bg-[#eaf2e8] p-10 shadow-soft sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="uppercase tracking-[0.35em] text-primary">bakery stats</p>
            <h2 className="mt-4 text-3xl font-black text-primary sm:text-4xl">Loved by locals across Oulu and beyond</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[2rem] bg-white p-5 text-center shadow-soft">
                <p className="text-3xl font-black text-primary">4.9</p>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[#5a4030]">Average rating</p>
              </div>
              <div className="rounded-[2rem] bg-white p-5 text-center shadow-soft">
                <p className="text-3xl font-black text-primary">320+</p>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[#5a4030]">Reviews</p>
              </div>
              <div className="rounded-[2rem] bg-white p-5 text-center shadow-soft">
                <p className="text-3xl font-black text-primary">10k+</p>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[#5a4030]">Instagram followers</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded-[2.5rem] bg-white p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Instagram preview</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="aspect-square overflow-hidden rounded-[2rem] bg-[#f6e7d4]" />
              <div className="aspect-square overflow-hidden rounded-[2rem] bg-[#f6e7d4]" />
              <div className="aspect-square overflow-hidden rounded-[2rem] bg-[#f6e7d4]" />
            </div>
            <a href="https://instagram.com/suklaamoo" target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#2d180f]">
              Visit @suklaamoo
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
