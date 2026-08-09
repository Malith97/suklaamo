'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../components/SectionHeading';
import CatalogueExpandableGrid from '../../components/catalogue-expandable-grid';
import { products } from '../../data/products';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const tabs = ['All', 'Cakes', 'Brownies', 'Cookies', 'Pizzas'];

const fadeSection = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } },
};

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

      <motion.section
        className="container mx-auto flex-1 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeSection}
      >
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <SectionHeading title="Catalogue" subtitle="Chocolate-forward brownies, cookies and small cakes for pickup in Oulu." />
            <p className="mt-4 max-w-4xl text-sm leading-7 text-text-muted">
              Browse the current kitchen selection. Fresh batches are made in the evening and available for local pickup the next day.
            </p>
          </div>
          <div className="rounded-[2rem] bg-surface p-6 shadow-soft">
            <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Order tip</p>
            <p className="mt-2 text-sm leading-7 text-text-muted">
              Reserve before Thursday 18:00 for friday and weekend collection. Popular items sell out fast.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-card'
                  : 'border border-border bg-white text-primary hover:bg-[#fff5df]'
              }`}
              aria-pressed={activeTab === tab}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <motion.div className="mt-14 rounded-[2rem] bg-white p-10 text-center shadow-soft" variants={fadeSection}>
            <p className="text-lg font-semibold text-primary">Nothing matches that category yet.</p>
            <p className="mt-3 text-sm leading-7 text-text-muted">Try another category or check back soon for the next bakery release.</p>
          </motion.div>
        ) : (
          <CatalogueExpandableGrid products={filteredProducts} />
        )}
      </motion.section>

      <Footer />
    </main>
  );
}
