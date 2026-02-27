import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import AnimatedBackground from './AnimatedBackground';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock utils
vi.mock('@/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils')>();
  return {
    ...actual,
    useReducedMotion: () => false,
  };
});

describe('AnimatedBackground Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<AnimatedBackground />);
    expect(container).toBeInTheDocument();
  });

  it('has fixed positioning and covers entire viewport', () => {
    const { container } = render(<AnimatedBackground />);
    const background = container.firstChild as HTMLElement;
    
    expect(background.className).toContain('fixed');
    expect(background.className).toContain('inset-0');
  });

  it('is non-interactive (pointer-events-none)', () => {
    const { container } = render(<AnimatedBackground />);
    const background = container.firstChild as HTMLElement;
    
    expect(background.className).toContain('pointer-events-none');
  });

  it('is behind content (z-index -10)', () => {
    const { container } = render(<AnimatedBackground />);
    const background = container.firstChild as HTMLElement;
    
    expect(background.className).toContain('-z-10');
  });

  it('renders gradient background', () => {
    const { container } = render(<AnimatedBackground />);
    const gradientBg = container.querySelector('.bg-gradient-to-br');
    
    expect(gradientBg).toBeInTheDocument();
  });

  it('renders animated gradient orbs', () => {
    const { container } = render(<AnimatedBackground />);
    const orbs = container.querySelectorAll('.animate-pulse-glow');
    
    // Should have 4 gradient orbs
    expect(orbs.length).toBeGreaterThanOrEqual(4);
  });

  it('renders grid pattern overlay', () => {
    const { container } = render(<AnimatedBackground />);
    const gridPattern = container.querySelector('.opacity-10');
    
    expect(gridPattern).toBeInTheDocument();
  });

  it('renders floating shapes', () => {
    const { container } = render(<AnimatedBackground />);
    
    // Should have 8 floating shapes
    const shapes = container.querySelectorAll('.rounded-full, .rounded-lg');
    expect(shapes.length).toBeGreaterThanOrEqual(8);
  });

  it('has both circle and square shapes', () => {
    const { container } = render(<AnimatedBackground />);
    
    const circles = container.querySelectorAll('.rounded-full');
    const squares = container.querySelectorAll('.rounded-lg');
    
    expect(circles.length).toBeGreaterThan(0);
    expect(squares.length).toBeGreaterThan(0);
  });

  it('shapes have gradient backgrounds', () => {
    const { container } = render(<AnimatedBackground />);
    const shapes = container.querySelectorAll('.bg-gradient-to-br');
    
    expect(shapes.length).toBeGreaterThan(0);
  });
});
