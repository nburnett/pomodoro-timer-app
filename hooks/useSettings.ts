import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Interface for application settings
 */
export interface SettingsState {
  workDuration: number; // Duration in minutes
  breakDuration: number; // Duration in minutes
}

/**
 * Return type for useSettings hook
 */
export interface UseSettingsReturn {
  settings: SettingsState;
  updateWorkDuration: (duration: number) => void;
  updateBreakDuration: (duration: number) => void;
  updateSettings: (newSettings: Partial<SettingsState>) => void;
  resetSettings: () => void;
}

/**
 * Default settings values
 */
const DEFAULT_SETTINGS: SettingsState = {
  workDuration: 25, // 25 minutes (Pomodoro technique default)
  breakDuration: 5,  // 5 minutes break
};

/**
 * Validation constants
 */
const MIN_DURATION = 1; // 1 minute minimum
const MAX_DURATION = 120; // 2 hours maximum

/**
 * Validates duration values
 * @param duration - Duration in minutes to validate
 * @returns Validated duration within allowed range
 */
function validateDuration(duration: number): number {
  if (typeof duration !== 'number' || isNaN(duration)) {
    console.warn('Invalid duration provided, using default');
    return 25;
  }

  if (duration < MIN_DURATION) {
    console.warn(`Duration ${duration} is below minimum ${MIN_DURATION}, using minimum`);
    return MIN_DURATION;
  }

  if (duration > MAX_DURATION) {
    console.warn(`Duration ${duration} is above maximum ${MAX_DURATION}, using maximum`);
    return MAX_DURATION;
  }

  return Math.round(duration);
}

/**
 * Custom hook for managing application settings with localStorage persistence
 * @returns Object containing settings state and update methods
 */
export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useLocalStorage<SettingsState>(
    'pomodoro-settings',
    DEFAULT_SETTINGS
  );

  /**
   * Updates work duration with validation
   */
  const updateWorkDuration = useCallback(
    (duration: number) => {
      const validatedDuration = validateDuration(duration);
      setSettings(prev => ({
        ...prev,
        workDuration: validatedDuration,
      }));
    },
    [setSettings]
  );

  /**
   * Updates break duration with validation
   */
  const updateBreakDuration = useCallback(
    (duration: number) => {
      const validatedDuration = validateDuration(duration);
      setSettings(prev => ({
        ...prev,
        breakDuration: validatedDuration,
      }));
    },
    [setSettings]
  );

  /**
   * Updates multiple settings at once
   */
  const updateSettings = useCallback(
    (newSettings: Partial<SettingsState>) => {
      setSettings(prev => {
        const updated = { ...prev };

        if (newSettings.workDuration !== undefined) {
          updated.workDuration = validateDuration(newSettings.workDuration);
        }

        if (newSettings.breakDuration !== undefined) {
          updated.breakDuration = validateDuration(newSettings.breakDuration);
        }

        return updated;
      });
    },
    [setSettings]
  );

  /**
   * Resets settings to default values
   */
  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, [setSettings]);

  return {
    settings,
    updateWorkDuration,
    updateBreakDuration,
    updateSettings,
    resetSettings,
  };
}