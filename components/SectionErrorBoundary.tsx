'use client';

import React, { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import Container from './ui/Container';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
}

export function SectionErrorBoundary({ children, sectionName }: SectionErrorBoundaryProps): JSX.Element {
  return (
    <ErrorBoundary
      fallback={
        <section className="py-20 bg-background">
          <Container>
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {sectionName ? `Error loading ${sectionName}` : 'Section unavailable'}
                </h2>
                <p className="text-muted mb-6">
                  This section is temporarily unavailable. Please refresh the page or try again later.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </Container>
        </section>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
