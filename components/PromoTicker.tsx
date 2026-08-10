'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const messages = [
  'Baked fresh for weekend pickup',
  'Deliveries around Oulu starting in September',
  'Place your order before Thursday at 18:00',
  'Baked in Oulu in small batches',
];

export default function PromoTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-center bg-primary px-4 text-sm font-semibold text-white shadow-soft">
      <AnimatePresence mode="wait">
        <motion.p
          key={messages[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="min-h-[1.5rem]"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
