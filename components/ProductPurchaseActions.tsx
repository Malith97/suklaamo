'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import type { Product } from '../data/products';
import { MAX_CART_QUANTITY, MAX_CART_QUANTITY_MESSAGE, useCart } from '../context/CartContext';
import { useLocale } from '../context/LocaleContext';

type ToastState = {
  kind: 'success' | 'error';
  message: string;
};

type ProductPurchaseActionsProps = {
  product: Product;
  className?: string;
};

export default function ProductPurchaseActions({ product, className = '' }: ProductPurchaseActionsProps) {
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

  const handleAddToCart = () => {
    const result = addItem(product);
    setToast(
      result.success
        ? { kind: 'success', message: `${product.name} ${locale === 'fi' ? 'lisättiin ostoskoriin.' : 'added to cart.'}` }
        : { kind: 'error', message: locale === 'fi' ? 'Tilausraja on 10 tuotetta. Ota yhteyttä suuremmista tilauksista.' : result.message },
    );

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setToast(null);
      timeoutRef.current = null;
    }, 2200);
  };

  const isLimitReached = itemCount >= MAX_CART_QUANTITY;

  return (
    <div className={className}>
      <div className="space-y-3">
        <Button type="button" onClick={handleAddToCart} className="w-full" disabled={isLimitReached}>
          {isLimitReached ? t.common.orderLimitReached : t.common.addToCart}
        </Button>
        {isLimitReached ? <p className="text-xs leading-6 text-[#8d3b28]">{locale === 'fi' ? 'Tilausraja on 10 tuotetta. Ota yhteyttä suuremmista tilauksista.' : MAX_CART_QUANTITY_MESSAGE}</p> : null}
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
    </div>
  );
}