import { KeyboardEvent } from 'react'

interface TimerControlsProps {
  status: 'stopped' | 'running' | 'paused'
  start: () => void
  pause: () => void
  reset: () => void
}

export default function TimerControls({ status, start, pause, reset }: TimerControlsProps) {
  const isRunning = status === 'running'
  const isPausedOrStopped = status === 'paused' || status === 'stopped'

  // Handle keyboard events for pause button (Enter key)
  const handlePauseKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      pause()
    }
  }

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '100px'
  }

  const enabledStyle = {
    ...buttonStyle,
    opacity: 1
  }

  const disabledStyle = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: 'not-allowed'
  }

  const startButtonStyle = {
    ...enabledStyle,
    backgroundColor: '#27ae60',
    color: 'white'
  }

  const pauseButtonStyle = {
    ...enabledStyle,
    backgroundColor: '#f39c12',
    color: 'white'
  }

  const resetButtonStyle = {
    ...enabledStyle,
    backgroundColor: '#e74c3c',
    color: 'white'
  }

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {/* Start Button - Enabled when paused or stopped, Disabled when running */}
      <button
        onClick={start}
        disabled={isRunning}
        style={isPausedOrStopped ? startButtonStyle : { ...startButtonStyle, ...disabledStyle }}
        aria-label="Start timer"
      >
        Start
      </button>

      {/* Pause Button - Enabled when running, Disabled when paused or stopped */}
      <button
        onClick={pause}
        onKeyDown={handlePauseKeyDown}
        disabled={isPausedOrStopped}
        style={isRunning ? pauseButtonStyle : { ...pauseButtonStyle, ...disabledStyle }}
        aria-label="Pause timer"
      >
        Pause
      </button>

      {/* Reset Button - Always enabled */}
      <button
        onClick={reset}
        style={resetButtonStyle}
        aria-label="Reset timer"
      >
        Reset
      </button>
    </div>
  )
}