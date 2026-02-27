/**
 * Testimonials Component Example
 * 
 * This example demonstrates the Testimonials section component with:
 * - Embla Carousel integration with loop and center alignment
 * - Auto-play functionality with 5000ms interval
 * - Navigation arrows with gradient hover effects
 * - Dot indicators for slide navigation
 * - Responsive layout: 1 slide (mobile), 1 slide with peek (desktop)
 * - Each testimonial displays: avatar, quote, name, company, and role
 * 
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 */

import Testimonials from './Testimonials';

export default function TestimonialsExample(): JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <Testimonials />
    </div>
  );
}

/**
 * Usage Notes:
 * 
 * 1. Data Source:
 *    - Testimonials are loaded from TESTIMONIALS constant in lib/constants.ts
 *    - Each testimonial includes: id, name, company, role, avatar, quote
 * 
 * 2. Carousel Configuration:
 *    - Loop: true (infinite scrolling)
 *    - Align: center (centers active slide)
 *    - Auto-play: 5000ms interval
 *    - Stops on interaction: false (continues auto-play)
 * 
 * 3. Navigation:
 *    - Previous/Next arrows on sides
 *    - Dot indicators below carousel
 *    - Click dots to jump to specific slide
 *    - Arrows have gradient hover effect
 * 
 * 4. Responsive Behavior:
 *    - Mobile (<768px): 1 slide at 100% width
 *    - Desktop (≥768px): 1 slide at 90% width with peek of adjacent slides
 * 
 * 5. Styling:
 *    - Avatar: 4rem circular with gradient background
 *    - Quote: text-lg, italic, white, centered
 *    - Name: text-base, font-semibold, white
 *    - Company & Role: text-sm, muted gray
 *    - Card: dark background with border
 * 
 * 6. Accessibility:
 *    - ARIA labels on navigation buttons
 *    - Keyboard navigation support
 *    - Semantic HTML structure
 * 
 * 7. Customization:
 *    - To add more testimonials, update TESTIMONIALS in lib/constants.ts
 *    - To change auto-play interval, modify delay in Autoplay plugin
 *    - To adjust slide width, modify flex-[0_0_X%] classes
 */
