import { formatTime } from './timeFormat';

describe('formatTime', () => {
  describe('Basic Time Formatting', () => {
    it('formats 1500 seconds as 25:00', () => {
      expect(formatTime(1500)).toBe('25:00');
    });

    it('formats 750 seconds as 12:30', () => {
      expect(formatTime(750)).toBe('12:30');
    });

    it('formats 0 seconds as 00:00', () => {
      expect(formatTime(0)).toBe('00:00');
    });

    it('formats 60 seconds as 01:00', () => {
      expect(formatTime(60)).toBe('01:00');
    });

    it('formats 59 seconds as 00:59', () => {
      expect(formatTime(59)).toBe('00:59');
    });
  });

  describe('Zero Padding', () => {
    it('pads single-digit minutes with zero', () => {
      expect(formatTime(540)).toBe('09:00'); // 9 minutes
      expect(formatTime(65)).toBe('01:05'); // 1 minute 5 seconds
    });

    it('pads single-digit seconds with zero', () => {
      expect(formatTime(605)).toBe('10:05'); // 10 minutes 5 seconds
      expect(formatTime(61)).toBe('01:01'); // 1 minute 1 second
    });

    it('pads both single-digit minutes and seconds', () => {
      expect(formatTime(65)).toBe('01:05'); // 1 minute 5 seconds
      expect(formatTime(9)).toBe('00:09'); // 9 seconds
    });
  });

  describe('Edge Cases', () => {
    it('handles negative values by treating them as 0', () => {
      expect(formatTime(-10)).toBe('00:00');
      expect(formatTime(-1500)).toBe('00:00');
    });

    it('handles decimal values by flooring', () => {
      expect(formatTime(125.8)).toBe('02:05');
      expect(formatTime(59.9)).toBe('00:59');
      expect(formatTime(60.1)).toBe('01:00');
    });

    it('handles very large values correctly', () => {
      expect(formatTime(3661)).toBe('61:01'); // 1 hour 1 minute 1 second
      expect(formatTime(7200)).toBe('120:00'); // 2 hours
    });

    it('handles exactly 1 minute', () => {
      expect(formatTime(60)).toBe('01:00');
    });

    it('handles values just under and over minute boundaries', () => {
      expect(formatTime(59)).toBe('00:59');
      expect(formatTime(61)).toBe('01:01');
      expect(formatTime(119)).toBe('01:59');
      expect(formatTime(121)).toBe('02:01');
    });
  });

  describe('Type Coercion and Validation', () => {
    it('handles string numbers correctly', () => {
      expect(formatTime(Number('1500'))).toBe('25:00');
      expect(formatTime(Number('750'))).toBe('12:30');
    });

    it('handles infinity', () => {
      expect(formatTime(Infinity)).toBe('Infinity:NaN');
    });

    it('handles NaN', () => {
      expect(formatTime(NaN)).toBe('00:00');
    });

    it('handles very small positive numbers', () => {
      expect(formatTime(0.1)).toBe('00:00');
      expect(formatTime(0.9)).toBe('00:00');
    });
  });

  describe('Real World Scenarios', () => {
    const testCases = [
      { input: 25 * 60, expected: '25:00', description: '25 minute pomodoro' },
      { input: 15 * 60, expected: '15:00', description: '15 minute short break' },
      { input: 5 * 60, expected: '05:00', description: '5 minute break' },
      { input: 30 * 60, expected: '30:00', description: '30 minute long break' },
      { input: 1 * 60 + 30, expected: '01:30', description: '1.5 minutes remaining' },
      { input: 45, expected: '00:45', description: '45 seconds remaining' },
    ];

    testCases.forEach(({ input, expected, description }) => {
      it(`formats ${description} (${input}s) as ${expected}`, () => {
        expect(formatTime(input)).toBe(expected);
      });
    });
  });

  describe('Performance and Consistency', () => {
    it('returns consistent results for the same input', () => {
      const testValue = 1234;
      const result1 = formatTime(testValue);
      const result2 = formatTime(testValue);
      const result3 = formatTime(testValue);

      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
      expect(result1).toBe('20:34');
    });

    it('handles rapid successive calls correctly', () => {
      const results = [];
      for (let i = 0; i < 100; i++) {
        results.push(formatTime(i));
      }

      // Check a few key values
      expect(results[0]).toBe('00:00');
      expect(results[59]).toBe('00:59');
      expect(results[60]).toBe('01:00');
      expect(results[99]).toBe('01:39');
    });
  });
});