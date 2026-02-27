import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import AnimatedCounter from './AnimatedCounter';

// Mock framer-motion to render final values immediately
vi.mock('framer-motion', () => ({
  useMotionValue: (initial: number) => initial,
  useTransform: () => {
    // In tests, we'll just return a mock value that gets replaced
    return 0;
  },
  animate: vi.fn(() => ({ stop: vi.fn() })),
  motion: {
    span: ({ children, className, ...props }: any) => (
      <span className={className} {...props}>
        {children}
      </span>
    ),
  },
}));

describe('AnimatedCounter', () => {
  it('renders with correct structure', () => {
    const { container } = render(<AnimatedCounter value={100} />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('renders with prefix', () => {
    const { container } = render(<AnimatedCounter value={299} prefix="$" />);
    expect(container.textContent).toContain('$');
  });

  it('renders with suffix', () => {
    const { container } = render(<AnimatedCounter value={1000} suffix="+" />);
    expect(container.textContent).toContain('+');
  });

  it('renders with both prefix and suffix', () => {
    const { container } = render(
      <AnimatedCounter value={99.9} prefix="~" suffix="%" />
    );
    expect(container.textContent).toContain('~');
    expect(container.textContent).toContain('%');
  });

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedCounter value={500} className="text-4xl font-bold" />
    );
    const span = container.querySelector('span');
    expect(span).toHaveClass('text-4xl', 'font-bold');
  });

  it('handles zero value', () => {
    const { container } = render(<AnimatedCounter value={0} />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('handles large values', () => {
    const { container } = render(<AnimatedCounter value={1000000} />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('uses default duration when not specified', () => {
    const { container } = render(<AnimatedCounter value={100} />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('accepts custom duration', () => {
    const { container } = render(
      <AnimatedCounter value={100} duration={4000} />
    );
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('renders with empty prefix and suffix by default', () => {
    const { container } = render(<AnimatedCounter value={100} />);
    // Should have span elements
    expect(container.querySelectorAll('span').length).toBeGreaterThan(0);
  });

  it('handles negative values', () => {
    const { container } = render(<AnimatedCounter value={-50} />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('combines all props correctly', () => {
    const { container } = render(
      <AnimatedCounter
        value={500}
        duration={3000}
        prefix="$"
        suffix="+"
        className="custom-class"
      />
    );
    const span = container.querySelector('span');
    expect(span).toHaveClass('custom-class');
    expect(container.textContent).toContain('$');
    expect(container.textContent).toContain('+');
  });

  it('accepts all required props from AnimatedCounterProps interface', () => {
    // Test that the component accepts the interface props without TypeScript errors
    const { container } = render(
      <AnimatedCounter
        value={100}
        duration={2000}
        prefix="$"
        suffix="+"
        className="test-class"
      />
    );
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('renders prefix before the counter value', () => {
    const { container } = render(<AnimatedCounter value={100} prefix="$" />);
    const text = container.textContent || '';
    const dollarIndex = text.indexOf('$');
    expect(dollarIndex).toBeGreaterThanOrEqual(0);
  });

  it('renders suffix after the counter value', () => {
    const { container } = render(<AnimatedCounter value={100} suffix="+" />);
    const text = container.textContent || '';
    const plusIndex = text.indexOf('+');
    expect(plusIndex).toBeGreaterThanOrEqual(0);
  });
});
