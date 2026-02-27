'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { useReducedMotion } from '@/lib/utils';

/**
 * Hero Section Component
 * 
 * Full-viewport landing section with:
 * - Animated background with grid pattern
 * - Floating shapes with continuous animation
 * - Headline with gradient text effect
 * - Subheading with muted styling
 * - Two CTA buttons (gradient and outline variants)
 * - Fade-in animation on mount with stagger
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 12.6
 */

export default function Hero(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for hero content
  const heroVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : 0.2,
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6 },
    },
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Hero content */}
      <Container className="relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Headline with gradient text */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl"
            variants={childVariants}
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Secure Your Digital Future
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl text-slate-300 max-w-[600px] mb-8 md:mb-10 leading-relaxed"
            variants={childVariants}
          >
            Advanced cybersecurity solutions powered by AI to protect your business from evolving threats
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center"
            variants={childVariants}
          >
            <Button 
              variant="gradient" 
              className="w-full md:w-auto min-h-[44px]"
              aria-label="Get started with our cybersecurity services"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              className="w-full md:w-auto min-h-[44px]"
              aria-label="Learn more about our services"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
