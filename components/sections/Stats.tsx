'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import { STATS } from '@/lib/constants';
import { useReducedMotion } from '@/lib/utils';

/**
 * Stats Section Component
 * 
 * Displays animated numerical statistics with:
 * - Dark overlay background (#0B0F19 with 90% opacity) over subtle pattern
 * - 2x2 grid on mobile, 4 columns on desktop
 * - AnimatedCounter for each stat (text-4xl or text-5xl)
 * - Labels in muted gray (text-base)
 * - Center-aligned content
 * - Intersection observer to trigger count-up animations
 * - Animation: count from 0 to target over 2 seconds with easeOut
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */

export default function Stats(): JSX.Element {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-50px',
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.5, 
                delay: prefersReducedMotion ? 0 : index * 0.1, 
                ease: 'easeOut' 
              }}
              className="text-center"
              data-testid={`stat-${stat.id}`}
            >
              {/* Animated Counter */}
              <div className="mb-3" data-testid="stat-value">
                {isInView ? (
                  <AnimatedCounter
                    value={stat.value}
                    duration={2000}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-gray-400 bg-clip-text"
                  />
                ) : (
                  <span className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-gray-400 bg-clip-text">
                    {stat.prefix || ''}0{stat.suffix || ''}
                  </span>
                )}
              </div>

              {/* Label */}
              <p
                className="text-base text-muted"
                data-testid="stat-label"
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
