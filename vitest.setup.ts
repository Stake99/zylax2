import '@testing-library/jest-dom';
import { it } from '@fast-check/vitest';

// Configure fast-check default parameters
// Property-based tests will use minimum 100 iterations as per requirements
// This is configured per test using fc.assert or test.prop parameters

// Mock IntersectionObserver for Framer Motion viewport animations
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock window.matchMedia for reduced motion detection
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
