'use client';

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Container from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TESTIMONIALS } from '@/lib/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Testimonials Section Component
 * 
 * Displays customer testimonials in a carousel with:
 * - Embla Carousel with loop and center alignment
 * - Auto-play with 5000ms interval
 * - Navigation arrows with gradient hover effect
 * - Dot indicators below carousel
 * - Each testimonial: avatar (4rem circular), quote, name, company & role
 * - Responsive: 1 slide (mobile), 1 slide with peek (desktop)
 * 
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 */

export default function Testimonials(): JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center',
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="py-20 md:py-32 relative">
      <Container>
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Trusted by leading organizations worldwide"
          centered
        />

        {TESTIMONIALS.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted text-lg">
              No testimonials available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <>
            <div className="relative">
              {/* Carousel Container */}
              <div 
                className="overflow-hidden" 
                ref={emblaRef}
                role="region"
                aria-label="Customer testimonials carousel"
                aria-live="polite"
              >
                <div className="flex">
                  {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_90%] md:pl-4"
                  data-testid={`testimonial-slide-${testimonial.id}`}
                >
                  <div 
                    className="bg-card rounded-xl p-8 md:p-12 border border-white/10 mx-2 md:mx-4"
                    data-testid={`testimonial-${testimonial.id}`}
                  >
                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                      <div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-gray-400 flex items-center justify-center text-white text-2xl font-bold"
                        data-testid="testimonial-avatar"
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote
                      className="text-lg italic text-white text-center mb-6 leading-relaxed"
                      data-testid="testimonial-quote"
                    >
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    {/* Name */}
                    <div className="text-center">
                      <p
                        className="text-base font-semibold text-white mb-1"
                        data-testid="testimonial-name"
                      >
                        {testimonial.name}
                      </p>

                      {/* Company & Role */}
                      <p
                        className="text-sm text-muted"
                        data-testid="testimonial-company-role"
                      >
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Only show if more than 1 testimonial */}
          {TESTIMONIALS.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-gray-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Previous testimonial"
                data-testid="carousel-prev-button"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>

              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-gray-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Next testimonial"
                data-testid="carousel-next-button"
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* Dot Indicators - Only show if more than 1 testimonial */}
        {TESTIMONIALS.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-background ${
                  index === selectedIndex
                    ? 'bg-gradient-to-r from-blue-500 to-gray-400 w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === selectedIndex ? 'true' : 'false'}
                data-testid={`carousel-dot-${index}`}
              />
            ))}
          </div>
        )}
      </>
        )}
      </Container>
    </section>
  );
}
