'use client';

import { useEffect, useState } from 'react';
import SmartImage from './SmartImage';
import { motion, useAnimationControls } from 'framer-motion';

const images = [
  '/products/img-01.webp',
  '/products/img-02.webp',
  '/products/img-03.webp',
  '/products/img-04.webp',
  '/products/img-05.webp',
  '/products/img-06.webp',
];

export default function PhotoMarquee() {
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    controls.start({
      x: ['0%', '-50%'],
      transition: {
        x: {
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        },
      },
    });
  }, [controls]);

  useEffect(() => {
    if (isPaused) {
      controls.stop();
    } else {
      controls.start({
        x: ['0%', '-50%'],
        transition: {
          x: {
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          },
        },
      });
    }
  }, [isPaused, controls]);

  return (
    <div className="overflow-hidden rounded-[3rem] bg-[#fff7eb] shadow-soft">
      <div
        className="group relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div className="flex items-center gap-4 px-4 py-6" animate={controls}>
          {[...images, ...images].map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              className="min-w-[260px] flex-shrink-0 overflow-hidden rounded-[2rem]"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
                <SmartImage
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  wrapperClassName="h-[420px]"
                  imgClassName="object-cover"
                />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
