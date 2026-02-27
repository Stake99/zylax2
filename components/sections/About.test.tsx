import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import About from './About';
import { ABOUT_FEATURES, ABOUT_STATS } from '@/lib/constants';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useMotionValue: () => ({ set: vi.fn(), get: vi.fn() }),
  useTransform: () => 0,
  animate: vi.fn(() => ({ stop: vi.fn() })),
}));

// Mock AnimatedCounter
vi.mock('@/components/animations/AnimatedCounter', () => ({
  default: ({ value, prefix = '', suffix = '' }: any) => (
    <span data-testid="animated-counter">
      {prefix}
      {value}
      {suffix}
    </span>
  ),
}));

describe('About Section', () => {
  let mockIntersectionObserver: any;

  beforeEach(() => {
    // Mock IntersectionObserver
    mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the About section with heading and subtitle', () => {
    render(<About />);
    
    expect(screen.getByText('About Our Company')).toBeInTheDocument();
    expect(screen.getByText('Leading the way in cybersecurity innovation')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<About />);
    
    expect(screen.getByText(/We are a team of dedicated cybersecurity professionals/)).toBeInTheDocument();
  });

  it('renders all feature items with icons', () => {
    render(<About />);
    
    ABOUT_FEATURES.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    });

    // Check that feature icons are rendered
    const featureIcons = screen.getAllByTestId('feature-icon');
    expect(featureIcons).toHaveLength(ABOUT_FEATURES.length);
  });

  it('renders all stat counters with labels', () => {
    render(<About />);
    
    ABOUT_STATS.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it('renders the image with correct alt text', () => {
    render(<About />);
    
    const image = screen.getByAltText('Cybersecurity team working on advanced security solutions');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/about-cybersecurity.jpg');
  });

  it('has correct section id for navigation', () => {
    const { container } = render(<About />);
    
    const section = container.querySelector('#about');
    expect(section).toBeInTheDocument();
  });

  it('uses two-column layout on desktop', () => {
    const { container } = render(<About />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('lg:grid-cols-2');
  });

  it('sets up intersection observer for counter animations', () => {
    render(<About />);
    
    expect(mockIntersectionObserver).toHaveBeenCalled();
    expect(mockIntersectionObserver.mock.results[0].value.observe).toHaveBeenCalled();
  });

  it('displays counters with AnimatedCounter component when visible', async () => {
    const { container } = render(<About />);
    
    // Simulate intersection observer callback
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    const mockEntry = {
      isIntersecting: true,
      target: container.querySelector('#about'),
    };
    
    observerCallback([mockEntry]);

    await waitFor(() => {
      const counters = screen.getAllByTestId('animated-counter');
      expect(counters.length).toBeGreaterThan(0);
    });
  });

  it('renders image with rounded corners and shadow', () => {
    const { container } = render(<About />);
    
    const imageContainer = container.querySelector('.rounded-2xl');
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveClass('shadow-2xl');
  });

  it('maintains 4:3 aspect ratio for image', () => {
    const { container } = render(<About />);
    
    const imageContainer = container.querySelector('.aspect-\\[4\\/3\\]');
    expect(imageContainer).toBeInTheDocument();
  });

  it('renders features with proper spacing', () => {
    const { container } = render(<About />);
    
    const featureList = container.querySelector('.space-y-4');
    expect(featureList).toBeInTheDocument();
  });

  it('renders stats in a 3-column grid', () => {
    const { container } = render(<About />);
    
    const statsGrid = container.querySelector('.grid-cols-3');
    expect(statsGrid).toBeInTheDocument();
  });
});
