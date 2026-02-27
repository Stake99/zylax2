import type { Metadata } from 'next';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'CyberShield - Advanced Cybersecurity Solutions',
  description: 'Advanced cybersecurity solutions powered by AI to protect your business from evolving threats',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className="antialiased">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
