# Testing Infrastructure

This directory contains testing utilities for the cybersecurity website project.

## Overview

The testing infrastructure includes:
- **Mock Data**: Pre-defined test data for all data types
- **Arbitraries**: Fast-check generators for property-based testing
- **Configuration**: Vitest configured with coverage and property-based testing support

## Files

### `mockData.ts`
Contains mock data for all data types used in the application:
- `mockServices`: Array of service objects
- `mockFeatures`: Array of feature objects
- `mockStats`: Array of stat objects
- `mockTestimonials`: Array of testimonial objects
- `mockPricingPlans`: Array of pricing plan objects
- `mockFooterColumns`: Array of footer column objects
- `mockSocialLinks`: Array of social link objects

**Usage:**
```typescript
import { mockServices, mockTestimonials } from '@/lib/test-utils/mockData';

it('should render services', () => {
  render(<Services services={mockServices} />);
  // assertions...
});
```

### `arbitraries.ts`
Contains fast-check arbitraries for generating random test data:
- `serviceArbitrary`: Generates random Service objects
- `featureArbitrary`: Generates random Feature objects
- `statArbitrary`: Generates random Stat objects
- `testimonialArbitrary`: Generates random Testimonial objects
- `pricingPlanArbitrary`: Generates random PricingPlan objects
- `footerLinkArbitrary`: Generates random FooterLink objects
- `footerColumnArbitrary`: Generates random FooterColumn objects
- `socialLinkArbitrary`: Generates random SocialLink objects
- `viewportArbitrary`: Generates random viewport dimensions
- `mobileViewportArbitrary`: Generates mobile viewport dimensions (< 768px)
- `desktopViewportArbitrary`: Generates desktop viewport dimensions (≥ 768px)
- `animationDurationArbitrary`: Generates animation durations (≥ 300ms)
- `counterValueArbitrary`: Generates counter values
- `emailArbitrary`: Generates valid email addresses
- `invalidEmailArbitrary`: Generates invalid email addresses for validation testing

**Usage:**
```typescript
import { test } from '@fast-check/vitest';
import { serviceArbitrary } from '@/lib/test-utils/arbitraries';

// Feature: cybersecurity-website, Property 3: Service Card Completeness
test.prop([serviceArbitrary], { numRuns: 100 })(
  'all service cards contain required fields',
  (service) => {
    expect(service).toHaveProperty('id');
    expect(service).toHaveProperty('title');
    // more assertions...
  }
);
```

## Property-Based Testing

### Configuration
Property-based tests are configured to run with a minimum of 100 iterations as per the design requirements.

### Writing Property Tests

1. Import the test function from `@fast-check/vitest`:
```typescript
import { test } from '@fast-check/vitest';
```

2. Import the arbitraries you need:
```typescript
import { serviceArbitrary, featureArbitrary } from '@/lib/test-utils/arbitraries';
```

3. Write your property test with the required comment format:
```typescript
// Feature: cybersecurity-website, Property {number}: {property_text}
test.prop([serviceArbitrary], { numRuns: 100 })(
  'property description',
  (service) => {
    // test assertions
  }
);
```

### Property Test Format Requirements

Each property test MUST include:
1. A comment linking to the design document property:
   ```typescript
   // Feature: cybersecurity-website, Property 3: Service Card Completeness
   ```

2. The `numRuns` option set to at least 100:
   ```typescript
   test.prop([arbitrary], { numRuns: 100 })
   ```

3. A descriptive test name that explains what property is being tested

## Unit Testing

### Using Mock Data

For unit tests, use the pre-defined mock data from `mockData.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockServices } from '@/lib/test-utils/mockData';
import Services from '@/components/sections/Services';

describe('Services Component', () => {
  it('should render all services', () => {
    render(<Services services={mockServices} />);
    
    mockServices.forEach(service => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });
  });
});
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm test -- --watch
```

### Run tests with coverage:
```bash
npm test -- --coverage
```

### Run specific test file:
```bash
npm test -- path/to/test.test.tsx
```

### Run property-based tests with verbose output:
```bash
npm test -- --reporter=verbose
```

## Coverage Configuration

Coverage is configured in `vitest.config.ts` with the following exclusions:
- `node_modules/`
- `vitest.setup.ts`
- `vitest.config.ts`
- `**/*.config.ts`
- `**/*.config.js`
- `**/types.ts`
- `**/*.d.ts`
- `lib/test-utils/**`

Coverage reports are generated in:
- Text format (console output)
- JSON format (`coverage/coverage-final.json`)
- HTML format (`coverage/index.html`)

## Example Test File

See `example.test.ts` for complete examples of:
- Unit tests with mock data
- Property-based tests with arbitraries
- Proper test structure and formatting
- Comment format for property tests

## Best Practices

1. **Use mock data for unit tests**: Import from `mockData.ts` for consistent test data
2. **Use arbitraries for property tests**: Import from `arbitraries.ts` for random data generation
3. **Always set numRuns to 100+**: Property tests must run at least 100 iterations
4. **Link to design properties**: Include the property comment format for all property tests
5. **Test user behavior**: Focus on testing from the user's perspective
6. **Keep tests isolated**: Each test should be independent
7. **Use descriptive names**: Test names should clearly describe what is being tested
8. **Follow AAA pattern**: Arrange, Act, Assert

## Troubleshooting

### Tests failing with "configureGlobal is not a function"
This error occurs if you try to use `configureGlobal` from `@fast-check/vitest`. Instead, configure each test individually using the `numRuns` option:
```typescript
test.prop([arbitrary], { numRuns: 100 })('test name', (value) => { ... });
```

### IntersectionObserver errors
The setup file includes a mock for `IntersectionObserver` which is used by Framer Motion. This should handle most animation-related test issues.

### matchMedia errors
The setup file includes a mock for `window.matchMedia` which is used for responsive design and reduced motion detection.
