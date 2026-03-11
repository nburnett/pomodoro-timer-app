import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimerDisplay } from './TimerDisplay';

describe('TimerDisplay', () => {
  describe('Time Display Formatting', () => {
    it('displays 25:00 when timer has 1500 seconds remaining', () => {
      render(<TimerDisplay remainingTime={1500} totalTime={1500} />);

      expect(screen.getByText('25:00')).toBeInTheDocument();
      expect(screen.getByLabelText('Timer: 25:00')).toBeInTheDocument();
    });

    it('displays 12:30 when timer has 750 seconds remaining', () => {
      render(<TimerDisplay remainingTime={750} totalTime={1500} />);

      expect(screen.getByText('12:30')).toBeInTheDocument();
      expect(screen.getByLabelText('Timer: 12:30')).toBeInTheDocument();
    });

    it('displays 00:00 when timer has 0 seconds remaining', () => {
      render(<TimerDisplay remainingTime={0} totalTime={1500} />);

      expect(screen.getByText('00:00')).toBeInTheDocument();
      expect(screen.getByLabelText('Timer: 00:00')).toBeInTheDocument();
    });

    it('handles single-digit minutes and seconds with proper zero-padding', () => {
      render(<TimerDisplay remainingTime={65} totalTime={1500} />);

      expect(screen.getByText('01:05')).toBeInTheDocument();
    });

    it('handles large time values correctly', () => {
      render(<TimerDisplay remainingTime={3661} totalTime={3661} />);

      expect(screen.getByText('61:01')).toBeInTheDocument();
    });

    it('handles negative values by treating them as 0', () => {
      render(<TimerDisplay remainingTime={-100} totalTime={1500} />);

      expect(screen.getByText('00:00')).toBeInTheDocument();
    });

    it('handles decimal seconds by flooring to nearest integer', () => {
      render(<TimerDisplay remainingTime={125.8} totalTime={1500} />);

      expect(screen.getByText('02:05')).toBeInTheDocument();
    });
  });

  describe('Progress Ring Calculation', () => {
    it('shows 0% progress when timer is at full time (1500s remaining of 1500s)', () => {
      const { container } = render(<TimerDisplay remainingTime={1500} totalTime={1500} />);

      const progressRing = container.querySelector('.timer-display__progress-foreground');
      expect(progressRing).toHaveStyle({ strokeDashoffset: '339.29' });
    });

    it('shows 50% progress when timer has 750s remaining of 1500s total', () => {
      const { container } = render(<TimerDisplay remainingTime={750} totalTime={1500} />);

      const progressRing = container.querySelector('.timer-display__progress-foreground');
      const expectedOffset = 339.29 - (339.29 * 50) / 100;
      expect(progressRing).toHaveStyle({ strokeDashoffset: expectedOffset.toString() });
    });

    it('shows 100% progress when timer has 0s remaining', () => {
      const { container } = render(<TimerDisplay remainingTime={0} totalTime={1500} />);

      const progressRing = container.querySelector('.timer-display__progress-foreground');
      const expectedOffset = 339.29 - (339.29 * 100) / 100;
      expect(progressRing).toHaveStyle({ strokeDashoffset: expectedOffset.toString() });
    });

    it('handles totalTime of 0 without division by zero', () => {
      const { container } = render(<TimerDisplay remainingTime={0} totalTime={0} />);

      const progressRing = container.querySelector('.timer-display__progress-foreground');
      expect(progressRing).toHaveStyle({ strokeDashoffset: '339.29' });
    });

    it('calculates correct progress for various time combinations', () => {
      const testCases = [
        { remaining: 900, total: 1200, expectedProgress: 25 },
        { remaining: 300, total: 1200, expectedProgress: 75 },
        { remaining: 60, total: 300, expectedProgress: 80 }
      ];

      testCases.forEach(({ remaining, total, expectedProgress }) => {
        const { container } = render(<TimerDisplay remainingTime={remaining} totalTime={total} />);

        const progressRing = container.querySelector('.timer-display__progress-foreground');
        const expectedOffset = 339.29 - (339.29 * expectedProgress) / 100;
        expect(progressRing).toHaveStyle({ strokeDashoffset: expectedOffset.toString() });
      });
    });
  });

  describe('Component Rendering and Structure', () => {
    it('renders with correct ARIA attributes for accessibility', () => {
      render(<TimerDisplay remainingTime={1500} totalTime={1500} />);

      expect(screen.getByRole('timer')).toBeInTheDocument();
      expect(screen.getByLabelText('Timer: 25:00')).toBeInTheDocument();
      expect(screen.getByText('25:00')).toHaveAttribute('aria-live', 'polite');
    });

    it('applies custom className when provided', () => {
      const customClass = 'my-custom-timer';
      const { container } = render(
        <TimerDisplay remainingTime={1500} totalTime={1500} className={customClass} />
      );

      expect(container.firstChild).toHaveClass(customClass);
    });

    it('renders without className when not provided', () => {
      const { container } = render(<TimerDisplay remainingTime={1500} totalTime={1500} />);

      const timerElement = container.firstChild as HTMLElement;
      expect(timerElement.className).not.toContain('undefined');
      expect(timerElement.className).not.toContain('null');
    });

    it('contains all required SVG elements for progress ring', () => {
      const { container } = render(<TimerDisplay remainingTime={750} totalTime={1500} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 120 120');
      expect(svg).toHaveAttribute('aria-hidden', 'true');

      const circles = container.querySelectorAll('circle');
      expect(circles).toHaveLength(2);

      // Background circle
      expect(circles[0]).toHaveAttribute('r', '54');
      expect(circles[0]).toHaveAttribute('fill', 'transparent');

      // Progress circle
      expect(circles[1]).toHaveAttribute('r', '54');
      expect(circles[1]).toHaveAttribute('fill', 'transparent');
      expect(circles[1]).toHaveAttribute('stroke-linecap', 'round');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles remainingTime greater than totalTime', () => {
      const { container } = render(<TimerDisplay remainingTime={2000} totalTime={1500} />);

      expect(screen.getByText('33:20')).toBeInTheDocument();

      // Progress should be negative (clamped to 0% visually)
      const progressRing = container.querySelector('.timer-display__progress-foreground');
      const expectedOffset = 339.29 - (339.29 * -33.33) / 100; // Negative progress
      expect(progressRing).toHaveStyle({ strokeDashoffset: expectedOffset.toString() });
    });

    it('handles very large time values', () => {
      render(<TimerDisplay remainingTime={999999} totalTime={999999} />);

      expect(screen.getByText('16666:39')).toBeInTheDocument();
    });

    it('handles zero totalTime edge case', () => {
      render(<TimerDisplay remainingTime={100} totalTime={0} />);

      expect(screen.getByText('01:40')).toBeInTheDocument();

      const { container } = render(<TimerDisplay remainingTime={100} totalTime={0} />);
      const progressRing = container.querySelector('.timer-display__progress-foreground');
      expect(progressRing).toHaveStyle({ strokeDashoffset: '339.29' }); // 0% progress
    });
  });

  describe('Component Updates and Re-renders', () => {
    it('updates display when remainingTime prop changes', () => {
      const { rerender } = render(<TimerDisplay remainingTime={1500} totalTime={1500} />);

      expect(screen.getByText('25:00')).toBeInTheDocument();

      rerender(<TimerDisplay remainingTime={1200} totalTime={1500} />);

      expect(screen.getByText('20:00')).toBeInTheDocument();
      expect(screen.queryByText('25:00')).not.toBeInTheDocument();
    });

    it('updates progress ring when props change', () => {
      const { container, rerender } = render(<TimerDisplay remainingTime={1500} totalTime={1500} />);

      let progressRing = container.querySelector('.timer-display__progress-foreground');
      expect(progressRing).toHaveStyle({ strokeDashoffset: '339.29' }); // 0%

      rerender(<TimerDisplay remainingTime={750} totalTime={1500} />);

      progressRing = container.querySelector('.timer-display__progress-foreground');
      const expectedOffset = 339.29 - (339.29 * 50) / 100;
      expect(progressRing).toHaveStyle({ strokeDashoffset: expectedOffset.toString() }); // 50%
    });
  });
});