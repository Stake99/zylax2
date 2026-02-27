# Implementation Plan: Cybersecurity Website

## Overview

This implementation plan breaks down the cybersecurity marketing website into discrete coding tasks. The website will be built with Next.js 14, TypeScript, TailwindCSS, Framer Motion, and other modern web technologies. Tasks are organized to build incrementally, starting with project setup, then core components, followed by sections, and finally testing and optimization.

## Tasks

- [x] 1. Initialize Next.js 14 project with TypeScript and dependencies
  - Create Next.js 14 project with App Router and TypeScript
  - Install TailwindCSS and configure with custom theme (colors: background #0B0F19, card #121826, gradient blue to silver)
  - Install Framer Motion, Lucide React, and Embla Carousel React
  - Create folder structure: /app, /components/ui, /components/sections, /components/animations, /lib, /styles, /public/images
  - Configure TypeScript with strict mode and compiler options from design
  - Configure next.config.js with image optimization settings
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [x] 2. Create TypeScript type definitions and static content
  - Create lib/types.ts with all interfaces (ContainerProps, CardProps, ButtonProps, SectionHeadingProps, AnimatedCounterProps, Service, Feature, Stat, Testimonial, PricingPlan, FooterLink, FooterColumn, SocialLink, AnimationVariants)
  - Create lib/constants.ts with static content arrays (SERVICES, FEATURES, STATS, TESTIMONIALS, PRICING_PLANS, FOOTER_COLUMNS, SOCIAL_LINKS)
  - Create lib/utils.ts for utility functions
  - _Requirements: 15.1, 15.2_

- [ ] 3. Implement reusable UI components
  - [x] 3.1 Create Container component
    - Implement Container.tsx with max-width 1200px, horizontal padding, centered layout
    - Accept children and optional className props
    - _Requirements: 2.4, 11.1, 11.5_
  
  - [ ]* 3.2 Write property test for Container component
    - **Property 16: Container Children Rendering**
    - **Validates: Requirements 11.5**
  
  - [x] 3.3 Create Card component with variants
    - Implement Card.tsx with default, glass, and featured variants
    - Add hoverable prop for scale and glow effects on hover
    - Background #121826, border radius 0.75rem, padding responsive
    - Transition duration 300ms with ease-in-out
    - _Requirements: 2.2, 11.2_
  
  - [ ]* 3.4 Write property test for Card hover effects
    - **Property 4: Card Hover Effects**
    - **Validates: Requirements 4.4, 4.5**
  
  - [ ]* 3.5 Write property test for minimum transition duration
    - **Property 5: Minimum Transition Duration**
    - **Validates: Requirements 4.6**
  
  - [x] 3.6 Create Button component with variants
    - Implement Button.tsx with gradient and outline variants
    - Accept variant, onClick, children, className, and type props
    - Gradient variant: blue to silver gradient background
    - Outline variant: transparent background, gradient border and text
    - Hover effect: opacity 0.9, transition 300ms
    - _Requirements: 2.3, 11.3, 11.6_
  
  - [ ]* 3.7 Write property test for Button props support
    - **Property 17: Button Props Support**
    - **Validates: Requirements 11.6**
  
  - [x] 3.8 Create SectionHeading component
    - Implement SectionHeading.tsx with title and optional subtitle
    - Title: text-4xl (mobile), text-5xl (desktop), font-bold, white
    - Subtitle: text-lg, muted gray, margin-top 1rem
    - Accept centered prop for text alignment
    - _Requirements: 2.5, 2.6, 2.7, 11.4_
  
  - [ ]* 3.9 Write unit tests for all UI components
    - Test prop variations, className merging, children rendering, variant styling
    - Test accessibility attributes
    - _Requirements: 11.7_

- [x] 4. Implement AnimatedCounter component
  - Create AnimatedCounter.tsx using Framer Motion's useMotionValue and useTransform
  - Accept value, duration (default 2000ms), prefix, suffix, and className props
  - Animate from 0 to target value with easeOut easing
  - Round to integer for display
  - _Requirements: 5.5, 5.6, 7.3, 7.4, 7.5_

- [ ]* 4.1 Write property test for counter animation range
  - **Property 7: Counter Animation Range**
  - **Validates: Requirements 5.5, 7.3**

- [ ]* 4.2 Write property test for counter animation easing
  - **Property 10: Counter Animation Easing**
  - **Validates: Requirements 7.5**

- [ ]* 4.3 Write unit tests for AnimatedCounter
  - Test with various values, test animation completion, test reduced motion
  - _Requirements: 12.1_

- [x] 5. Implement Hero section
  - Create Hero.tsx with full viewport height (100vh)
  - Add background #0B0F19 with subtle grid pattern overlay
  - Create 3-5 animated floating shapes (circles/squares) with continuous float animation
  - Add headline (text-5xl mobile, text-6xl desktop) with gradient text effect
  - Add subheading (text-xl, max-width 600px, muted gray)
  - Add two CTA buttons (gradient and outline variants) in flex row (desktop) / column (mobile)
  - Implement fade-in animation on mount with stagger for children
  - Use Framer Motion variants for animations
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 12.6_

- [ ]* 5.1 Write unit tests for Hero section
  - Test rendering, test animation triggers, test responsive layout
  - _Requirements: 13.1, 13.2, 13.3_

- [x] 6. Implement Services section
  - Create Services.tsx with Container and SectionHeading
  - Display services in grid: 1 column (mobile), 3 columns (desktop), gap 2rem
  - Each service card: icon (3rem, gradient color), title (text-xl, font-semibold, white), description (text-base, muted gray)
  - Add hover effects: scale 1.05, gradient border glow, transition 300ms
  - Implement scroll-triggered fade-in animation with stagger
  - Add data-testid attributes for testing
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 12.2_

- [ ]* 6.1 Write property test for mobile responsive layout
  - **Property 1: Mobile Responsive Layout**
  - **Validates: Requirements 2.8, 13.2**

- [ ]* 6.2 Write property test for desktop responsive layout
  - **Property 2: Desktop Responsive Layout**
  - **Validates: Requirements 2.9, 13.3**

- [ ]* 6.3 Write property test for service card completeness
  - **Property 3: Service Card Completeness**
  - **Validates: Requirements 4.3**

- [ ]* 6.4 Write unit tests for Services section
  - Test rendering with mock data, test responsive layout, test empty data handling
  - _Requirements: 13.4_

- [x] 7. Implement About section
  - Create About.tsx with Container and SectionHeading
  - Layout: 1 column (mobile), 2 columns (desktop)
  - Left column: heading, description text, feature list with icons, AnimatedCounter group (3-4 counters)
  - Right column: image with rounded corners and subtle shadow (aspect ratio 4:3 or 16:9)
  - Implement intersection observer for counter animation triggers
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ]* 7.1 Write property test for feature icon display
  - **Property 6: Feature Icon Display**
  - **Validates: Requirements 5.4**

