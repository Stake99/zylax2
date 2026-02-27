import { Shield, Lock, Eye, Zap, Users, FileCheck, Twitter, Linkedin, Github } from 'lucide-react';
import type {
  Service,
  Feature,
  Stat,
  Testimonial,
  PricingPlan,
  FooterColumn,
  SocialLink,
} from '../types';

// Mock Services
export const mockServices: Service[] = [
  {
    id: 'service-1',
    icon: Shield,
    title: 'Threat Detection',
    description: 'Advanced AI-powered threat detection and real-time monitoring.',
  },
  {
    id: 'service-2',
    icon: Lock,
    title: 'Data Encryption',
    description: 'Military-grade encryption for data at rest and in transit.',
  },
  {
    id: 'service-3',
    icon: Eye,
    title: 'Security Audits',
    description: 'Comprehensive security assessments and penetration testing.',
  },
];

// Mock Features
export const mockFeatures: Feature[] = [
  {
    id: 'feature-1',
    icon: Zap,
    title: 'Real-Time Monitoring',
    description: '24/7 automated monitoring with instant alerts.',
  },
  {
    id: 'feature-2',
    icon: Users,
    title: 'Team Collaboration',
    description: 'Secure collaboration tools with role-based access control.',
  },
  {
    id: 'feature-3',
    icon: FileCheck,
    title: 'Compliance Ready',
    description: 'Built-in compliance frameworks for GDPR, HIPAA, and SOC 2.',
  },
];

// Mock Stats
export const mockStats: Stat[] = [
  { id: 'stat-1', value: 10000, suffix: '+', label: 'Protected Systems' },
  { id: 'stat-2', value: 99.9, suffix: '%', label: 'Uptime Guarantee' },
  { id: 'stat-3', value: 500, suffix: '+', label: 'Enterprise Clients' },
  { id: 'stat-4', value: 24, suffix: '/7', label: 'Support Available' },
];

// Mock Testimonials
export const mockTestimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'John Smith',
    company: 'TechCorp Inc.',
    role: 'CTO',
    avatar: '/images/avatars/john-smith.jpg',
    quote: 'The security solutions provided have been exceptional. Our infrastructure has never been more secure.',
  },
  {
    id: 'testimonial-2',
    name: 'Jane Doe',
    company: 'SecureNet',
    role: 'Security Director',
    avatar: '/images/avatars/jane-doe.jpg',
    quote: 'Outstanding service and support. The team is always responsive and knowledgeable.',
  },
  {
    id: 'testimonial-3',
    name: 'Bob Johnson',
    company: 'DataGuard',
    role: 'CEO',
    avatar: '/images/avatars/bob-johnson.jpg',
    quote: 'Best investment we made for our security infrastructure. Highly recommended.',
  },
];

// Mock Pricing Plans
export const mockPricingPlans: PricingPlan[] = [
  {
    id: 'plan-1',
    name: 'Starter',
    price: 99,
    period: 'month',
    description: 'Perfect for small teams',
    features: [
      'Up to 10 users',
      'Basic threat detection',
      'Email support',
      '99% uptime SLA',
    ],
    ctaText: 'Get Started',
  },
  {
    id: 'plan-2',
    name: 'Professional',
    price: 299,
    period: 'month',
    description: 'For growing businesses',
    features: [
      'Up to 50 users',
      'Advanced threat detection',
      'Priority support',
      '99.9% uptime SLA',
      'Custom integrations',
    ],
    featured: true,
    ctaText: 'Start Free Trial',
  },
  {
    id: 'plan-3',
    name: 'Enterprise',
    price: 999,
    period: 'month',
    description: 'For large organizations',
    features: [
      'Unlimited users',
      'AI-powered security',
      '24/7 dedicated support',
      '99.99% uptime SLA',
      'Custom integrations',
      'Compliance assistance',
    ],
    ctaText: 'Contact Sales',
  },
];

// Mock Footer Columns
export const mockFooterColumns: FooterColumn[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '#' },
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Support', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

// Mock Social Links
export const mockSocialLinks: SocialLink[] = [
  { platform: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { platform: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { platform: 'GitHub', icon: Github, href: 'https://github.com' },
];
