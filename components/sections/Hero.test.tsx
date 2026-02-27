import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Section', () => {
  it('renders the hero section', () => {
    render(<Hero />);
    
    // Check for headline
    expect(screen.getByText(/Secure Your Digital Future/i)).toBeInTheDocument();
  });

  it('renders the subheading', () => {
    render(<Hero />);
    
    // Check for subheading text
    expect(screen.getByText(/Advanced cybersecurity solutions/i)).toBeInTheDocument();
  });

  it('renders two CTA buttons', () => {
    render(<Hero />);
    
    // Check for both buttons
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('renders floating shapes', () => {
    const { container } = render(<Hero />);
    
    // Check that floating shapes are rendered (5 shapes)
    const floatingShapes = container.querySelectorAll('.pointer-events-none');
    expect(floatingShapes.length).toBe(5);
  });

  it('has full viewport height', () => {
    const { container } = render(<Hero />);
    
    // Check for min-h-screen class
    const section = container.querySelector('section');
    expect(section).toHaveClass('min-h-screen');
  });

  it('has background grid pattern', () => {
    const { container } = render(<Hero />);
    
    // Check for grid pattern div
    const gridPattern = container.querySelector('.absolute.inset-0.opacity-20');
    expect(gridPattern).toBeInTheDocument();
  });
});
