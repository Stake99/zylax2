import Hero from './Hero';

/**
 * Hero Section Example
 * 
 * This example demonstrates the Hero section component with:
 * - Full viewport height
 * - Animated background with grid pattern
 * - 5 floating shapes with continuous animation
 * - Gradient headline text
 * - Muted subheading
 * - Two CTA buttons (gradient and outline)
 * - Fade-in animation on mount with stagger
 */

export default function HeroExample(): JSX.Element {
  return (
    <div className="min-h-screen">
      <Hero />
    </div>
  );
}
