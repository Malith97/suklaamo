import SectionHeading from '../../components/SectionHeading';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const tabs = ['All', 'Brownies', 'Cookies', 'Cakes'];

export default function CataloguePage() {
  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />
      <section className="container mx-auto py-16">
        <SectionHeading title="Catalogue" subtitle="Small-batch chocolate treats ready for local pickup and pre-order." />
        <div className="mt-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button key={tab} className="rounded-full border border-[#d9c8b1] bg-white px-5 py-2 text-sm font-semibold text-primary transition hover:bg-[#fff5df]">
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
