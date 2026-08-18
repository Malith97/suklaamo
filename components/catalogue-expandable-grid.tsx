'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Product } from '../data/products';
import ProductCard from './ProductCard';
import { MAX_CART_QUANTITY, MAX_CART_QUANTITY_MESSAGE, useCart } from '../context/CartContext';
import { useLocale } from '../context/LocaleContext';

type ToastState = {
  kind: 'success' | 'error';
  message: string;
};

export default function CatalogueExpandableGrid({ products }: { products: Product[] }) {
  const { addItem, itemCount } = useCart();
  const { locale, t } = useLocale();
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const clearToast = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setToast(null);
      timeoutRef.current = null;
    }, 2200);
  };

  const handleAddToCart = (product: Product) => {
    const result = addItem(product);
    setToast(
      result.success
        ? { kind: 'success', message: `${product.name} ${locale === 'fi' ? 'lisättiin ostoskoriin.' : 'added to cart.'}` }
        : { kind: 'error', message: locale === 'fi' ? 'Tilausraja on 10 tuotetta. Ota yhteyttä suuremmista tilauksista.' : result.message },
    );
    clearToast();
  };

  const addToCartDisabled = itemCount >= MAX_CART_QUANTITY;

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            href={`/catalogue/${product.slug}`}
            onAddToCart={() => handleAddToCart(product)}
            addToCartDisabled={addToCartDisabled}
            addToCartDisabledLabel={locale === 'fi' ? 'Tilausraja on 10 tuotetta. Ota yhteyttä suuremmista tilauksista.' : MAX_CART_QUANTITY_MESSAGE}
          />
        ))}
      </div>

      <AnimatePresence>
        {toast ? (
          <motion.div
            className="fixed bottom-6 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 rounded-[1.75rem] border border-white/70 bg-white px-5 py-4 text-sm font-semibold shadow-2xl"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <p className={toast.kind === 'error' ? 'text-[#8d3b28]' : 'text-primary'}>{toast.message}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
