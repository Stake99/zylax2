'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FEATURES } from '@/lib/constants';
import { useReducedMotion } from '@/lib/utils';

/**
 * Features Section Component
 * 
 * Displays product features in glass morphism cards with:
 * - Grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
 * - Gap: 1.5rem between cards
 * - Glass morphism styling: bg-white/5, backdrop-blur-lg, border 1px solid white/10
 * - Hover effect: gradient border (blue to silver)
 * - Each feature: icon (2.5rem, gradient color), title (text-lg, font-semibold), description (text-sm, muted gray)
 * - Scroll-triggered fade-in animation with stagger
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

export default function Features(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for feature cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: 'easeOut',
      },
    },
  };
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <Container>
        <SectionHeading
          title="Our Features"
          subtitle="Powerful capabilities to protect your digital assets"
          centered
        />

        {FEATURES.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted text-lg">
              No features available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {FEATURES.map((feature) => {
            const IconComponent = feature.icon;
            
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                className="group relative bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 transition-all duration-300 ease-in-out hover:border-transparent hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                style={{
                  backgroundImage: 'none',
                }}
                data-testid={`feature-${feature.id}`}
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" 
                     style={{ padding: '1px' }}>
                  <div className="absolute inset-[1px] rounded-xl bg-white/5 backdrop-blur-lg" />
                </div>

                {/* Icon with gradient color and animation */}
                <motion.div
                  className="mb-4 inline-block"
                  data-testid="feature-icon"
                  aria-hidden="true"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.15, 
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 border border-blue-500/30 group-hover:border-cyan-500/50 transition-colors duration-300">
                    <IconComponent
                      className="w-10 h-10 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300"
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <h3
                  className="text-lg font-semibold text-white mb-3"
                  data-testid="feature-title"
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm text-muted leading-relaxed"
                  data-testid="feature-description"
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
        )}
      </Container>
    </section>
  );
}
