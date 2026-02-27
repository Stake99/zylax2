import React from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/lib/types';

/**
 * Button component with gradient and outline variants
 * 
 * Variants:
 * - gradient: Blue to silver gradient background with white text
 * - outline: Transparent background with gradient border and gradient text
 * 
 * @param children - Button content
 * @param variant - Button style variant (gradient or outline)
 * @param onClick - Click handler function
 * @param className - Additional CSS classes
 * @param type - Button type attribute (button, submit, or reset)
 */
export function Button({
  children,
  variant = 'gradient',
  onClick,
  className,
  type = 'button',
}: ButtonProps): JSX.Element {
  const baseStyles = 'px-6 py-3 min-h-[44px] rounded-lg font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-background transform hover:scale-105';
  
  const variantStyles = {
    gradient: 'bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50',
    outline: 'bg-transparent border-2 border-transparent bg-gradient-to-r from-blue-500 to-gray-400 bg-clip-text text-transparent hover:opacity-90',
  };
  
  // For outline variant, we need a special structure with gradient border
  if (variant === 'outline') {
    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(
          baseStyles,
          'relative bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 p-[2px] hover:shadow-lg hover:shadow-cyan-500/50',
          className
        )}
      >
        <span className="flex items-center justify-center h-full w-full rounded-[6px] bg-background px-6 py-3">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent font-medium">
            {children}
          </span>
        </span>
      </button>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
