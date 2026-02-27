import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0E1A',
        card: '#1A1F35',
        muted: '#94A3B8',
        accent: {
          blue: '#3B82F6',
          cyan: '#06B6D4',
          purple: '#8B5CF6',
          pink: '#EC4899',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
      },
      maxWidth: {
        container: '1200px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