- [ ]* 7.2 Write unit tests for About section
  - Test rendering, test counter triggers, test responsive layout
  - _Requirements: 13.1, 13.2, 13.3_

- [x] 8. Implement Features section
  - Create Features.tsx with Container and SectionHeading
  - Grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop), gap 1.5rem
  - Card styling: glass morphism (bg-white/5, backdrop-blur-lg), border 1px solid white/10
  - Hover effect: gradient border (blue to silver)
  - Each feature: icon (2.5rem, gradient color), title (text-lg, font-semibold), description (text-sm, muted gray)
  - Implement scroll-triggered fade-in with stagger
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ]* 8.1 Write property test for glass morphism styling
  - **Property 8: Glass Morphism Styling**
  - **Validates: Requirements 6.2**

- [ ]* 8.2 Write property test for feature card hover border
  - **Property 9: Feature Card Hover Border**
  - **Validates: Requirements 6.3**

- [ ]* 8.3 Write property test for section viewport fade-in
  - **Property 18: Section Viewport Fade-In**
  - **Validates: Requirements 12.2**

- [ ]* 8.4 Write unit tests for Features section
  - Test rendering, test hover effects, test responsive layout
  - _Requirements: 13.1, 13.2, 13.3_

- [x] 9. Implement Stats section
  - Create Stats.tsx with Container
  - Background: dark overlay (#0B0F19 with 90% opacity) over subtle pattern
  - Layout: 2x2 grid (mobile), 4 columns (desktop)
  - Each stat: AnimatedCounter (text-4xl or text-5xl), label (text-base, muted gray), center-aligned
  - Implement intersection observer to trigger count-up animations
  - Animation: count from 0 to target over 2 seconds with easeOut
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 9.1 Write unit tests for Stats section
  - Test rendering, test animation triggers, test responsive layout
  - _Requirements: 13.1, 13.2, 13.3_

- [x] 10. Implement Testimonials section with carousel
  - Create Testimonials.tsx with Container and SectionHeading
  - Integrate Embla Carousel React with configuration (loop: true, align: center)
  - Each testimonial card: avatar (circular, 4rem diameter), quote (text-lg, italic, white), name (text-base, font-semibold), company & role (text-sm, muted gray)
  - Add navigation arrows (previous/next) with gradient hover effect
  - Add dot indicators below carousel
  - Implement auto-play with 5000ms interval
  - Responsive: 1 slide (mobile), 1 slide with peek (desktop)
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ]* 10.1 Write property test for testimonial completeness
  - **Property 11: Testimonial Completeness**
  - **Validates: Requirements 8.2**

