'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { PRICING_PLANS } from '@/lib/constants';
import { useReducedMotion } from '@/lib/utils';

/**
 * Pricing Section Component
 * 
 * Displays pricing plans in a responsive grid layout with:
 * - 1 column on mobile, 3 columns on desktop
 * - Each card: plan name, price, period, description, feature list with check icons, CTA button
 * - Featured plan (middle): gradient border with glow, scale 1.05 (desktop only), "Most Popular" badge, gradient text for price
 * - Non-featured cards: hover effect with slight lift
 * - 2rem gap between cards
 * 
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6
 */

export default function Pricing(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for pricing cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
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
    <section id="pricing" className="py-20 md:py-32 relative">
      <Container>
        <SectionHeading
          title="Pricing Plans"
          subtitle="Choose the perfect plan for your security needs"
          centered
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {PRICING_PLANS.map((plan) => {
            const isFeatured = plan.featured;
            
            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className={`relative ${isFeatured ? 'md:scale-105' : ''}`}
                data-testid={`pricing-${plan.id}`}
              >
                {/* Featured plan gradient border wrapper */}
                {isFeatured ? (
                  <article 
                    className="relative bg-gradient-to-r from-blue-500 to-gray-400 p-[2px] rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    aria-label={`${plan.name} pricing plan - Most Popular`}
                  >
                    {/* Most Popular Badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-gray-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                    
                    <div className="relative h-full w-full rounded-[10px] bg-card p-6 md:p-8">
                      <PricingCardContent plan={plan} isFeatured={isFeatured} />
                    </div>
                  </article>
                ) : (
                  <article 
                    className="h-full bg-card rounded-xl p-6 md:p-8 border border-white/10 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-blue-500/30"
                    aria-label={`${plan.name} pricing plan`}
                  >
                    <PricingCardContent plan={plan} isFeatured={isFeatured} />
                  </article>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * Pricing Card Content Component
 * Renders the content inside each pricing card
 */
function PricingCardContent({ plan, isFeatured }: { plan: typeof PRICING_PLANS[0]; isFeatured?: boolean }) {
  return (
    <div className="flex flex-col h-full">
      {/* Plan Name */}
      <h3
        className="text-2xl font-bold text-white mb-4"
        data-testid="pricing-plan-name"
      >
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mb-2">
        <span
          className={`text-5xl font-bold ${
            isFeatured
              ? 'bg-gradient-to-r from-blue-500 to-gray-400 bg-clip-text text-transparent'
              : 'text-white'
          }`}
          data-testid="pricing-plan-price"
        >
          ${plan.price}
        </span>
      </div>

      {/* Period */}
      <p
        className="text-base text-muted mb-4"
        data-testid="pricing-plan-period"
      >
        per {plan.period}
      </p>

      {/* Description */}
      <p
        className="text-sm text-muted mb-8"
        data-testid="pricing-plan-description"
      >
        {plan.description}
      </p>

      {/* Features List */}
      <ul className="space-y-4 mb-8 flex-grow" data-testid="pricing-plan-features">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-3"
            data-testid={`pricing-feature-${index}`}
          >
            <Check
              className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
              data-testid="pricing-feature-check"
              aria-hidden="true"
            />
            <span className="text-sm text-white">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Button
        variant={isFeatured ? 'gradient' : 'outline'}
        className="w-full"
        data-testid="pricing-cta-button"
        aria-label={`${plan.ctaText} for ${plan.name} plan at $${plan.price} per ${plan.period}`}
      >
        {plan.ctaText}
      </Button>
    </div>
  );
}
