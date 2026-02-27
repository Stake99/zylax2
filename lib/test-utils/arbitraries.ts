import fc from 'fast-check';
import { Shield, Lock, Eye, Zap, Users, FileCheck, Twitter, Linkedin, Github } from 'lucide-react';
import type {
  Service,
  Feature,
  Stat,
  Testimonial,
  PricingPlan,
  FooterLink,
  FooterColumn,
  SocialLink,
} from '../types';

// Icon pool for random selection
const iconPool = [Shield, Lock, Eye, Zap, Users, FileCheck, Twitter, Linkedin, Github];

// Service Arbitrary
export const serviceArbitrary = fc.record<Service>({
  id: fc.uuid(),
  icon: fc.constantFrom(...iconPool),
  title: fc.string({ minLength: 5, maxLength: 50 }),
  description: fc.string({ minLength: 20, maxLength: 200 }),
});

// Feature Arbitrary
export const featureArbitrary = fc.record<Feature>({
  id: fc.uuid(),
  icon: fc.constantFrom(...iconPool),
  title: fc.string({ minLength: 5, maxLength: 50 }),
  description: fc.string({ minLength: 20, maxLength: 200 }),
});

// Stat Arbitrary
export const statArbitrary = fc.record<Stat>({
  id: fc.uuid(),
  value: fc.integer({ min: 0, max: 100000 }),
  suffix: fc.option(fc.constantFrom('+', '%', '/7', 'K', 'M'), { nil: undefined }),
  prefix: fc.option(fc.constantFrom('$', '€', '£'), { nil: undefined }),
  label: fc.string({ minLength: 5, maxLength: 50 }),
});

// Testimonial Arbitrary
export const testimonialArbitrary = fc.record<Testimonial>({
  id: fc.uuid(),
  name: fc.string({ minLength: 5, maxLength: 30 }),
  company: fc.string({ minLength: 5, maxLength: 40 }),
  role: fc.string({ minLength: 3, maxLength: 30 }),
  avatar: fc.webUrl(),
  quote: fc.string({ minLength: 50, maxLength: 300 }),
});

// Pricing Plan Arbitrary
export const pricingPlanArbitrary = fc.record<PricingPlan>({
  id: fc.uuid(),
  name: fc.string({ minLength: 5, maxLength: 30 }),
  price: fc.integer({ min: 0, max: 10000 }),
  period: fc.constantFrom('month', 'year', 'week'),
  description: fc.string({ minLength: 10, maxLength: 100 }),
  features: fc.array(fc.string({ minLength: 10, maxLength: 80 }), { minLength: 1, maxLength: 10 }),
  featured: fc.option(fc.boolean(), { nil: undefined }),
  ctaText: fc.string({ minLength: 5, maxLength: 30 }),
});

// Footer Link Arbitrary
export const footerLinkArbitrary = fc.record<FooterLink>({
  label: fc.string({ minLength: 3, maxLength: 30 }),
  href: fc.oneof(
    fc.webUrl(),
    fc.constant('#'),
    fc.string({ minLength: 2, maxLength: 20 }).map(s => `#${s}`)
  ),
});

// Footer Column Arbitrary
export const footerColumnArbitrary = fc.record<FooterColumn>({
  title: fc.string({ minLength: 5, maxLength: 30 }),
  links: fc.array(footerLinkArbitrary, { minLength: 1, maxLength: 8 }),
});

// Social Link Arbitrary
export const socialLinkArbitrary = fc.record<SocialLink>({
  platform: fc.constantFrom('Twitter', 'LinkedIn', 'GitHub', 'Facebook', 'Instagram'),
  icon: fc.constantFrom(...iconPool),
  href: fc.webUrl(),
});

// Viewport dimensions for responsive testing
export const viewportArbitrary = fc.record({
  width: fc.integer({ min: 320, max: 2560 }),
  height: fc.integer({ min: 568, max: 1440 }),
});

// Mobile viewport (below 768px)
export const mobileViewportArbitrary = fc.record({
  width: fc.integer({ min: 320, max: 767 }),
  height: fc.integer({ min: 568, max: 1440 }),
});

// Desktop viewport (768px and above)
export const desktopViewportArbitrary = fc.record({
  width: fc.integer({ min: 768, max: 2560 }),
  height: fc.integer({ min: 768, max: 1440 }),
});

// Animation duration (minimum 300ms as per requirements)
export const animationDurationArbitrary = fc.integer({ min: 300, max: 2000 });

// Counter value for AnimatedCounter
export const counterValueArbitrary = fc.integer({ min: 0, max: 1000000 });

// Email for newsletter form testing
export const emailArbitrary = fc.emailAddress();

// Invalid email for validation testing
export const invalidEmailArbitrary = fc.oneof(
  fc.string({ minLength: 1, maxLength: 20 }), // No @ symbol
  fc.constant('test@'), // Missing domain
  fc.constant('@example.com'), // Missing local part
  fc.constant('test@.com'), // Invalid domain
  fc.constant('test @example.com'), // Space in email
);
