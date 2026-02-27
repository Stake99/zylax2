import { LucideIcon } from 'lucide-react';

// Component Props
export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'featured';
  hoverable?: boolean;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'gradient' | 'outline';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

// Content Data Models
export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  avatar: string;
  quote: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
  ctaText: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  icon: LucideIcon;
  href: string;
}

// Animation Variants
export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration: number;
      delay?: number;
      ease?: string;
      staggerChildren?: number;
    };
  };
}
