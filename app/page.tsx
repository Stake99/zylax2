import dynamic from 'next/dynamic';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Features from '@/components/sections/Features';
import Stats from '@/components/sections/Stats';
import Pricing from '@/components/sections/Pricing';
import Footer from '@/components/sections/Footer';
import TestimonialsSkeleton from '@/components/sections/TestimonialsSkeleton';

// Dynamic import for Testimonials section (Embla Carousel is large)
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <TestimonialsSkeleton />,
  ssr: true,
});

export default function Home(): JSX.Element {
  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Skip to main content
      </a>
      
      <Navbar />
      
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Features />
        <Stats />
        <Testimonials />
        <Pricing />
        <Footer />
      </main>
    </>
  );
}
