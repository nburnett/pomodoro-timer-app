/**
 * Custom Hooks for State Management
 *
 * This module exports custom React hooks for managing application state,
 * including timer functionality and settings persistence.
 */

// Export useLocalStorage hook and types
export { useLocalStorage } from './useLocalStorage';

// Export useSettings hook and types
export {
  useSettings,
  type SettingsState,
  type UseSettingsReturn,
} from './useSettings';

// Export useTimer hook and types
export {
  useTimer,
  SessionType,
  type TimerState,
  type UseTimerReturn,
} from './useTimer';