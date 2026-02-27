import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Handles conditional classes and removes duplicate/conflicting classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Email validation regex pattern
 * Validates basic email format: user@domain.extension
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns true if valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Formats a number with commas for thousands separators
 * @param num - The number to format
 * @returns Formatted string with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Delays execution for a specified duration
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Custom hook to detect user's reduced motion preference
 * Detects the prefers-reduced-motion media query and updates when it changes
 * @returns boolean indicating if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
