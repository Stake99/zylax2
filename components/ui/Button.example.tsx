import React from 'react';
import { Button } from './Button';

/**
 * Example usage of the Button component
 * 
 * This file demonstrates the different variants and use cases
 * for the Button component.
 */
export function ButtonExamples(): JSX.Element {
  const handleClick = (): void => {
    console.log('Button clicked!');
  };

  return (
    <div className="space-y-8 p-8 bg-background min-h-screen">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Gradient Variant (Default)</h2>
        <div className="flex gap-4 flex-wrap">
          <Button onClick={handleClick}>
            Get Started
          </Button>
          <Button onClick={handleClick}>
            Learn More
          </Button>
          <Button onClick={handleClick} className="w-48">
            Full Width Button
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Outline Variant</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="outline" onClick={handleClick}>
            View Demo
          </Button>
          <Button variant="outline" onClick={handleClick}>
            Contact Us
          </Button>
          <Button variant="outline" onClick={handleClick} className="w-48">
            Full Width Outline
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Button Types</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-4 flex-wrap">
            <Button type="button" onClick={handleClick}>
              Button Type
            </Button>
            <Button type="submit">
              Submit Type
            </Button>
            <Button type="reset">
              Reset Type
            </Button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Mixed Variants</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="gradient" onClick={handleClick}>
            Primary Action
          </Button>
          <Button variant="outline" onClick={handleClick}>
            Secondary Action
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Custom Styling</h2>
        <div className="flex gap-4 flex-wrap">
          <Button className="text-lg px-8 py-4" onClick={handleClick}>
            Large Button
          </Button>
          <Button className="text-sm px-4 py-2" onClick={handleClick}>
            Small Button
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Hover Effects</h2>
        <p className="text-muted mb-4">Hover over the buttons to see the opacity transition (300ms)</p>
        <div className="flex gap-4 flex-wrap">
          <Button onClick={handleClick}>
            Hover Me (Gradient)
          </Button>
          <Button variant="outline" onClick={handleClick}>
            Hover Me (Outline)
          </Button>
        </div>
      </div>
    </div>
  );
}
