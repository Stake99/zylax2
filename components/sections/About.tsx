'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { ABOUT_FEATURES, ABOUT_STATS } from '@/lib/constants';
import { useReducedMotion } from '@/lib/utils';

/**
 * About Section Component
 * 
 * Displays company information with:
 * - Two-column layout (1 column mobile, 2 columns desktop)
 * - Left column: heading, description, feature list with icons, animated counters
 * - Right column: image with rounded corners and subtle shadow
 * - Intersection observer for counter animation triggers
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */

export default function About(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut',
        delay: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  // Intersection observer for counter animation trigger
  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px',
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 relative"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeading
              title="About Our Company"
              subtitle="Leading the way in cybersecurity innovation"
            />

            {/* Description */}
            <p className="text-base md:text-lg text-muted leading-relaxed mb-8">
              We are a team of dedicated cybersecurity professionals committed to
              protecting businesses from evolving digital threats. With cutting-edge
              technology and industry expertise, we deliver comprehensive security
              solutions that give you peace of mind.
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-10">
              {ABOUT_FEATURES.map((feature, index) => {
                const IconComponent = feature.icon;
                
                return (
                  <motion.div
                    key={feature.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-blue-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:bg-card/70"
                    data-testid={`about-feature-${feature.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <motion.div 
                      className="flex-shrink-0 mt-1 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                      whileHover={prefersReducedMotion ? {} : { 
                        scale: 1.2, 
                        rotate: 360,
                        transition: { duration: 0.6 }
                      }}
                    >
                      <IconComponent
                        className="w-5 h-5 text-blue-400"
                        data-testid="feature-icon"
                        aria-hidden="true"
                      />
                    </motion.div>
                    <div>
                      <h4 className="text-white font-medium mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Animated Counter Stats */}
            <div className="grid grid-cols-3 gap-6">
              {ABOUT_STATS.map((stat) => (
                <div
                  key={stat.id}
                  className="text-center"
                  data-testid={`about-stat-${stat.id}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {isVisible ? (
                      <AnimatedCounter
                        value={stat.value}
                        duration={2000}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    ) : (
                      <span>0{stat.suffix}</span>
                    )}
                  </div>
                  <div className="text-sm text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10">
              <ImageWithFallback
                src="/images/about-cybersecurity.jpg"
                alt="Cybersecurity team working on advanced security solutions"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
                fallbackComponent={
                  <div className="w-full h-full bg-card flex items-center justify-center">
                    <p className="text-muted">Image unavailable</p>
                  </div>
                }
              />
              {/* Gradient overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
