# Timer Display Component

A React TypeScript component that displays a timer with a circular progress indicator, built to meet specific acceptance criteria for timer functionality.

## Features

- **Time Display**: Shows remaining time in MM:SS format
- **Progress Ring**: Circular SVG-based progress indicator
- **Responsive Design**: Mobile-first approach with breakpoints from 320px to desktop
- **Accessibility**: ARIA labels, live regions, and semantic HTML
- **TypeScript**: Full type safety with interfaces and JSDoc documentation
- **Comprehensive Testing**: Unit tests covering all scenarios and edge cases

## Acceptance Criteria ✅

1. ✅ **Given**: Timer has 1500 seconds remaining (25 minutes) | **When**: TimerDisplay component renders | **Then**: Display shows '25:00' and progress ring is at 0%

2. ✅ **Given**: Timer has 750 seconds remaining (12.5 minutes) | **When**: Component updates with new remaining time | **Then**: Display shows '12:30' and progress ring is at 50%

3. ✅ **Given**: Timer has 0 seconds remaining | **When**: Component renders final state | **Then**: Display shows '00:00' and progress ring is at 100%

4. ✅ **Given**: User is on mobile device | **When**: TimerDisplay renders | **Then**: Component is fully visible and readable without horizontal scroll

## Usage

```tsx
import React from 'react';
import { TimerDisplay } from './components/TimerDisplay';

function App() {
  return (
    <TimerDisplay
      remainingTime={1500} // 25 minutes in seconds
      totalTime={1500}     // Total duration in seconds
      className="my-timer" // Optional custom styling
    />
  );
}
```

## API Reference

### TimerDisplay Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `remainingTime` | `number` | ✅ | The remaining time in seconds |
| `totalTime` | `number` | ✅ | The total time in seconds for calculating progress |
| `className` | `string` | ❌ | Optional className for custom styling |

### formatTime Utility

```tsx
import { formatTime } from './utils/timeFormat';

formatTime(1500); // Returns "25:00"
formatTime(750);  // Returns "12:30"
formatTime(0);    // Returns "00:00"
```

## File Structure

```
src/
├── components/
│   ├── TimerDisplay.tsx           # Main component
│   ├── TimerDisplay.module.css    # Component styles
│   └── TimerDisplay.test.tsx      # Component tests
├── utils/
│   ├── timeFormat.ts              # Time formatting utility
│   └── timeFormat.test.ts         # Utility tests
├── example/
│   └── TimerDisplayExample.tsx    # Usage examples
└── index.ts                       # Main exports
```

## Features Details

### Time Formatting
- Converts seconds to MM:SS format
- Handles negative values (treats as 0)
- Proper zero-padding for single digits
- Floors decimal values to nearest integer

### Progress Ring
- SVG-based circular progress indicator
- Calculates percentage: `(totalTime - remainingTime) / totalTime * 100`
- Smooth transitions with CSS animations
- Accessible (hidden from screen readers)

### Responsive Design
- Mobile-first CSS with breakpoints:
  - 320px and below: Compact layout
  - 321px - 480px: Small mobile
  - 481px - 768px: Large mobile/tablet
  - 769px+: Desktop
- Scalable SVG graphics
- Readable typography at all sizes

### Accessibility
- `role="timer"` for semantic meaning
- `aria-label` with current time
- `aria-live="polite"` for time updates
- High contrast mode support
- Reduced motion preferences respected