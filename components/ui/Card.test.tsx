import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default variant styles', () => {
    const { container } = render(<Card>Default Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-card');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-white/10');
  });

  it('applies glass variant styles', () => {
    const { container } = render(<Card variant="glass">Glass Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-white/5');
    expect(card).toHaveClass('backdrop-blur-lg');
  });

  it('applies featured variant with gradient border structure', () => {
    const { container } = render(<Card variant="featured">Featured Card</Card>);
    const outerCard = container.firstChild as HTMLElement;
    expect(outerCard).toHaveClass('bg-gradient-to-r');
    expect(outerCard).toHaveClass('from-blue-500');
    expect(outerCard).toHaveClass('to-gray-400');
    
    // Check inner card exists
    const innerCard = outerCard.querySelector('.bg-card');
    expect(innerCard).toBeInTheDocument();
  });

  it('applies hoverable styles when hoverable prop is true', () => {
    const { container } = render(<Card hoverable>Hoverable Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('hover:scale-105');
    expect(card).toHaveClass('hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]');
  });

  it('does not apply hoverable styles when hoverable prop is false', () => {
    const { container } = render(<Card hoverable={false}>Non-hoverable Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).not.toHaveClass('hover:scale-105');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Custom Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
  });

  it('applies transition duration of 300ms', () => {
    const { container } = render(<Card>Transition Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('duration-300');
  });

  it('applies ease-in-out easing', () => {
    const { container } = render(<Card>Easing Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('ease-in-out');
  });

  it('applies border radius of 0.75rem (rounded-xl)', () => {
    const { container } = render(<Card>Rounded Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('rounded-xl');
  });

  it('applies responsive padding (p-6 md:p-8)', () => {
    const { container } = render(<Card>Padded Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('p-6');
    expect(card).toHaveClass('md:p-8');
  });

  it('combines multiple props correctly', () => {
    const { container } = render(
      <Card variant="glass" hoverable className="extra-class">
        Combined Props Card
      </Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-white/5');
    expect(card).toHaveClass('backdrop-blur-lg');
    expect(card).toHaveClass('hover:scale-105');
    expect(card).toHaveClass('extra-class');
  });
});
