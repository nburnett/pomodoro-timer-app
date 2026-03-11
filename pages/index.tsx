import { useState } from 'react'
import Timer from '../components/Timer'

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0'
    }}>
      <h1 style={{
        marginBottom: '2rem',
        color: '#333',
        fontSize: '2.5rem'
      }}>
        Pomodoro Timer
      </h1>
      <Timer initialMinutes={25} />
    </div>
  )
}