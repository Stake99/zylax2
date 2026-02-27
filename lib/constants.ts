import {
  Shield,
  Lock,
  Eye,
  Zap,
  Users,
  FileCheck,
  Server,
  Cloud,
  Database,
  Twitter,
  Linkedin,
  Github,
  CheckCircle,
} from 'lucide-react';
import {
  Service,
  Feature,
  Stat,
  Testimonial,
  PricingPlan,
  FooterColumn,
  SocialLink,
} from './types';

export const SERVICES: Service[] = [
  {
    id: 'service-1',
    icon: Shield,
    title: 'Threat Detection',
    description:
      'Advanced AI-powered threat detection and real-time monitoring to protect your infrastructure.',
  },
  {
    id: 'service-2',
    icon: Lock,
    title: 'Data Encryption',
    description:
      'Military-grade encryption for data at rest and in transit, ensuring complete security.',
  },
  {
    id: 'service-3',
    icon: Eye,
    title: 'Security Audits',
    description:
      'Comprehensive security assessments and penetration testing to identify vulnerabilities.',
  },
];

export const FEATURES: Feature[] = [
  {
    id: 'feature-1',
    icon: Zap,
    title: 'Real-Time Monitoring',
    description:
      '24/7 automated monitoring with instant alerts for suspicious activities.',
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
  {
    id: 'feature-4',
    icon: Server,
    title: 'Infrastructure Protection',
    description:
      'Comprehensive protection for your servers and network infrastructure.',
  },
  {
    id: 'feature-5',
    icon: Cloud,
    title: 'Cloud Security',
    description:
      'Multi-cloud security solutions for AWS, Azure, and Google Cloud.',
  },
  {
    id: 'feature-6',
    icon: Database,
    title: 'Data Loss Prevention',
    description:
      'Advanced DLP solutions to prevent unauthorized data exfiltration.',
  },
];

export const STATS: Stat[] = [
  { id: 'stat-1', value: 10000, suffix: '+', label: 'Protected Systems' },
  { id: 'stat-2', value: 99.9, suffix: '%', label: 'Uptime Guarantee' },
  { id: 'stat-3', value: 500, suffix: '+', label: 'Enterprise Clients' },
  { id: 'stat-4', value: 24, suffix: '/7', label: 'Support Available' },
];

// About section data
export const ABOUT_FEATURES: Feature[] = [
  {
    id: 'about-feature-1',
    icon: CheckCircle,
    title: 'Industry-Leading Expertise',
    description: 'Over 15 years of experience in cybersecurity',
  },
  {
    id: 'about-feature-2',
    icon: CheckCircle,
    title: 'Certified Professionals',
    description: 'Team of certified security experts',
  },
  {
    id: 'about-feature-3',
    icon: CheckCircle,
    title: '24/7 Monitoring',
    description: 'Round-the-clock security monitoring',
  },
  {
    id: 'about-feature-4',
    icon: CheckCircle,
    title: 'Proven Track Record',
    description: 'Successfully protected thousands of systems',
  },
];

export const ABOUT_STATS: Stat[] = [
  { id: 'about-stat-1', value: 15, suffix: '+', label: 'Years Experience' },
  { id: 'about-stat-2', value: 10000, suffix: '+', label: 'Systems Protected' },
  { id: 'about-stat-3', value: 500, suffix: '+', label: 'Happy Clients' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'John Smith',
    company: 'TechCorp Inc.',
    role: 'CTO',
    avatar: '/images/avatars/john-smith.jpg',
    quote:
      'The security solutions provided have been exceptional. Our infrastructure has never been more secure.',
  },
  {
    id: 'testimonial-2',
    name: 'Sarah Johnson',
    company: 'DataSecure Ltd.',
    role: 'Security Director',
    avatar: '/images/avatars/sarah-johnson.jpg',
    quote:
      'Outstanding service and support. The team is always responsive and proactive in addressing our security needs.',
  },
  {
    id: 'testimonial-3',
    name: 'Michael Chen',
    company: 'CloudTech Solutions',
    role: 'CEO',
    avatar: '/images/avatars/michael-chen.jpg',
    quote:
      'Their comprehensive approach to cybersecurity has given us peace of mind. Highly recommended!',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
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

export const FOOTER_COLUMNS: FooterColumn[] = [
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

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Twitter', icon: Twitter, href: '#' },
  { platform: 'LinkedIn', icon: Linkedin, href: '#' },
  { platform: 'GitHub', icon: Github, href: '#' },
];
