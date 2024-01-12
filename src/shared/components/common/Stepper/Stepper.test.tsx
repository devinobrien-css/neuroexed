import { render, fireEvent, screen } from '@testing-library/react';
import { Stepper } from './Stepper';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('Stepper', () => {
  const steps = [
    {
      heading: 'Step 1',
      subHeading: 'Subheading 1',
      buttonText: 'Button 1',
      onClick: vi.fn(),
    },
    {
      heading: 'Step 2',
      subHeading: 'Subheading 2',
      buttonText: 'Button 2',
      onClick: vi.fn(),
    },
  ];

  it('renders the correct number of steps', () => {
    render(<Stepper activeStep={0} steps={steps} />);
    const stepElements = screen.getAllByRole('button', { name: /Button \d/i });
    expect(stepElements).toHaveLength(steps.length);
  });

  it('renders the correct headings and subheadings', () => {
    render(<Stepper activeStep={0} steps={steps} />);
    steps.forEach((step) => {
      expect(screen.getByText(step.heading)).toBeInTheDocument();
      expect(screen.getByText(step.subHeading)).toBeInTheDocument();
    });
  });

  it('calls the correct onClick handler when a step button is clicked', () => {
    render(<Stepper activeStep={0} steps={steps} />);
    const button1 = screen.getByRole('button', { name: /Button 1/i });
    fireEvent.click(button1);
    expect(steps[0].onClick).toBeCalled();
  });
});
