import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { SectionErrorBoundary } from './SectionErrorBoundary';
import { ImageWithFallback } from './ImageWithFallback';

describe('Error Handling Components', () => {
  describe('ErrorBoundary', () => {
    it('renders children when there is no error', () => {
      render(
        <ErrorBoundary>
          <div>Test Content</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders fallback UI when an error occurs', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(/We encountered an error/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();

      consoleError.mockRestore();
    });

    it('renders custom fallback when provided', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <ErrorBoundary fallback={<div>Custom Fallback</div>}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom Fallback')).toBeInTheDocument();

      consoleError.mockRestore();
    });
  });

  describe('SectionErrorBoundary', () => {
    it('renders children when there is no error', () => {
      render(
        <SectionErrorBoundary sectionName="Test Section">
          <div>Section Content</div>
        </SectionErrorBoundary>
      );

      expect(screen.getByText('Section Content')).toBeInTheDocument();
    });

    it('renders section-specific fallback UI when an error occurs', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <SectionErrorBoundary sectionName="Services">
          <ThrowError />
        </SectionErrorBoundary>
      );

      expect(screen.getByText('Error loading Services')).toBeInTheDocument();
      expect(screen.getByText(/temporarily unavailable/)).toBeInTheDocument();

      consoleError.mockRestore();
    });
  });

  describe('ImageWithFallback', () => {
    it('renders image with correct props', () => {
      render(
        <ImageWithFallback
          src="/test-image.jpg"
          alt="Test image"
          width={100}
          height={100}
        />
      );

      const img = screen.getByAltText('Test image');
      expect(img).toBeInTheDocument();
    });

    it('handles image load error and shows fallback', () => {
      render(
        <ImageWithFallback
          src="/invalid-image.jpg"
          alt="Test image"
          width={100}
          height={100}
        />
      );

      const img = screen.getByAltText('Test image');
      
      // Simulate image error
      fireEvent.error(img);

      // Should show fallback icon
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders custom fallback component when provided', () => {
      render(
        <ImageWithFallback
          src="/invalid-image.jpg"
          alt="Test image"
          width={100}
          height={100}
          fallbackComponent={<div>Custom Image Fallback</div>}
        />
      );

      const img = screen.getByAltText('Test image');
      
      // Simulate image error
      fireEvent.error(img);

      // Should show custom fallback
      expect(screen.getByText('Custom Image Fallback')).toBeInTheDocument();
    });
  });
});
