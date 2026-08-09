import { motion, type MotionProps } from 'framer-motion';
import type { ComponentPropsWithoutRef } from 'react';

type ButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationCancel' | 'onAnimationIteration'
> &
  MotionProps & {
    variant?: 'primary' | 'secondary' | 'ghost';
    className?: string;
  };

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all';
  const styles = {
    primary: 'bg-accent-gold text-white shadow-soft hover:bg-[#d38a24]',
    secondary: 'bg-white text-primary border border-[#d9c8b1] hover:bg-[#fff5df]',
    ghost: 'bg-transparent text-primary hover:bg-white/80',
  };

  return (
    <motion.button
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
