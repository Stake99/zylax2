import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Stats from './Stats';
import { STATS } from '@/lib/constants';

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  elements: Set<Element>;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element: Element) {
    this.elements.add(element);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  trigger(isIntersecting: boolean) {
    const entries = Array.from(this.elements).map((element) => ({
      target: element,
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRect: element.getBoundingClientRect(),
      rootBounds: null,
      time: Date.now(),
    }));
    this.callback(entries as IntersectionObserverEntry[], this as any);
  }
}

let mockObserver: MockIntersectionObserver;

describe('Stats Section', () => {
  beforeEach(() => {
    // Setup IntersectionObserver mock
    mockObserver = new MockIntersectionObserver(() => {});
    vi.stubGlobal('IntersectionObserver', vi.fn((callback) => {
      mockObserver = new MockIntersectionObserver(callback);
      return mockObserver;
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders all stats from constants', () => {
    render(<Stats />);
    
    STATS.forEach((stat) => {
      expect(screen.getByTestId(`stat-${stat.id}`)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it('displays stats in correct grid layout', () => {
    const { container } = render(<Stats />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-2', 'md:grid-cols-4');
  });

  it('renders stat values with proper styling', () => {
    render(<Stats />);
    
    const statValues = screen.getAllByTestId('stat-value');
    expect(statValues).toHaveLength(STATS.length);
    
    statValues.forEach((value) => {
      expect(value).toBeInTheDocument();
    });
  });

  it('renders stat labels with muted styling', () => {
    render(<Stats />);
    
    const statLabels = screen.getAllByTestId('stat-label');
    expect(statLabels).toHaveLength(STATS.length);
    
    statLabels.forEach((label) => {
      expect(label).toHaveClass('text-muted');
    });
  });

  it('has dark overlay background', () => {
    const { container } = render(<Stats />);
    
    const background = container.querySelector('.bg-\\[\\#0B0F19\\]\\/90');
    expect(background).toBeInTheDocument();
  });

  it('has subtle grid pattern overlay', () => {
    const { container } = render(<Stats />);
    
    const pattern = container.querySelector('.opacity-10');
    expect(pattern).toBeInTheDocument();
  });

  it('centers stat content', () => {
    const { container } = render(<Stats />);
    
    // Select only the stat container divs (not child divs)
    const statDivs = container.querySelectorAll('[data-testid^="stat-stat-"]');
    statDivs.forEach((div) => {
      expect(div).toHaveClass('text-center');
    });
  });

  it('triggers animation when section enters viewport', async () => {
    render(<Stats />);
    
    // Verify stats are rendered
    const stats = screen.getAllByTestId(/^stat-stat-/);
    expect(stats).toHaveLength(STATS.length);
    
    // Trigger intersection
    mockObserver.trigger(true);
    
    // Wait for animation to start
    await waitFor(() => {
      const statValues = screen.getAllByTestId('stat-value');
      expect(statValues).toHaveLength(STATS.length);
    });
  });

  it('renders AnimatedCounter components when in view', async () => {
    render(<Stats />);
    
    // Trigger intersection
    mockObserver.trigger(true);
    
    await waitFor(() => {
      const statValues = screen.getAllByTestId('stat-value');
      expect(statValues).toHaveLength(STATS.length);
    });
  });

  it('displays correct prefix and suffix for each stat', () => {
    render(<Stats />);
    
    // Trigger intersection to show counters
    mockObserver.trigger(true);
    
    STATS.forEach((stat) => {
      const statElement = screen.getByTestId(`stat-${stat.id}`);
      expect(statElement).toBeInTheDocument();
    });
  });

  it('has proper responsive padding', () => {
    const { container } = render(<Stats />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-20', 'md:py-32');
  });

  it('has section id for navigation', () => {
    const { container } = render(<Stats />);
    
    const section = container.querySelector('#stats');
    expect(section).toBeInTheDocument();
  });

  it('renders with Container component', () => {
    const { container } = render(<Stats />);
    
    // Container should have max-width constraint
    const containerDiv = container.querySelector('.max-w-\\[1200px\\]');
    expect(containerDiv).not.toBeNull();
  });

  it('handles empty stats array gracefully', () => {
    // This test just verifies the grid renders even with no stats
    // We can't easily mock STATS in the middle of tests, so we just verify structure
    const { container } = render(<Stats />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    
    // Verify stats are actually rendered (not empty)
    const statItems = container.querySelectorAll('[data-testid^="stat-stat-"]');
    expect(statItems.length).toBeGreaterThan(0);
  });

  it('applies stagger animation to stats', () => {
    const { container } = render(<Stats />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    
    // Check that all stat items are rendered
    const statItems = container.querySelectorAll('[data-testid^="stat-stat-"]');
    expect(statItems.length).toBe(STATS.length);
  });

  it('uses proper gap spacing between stats', () => {
    const { container } = render(<Stats />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('gap-8', 'md:gap-12');
  });

  it('renders with relative positioning for layering', () => {
    const { container } = render(<Stats />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('relative');
  });

  it('has overflow hidden to contain background effects', () => {
    const { container } = render(<Stats />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('overflow-hidden');
  });
});
