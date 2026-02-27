'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SERVICES } from '@/lib/constants';
import { useReducedMotion } from '@/lib/utils';

/**
 * Services Section Component
 * 
 * Displays service offerings in a responsive grid layout with:
 * - 1 column on mobile, 3 columns on desktop
 * - Service cards with icon, title, and description
 * - Hover effects: scale 1.05, gradient border glow
 * - Scroll-triggered fade-in animation with stagger
 * - 2rem gap between cards
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 12.2
 */

export default function Services(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for service cards
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
    <section id="services" className="py-20 md:py-32 relative">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive cybersecurity solutions tailored to your needs"
          centered
        />

        {SERVICES.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted text-lg">
              No services available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {SERVICES.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative bg-card rounded-xl p-6 md:p-8 border border-white/10 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:border-blue-500/50"
                data-testid={`service-${service.id}`}
              >
                {/* Icon with gradient color and animation */}
                <motion.div
                  className="mb-6 inline-block"
                  data-testid="service-icon"
                  aria-hidden="true"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.1, 
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 border border-blue-500/30 group-hover:border-cyan-500/50 transition-colors duration-300">
                    <IconComponent
                      className="w-12 h-12 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300"
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <h3
                  className="text-xl font-semibold text-white mb-4"
                  data-testid="service-title"
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="text-base text-muted leading-relaxed"
                  data-testid="service-description"
                >
                  {service.description}
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
