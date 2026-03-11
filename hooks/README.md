# Custom Hooks for State Management

This package provides robust, TypeScript-enabled React hooks for state management with localStorage persistence and timer functionality.

## Hooks Overview

### 🔧 `useLocalStorage<T>`
Generic hook for localStorage-synchronized state management.

**Features:**
- Reactive state updates
- JSON serialization/deserialization
- Error handling and fallbacks
- Cross-tab synchronization
- Quota exceeded protection

**Usage:**
```typescript
const [value, setValue] = useLocalStorage('key', defaultValue);
```

### ⚙️ `useSettings`
Hook for managing application settings with validation and persistence.

**Features:**
- Work/break duration management
- Input validation (1-120 minutes)
- Immediate localStorage persistence
- Default Pomodoro settings (25/5 minutes)

**Usage:**
```typescript
const {
  settings,
  updateWorkDuration,
  updateBreakDuration,
  updateSettings,
  resetSettings
} = useSettings();

// Update work duration to 30 minutes
updateWorkDuration(30); // ✅ Persisted to localStorage
```

### ⏱️ `useTimer`
Advanced timer hook with accurate countdown and state management.

**Features:**
- Precision timing with drift correction (±100ms accuracy)
- Start, pause, resume, reset functionality
- Progress tracking and completion detection
- Session type support (work/break)
- Memory leak prevention
- Page visibility handling

**Usage:**
```typescript
const {
  state,
  start,
  pause,
  resume,
  reset,
  timeRemaining,
  progress,
  isCompleted
} = useTimer(() => console.log('Timer completed!'));

// Start 25-minute work session
start(25 * 60, SessionType.WORK); // ✅ isRunning becomes true

// Pause the timer
pause(); // ✅ isRunning becomes false
```

## Acceptance Criteria ✅

All acceptance criteria are fully implemented:

1. **✅ Timer Start**: `start()` method creates countdown with `isRunning: true`
2. **✅ Timer Pause**: `pause()` method stops timer with `isRunning: false`
3. **✅ Settings Persistence**: `updateWorkDuration(30)` persists to localStorage immediately
4. **✅ Memory Leak Prevention**: Automatic cleanup prevents memory leaks on component unmount

## TypeScript Support

Full TypeScript support with comprehensive interfaces:

```typescript
interface TimerState {
  isRunning: boolean;
  elapsed: number;
  total: number;
  sessionType: SessionType;
}

interface SettingsState {
  workDuration: number;
  breakDuration: number;
}
```

## Installation

```bash
npm install react@>=16.8.0
```

## Import

```typescript
import { useTimer, useSettings, useLocalStorage } from './hooks';
```

## Architecture

- **Performance**: 100ms update intervals with timestamp-based accuracy
- **Memory Safety**: Proper cleanup in useEffect return functions
- **Error Handling**: Graceful degradation with console warnings
- **Validation**: Input sanitization and range checking
- **Persistence**: Automatic localStorage synchronization
- **Cross-tab**: Storage event listening for multi-tab consistency

## Browser Support

Compatible with all modern browsers that support:
- localStorage API
- React Hooks (16.8+)
- ES2020 features