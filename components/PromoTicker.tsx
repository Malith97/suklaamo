'use client';

import { motion } from 'framer-motion';

const promos = ['Fresh baked daily', 'Order 24h ahead', 'Local pickup only'];

export default function PromoTicker() {
  return (
    <div className="hidden md:flex items-center justify-center bg-primary px-4 py-2 text-sm font-semibold text-white">
      <motion.div
        animate={{ y: [0, -24, -48, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        className="overflow-hidden h-6"
      >
        <div className="space-y-2">
          {promos.map((promo) => (
            <p key={promo} className="h-6 leading-6 text-white">
              {promo}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
