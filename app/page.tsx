import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />

      <section className="container mx-auto py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="rounded-[3rem] border border-[#e8d5ba] bg-[#fff6ea] p-8 shadow-soft sm:p-10">
              <p className="text-sm uppercase tracking-[0.45em] text-primary">Suklaamo</p>
              <h1 className="mt-4 text-4xl font-black uppercase leading-tight tracking-[-0.05em] text-primary sm:text-5xl lg:text-6xl">
                Home-baked Finnish
                <span className="block text-accent-gold">Chocolate treats</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#5a4030] sm:text-lg">
                I bake brownies, cookies and cakes for pickup in Oulu. Everything is made in my kitchen with simple ingredients and a lot of care.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Link href="/contact" className="inline-flex rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#d38a24]">
                  Reserve a batch
                </Link>
                <Link href="/catalogue" className="inline-flex rounded-full border border-[#d9c8b1] bg-white px-6 py-3 text-sm font-semibold text-primary shadow-soft transition hover:bg-[#fff5df]">
                  Explore menu
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[3rem] bg-white p-7 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-primary">Featured treat</p>
                <h2 className="mt-4 text-2xl font-bold text-primary">{featured.name}</h2>
                <p className="mt-3 text-sm leading-7 text-[#5a4030]">{featured.description}</p>
                <p className="mt-5 text-lg font-semibold text-primary">{featured.price}</p>
              </div>
              <div className="rounded-[3rem] bg-[#fff4df] p-7 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-primary">Why choose us</p>
                <p className="mt-4 text-sm leading-6 text-[#5a4030]">
                  I keep the kitchen small so every batch feels fresh and familiar.
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
            <div className="absolute left-5 top-6 rounded-full bg-accent-sage/15 px-5 py-2 text-xs uppercase tracking-[0.3em] text-accent-sage shadow-soft">
              Warm batch
            </div>
            <div className="relative h-[420px] sm:h-[520px]">
              <Image src="/gallery/hero-2.webp" alt="Chocolate bakery product showcase" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-10 py-10 lg:py-14">
        <SectionHeading title="This week in the kitchen" subtitle="Treats that are ready to pick up and share." />
        <div className="grid gap-6 lg:grid-cols-3">
          {products.slice(0, 3).map((item) => (
            <div key={item.id} className="overflow-hidden rounded-[3rem] bg-white p-5 shadow-soft">
              <div className="relative h-72 overflow-hidden rounded-[2.5rem] bg-[#f2e5d4]">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="mt-5 space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-primary/80">{item.category}</p>
                <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                <p className="text-sm leading-6 text-[#5a4030]">{item.description}</p>
                <div className="flex items-center justify-between pt-4 text-sm font-semibold text-primary">
                  <span>{item.price}</span>
                  <span>{item.inStock ? 'In stock' : 'Made to order'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
            <TestimonialCard quote="The brownies taste like a warm hug — decadent, fresh, and just perfect for a cozy evening." name="Milla, Helsinki" />
          </div>
        </div>
      </section>

      <section className="container mx-auto rounded-[3rem] bg-[#eaf2e8] p-10 shadow-soft sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="uppercase tracking-[0.35em] text-primary">Bakery stats</p>
            <h2 className="mt-4 text-3xl font-black text-primary sm:text-4xl">Loved by locals across Oulu and beyond</h2>
            <div className="mt-2 grid gap-4 sm:grid-cols-3">
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
