/**
 * Example test file demonstrating the testing infrastructure setup
 * 
 * This file shows how to:
 * 1. Use mock data from lib/test-utils/mockData.ts
 * 2. Use arbitraries from lib/test-utils/arbitraries.ts
 * 3. Write property-based tests with @fast-check/vitest
 * 4. Configure minimum 100 iterations for property tests
 */

import { describe, it, expect } from 'vitest';
import { test } from '@fast-check/vitest';
import fc from 'fast-check';
import {
  mockServices,
  mockFeatures,
  mockStats,
  mockTestimonials,
  mockPricingPlans,
} from './mockData';
import {
  serviceArbitrary,
  featureArbitrary,
  statArbitrary,
  testimonialArbitrary,
  pricingPlanArbitrary,
  animationDurationArbitrary,
} from './arbitraries';

describe('Testing Infrastructure Examples', () => {
  describe('Unit Tests with Mock Data', () => {
    it('should have mock services data', () => {
      expect(mockServices).toBeDefined();
      expect(mockServices.length).toBeGreaterThan(0);
      expect(mockServices[0]).toHaveProperty('id');
      expect(mockServices[0]).toHaveProperty('icon');
      expect(mockServices[0]).toHaveProperty('title');
      expect(mockServices[0]).toHaveProperty('description');
    });

    it('should have mock features data', () => {
      expect(mockFeatures).toBeDefined();
      expect(mockFeatures.length).toBeGreaterThan(0);
    });

    it('should have mock stats data', () => {
      expect(mockStats).toBeDefined();
      expect(mockStats.length).toBe(4);
    });

    it('should have mock testimonials data', () => {
      expect(mockTestimonials).toBeDefined();
      expect(mockTestimonials.length).toBeGreaterThan(0);
    });

    it('should have mock pricing plans data', () => {
      expect(mockPricingPlans).toBeDefined();
      expect(mockPricingPlans.length).toBe(3);
    });
  });

  describe('Property-Based Tests with Arbitraries', () => {
    // Feature: cybersecurity-website, Property Example: Service Data Structure
    // This demonstrates how to write property tests with minimum 100 iterations
    test.prop([serviceArbitrary], { numRuns: 100 })(
      'generated services should have all required fields',
      (service) => {
        expect(service).toHaveProperty('id');
        expect(service).toHaveProperty('icon');
        expect(service).toHaveProperty('title');
        expect(service).toHaveProperty('description');
        expect(typeof service.id).toBe('string');
        expect(typeof service.title).toBe('string');
        expect(typeof service.description).toBe('string');
        expect(service.title.length).toBeGreaterThanOrEqual(5);
        expect(service.description.length).toBeGreaterThanOrEqual(20);
      }
    );

    // Feature: cybersecurity-website, Property Example: Feature Data Structure
    test.prop([featureArbitrary], { numRuns: 100 })(
      'generated features should have all required fields',
      (feature) => {
        expect(feature).toHaveProperty('id');
        expect(feature).toHaveProperty('icon');
        expect(feature).toHaveProperty('title');
        expect(feature).toHaveProperty('description');
        expect(typeof feature.id).toBe('string');
        expect(typeof feature.title).toBe('string');
        expect(typeof feature.description).toBe('string');
      }
    );

    // Feature: cybersecurity-website, Property Example: Stat Data Structure
    test.prop([statArbitrary], { numRuns: 100 })(
      'generated stats should have valid values',
      (stat) => {
        expect(stat).toHaveProperty('id');
        expect(stat).toHaveProperty('value');
        expect(stat).toHaveProperty('label');
        expect(typeof stat.id).toBe('string');
        expect(typeof stat.value).toBe('number');
        expect(typeof stat.label).toBe('string');
        expect(stat.value).toBeGreaterThanOrEqual(0);
      }
    );

    // Feature: cybersecurity-website, Property Example: Testimonial Data Structure
    test.prop([testimonialArbitrary], { numRuns: 100 })(
      'generated testimonials should have all required fields',
      (testimonial) => {
        expect(testimonial).toHaveProperty('id');
        expect(testimonial).toHaveProperty('name');
        expect(testimonial).toHaveProperty('company');
        expect(testimonial).toHaveProperty('role');
        expect(testimonial).toHaveProperty('avatar');
        expect(testimonial).toHaveProperty('quote');
        expect(testimonial.quote.length).toBeGreaterThanOrEqual(50);
      }
    );

    // Feature: cybersecurity-website, Property Example: Pricing Plan Data Structure
    test.prop([pricingPlanArbitrary], { numRuns: 100 })(
      'generated pricing plans should have valid structure',
      (plan) => {
        expect(plan).toHaveProperty('id');
        expect(plan).toHaveProperty('name');
        expect(plan).toHaveProperty('price');
        expect(plan).toHaveProperty('period');
        expect(plan).toHaveProperty('features');
        expect(Array.isArray(plan.features)).toBe(true);
        expect(plan.features.length).toBeGreaterThan(0);
        expect(plan.price).toBeGreaterThanOrEqual(0);
      }
    );

    // Feature: cybersecurity-website, Property 5: Minimum Transition Duration
    test.prop([animationDurationArbitrary], { numRuns: 100 })(
      'animation durations should be at least 300ms',
      (duration) => {
        expect(duration).toBeGreaterThanOrEqual(300);
      }
    );
  });
});
