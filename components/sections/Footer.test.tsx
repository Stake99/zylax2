import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Footer from './Footer';
import { FOOTER_COLUMNS, SOCIAL_LINKS } from '@/lib/constants';

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render company logo and tagline', () => {
      render(<Footer />);
      
      expect(screen.getByText('CyberShield')).toBeInTheDocument();
      expect(screen.getByText(/Protecting your digital assets/i)).toBeInTheDocument();
    });

    it('should render all social media links', () => {
      render(<Footer />);
      
      SOCIAL_LINKS.forEach((social) => {
        const link = screen.getByTestId(`social-${social.platform.toLowerCase()}`);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', social.href);
        expect(link).toHaveAttribute('aria-label', social.platform);
      });
    });

    it('should render Quick Links column', () => {
      render(<Footer />);
      
      expect(screen.getByText(FOOTER_COLUMNS[0].title)).toBeInTheDocument();
      
      FOOTER_COLUMNS[0].links.forEach((link) => {
        const linkElement = screen.getByText(link.label);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.closest('a')).toHaveAttribute('href', link.href);
      });
    });

    it('should render Resources column', () => {
      render(<Footer />);
      
      expect(screen.getByText(FOOTER_COLUMNS[1].title)).toBeInTheDocument();
      
      FOOTER_COLUMNS[1].links.forEach((link) => {
        const linkElement = screen.getByText(link.label);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.closest('a')).toHaveAttribute('href', link.href);
      });
    });

    it('should render Newsletter section', () => {
      render(<Footer />);
      
      expect(screen.getByText('Newsletter')).toBeInTheDocument();
      expect(screen.getByText(/Subscribe to get the latest/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    });

    it('should render copyright text with current year', () => {
      render(<Footer />);
      
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} CyberShield`))).toBeInTheDocument();
    });
  });

  describe('Newsletter Form Validation', () => {
    it('should show error when submitting empty email', async () => {
      render(<Footer />);
      
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    it('should show error for invalid email format', async () => {
      render(<Footer />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('should accept valid email formats', async () => {
      render(<Footer />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
      ];
      
      for (const email of validEmails) {
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
          expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
        });
        
        // Wait for success message and clear
        await waitFor(() => {
          expect(screen.getByText('Successfully subscribed!')).toBeInTheDocument();
        });
        
        // Clear for next iteration
        fireEvent.change(emailInput, { target: { value: '' } });
      }
    });

    it('should clear error message when user starts typing', async () => {
      render(<Footer />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      
      // Trigger error
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
      
      // Start typing
      fireEvent.change(emailInput, { target: { value: 't' } });
      
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });
  });

  describe('Newsletter Form Submission', () => {
    it('should show loading state during submission', async () => {
      render(<Footer />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);
      
      // Check loading state
      expect(screen.getByText('Subscribing...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
      expect(emailInput).toBeDisabled();
    });

    it('should show success message after successful submission', async () => {
      render(<Footer />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Successfully subscribed!')).toBeInTheDocument();
      });
      
      // Email should be cleared
      expect(emailInput).toHaveValue('');
    });

    it('should clear success message when user modifies email', async () => {
      render(<Footer />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      
      // Submit successfully
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Successfully subscribed!')).toBeInTheDocument();
      });
      
      // Start typing new email
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
      
      expect(screen.queryByText('Successfully subscribed!')).not.toBeInTheDocument();
    });
  });

  describe('Responsive Layout', () => {
    it('should have responsive grid classes', () => {
      const { container } = render(<Footer />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-4');
    });

    it('should have responsive padding', () => {
      const { container } = render(<Footer />);
      
      const footerContainer = container.querySelector('.py-16');
      expect(footerContainer).toHaveClass('py-16', 'md:py-20');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for social links', () => {
      render(<Footer />);
      
      SOCIAL_LINKS.forEach((social) => {
        const link = screen.getByLabelText(social.platform);
        expect(link).toBeInTheDocument();
      });
    });

    it('should have proper ARIA attributes for email input', () => {
      render(<Footer />);
      
      const emailInput = screen.getByLabelText('Email address');
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should set aria-invalid when there is an error', async () => {
      render(<Footer />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('should associate error message with input using aria-describedby', async () => {
      render(<Footer />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
        expect(screen.getByRole('alert')).toHaveAttribute('id', 'email-error');
      });
    });

    it('should associate success message with input using aria-describedby', async () => {
      render(<Footer />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(emailInput).toHaveAttribute('aria-describedby', 'email-success');
        expect(screen.getByRole('status')).toHaveAttribute('id', 'email-success');
      });
    });
  });

  describe('Styling', () => {
    it('should have gradient top border', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('border-t', 'border-transparent');
      expect(footer?.className).toMatch(/bg-gradient-to-r/);
    });

    it('should have hover effects on social icons', () => {
      render(<Footer />);
      
      SOCIAL_LINKS.forEach((social) => {
        const link = screen.getByTestId(`social-${social.platform.toLowerCase()}`);
        expect(link?.className).toMatch(/hover:border-blue-500/);
        expect(link?.className).toMatch(/hover:shadow/);
      });
    });

    it('should have transition classes for smooth animations', () => {
      render(<Footer />);
      
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      expect(submitButton?.className).toMatch(/transition/);
      expect(submitButton?.className).toMatch(/duration-300/);
    });
  });
});
