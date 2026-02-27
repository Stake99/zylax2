import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from './SectionHeading';

describe('SectionHeading', () => {
  it('renders title correctly', () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeading title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<SectionHeading title="Test Title" />);
    const subtitle = screen.queryByText('Test Subtitle');
    expect(subtitle).not.toBeInTheDocument();
  });

  it('applies centered class when centered prop is true', () => {
    const { container } = render(<SectionHeading title="Test Title" centered />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('text-center');
  });

  it('does not apply centered class when centered prop is false', () => {
    const { container } = render(<SectionHeading title="Test Title" centered={false} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain('text-center');
  });

  it('applies custom className when provided', () => {
    const { container } = render(<SectionHeading title="Test Title" className="custom-class" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('custom-class');
  });

  it('has correct responsive typography classes', () => {
    const { container } = render(<SectionHeading title="Test Title" />);
    const heading = container.querySelector('h2');
    expect(heading?.className).toContain('text-4xl');
    expect(heading?.className).toContain('md:text-5xl');
    expect(heading?.className).toContain('font-bold');
    expect(heading?.className).toContain('text-white');
  });

  it('subtitle has correct styling classes', () => {
    const { container } = render(<SectionHeading title="Test Title" subtitle="Test Subtitle" />);
    const subtitle = container.querySelector('p');
    expect(subtitle?.className).toContain('mt-4');
    expect(subtitle?.className).toContain('text-lg');
    expect(subtitle?.className).toContain('text-muted');
  });

  it('has correct bottom margin classes', () => {
    const { container } = render(<SectionHeading title="Test Title" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('mb-12');
    expect(wrapper.className).toContain('md:mb-16');
  });
});
