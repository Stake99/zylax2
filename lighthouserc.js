module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run build && npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        // Performance metrics from Requirements 14.1-14.4
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }], // FCP < 1.5s
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }], // LCP < 2.5s
        'interactive': ['error', { maxNumericValue: 3500 }], // TTI < 3.5s
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }], // CLS < 0.1
        
        // Additional performance checks
        'speed-index': ['warn', { maxNumericValue: 3000 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        
        // Best practices
        'uses-optimized-images': 'error',
        'modern-image-formats': 'error',
        'offscreen-images': 'error',
        'uses-responsive-images': 'error',
        
        // Accessibility
        'categories:accessibility': ['error', { minScore: 0.9 }],
        
        // Best practices
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        
        // SEO
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
