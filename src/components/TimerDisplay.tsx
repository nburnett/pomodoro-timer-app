import React from 'react';
import { formatTime } from '../utils/timeFormat';
import styles from './TimerDisplay.module.css';

/**
 * Props for the TimerDisplay component
 */
export interface TimerDisplayProps {
  /** The remaining time in seconds */
  remainingTime: number;
  /** The total time in seconds for calculating progress */
  totalTime: number;
  /** Optional className for custom styling */
  className?: string;
}

/**
 * TimerDisplay component that shows remaining time and progress
 */
export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  remainingTime,
  totalTime,
  className = '',
}) => {
  // Calculate progress percentage (0-100)
  const progressPercentage = totalTime > 0 ? ((totalTime - remainingTime) / totalTime) * 100 : 0;

  // Format the remaining time
  const formattedTime = formatTime(remainingTime);

  return (
    <div className={`${styles['timer-display']} ${className}`.trim()} role="timer" aria-label={`Timer: ${formattedTime}`}>
      <div className={styles['timer-display__container']}>
        {/* Circular Progress Ring */}
        <div className={styles['timer-display__progress-container']}>
          <svg className={styles['timer-display__progress-ring']} viewBox="0 0 120 120" aria-hidden="true">
            <circle
              className={styles['timer-display__progress-background']}
              cx="60"
              cy="60"
              r="54"
              fill="transparent"
              strokeWidth="12"
            />
            <circle
              className={styles['timer-display__progress-foreground']}
              cx="60"
              cy="60"
              r="54"
              fill="transparent"
              strokeWidth="12"
              strokeLinecap="round"
              style={{
                '--progress': `${progressPercentage}%`,
                strokeDasharray: '339.29',
                strokeDashoffset: `${339.29 - (339.29 * progressPercentage) / 100}`,
                transform: 'rotate(-90deg)',
                transformOrigin: 'center',
                transition: 'stroke-dashoffset 0.3s ease-in-out'
              } as React.CSSProperties}
            />
          </svg>

          {/* Time Display */}
          <div className={styles['timer-display__time']}>
            <span className={styles['timer-display__time-text']} aria-live="polite">
              {formattedTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};