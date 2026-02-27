import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Testimonials from './Testimonials';
import { TESTIMONIALS } from '@/lib/constants';

// Create mock API once
const mockApi = {
  scrollPrev: vi.fn(),
  scrollNext: vi.fn(),
  scrollTo: vi.fn(),
  selectedScrollSnap: vi.fn(() => 0),
  scrollSnapList: vi.fn(() => [0, 1, 2]),
  on: vi.fn(),
  off: vi.fn(),
};

// Mock embla-carousel-react
vi.mock('embla-carousel-react', () => ({
  default: vi.fn(() => [vi.fn(), mockApi]),
}));

// Mock embla-carousel-autoplay
vi.mock('embla-carousel-autoplay', () => ({
  default: vi.fn(() => ({})),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Testimonials', () => {
  it('renders the section heading', () => {
    render(<Testimonials />);
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument();
    expect(
      screen.getByText('Trusted by leading organizations worldwide')
    ).toBeInTheDocument();
  });

  it('renders all testimonials', () => {
    render(<Testimonials />);
    
    TESTIMONIALS.forEach((testimonial) => {
      expect(screen.getByText(`"${testimonial.quote}"`)).toBeInTheDocument();
      expect(screen.getByText(testimonial.name)).toBeInTheDocument();
      expect(
        screen.getByText(`${testimonial.role} at ${testimonial.company}`)
      ).toBeInTheDocument();
    });
  });

  it('renders testimonial with avatar, quote, name, company and role', () => {
    render(<Testimonials />);
    
    const firstTestimonial = TESTIMONIALS[0];
    
    // Check avatar (using first letter of name)
    const avatar = screen.getAllByTestId('testimonial-avatar')[0];
    expect(avatar).toHaveTextContent(firstTestimonial.name.charAt(0));
    
    // Check quote
    expect(screen.getByText(`"${firstTestimonial.quote}"`)).toBeInTheDocument();
    
    // Check name
    expect(screen.getByText(firstTestimonial.name)).toBeInTheDocument();
    
    // Check company and role
    expect(
      screen.getByText(`${firstTestimonial.role} at ${firstTestimonial.company}`)
    ).toBeInTheDocument();
  });

  it('renders navigation arrows', () => {
    render(<Testimonials />);
    
    const prevButton = screen.getByTestId('carousel-prev-button');
    const nextButton = screen.getByTestId('carousel-next-button');
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toHaveAttribute('aria-label', 'Previous testimonial');
    expect(nextButton).toHaveAttribute('aria-label', 'Next testimonial');
  });

  it('renders dot indicators', () => {
    render(<Testimonials />);
    
    // Should have 3 dots for 3 testimonials
    const dots = screen.getAllByRole('button').filter((button) =>
      button.getAttribute('aria-label')?.startsWith('Go to testimonial')
    );
    
    expect(dots).toHaveLength(TESTIMONIALS.length);
  });

  it('applies correct styling to avatar', () => {
    render(<Testimonials />);
    
    const avatar = screen.getAllByTestId('testimonial-avatar')[0];
    expect(avatar).toHaveClass('w-16', 'h-16', 'rounded-full');
  });

  it('applies italic styling to quote', () => {
    render(<Testimonials />);
    
    const quote = screen.getAllByTestId('testimonial-quote')[0];
    expect(quote).toHaveClass('italic', 'text-lg', 'text-white');
  });

  it('applies correct styling to name', () => {
    render(<Testimonials />);
    
    const name = screen.getAllByTestId('testimonial-name')[0];
    expect(name).toHaveClass('font-semibold', 'text-white');
  });

  it('applies muted gray styling to company and role', () => {
    render(<Testimonials />);
    
    const companyRole = screen.getAllByTestId('testimonial-company-role')[0];
    expect(companyRole).toHaveClass('text-sm', 'text-muted');
  });

  it('renders section container', () => {
    const { container } = render(<Testimonials />);
    
    // Should render the section
    expect(container.querySelector('#testimonials')).toBeInTheDocument();
  });

  it('applies gradient hover effect to navigation arrows', () => {
    render(<Testimonials />);
    
    const prevButton = screen.getByTestId('carousel-prev-button');
    const nextButton = screen.getByTestId('carousel-next-button');
    
    expect(prevButton).toHaveClass('hover:bg-gradient-to-r', 'hover:from-blue-500', 'hover:to-gray-400');
    expect(nextButton).toHaveClass('hover:bg-gradient-to-r', 'hover:from-blue-500', 'hover:to-gray-400');
  });

  it('has proper responsive classes', () => {
    const { container } = render(<Testimonials />);
    
    // Check for responsive padding
    const section = container.querySelector('#testimonials');
    expect(section).toHaveClass('py-20', 'md:py-32');
    
    // Check for responsive slide width - get the slide containers
    const slides = container.querySelectorAll('[data-testid^="testimonial-slide-"]');
    expect(slides.length).toBeGreaterThan(0);
    
    // Check that slides have responsive flex classes
    slides.forEach((slide) => {
      expect(slide.className).toContain('flex-[0_0_100%]');
      expect(slide.className).toContain('md:flex-[0_0_90%]');
    });
  });
});
