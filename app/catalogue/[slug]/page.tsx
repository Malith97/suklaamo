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
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading title={product?.name ?? 'Product'} subtitle={product?.description ?? ''} />
            <div className="rounded-[3rem] bg-white p-6 shadow-soft">
              <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] bg-[#f7e1cc] sm:h-[520px]">
                <Image src={product?.image ?? '/products/photo-01.svg'} alt={product?.name ?? 'Product'} fill className="object-cover" />
              </div>
            </div>
            <div className="rounded-[2.5rem] bg-white p-8 shadow-soft">
              <div className="flex flex-wrap gap-3">
                {product?.tags.map((tag) => (
                  <Badge key={tag} label={tag} variant={tag === 'Gluten-free' ? 'sage' : 'cocoa'} />
                ))}
              </div>
              <p className="mt-6 text-lg font-semibold text-primary">{product?.price}</p>
              <p className="mt-4 text-sm leading-7 text-[#5a4030]">
                This is a placeholder product detail page. Real product photos and order flow will be added later once the menu and checkout are ready.
              </p>
            </div>
          </div>
          <aside className="space-y-6 rounded-[3rem] bg-[#fff3df] p-8 shadow-soft">
            <div className="rounded-[2rem] bg-white p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Order</p>
              <p className="mt-4 leading-7 text-[#5a4030]">Pre-order and local pickup available. Please send your request via Instagram or message for confirmation.</p>
            </div>
            <Link href="https://instagram.com/suklaamoo" target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#d38a24]">
              Order via Instagram
            </Link>
            <Link href="/catalogue" className="inline-flex w-full items-center justify-center rounded-full border border-[#d9c8b1] bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-[#fff5df]">
              Back to catalogue
            </Link>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
