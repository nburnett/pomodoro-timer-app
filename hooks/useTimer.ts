import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Enum for different session types
 */
export enum SessionType {
  WORK = 'work',
  BREAK = 'break',
}

/**
 * Interface for timer state
 */
export interface TimerState {
  isRunning: boolean;
  elapsed: number; // Elapsed time in seconds
  total: number; // Total duration in seconds
  sessionType: SessionType;
}

/**
 * Return type for useTimer hook
 */
export interface UseTimerReturn {
  state: TimerState;
  start: (duration?: number, sessionType?: SessionType) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  timeRemaining: number; // Calculated remaining time in seconds
  progress: number; // Progress as a percentage (0-100)
  isCompleted: boolean; // Whether the timer has completed
}

/**
 * Default timer state
 */
const DEFAULT_TIMER_STATE: TimerState = {
  isRunning: false,
  elapsed: 0,
  total: 25 * 60, // 25 minutes in seconds
  sessionType: SessionType.WORK,
};

/**
 * Timer update interval in milliseconds (100ms for smooth UI updates)
 */
const TIMER_INTERVAL = 100;

/**
 * Maximum drift tolerance in milliseconds before correction
 */
const MAX_DRIFT = 100;

/**
 * Custom hook for managing timer state with accurate countdown logic
 * @param onComplete - Optional callback when timer completes
 * @returns Object containing timer state and control methods
 */
export function useTimer(onComplete?: () => void): UseTimerReturn {
  const [state, setState] = useState<TimerState>(DEFAULT_TIMER_STATE);

  // Refs for accurate time tracking
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);

  /**
   * Clears the active interval
   */
  const clearCurrentInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Updates the timer state based on current time
   */
  const updateTimer = useCallback(() => {
    setState(prevState => {
      if (!prevState.isRunning) return prevState;

      const now = Date.now();
      const elapsedMs = now - startTimeRef.current + pausedElapsedRef.current * 1000;
      const elapsed = Math.floor(elapsedMs / 1000);

      // Check if timer has completed
      if (elapsed >= prevState.total) {
        // Timer completed
        clearCurrentInterval();

        // Call completion callback
        if (onComplete) {
          try {
            onComplete();
          } catch (error) {
            console.error('Error in timer completion callback:', error);
          }
        }

        return {
          ...prevState,
          elapsed: prevState.total,
          isRunning: false,
        };
      }

      // Apply drift correction if necessary
      const expectedElapsed = Math.floor((now - startTimeRef.current) / 1000) + pausedElapsedRef.current;
      const drift = Math.abs(elapsed - expectedElapsed) * 1000; // Convert to ms

      if (drift > MAX_DRIFT) {
        console.warn(`Timer drift detected: ${drift}ms, correcting...`);
        // Adjust start time to correct drift
        startTimeRef.current = now - (expectedElapsed - pausedElapsedRef.current) * 1000;
      }

      return {
        ...prevState,
        elapsed,
      };
    });
  }, [clearCurrentInterval, onComplete]);

  /**
   * Starts the timer with optional duration and session type
   */
  const start = useCallback(
    (duration?: number, sessionType: SessionType = SessionType.WORK) => {
      try {
        const validDuration = duration && duration > 0 ? Math.round(duration) : DEFAULT_TIMER_STATE.total;

        clearCurrentInterval();

        startTimeRef.current = Date.now();
        pausedElapsedRef.current = 0;

        setState({
          isRunning: true,
          elapsed: 0,
          total: validDuration,
          sessionType,
        });

        // Start the interval
        intervalRef.current = setInterval(updateTimer, TIMER_INTERVAL);
      } catch (error) {
        console.error('Error starting timer:', error);
      }
    },
    [clearCurrentInterval, updateTimer]
  );

  /**
   * Pauses the timer
   */
  const pause = useCallback(() => {
    try {
      setState(prevState => {
        if (!prevState.isRunning) return prevState;

        clearCurrentInterval();

        // Store elapsed time when pausing
        const now = Date.now();
        const elapsedMs = now - startTimeRef.current + pausedElapsedRef.current * 1000;
        pausedElapsedRef.current = Math.floor(elapsedMs / 1000);

        return {
          ...prevState,
          isRunning: false,
          elapsed: pausedElapsedRef.current,
        };
      });
    } catch (error) {
      console.error('Error pausing timer:', error);
    }
  }, [clearCurrentInterval]);

  /**
   * Resumes the timer from paused state
   */
  const resume = useCallback(() => {
    try {
      setState(prevState => {
        if (prevState.isRunning || prevState.elapsed >= prevState.total) {
          return prevState;
        }

        clearCurrentInterval();

        // Resume from where we left off
        startTimeRef.current = Date.now();
        // pausedElapsedRef.current already contains the elapsed time

        intervalRef.current = setInterval(updateTimer, TIMER_INTERVAL);

        return {
          ...prevState,
          isRunning: true,
        };
      });
    } catch (error) {
      console.error('Error resuming timer:', error);
    }
  }, [clearCurrentInterval, updateTimer]);

  /**
   * Resets the timer to initial state
   */
  const reset = useCallback(() => {
    try {
      clearCurrentInterval();
      startTimeRef.current = 0;
      pausedElapsedRef.current = 0;

      setState(prevState => ({
        ...DEFAULT_TIMER_STATE,
        total: prevState.total, // Preserve the duration
        sessionType: prevState.sessionType, // Preserve session type
      }));
    } catch (error) {
      console.error('Error resetting timer:', error);
    }
  }, [clearCurrentInterval]);

  // Cleanup on unmount and when dependencies change
  useEffect(() => {
    return () => {
      clearCurrentInterval();
    };
  }, [clearCurrentInterval]);

  // Handle page visibility changes to pause/resume timer
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && state.isRunning) {
        // Don't pause automatically, but store the time for accuracy
        console.log('Page hidden while timer running - maintaining accuracy');
      } else if (!document.hidden && state.isRunning) {
        // Page became visible again, update timer to catch up
        updateTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [state.isRunning, updateTimer]);

  // Calculated properties
  const timeRemaining = Math.max(0, state.total - state.elapsed);
  const progress = state.total > 0 ? Math.min(100, (state.elapsed / state.total) * 100) : 0;
  const isCompleted = state.elapsed >= state.total;

  return {
    state,
    start,
    pause,
    resume,
    reset,
    timeRemaining,
    progress,
    isCompleted,
  };
}