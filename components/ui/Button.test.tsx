import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies gradient variant by default', () => {
    render(<Button>Gradient Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r');
    expect(button).toHaveClass('from-blue-500');
    expect(button).toHaveClass('to-gray-400');
    expect(button).toHaveClass('text-white');
  });

  it('applies outline variant with gradient border structure', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r');
    expect(button).toHaveClass('from-blue-500');
    expect(button).toHaveClass('to-gray-400');
    
    // Check for inner span with gradient text
    const innerSpan = button.querySelector('.bg-clip-text');
    expect(innerSpan).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('sets button type attribute correctly', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('defaults to button type', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('has transition duration of 300ms', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('duration-300');
  });

  it('has ease-in-out easing', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ease-in-out');
  });

  it('has hover opacity effect', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:opacity-90');
  });

  it('applies padding (px-6 py-3)', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
  });

  it('applies border radius (rounded-lg)', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-lg');
  });

  it('combines multiple props correctly', () => {
    const handleClick = vi.fn();
    render(
      <Button variant="gradient" onClick={handleClick} className="extra-class" type="submit">
        Combined Props Button
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r');
    expect(button).toHaveClass('from-blue-500');
    expect(button).toHaveClass('extra-class');
    expect(button).toHaveAttribute('type', 'submit');
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
