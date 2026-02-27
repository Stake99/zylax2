import { SectionHeading } from './SectionHeading';

/**
 * Example usage of the SectionHeading component
 * 
 * This file demonstrates various configurations of the SectionHeading component
 * including title-only, with subtitle, centered alignment, and custom styling.
 */

export function SectionHeadingExamples(): JSX.Element {
  return (
    <div className="space-y-16 p-8 bg-background">
      {/* Basic usage - title only */}
      <div>
        <h3 className="text-sm text-muted mb-4">Basic - Title Only</h3>
        <SectionHeading title="Our Services" />
      </div>

      {/* With subtitle */}
      <div>
        <h3 className="text-sm text-muted mb-4">With Subtitle</h3>
        <SectionHeading
          title="Advanced Security Solutions"
          subtitle="Protecting your digital assets with cutting-edge technology"
        />
      </div>

      {/* Centered alignment */}
      <div>
        <h3 className="text-sm text-muted mb-4">Centered Alignment</h3>
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Trusted by leading organizations worldwide"
          centered
        />
      </div>

      {/* With custom className */}
      <div>
        <h3 className="text-sm text-muted mb-4">Custom Styling</h3>
        <SectionHeading
          title="Pricing Plans"
          subtitle="Choose the perfect plan for your needs"
          centered
          className="max-w-2xl mx-auto"
        />
      </div>

      {/* Long title and subtitle */}
      <div>
        <h3 className="text-sm text-muted mb-4">Long Content</h3>
        <SectionHeading
          title="Comprehensive Cybersecurity Solutions for Modern Enterprises"
          subtitle="We provide end-to-end security services including threat detection, data encryption, security audits, and 24/7 monitoring to keep your business safe from evolving cyber threats"
        />
      </div>
    </div>
  );
}

export default SectionHeadingExamples;
