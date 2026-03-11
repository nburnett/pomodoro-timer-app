import { useState, useEffect, useRef } from 'react'
import TimerControls from './TimerControls'

interface TimerProps {
  initialMinutes: number
}

enum TimerStatus {
  STOPPED = 'stopped',
  RUNNING = 'running',
  PAUSED = 'paused'
}

export default function Timer({ initialMinutes }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60) // Convert to seconds
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.STOPPED)
  const initialTime = initialMinutes * 60
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Start the timer
  const start = () => {
    if (status === TimerStatus.RUNNING) return

    setStatus(TimerStatus.RUNNING)
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Timer finished
          setStatus(TimerStatus.STOPPED)
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }

  // Pause the timer
  const pause = () => {
    if (status !== TimerStatus.RUNNING) return

    setStatus(TimerStatus.PAUSED)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Reset the timer
  const reset = () => {
    setStatus(TimerStatus.STOPPED)
    setTimeLeft(initialTime)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      minWidth: '300px'
    }}>
      {/* Timer Display */}
      <div style={{
        fontSize: '4rem',
        fontWeight: 'bold',
        color: status === TimerStatus.RUNNING ? '#e74c3c' : '#2c3e50',
        marginBottom: '2rem',
        fontFamily: 'monospace'
      }}>
        {formatTime(timeLeft)}
      </div>

      {/* Timer Status */}
      <div style={{
        fontSize: '1.2rem',
        color: '#7f8c8d',
        marginBottom: '2rem',
        textTransform: 'capitalize'
      }}>
        Status: {status}
      </div>

      {/* Timer Controls */}
      <TimerControls
        status={status}
        start={start}
        pause={pause}
        reset={reset}
      />
    </div>
  )
}