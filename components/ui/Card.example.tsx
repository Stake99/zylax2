/**
 * Example usage of the Card component
 * This file demonstrates all variants and features
 */

import { Card } from './Card';

export function CardExamples(): JSX.Element {
  return (
    <div className="space-y-8 p-8 bg-background min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Card Component Examples</h1>
      
      {/* Default Variant */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Default Variant</h2>
        <Card>
          <h3 className="text-xl font-semibold text-white mb-2">Default Card</h3>
          <p className="text-muted">
            This is a default card with solid dark background (#121826) and subtle border.
          </p>
        </Card>
      </section>

      {/* Glass Variant */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Glass Variant</h2>
        <Card variant="glass">
          <h3 className="text-xl font-semibold text-white mb-2">Glass Morphism Card</h3>
          <p className="text-muted">
            This card uses glass morphism with semi-transparent background and backdrop blur.
          </p>
        </Card>
      </section>

      {/* Featured Variant */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Featured Variant</h2>
        <Card variant="featured">
          <h3 className="text-xl font-semibold text-white mb-2">Featured Card</h3>
          <p className="text-muted">
            This card has a gradient border (blue to silver) with glow effect.
          </p>
        </Card>
      </section>

      {/* Hoverable Cards */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Hoverable Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverable>
            <h3 className="text-xl font-semibold text-white mb-2">Hover Me</h3>
            <p className="text-muted">
              Hover to see scale and glow effects (300ms transition).
            </p>
          </Card>
          
          <Card variant="glass" hoverable>
            <h3 className="text-xl font-semibold text-white mb-2">Glass + Hover</h3>
            <p className="text-muted">
              Glass morphism with hover effects.
            </p>
          </Card>
          
          <Card variant="featured" hoverable>
            <h3 className="text-xl font-semibold text-white mb-2">Featured + Hover</h3>
            <p className="text-muted">
              Featured card with hover effects.
            </p>
          </Card>
        </div>
      </section>

      {/* Custom Styling */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Custom Styling</h2>
        <Card className="border-2 border-green-500">
          <h3 className="text-xl font-semibold text-white mb-2">Custom Border</h3>
          <p className="text-muted">
            Card with custom className for additional styling.
          </p>
        </Card>
      </section>
    </div>
  );
}
