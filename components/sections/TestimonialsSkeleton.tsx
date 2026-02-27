import React from 'react';
import Container from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Testimonials Skeleton Component
 * 
 * Loading skeleton displayed while Testimonials section is being dynamically imported.
 * Matches the layout and structure of the actual Testimonials component.
 */

export default function TestimonialsSkeleton(): JSX.Element {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background">
      <Container>
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Trusted by leading organizations worldwide"
          centered
        />

        <div className="relative">
          {/* Skeleton Carousel Container */}
          <div className="overflow-hidden">
            <div className="flex">
              <div className="flex-[0_0_100%] min-w-0 md:flex-[0_0_90%] md:pl-4">
                <div className="bg-card rounded-xl p-8 md:p-12 border border-white/10 mx-2 md:mx-4 animate-pulse">
                  {/* Avatar Skeleton */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/10" />
                  </div>

                  {/* Quote Skeleton */}
                  <div className="space-y-3 mb-6">
                    <div className="h-4 bg-white/10 rounded w-full" />
                    <div className="h-4 bg-white/10 rounded w-5/6 mx-auto" />
                    <div className="h-4 bg-white/10 rounded w-4/6 mx-auto" />
                  </div>

                  {/* Name Skeleton */}
                  <div className="text-center space-y-2">
                    <div className="h-4 bg-white/10 rounded w-32 mx-auto" />
                    <div className="h-3 bg-white/10 rounded w-40 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows Skeleton */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-card border border-white/10 opacity-50" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-card border border-white/10 opacity-50" />
        </div>

        {/* Dot Indicators Skeleton */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full bg-white/20 ${
                index === 0 ? 'w-8' : ''
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