- [ ]* 10.2 Write property test for carousel navigation
  - **Property 12: Carousel Navigation**
  - **Validates: Requirements 8.5**

- [ ]* 10.3 Write unit tests for Testimonials section
  - Test carousel functionality, test navigation, test empty data handling
  - _Requirements: 13.1, 13.2, 13.3_

- [x] 11. Implement Pricing section
  - Create Pricing.tsx with Container and SectionHeading
  - Grid layout: 1 column (mobile), 3 columns (desktop), gap 2rem
  - Each pricing card: plan name (text-2xl, font-bold), price (text-5xl), period (text-base, muted gray), description (text-sm, muted gray), feature list with check icons, CTA button
  - Featured plan (middle): gradient border with glow, scale 1.05 (desktop only), "Most Popular" badge at top, gradient text for price
  - Non-featured cards: hover effect with slight lift
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ]* 11.1 Write property test for pricing plan features display
  - **Property 13: Pricing Plan Features Display**
  - **Validates: Requirements 9.4**

- [ ]* 11.2 Write property test for feature check icons
  - **Property 14: Feature Check Icons**
  - **Validates: Requirements 9.5**

- [ ]* 11.3 Write unit tests for Pricing section
  - Test rendering, test featured plan styling, test responsive layout
  - _Requirements: 13.1, 13.2, 13.3_

- [x] 12. Implement Footer
  - Create Footer.tsx with Container
  - Background: #0B0F19 with top border (gradient)
  - Layout: 1 column (mobile), 4 columns (desktop)
  - Column 1: Company info (logo, tagline, social icons)
  - Column 2: Quick Links (navigation links)
  - Column 3: Resources (resource links)
  - Column 4: Newsletter (email input + subscribe button with validation)
  - Newsletter form: email validation with regex, inline error messages, loading state, success message
  - Social icons: hover effect with gradient color
  - Bottom bar: copyright text, centered
  - Padding: 4rem (top/bottom), responsive horizontal
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ]* 12.1 Write property test for social link completeness
  - **Property 15: Social Link Completeness**
  - **Validates: Requirements 10.3**

- [ ]* 12.2 Write unit tests for Footer
  - Test form validation, test responsive layout, test social links
  - _Requirements: 13.1, 13.2, 13.3_

- [x] 13. Integrate all sections into home page
  - Create app/page.tsx and import all section components
  - Render sections in order: Hero, Services, About, Features, Stats, Testimonials, Pricing, Footer
  - Create app/layout.tsx with global styles and metadata
  - Import globals.css with Tailwind directives
  - _Requirements: 1.1, 1.2_

- [ ]* 13.1 Write integration tests for full page
  - Test full page rendering with all sections, test scroll behavior
  - _Requirements: 13.1, 13.2, 13.3_

- [x] 14. Checkpoint - Ensure all components render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 15. Implement animation system enhancements
  - Create useReducedMotion hook in lib/utils.ts to detect prefers-reduced-motion
  - Update all animated components to respect reduced motion preference
  - Ensure all animations use transform and opacity (GPU-accelerated)
  - Verify transition durations are 300ms or longer
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ]* 15.1 Write property test for interactive element transitions
  - **Property 19: Interactive Element Transitions**
  - **Validates: Requirements 12.3, 12.4, 12.5**

- [ ]* 15.2 Write unit tests for animation system
  - Test reduced motion hook, test animation fallbacks
  - _Requirements: 12.1_

- [x] 16. Implement responsive design refinements
  - Verify mobile-first approach across all components
  - Test all breakpoints (mobile <768px, desktop >=768px)
  - Ensure single-column layouts on mobile, multi-column on desktop
  - Use TailwindCSS responsive utility classes consistently
  - Verify touch targets are minimum 44x44px
  - Test readability at all breakpoints
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_

- [ ]* 16.1 Write property test for touch device accessibility
  - **Property 20: Touch Device Accessibility**
  - **Validates: Requirements 13.5**

- [ ]* 16.2 Write unit tests for responsive behavior
  - Test layout changes at breakpoints, test touch interactions
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_

- [x] 17. Implement performance optimizations
  - Replace all img tags with Next.js Image component
  - Configure image optimization in next.config.js (formats: avif, webp)
  - Add priority prop to above-fold images (Hero section)
  - Implement blur placeholders for progressive loading
  - Add dynamic imports for Testimonials section (Embla Carousel)
  - Create loading skeletons for dynamically imported components
  - Optimize Lucide icons by importing individually (tree-shaking)
  - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [ ]* 17.1 Write property test for image component usage
  - **Property 21: Image Component Usage**
  - **Validates: Requirements 14.1**

