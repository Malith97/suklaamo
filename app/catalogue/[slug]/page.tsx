import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Badge from '../../../components/Badge';
import SectionHeading from '../../../components/SectionHeading';
import { products } from '../../../data/products';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />
      <section className="container mx-auto py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading title={product.name} subtitle={product.description} />
            <div className="rounded-[3rem] bg-white p-6 shadow-soft">
              <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] bg-[#f7e1cc] sm:h-[520px]">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
            </div>
            <div className="rounded-[2.5rem] bg-white p-8 shadow-soft">
              <div className="flex flex-wrap gap-3">
                {product.tags.map((tag) => (
                  <Badge key={tag} label={tag} variant={tag === 'Gluten-free' ? 'sage' : 'cocoa'} />
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#e8d5ba] pt-6">
                <p className="text-lg font-semibold text-primary">{product.price}</p>
                <p className="rounded-full border border-[#d9c8b1] bg-[#fff4dd] px-4 py-2 text-sm font-semibold text-[#5a4030]">
                  {product.inStock ? 'Available now' : 'Made to order'}
                </p>
              </div>
              <p className="mt-6 text-sm leading-7 text-[#5a4030]">
                Rich chocolate, warm aromas, and tender texture. Every product is baked on demand to preserve freshness for local pickup in Oulu.
              </p>
            </div>
          </div>

          <aside className="space-y-6 rounded-[3rem] bg-[#fff3df] p-8 shadow-soft">
            <div className="rounded-[2rem] bg-white p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Order</p>
              <p className="mt-4 leading-7 text-[#5a4030]">Pre-order with pickup only. Send your request via Instagram or message, and we’ll confirm your order and pickup window.</p>
            </div>
            <Link href="https://instagram.com/suklaamoo" target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#d38a24]">
              Order via Instagram
            </Link>
            <Link href="/catalogue" className="inline-flex w-full items-center justify-center rounded-full border border-[#d9c8b1] bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-[#fff5df]">
              Back to catalogue
            </Link>
            <div className="rounded-[2rem] bg-[#fff4dd] p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Local pickup</p>
              <p className="mt-3 text-sm leading-7 text-[#5a4030]">
                Pickup location: Peltolankaari 20, 90230 Oulu. Fresh orders are ready for collection during our batch pickup hours.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
