'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';
import { AnimatedCounterProps } from '@/lib/types';
import { useReducedMotion } from '@/lib/utils';

export default function AnimatedCounter({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps): JSX.Element {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const hasAnimated = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Only animate once when component mounts
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      
      // If user prefers reduced motion, set value immediately
      if (prefersReducedMotion) {
        count.set(value);
      } else {
        const controls = animate(count, value, {
          duration: duration / 1000, // Convert ms to seconds for Framer Motion
          ease: 'easeOut',
        });

        return () => controls.stop();
      }
    }
    return undefined;
  }, [count, value, duration, prefersReducedMotion]);

  return (
    <motion.span 
      className={className}
      aria-live="polite"
      aria-atomic="true"
    >
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}
