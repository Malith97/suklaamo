import SmartImage from '../../../components/SmartImage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Badge from '../../../components/Badge';
import SectionHeading from '../../../components/SectionHeading';
import { products } from '../../../data/products';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({ params }: PageProps) {

  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />
      <section className="container mx-auto py-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading title={product.name} subtitle={product.description} />
            <div className="rounded-[2.5rem] bg-surface p-6 shadow-card">
              <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-[#f7e1cc] sm:h-[520px]">
                <SmartImage src={product.image} alt={product.name} fill sizes="100vw" imgClassName="object-cover" />
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white p-8 shadow-card">
              <div className="flex flex-wrap gap-3">
                {product.tags.map((tag) => (
                  <Badge key={tag} label={tag} variant={tag === 'Gluten-free' ? 'sage' : 'cocoa'} />
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <p className="text-2xl font-black text-primary">{product.price}</p>
                <p
                  className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] ${
                    product.inStock ? 'bg-[#FFE7C1] text-primary' : 'bg-[#F8E8D7] text-text-muted'
                  }`}
                >
                  {product.inStock ? 'Fresh batch' : 'Made to order'}
                </p>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-7 text-text-muted">
                <p>
                  Every product is baked in small batches in Oulu. I bake with rich chocolate and keep the process simple, so each item feels homemade and carefully finished.
                </p>
                <div>
                  <p className="text-sm font-semibold text-primary">Ingredients</p>
                  <p className="mt-2">{product.ingredients.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">Pickup info</p>
                  <p className="mt-2">Pickup from Peltolankaari 20, Oulu. Reserve your order before Thursday 18:00 for weekend collection.</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6 rounded-[2.5rem] bg-surface p-8 shadow-card">
            <div className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Order</p>
              <p className="mt-4 leading-7 text-text-muted">
                Pre-order with pickup only. Send your request through Instagram and I will confirm your pickup window.
              </p>
            </div>
            <Link
              href="https://instagram.com/suklaamoo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#d38a24]"
            >
              Order via Instagram
            </Link>
            <Link
              href="/catalogue"
              className="inline-flex w-full items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-[#fff5df]"
            >
              Back to catalogue
            </Link>
            <div className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Pickup details</p>
              <p className="mt-3 text-sm leading-7 text-text-muted">
                Peltolankaari 20, 90230 Oulu. Fresh orders are ready for collection during the next available pickup window.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
