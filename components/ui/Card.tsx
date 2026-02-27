import React from 'react';
import { cn } from '@/lib/utils';
import { CardProps } from '@/lib/types';

/**
 * Card component with multiple variants and hover effects
 * 
 * Variants:
 * - default: Solid dark background (#121826)
 * - glass: Semi-transparent with backdrop blur (Glass Morphism)
 * - featured: Gradient border with glow effect
 * 
 * @param children - Content to render inside the card
 * @param className - Additional CSS classes
 * @param variant - Card style variant (default, glass, or featured)
 * @param hoverable - Enable scale and glow effects on hover
 */
export function Card({
  children,
  className,
  variant = 'default',
  hoverable = false,
}: CardProps): JSX.Element {
  const baseStyles = 'rounded-xl transition-all duration-300 ease-in-out';
  
  const variantStyles = {
    default: 'bg-card border border-blue-500/20 shadow-lg shadow-blue-500/10',
    glass: 'bg-white/5 backdrop-blur-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10',
    featured: 'bg-card border-2 border-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-padding',
  };
  
  const paddingStyles = 'p-6 md:p-8';
  
  const hoverStyles = hoverable
    ? 'hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:border-cyan-500/50 hover:-translate-y-1'
    : '';
  
  // For featured variant, we need a special structure with gradient border
  if (variant === 'featured') {
    return (
      <div
        className={cn(
          baseStyles,
          paddingStyles,
          hoverStyles,
          'relative bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 p-[2px] shadow-xl shadow-blue-500/30',
          className
        )}
      >
        <div className="relative h-full w-full rounded-[10px] bg-card p-6 md:p-8">
          {children}
        </div>
      </div>
    );
  }
  
  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        paddingStyles,
        hoverStyles,
        className
      )}
    >
      {children}
    </div>
  );
}