- [ ]* 17.2 Write unit tests for performance optimizations
  - Test dynamic imports, test image loading states
  - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [x] 18. Implement error handling and boundaries
  - Create error boundary component for each major section
  - Add fallback UI for component errors with retry button
  - Implement newsletter form validation with error messages
  - Add image error handling with fallback placeholders
  - Handle empty data arrays gracefully (services, features, testimonials)
  - Add carousel error handling for empty testimonials
  - _Requirements: 15.5_

- [ ]* 18.1 Write unit tests for error handling
  - Test error boundaries, test form validation, test empty data states
  - _Requirements: 15.5_

- [x] 19. Implement TypeScript strict typing
  - Verify all component props have TypeScript interfaces
  - Verify all data structures have type definitions
  - Add explicit type annotations to all function parameters and return values
  - Enable strict TypeScript compiler options
  - Run TypeScript compiler and fix all type errors
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [ ]* 19.1 Write property test for component props typing
  - **Property 22: Component Props Typing**
  - **Validates: Requirements 15.1**

- [ ]* 19.2 Write property test for data structure typing
  - **Property 23: Data Structure Typing**
  - **Validates: Requirements 15.2**

- [ ]* 19.3 Write property test for function typing
  - **Property 24: Function Typing**
  - **Validates: Requirements 15.3**

- [x] 20. Checkpoint - Ensure all optimizations and error handling work
  - Ensure all tests pass, ask the user if questions arise.

- [x] 21. Set up testing infrastructure
  - Install Vitest and React Testing Library
  - Install @fast-check/vitest for property-based testing
  - Configure vitest.config.ts with test environment and coverage
  - Create lib/test-utils/mockData.ts with mock data
  - Create lib/test-utils/arbitraries.ts with fast-check arbitraries for all data types
  - Configure property tests with minimum 100 iterations
  - _Requirements: 15.5_

- [ ]* 21.1 Write all remaining property-based tests
  - Ensure all 24 properties have corresponding tests
  - Tag each test with format: // Feature: cybersecurity-website, Property {number}: {property_text}
  - Verify minimum 100 iterations per property test
  - _Requirements: 15.5_

- [ ]* 21.2 Write comprehensive unit tests
  - Achieve minimum 80% code coverage
  - Test all component prop variations
  - Test all edge cases (empty data, long text, invalid props)
  - Test error states and boundaries
  - _Requirements: 15.5_

- [x] 22. Implement accessibility compliance
  - Add semantic HTML elements (nav, main, section, article)
  - Add ARIA labels for icon-only buttons
  - Add ARIA live regions for dynamic content (counters, carousel)
  - Add alt text for all images
  - Ensure 4.5:1 contrast ratio for normal text, 3:1 for large text
  - Implement visible focus indicators on all focusable elements
  - Ensure logical tab order throughout page
  - Add skip to main content link
  - Test keyboard navigation (all interactive elements accessible)
  - Test with screen reader
  - Run axe DevTools accessibility scan and fix issues
  - _Requirements: 13.5_

- [ ]* 22.1 Write accessibility tests
  - Test keyboard navigation, test focus management, test ARIA attributes
  - Test color contrast ratios
  - _Requirements: 13.5_

- [x] 23. Performance audit and optimization
  - Run Lighthouse CI audit
  - Verify First Contentful Paint (FCP) < 1.5s
  - Verify Largest Contentful Paint (LCP) < 2.5s
  - Verify Time to Interactive (TTI) < 3.5s
  - Verify Cumulative Layout Shift (CLS) < 0.1
  - Install and run @next/bundle-analyzer
  - Optimize bundle size by removing unused dependencies
  - Verify images are lazy-loaded below fold
  - Test animation performance (60fps target)
  - Use React DevTools Profiler to verify no unnecessary re-renders
  - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [ ]* 23.1 Write performance tests
  - Test lazy loading, test bundle size, test animation performance
  - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [x] 24. Final testing and validation
  - Run full test suite (unit tests + property tests)
  - Verify all 24 properties are tested and passing
  - Verify 80%+ code coverage achieved
  - Test on multiple browsers (Chrome, Firefox, Safari, Edge)
  - Test on multiple devices (mobile, tablet, desktop)
  - Test with different screen sizes and orientations
  - Verify TypeScript compilation with zero errors
  - Run ESLint and fix all issues
  - Verify production build succeeds
  - _Requirements: 15.5_

- [x] 25. Final checkpoint - Production readiness
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples, edge cases, and error conditions
- The implementation follows Next.js 14 best practices and modern React patterns
- All code uses TypeScript with strict mode enabled
- The design system ensures consistent styling across all sections
- Animations use Framer Motion for smooth, performant transitions
- Responsive design follows mobile-first approach with TailwindCSS utilities
- Accessibility compliance targets WCAG 2.1 Level AA
- Performance optimizations include image optimization, code splitting, and lazy loading
