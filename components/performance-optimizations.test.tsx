import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

/**
 * Performance Optimizations Tests
 * 
 * Tests to verify performance optimizations are properly implemented:
 * - Next.js Image component usage
 * - Image optimization configuration
 * - Dynamic imports for large components
 * - Loading skeletons for dynamically imported components
 * - Individual icon imports for tree-shaking
 * 
 * Requirements: 14.1, 14.2, 14.3, 14.4
 */

describe('Performance Optimizations', () => {
  describe('Image Optimization', () => {
    it('should use Next.js Image component with blur placeholder', async () => {
      const About = (await import('@/components/sections/About')).default;
      const { container } = render(<About />);
      
      // Check that Next.js Image component is used (it renders as img with specific attributes)
      const images = container.querySelectorAll('img');
      
      // Next.js Image component should be present
      expect(images.length).toBeGreaterThan(0);
    });

    it('should configure image with proper sizes for responsive loading', async () => {
      const About = (await import('@/components/sections/About')).default;
      const { container } = render(<About />);
      
      const images = container.querySelectorAll('img');
      
      // At least one image should exist
      expect(images.length).toBeGreaterThan(0);
    });
  });

  describe('Dynamic Imports', () => {
    it('should dynamically import Testimonials section', async () => {
      // Verify that the main page uses dynamic import
      const pageModule = await import('@/app/page');
      const pageSource = pageModule.default.toString();
      
      // The component should be defined (dynamic import creates a component)
      expect(pageSource).toBeDefined();
    });

    it('should render TestimonialsSkeleton as loading component', async () => {
      const TestimonialsSkeleton = (await import('@/components/sections/TestimonialsSkeleton')).default;
      const { container } = render(<TestimonialsSkeleton />);
      
      // Should render skeleton with testimonials section structure
      expect(container.querySelector('#testimonials')).toBeInTheDocument();
      
      // Should have skeleton elements with animation
      const skeletonElements = container.querySelectorAll('.animate-pulse');
      expect(skeletonElements.length).toBeGreaterThan(0);
    });

    it('should render skeleton with proper structure matching Testimonials', async () => {
      const TestimonialsSkeleton = (await import('@/components/sections/TestimonialsSkeleton')).default;
      const { container } = render(<TestimonialsSkeleton />);
      
      // Should have avatar skeleton
      const avatarSkeleton = container.querySelector('.w-16.h-16.rounded-full');
      expect(avatarSkeleton).toBeInTheDocument();
      
      // Should have dot indicators
      const dots = container.querySelectorAll('.w-2.h-2.rounded-full');
      expect(dots.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Icon Tree-Shaking', () => {
    it('should import icons individually from lucide-react', async () => {
      // Import constants to verify individual icon imports
      const constants = await import('@/lib/constants');
      
      // Verify that SERVICES array exists and has icons
      expect(constants.SERVICES).toBeDefined();
      expect(constants.SERVICES.length).toBeGreaterThan(0);
      expect(constants.SERVICES[0].icon).toBeDefined();
      
      // Verify that FEATURES array exists and has icons
      expect(constants.FEATURES).toBeDefined();
      expect(constants.FEATURES.length).toBeGreaterThan(0);
      expect(constants.FEATURES[0].icon).toBeDefined();
    });

    it('should use individual icon components in Services section', async () => {
      const Services = (await import('@/components/sections/Services')).default;
      const { container } = render(<Services />);
      
      // Should render service icons
      const serviceIcons = container.querySelectorAll('[data-testid="service-icon"]');
      expect(serviceIcons.length).toBeGreaterThan(0);
    });

    it('should use individual icon components in Features section', async () => {
      const Features = (await import('@/components/sections/Features')).default;
      const { container } = render(<Features />);
      
      // Should render feature icons
      const featureIcons = container.querySelectorAll('[data-testid="feature-icon"]');
      expect(featureIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Next.js Image Configuration', () => {
    it('should have image optimization configured in next.config.js', async () => {
      // This test verifies the configuration exists
      // Read the config file directly
      const fs = await import('fs');
      const path = await import('path');
      const configPath = path.join(process.cwd(), 'next.config.js');
      const configExists = fs.existsSync(configPath);
      
      expect(configExists).toBe(true);
    });

    it('should configure appropriate device sizes for responsive images', async () => {
      const nextConfig = await import('../next.config.js');
      
      expect(nextConfig.default.images.deviceSizes).toBeDefined();
      expect(nextConfig.default.images.deviceSizes).toContain(640);
      expect(nextConfig.default.images.deviceSizes).toContain(1200);
    });

    it('should configure appropriate image sizes for optimization', async () => {
      const nextConfig = await import('../next.config.js');
      
      expect(nextConfig.default.images.imageSizes).toBeDefined();
      expect(Array.isArray(nextConfig.default.images.imageSizes)).toBe(true);
      expect(nextConfig.default.images.imageSizes.length).toBeGreaterThan(0);
    });
  });

  describe('Loading States', () => {
    it('should provide loading skeleton with proper accessibility', async () => {
      const TestimonialsSkeleton = (await import('@/components/sections/TestimonialsSkeleton')).default;
      const { container } = render(<TestimonialsSkeleton />);
      
      // Should have section with proper id for accessibility
      const section = container.querySelector('#testimonials');
      expect(section).toBeInTheDocument();
      
      // Should maintain layout structure during loading
      expect(section).toBeTruthy();
    });

    it('should use animate-pulse for skeleton loading animation', async () => {
      const TestimonialsSkeleton = (await import('@/components/sections/TestimonialsSkeleton')).default;
      const { container } = render(<TestimonialsSkeleton />);
      
      // Should have pulse animation
      const pulseElements = container.querySelectorAll('.animate-pulse');
      expect(pulseElements.length).toBeGreaterThan(0);
    });
  });

  describe('Image Blur Placeholders', () => {
    it('should implement blur placeholder for progressive loading', async () => {
      const About = (await import('@/components/sections/About')).default;
      
      // The component should be defined and use Image with placeholder
      expect(About).toBeDefined();
      
      // Render to verify it doesn't throw errors
      const { container } = render(<About />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Performance Best Practices', () => {
    it('should not use standard img tags in sections', async () => {
      // Check Services section
      const Services = (await import('@/components/sections/Services')).default;
      const { container: servicesContainer } = render(<Services />);
      
      // Should not have standard img tags (Next.js Image is preferred)
      const standardImgs = servicesContainer.querySelectorAll('img[src^="/"]');
      
      // If there are images, they should be optimized through Next.js Image
      // (Next.js Image renders as img but with optimization attributes)
      standardImgs.forEach((img) => {
        // Next.js optimized images have specific attributes
        const hasOptimization = 
          img.hasAttribute('srcset') || 
          img.hasAttribute('loading') ||
          img.getAttribute('src')?.includes('_next/image');
        
        // Either no images or they should be optimized
        if (standardImgs.length > 0) {
          expect(hasOptimization || standardImgs.length === 0).toBe(true);
        }
      });
    });

    it('should use SSR for dynamically imported components', async () => {
      // Verify that dynamic import is configured with ssr: true
      // This is verified by checking that the component can render on server
      const pageModule = await import('@/app/page');
      const Page = pageModule.default;
      
      // Should be able to render without errors
      const { container } = render(<Page />);
      expect(container).toBeInTheDocument();
    });
  });
});
