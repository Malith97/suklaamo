'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../components/SectionHeading';
import CatalogueExpandableGrid from '../../components/catalogue-expandable-grid';
import JsonLd from '../../components/JsonLd';
import { products } from '../../data/products';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { buildBreadcrumbSchema } from '../../lib/site';
import { getLocalizedProducts } from '../../lib/i18n';
import { useLocale } from '../../context/LocaleContext';

const tabs = ['All', 'Cakes', 'Brownies', 'Cookies'];

const fadeSection = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } },
};

export default function CataloguePage() {
  const [activeTab, setActiveTab] = useState('All');
  const { locale, t } = useLocale();
  const localizedProducts = getLocalizedProducts(products, locale);

  const filteredProducts = useMemo(
    () =>
      activeTab === 'All'
        ? localizedProducts
        : localizedProducts.filter((product) => product.category.toLowerCase() === activeTab.toLowerCase()),
      [activeTab, localizedProducts],
  );

  return (
    <main className="min-h-screen flex flex-col bg-background text-text-dark">
      <Navbar />

      <motion.section
        className="container mx-auto flex-1 py-16"
        initial="hidden"
        animate="visible"
        variants={fadeSection}
      >
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <SectionHeading as="h1" title={locale === 'fi' ? 'Valikoima' : 'Catalogue'} subtitle={locale === 'fi' ? 'Suklaisia brownieita, keksejä ja pieniä kakkuja noudettavaksi Oulussa.' : 'Chocolate-forward brownies, cookies and small cakes for pickup in Oulu.'} />
            <p className="mt-4 max-w-4xl text-sm leading-7 text-text-muted">
              {locale === 'fi' ? 'Selaa tämänhetkistä keittiön valikoimaa. Tuoreet erät valmistetaan illalla ja ovat noudettavissa paikallisesti seuraavana päivänä.' : 'Browse the current kitchen selection. Fresh batches are made in the evening and available for local pickup the next day.'}
            </p>
          </div>
          <div className="rounded-[2rem] bg-surface p-6 shadow-soft">
            <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">{locale === 'fi' ? 'Tilausvinkki' : 'Order tip'}</p>
            <p className="mt-2 text-sm leading-7 text-text-muted">
              {locale === 'fi' ? 'Varaa tilaus ennen torstaita klo 18.00 perjantain ja viikonlopun noutoa varten. Suosituimmat tuotteet loppuvat nopeasti.' : 'Reserve before Thursday 18:00 for friday and weekend collection. Popular items sell out fast.'}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] bg-[#fff4df] p-5 text-sm text-black leading-7 shadow-soft">
          <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">{locale === 'fi' ? 'Varaa tilauksesi ennen torstaita klo 18.00 viikonlopun noutoa varten' : 'Reserve your order before Thursday 18:00 for Weekend pickup'}</p>
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
              {locale === 'fi' ? { All: 'Kaikki', Cakes: 'Kakut', Brownies: 'Browniet', Cookies: 'Keksit' }[tab] : tab}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <motion.div className="mt-14 rounded-[2rem] bg-white p-10 text-center shadow-soft" variants={fadeSection}>
            <p className="text-lg font-semibold text-primary">{locale === 'fi' ? 'Tähän kategoriaan ei vielä löydy tuotteita.' : 'Nothing matches that category yet.'}</p>
            <p className="mt-3 text-sm leading-7 text-text-muted">{locale === 'fi' ? 'Kokeile toista kategoriaa tai palaa pian seuraavan leipomoerän aikaan.' : 'Try another category or check back soon for the next bakery release.'}</p>
          </motion.div>
        ) : (
          <CatalogueExpandableGrid products={filteredProducts} />
        )}
      </motion.section>

      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Catalogue', url: '/catalogue' },
        ])}
      />
      <Footer />
    </main>
  );
}
