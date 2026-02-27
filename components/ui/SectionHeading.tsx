import React from 'react';
import { cn } from '@/lib/utils';
import { SectionHeadingProps } from '@/lib/types';

/**
 * SectionHeading component for consistent heading styles across all sections
 * 
 * Features:
 * - Responsive typography: text-4xl (mobile), text-5xl (desktop)
 * - Optional subtitle with muted gray color
 * - Optional centered text alignment
 * - Consistent spacing with bottom margin
 * 
 * @param title - Main heading text (required)
 * @param subtitle - Optional subtitle text
 * @param centered - Enable centered text alignment
 * @param className - Additional CSS classes
 */
export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps): JSX.Element {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        centered && 'text-center',
        className
      )}
    >
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-300">
          {subtitle}
        </p>
      )}
    </div>
  );
}
