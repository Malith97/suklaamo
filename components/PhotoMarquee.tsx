'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
            <div key={`${src}-${index}`} className="min-w-[260px] flex-shrink-0 overflow-hidden rounded-[2rem]">
              <Image src={src} alt={`Gallery image ${index + 1}`} width={280} height={420} className="h-[420px] w-full object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
