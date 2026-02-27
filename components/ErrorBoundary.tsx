'use client';

import React, { Component, ReactNode } from 'react';
import { Button } from './ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-muted mb-6">
              We encountered an error while loading this section. Please try again.
            </p>
            <Button variant="gradient" onClick={this.handleReset}>
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
