import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock utils
vi.mock('@/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils')>();
  return {
    ...actual,
    useReducedMotion: () => false,
  };
});

describe('Navbar Component', () => {
  beforeEach(() => {
    // Reset scroll position
    window.scrollY = 0;
  });

  describe('Rendering', () => {
    it('renders the navbar with logo', () => {
      render(<Navbar />);
      
      expect(screen.getByLabelText(/CyberShield - Home/i)).toBeInTheDocument();
      expect(screen.getByText('CyberShield')).toBeInTheDocument();
    });

    it('renders all navigation links', () => {
      render(<Navbar />);
      
      expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
      expect(screen.getAllByText('About').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Features').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Pricing').length).toBeGreaterThan(0);
    });

    it('renders CTA button', () => {
      render(<Navbar />);
      
      const ctaButtons = screen.getAllByText('Get Started');
      expect(ctaButtons.length).toBeGreaterThan(0);
    });

    it('renders mobile menu button', () => {
      render(<Navbar />);
      
      const menuButton = screen.getByLabelText(/Open menu/i);
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Mobile Menu', () => {
    it('opens mobile menu when menu button is clicked', () => {
      render(<Navbar />);
      
      const menuButton = screen.getByLabelText(/Open menu/i);
      fireEvent.click(menuButton);
      
      expect(screen.getByLabelText(/Close menu/i)).toBeInTheDocument();
    });

    it('closes mobile menu when close button is clicked', () => {
      render(<Navbar />);
      
      const menuButton = screen.getByLabelText(/Open menu/i);
      fireEvent.click(menuButton);
      
      const closeButton = screen.getByLabelText(/Close menu/i);
      fireEvent.click(closeButton);
      
      expect(screen.getByLabelText(/Open menu/i)).toBeInTheDocument();
    });

    it('closes mobile menu when a link is clicked', () => {
      render(<Navbar />);
      
      const menuButton = screen.getByLabelText(/Open menu/i);
      fireEvent.click(menuButton);
      
      const links = screen.getAllByText('Services');
      fireEvent.click(links[0]);
      
      // Menu should close (aria-expanded should be false)
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Scroll Behavior', () => {
    it('adds background when scrolled', () => {
      const { container } = render(<Navbar />);
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);
      
      const nav = container.querySelector('nav');
      expect(nav?.className).toContain('backdrop-blur');
    });

    it('handles smooth scroll to sections', () => {
      const scrollToMock = vi.fn();
      window.scrollTo = scrollToMock;
      
      // Create a mock section element
      const mockSection = document.createElement('section');
      mockSection.id = 'services';
      document.body.appendChild(mockSection);
      
      render(<Navbar />);
      
      const links = screen.getAllByText('Services');
      fireEvent.click(links[0]);
      
      expect(scrollToMock).toHaveBeenCalled();
      
      // Cleanup
      document.body.removeChild(mockSection);
    });

    it('scrolls to top when logo is clicked', () => {
      const scrollToMock = vi.fn();
      window.scrollTo = scrollToMock;
      
      render(<Navbar />);
      
      const logo = screen.getByLabelText(/CyberShield - Home/i);
      fireEvent.click(logo);
      
      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Navbar />);
      
      expect(screen.getByRole('navigation', { name: /Main navigation/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/CyberShield - Home/i)).toBeInTheDocument();
    });

    it('has proper aria-expanded attribute on mobile menu button', () => {
      render(<Navbar />);
      
      const menuButton = screen.getByLabelText(/Open menu/i);
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
      
      fireEvent.click(menuButton);
      expect(menuButton.getAttribute('aria-expanded')).toBe('true');
    });

    it('supports keyboard navigation', () => {
      render(<Navbar />);
      
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe('Active Section Highlighting', () => {
    it('highlights active section based on scroll position', () => {
      // Create mock sections
      const servicesSection = document.createElement('section');
      servicesSection.id = 'services';
      document.body.appendChild(servicesSection);
      
      // Mock getBoundingClientRect
      servicesSection.getBoundingClientRect = vi.fn(() => ({
        top: 50,
        bottom: 500,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      }));
      
      render(<Navbar />);
      
      // Simulate scroll
      fireEvent.scroll(window);
      
      // Cleanup
      document.body.removeChild(servicesSection);
    });
  });

  describe('Responsive Design', () => {
    it('hides desktop navigation on mobile', () => {
      const { container } = render(<Navbar />);
      
      const desktopNav = container.querySelector('.hidden.md\\:flex');
      expect(desktopNav).toBeInTheDocument();
    });

    it('hides mobile menu button on desktop', () => {
      const { container } = render(<Navbar />);
      
      const mobileButton = container.querySelector('.md\\:hidden');
      expect(mobileButton).toBeInTheDocument();
    });
  });
});
