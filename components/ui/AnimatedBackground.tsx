'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/utils';

/**
 * AnimatedBackground Component
 * 
 * Provides a unified animated background for the entire website with:
 * - Gradient background (dark blue to purple tones)
 * - Animated gradient orbs with pulsing glow
 * - Floating shapes with continuous animation
 * - Grid pattern overlay
 * 
 * This component is fixed and spans the entire viewport,
 * creating a cohesive visual experience across all sections.
 */
export default function AnimatedBackground(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  // Floating shape animation variants
  const floatingVariants = (delay: number, duration: number) => ({
    animate: prefersReducedMotion
      ? { y: 0 }
      : {
          y: [0, -30, 0],
          x: [0, 15, 0],
          rotate: [0, 5, 0],
          transition: {
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          },
        },
  });

  // Floating shapes configuration - distributed across the page
  const floatingShapes = [
    { id: 1, type: 'circle', size: 120, top: '10%', left: '5%', delay: 0, duration: 4 },
    { id: 2, type: 'square', size: 80, top: '25%', left: '85%', delay: 0.5, duration: 4.5 },
    { id: 3, type: 'circle', size: 150, top: '45%', right: '8%', delay: 1, duration: 5 },
    { id: 4, type: 'square', size: 100, top: '60%', left: '10%', delay: 1.5, duration: 4.2 },
    { id: 5, type: 'circle', size: 90, top: '75%', right: '15%', delay: 0.8, duration: 4.8 },
    { id: 6, type: 'square', size: 70, top: '85%', left: '50%', delay: 1.2, duration: 4.3 },
    { id: 7, type: 'circle', size: 110, top: '35%', left: '45%', delay: 0.3, duration: 5.2 },
    { id: 8, type: 'square', size: 85, top: '55%', right: '40%', delay: 1.8, duration: 4.6 },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[#0F1629] to-[#1A1F35]" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDuration: '3s' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: '1s', animationDuration: '3.5s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: '2s', animationDuration: '4s' }}
        />
        <div 
          className="absolute top-3/4 left-1/3 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: '2.5s', animationDuration: '3.8s' }}
        />
      </div>

      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Animated floating shapes */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            width: shape.size,
            height: shape.size,
          }}
          variants={floatingVariants(shape.delay, shape.duration)}
          animate="animate"
        >
          <div
            className={`w-full h-full bg-gradient-to-br from-blue-500/30 via-cyan-500/30 to-purple-500/30 backdrop-blur-sm ${
              shape.type === 'circle' ? 'rounded-full' : 'rounded-lg rotate-45'
            }`}
            style={{
              boxShadow: '0 0 60px rgba(59, 130, 246, 0.4), 0 0 100px rgba(139, 92, 246, 0.2)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
