import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Services from './sections/Services';
import Features from './sections/Features';
import Testimonials from './sections/Testimonials';

// Mock the constants module
vi.mock('@/lib/constants', () => ({
  SERVICES: [],
  FEATURES: [],
  TESTIMONIALS: [],
  ABOUT_FEATURES: [],
  ABOUT_STATS: [],
  STATS: [],
  PRICING_PLANS: [],
  FOOTER_COLUMNS: [
    { title: 'Quick Links', links: [] },
    { title: 'Resources', links: [] }
  ],
  SOCIAL_LINKS: []
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

// Mock embla carousel
vi.mock('embla-carousel-react', () => ({
  default: () => [vi.fn(), null],
}));

vi.mock('embla-carousel-autoplay', () => ({
  default: vi.fn(),
}));

// Mock utils
vi.mock('@/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils')>();
  return {
    ...actual,
    useReducedMotion: () => false,
  };
});

describe('Empty Data Handling', () => {
  describe('Services Section', () => {
    it('displays empty state message when no services are available', () => {
      render(<Services />);

      expect(screen.getByText(/No services available at the moment/)).toBeInTheDocument();
      expect(screen.getByText(/Please check back later/)).toBeInTheDocument();
    });

    it('does not render service grid when services array is empty', () => {
      const { container } = render(<Services />);

      // Should not have the grid container
      const grid = container.querySelector('.grid');
      expect(grid).not.toBeInTheDocument();
    });
  });

  describe('Features Section', () => {
    it('displays empty state message when no features are available', () => {
      render(<Features />);

      expect(screen.getByText(/No features available at the moment/)).toBeInTheDocument();
      expect(screen.getByText(/Please check back later/)).toBeInTheDocument();
    });

    it('does not render feature grid when features array is empty', () => {
      const { container } = render(<Features />);

      // Should not have the grid container
      const grid = container.querySelector('.grid');
      expect(grid).not.toBeInTheDocument();
    });
  });

  describe('Testimonials Section', () => {
    it('displays empty state message when no testimonials are available', () => {
      render(<Testimonials />);

      expect(screen.getByText(/No testimonials available at the moment/)).toBeInTheDocument();
      expect(screen.getByText(/Please check back later/)).toBeInTheDocument();
    });

    it('does not render carousel when testimonials array is empty', () => {
      const { container } = render(<Testimonials />);

      // Should not have carousel navigation buttons
      expect(screen.queryByTestId('carousel-prev-button')).not.toBeInTheDocument();
      expect(screen.queryByTestId('carousel-next-button')).not.toBeInTheDocument();
    });
  });
});
