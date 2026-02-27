'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackComponent?: React.ReactNode;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  fallbackComponent,
  ...props
}: ImageWithFallbackProps): JSX.Element {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (error && fallbackComponent) {
    return <>{fallbackComponent}</>;
  }

  if (error && fallbackSrc) {
    return (
      <Image
        {...props}
        src={fallbackSrc}
        alt={alt || 'Fallback image'}
        onError={() => {
          // If fallback also fails, show nothing
          setError(true);
        }}
      />
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center bg-card text-muted"
        style={{ width: props.width, height: props.height }}
      >
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className="animate-pulse bg-card"
          style={{ width: props.width, height: props.height }}
        />
      )}
      <Image
        {...props}
        src={src}
        alt={alt}
        onError={() => setError(true)}
        onLoad={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </>
  );
}
