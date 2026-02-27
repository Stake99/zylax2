import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Features from './Features';
import { FEATURES } from '@/lib/constants';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Features Section', () => {
  it('renders the section with heading and subtitle', () => {
    render(<Features />);
    
    expect(screen.getByText('Our Features')).toBeInTheDocument();
    expect(screen.getByText('Powerful capabilities to protect your digital assets')).toBeInTheDocument();
  });

  it('renders all features from constants', () => {
    render(<Features />);
    
    FEATURES.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    });
  });

  it('renders feature cards with correct data-testid', () => {
    const { container } = render(<Features />);
    
    FEATURES.forEach((feature) => {
      const card = container.querySelector(`[data-testid="feature-${feature.id}"]`);
      expect(card).toBeInTheDocument();
    });
  });

  it('renders feature icons', () => {
    const { container } = render(<Features />);
    
    const icons = container.querySelectorAll('[data-testid="feature-icon"]');
    expect(icons).toHaveLength(FEATURES.length);
  });

  it('applies glass morphism styling to cards', () => {
    const { container } = render(<Features />);
    
    if (FEATURES.length > 0) {
      const firstCard = container.querySelector(`[data-testid="feature-${FEATURES[0].id}"]`);
      expect(firstCard).toHaveClass('bg-white/5');
      expect(firstCard).toHaveClass('backdrop-blur-lg');
      expect(firstCard).toHaveClass('border-white/10');
    }
  });

  it('applies correct grid layout classes', () => {
    const { container } = render(<Features />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
    expect(grid).toHaveClass('gap-6');
  });

  it('applies hover effect classes to cards', () => {
    const { container } = render(<Features />);
    
    if (FEATURES.length > 0) {
      const firstCard = container.querySelector(`[data-testid="feature-${FEATURES[0].id}"]`);
      expect(firstCard).toHaveClass('hover:border-transparent');
      expect(firstCard).toHaveClass('transition-all');
      expect(firstCard).toHaveClass('duration-300');
    }
  });

  it('renders feature titles with correct styling', () => {
    const { container } = render(<Features />);
    
    FEATURES.forEach((feature) => {
      const title = screen.getByText(feature.title);
      expect(title).toHaveClass('text-lg');
      expect(title).toHaveClass('font-semibold');
      expect(title).toHaveClass('text-white');
    });
  });

  it('renders feature descriptions with correct styling', () => {
    const { container } = render(<Features />);
    
    FEATURES.forEach((feature) => {
      const description = screen.getByText(feature.description);
      expect(description).toHaveClass('text-sm');
      expect(description).toHaveClass('text-muted');
    });
  });

  it('handles empty features array gracefully', () => {
    // Mock empty FEATURES array
    vi.mock('@/lib/constants', () => ({
      FEATURES: [],
    }));

    const { container } = render(<Features />);
    
    // Should still render section and heading
    expect(screen.getByText('Our Features')).toBeInTheDocument();
    
    // Grid should exist but be empty
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders section with correct id for navigation', () => {
    const { container } = render(<Features />);
    
    const section = container.querySelector('#features');
    expect(section).toBeInTheDocument();
  });

  it('applies correct padding to section', () => {
    const { container } = render(<Features />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-20');
    expect(section).toHaveClass('md:py-32');
  });
});
