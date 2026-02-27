'use client';

import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import { FOOTER_COLUMNS, SOCIAL_LINKS } from '@/lib/constants';
import { Shield } from 'lucide-react';

/**
 * Footer Component
 * 
 * Bottom section with links, newsletter, and social media featuring:
 * - Background: #0B0F19 with top gradient border
 * - Layout: 1 column (mobile), 4 columns (desktop)
 * - Column 1: Company info (logo, tagline, social icons)
 * - Column 2: Quick Links (navigation links)
 * - Column 3: Resources (resource links)
 * - Column 4: Newsletter (email input + subscribe button with validation)
 * - Newsletter form: email validation with regex, inline error messages, loading state, success message
 * - Social icons: hover effect with gradient color
 * - Bottom bar: copyright text, centered
 * - Padding: 4rem (top/bottom), responsive horizontal
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer(): JSX.Element {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (value: string): boolean => {
    return EMAIL_REGEX.test(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
    
    // Clear success message when user modifies email
    if (success) {
      setSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate API call
    setLoading(true);
    setError('');
    
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Success
      setSuccess(true);
      setEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative border-t border-transparent bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 bg-[length:100%_1px] bg-no-repeat"
      role="contentinfo"
    >
      <Container className="py-16 md:py-20">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Column 1: Company Info */}
          <div className="md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-white">CyberShield</span>
            </div>
            
            {/* Tagline */}
            <p className="text-muted text-sm mb-6 leading-relaxed">
              Protecting your digital assets with cutting-edge cybersecurity solutions.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = social.icon;
                
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    aria-label={`Visit our ${social.platform} page`}
                    className="w-10 h-10 rounded-lg bg-card border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-background group"
                    data-testid={`social-${social.platform.toLowerCase()}`}
                  >
                    <IconComponent className="w-5 h-5 text-muted group-hover:text-blue-500 transition-colors duration-300" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <nav className="md:col-span-1" aria-label="Quick links">
            <h3 className="text-white font-semibold text-lg mb-4">
              {FOOTER_COLUMNS[0].title}
            </h3>
            <ul className="space-y-3">
              {FOOTER_COLUMNS[0].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-blue-500 transition-colors duration-300 focus:outline-none focus:text-blue-500 focus:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Resources */}
          <nav className="md:col-span-1" aria-label="Resources">
            <h3 className="text-white font-semibold text-lg mb-4">
              {FOOTER_COLUMNS[1].title}
            </h3>
            <ul className="space-y-3">
              {FOOTER_COLUMNS[1].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-blue-500 transition-colors duration-300 focus:outline-none focus:text-blue-500 focus:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">
              Newsletter
            </h3>
            <p className="text-muted text-sm mb-4">
              Subscribe to get the latest security updates and news.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 bg-card border border-white/10 rounded-lg text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  disabled={loading}
                  aria-label="Email address"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'email-error' : success ? 'email-success' : undefined}
                />
                
                {/* Error Message */}
                {error && (
                  <p
                    id="email-error"
                    className="text-red-400 text-xs mt-2"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
                
                {/* Success Message */}
                {success && (
                  <p
                    id="email-success"
                    className="text-green-400 text-xs mt-2"
                    role="status"
                  >
                    Successfully subscribed!
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-gray-400 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Subscribe to newsletter"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-center text-muted text-sm">
            © {currentYear} CyberShield. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
