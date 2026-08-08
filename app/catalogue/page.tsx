'use client';

import { useMemo, useState } from 'react';
import SectionHeading from '../../components/SectionHeading';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const tabs = ['All', 'Brownies', 'Cookies', 'Cakes'];

export default function CataloguePage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProducts = useMemo(
    () =>
      activeTab === 'All'
        ? products
        : products.filter((product) => product.category.toLowerCase() === activeTab.toLowerCase()),
    [activeTab],
  );

  return (
    <main className="min-h-screen flex flex-col bg-background text-text-dark">
      <Navbar />
      <section className="container mx-auto flex-1 py-16">
        <SectionHeading title="Catalogue" subtitle="Small-batch chocolate treats for local pickup." />
        <div className="mt-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-soft'
                  : 'border border-[#d9c8b1] bg-white text-primary hover:bg-[#fff5df]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
