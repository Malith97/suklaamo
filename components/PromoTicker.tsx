'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocale } from '../context/LocaleContext';

export default function PromoTicker() {
  const [index, setIndex] = useState(0);
  const { t } = useLocale();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % t.ticker.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [t.ticker.length]);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-center bg-primary px-4 text-sm font-semibold text-white shadow-soft">
      <AnimatePresence mode="wait">
        <motion.p
          key={t.ticker[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="min-h-[1.5rem]"
        >
          {t.ticker[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
