'use client';

import { useEffect, useState } from 'react';
import SmartImage from './SmartImage';
import { motion, useAnimationControls } from 'framer-motion';

const images = [
  '/products/img-01.webp',
  '/products/img-02.webp',
  '/products/img-03.webp',
  '/products/img-04.webp',
  '/products/img-06.webp',
  '/products/img-07.webp',
  '/products/img-08.webp',
  '/products/img-09.webp',
  '/products/img-10.webp',
  '/products/img-11.webp',
  '/products/img-12.webp',
  '/products/img-13.webp',
];

const marqueeAnimation = {
  x: ['0%', '-50%'],
  transition: {
    x: {
      duration: 30,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

export default function PhotoMarquee() {
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      controls.stop();
    } else {
      controls.start(marqueeAnimation);
    }
  }, [isPaused, controls]);

  return (
    <div className="overflow-hidden rounded-[3rem] bg-[#fff7eb] shadow-soft">
      <div
        className="group relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <motion.div className="flex items-center gap-4 px-4 py-6" animate={controls}>
          {[...images, ...images].map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              className="relative h-[420px] min-w-[260px] flex-shrink-0 overflow-hidden rounded-[2rem]"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
                <SmartImage
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  wrapperClassName="relative h-[420px] w-full"
                  imgClassName="object-cover"
                />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}