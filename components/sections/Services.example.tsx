/**
 * Services Section Example
 * 
 * This example demonstrates the Services section component with:
 * - Responsive grid layout (1 column mobile, 3 columns desktop)
 * - Service cards with icons, titles, and descriptions
 * - Hover effects with scale and glow
 * - Scroll-triggered fade-in animations with stagger
 * - 2rem gap between cards
 * 
 * Usage:
 * ```tsx
 * import Services from '@/components/sections/Services';
 * 
 * export default function Page() {
 *   return <Services />;
 * }
 * ```
 * 
 * The component uses the SERVICES constant from lib/constants.ts
 * which contains the service data (icon, title, description).
 * 
 * Features:
 * - Automatic animation on scroll into viewport
 * - Staggered animation for each card (0.1s delay between cards)
 * - Hover effects: scale 1.05, gradient border glow
 * - Transition duration: 300ms
 * - Responsive padding and spacing
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 12.2
 */

import Services from './Services';

export default function ServicesExample(): JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <Services />
    </div>
  );
}
