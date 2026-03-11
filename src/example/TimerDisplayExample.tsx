import React, { useState, useEffect } from 'react';
import { TimerDisplay } from '../components/TimerDisplay';

/**
 * Example usage of the TimerDisplay component
 * This demonstrates the acceptance criteria scenarios
 */
export const TimerDisplayExample: React.FC = () => {
  const [remainingTime, setRemainingTime] = useState(1500); // 25 minutes
  const totalTime = 1500;

  // Simulate timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resetTimer = () => setRemainingTime(1500);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Timer Display Component Demo</h1>

      {/* Acceptance Criteria Examples */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
        <div>
          <h3>Scenario 1: 25 minutes (1500s)</h3>
          <TimerDisplay remainingTime={1500} totalTime={1500} />
          <p>Expected: Display shows '25:00' and progress ring is at 0%</p>
        </div>

        <div>
          <h3>Scenario 2: 12.5 minutes (750s)</h3>
          <TimerDisplay remainingTime={750} totalTime={1500} />
          <p>Expected: Display shows '12:30' and progress ring is at 50%</p>
        </div>

        <div>
          <h3>Scenario 3: 0 minutes (0s)</h3>
          <TimerDisplay remainingTime={0} totalTime={1500} />
          <p>Expected: Display shows '00:00' and progress ring is at 100%</p>
        </div>
      </div>

      {/* Live Timer Example */}
      <div>
        <h3>Live Timer Example</h3>
        <TimerDisplay remainingTime={remainingTime} totalTime={totalTime} />
        <div style={{ marginTop: '10px' }}>
          <button onClick={resetTimer} style={{ padding: '10px 20px', margin: '5px' }}>
            Reset Timer
          </button>
          <p>Current: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</p>
        </div>
      </div>

      {/* Mobile Responsiveness Test */}
      <div style={{ marginTop: '30px' }}>
        <h3>Mobile Responsiveness Test</h3>
        <div style={{ width: '320px', border: '1px solid #ccc', margin: '10px 0' }}>
          <p>Mobile viewport (320px width):</p>
          <TimerDisplay remainingTime={750} totalTime={1500} />
        </div>
      </div>
    </div>
  );
};