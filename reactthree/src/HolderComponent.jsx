import React from 'react'
import VideoPlayer from './VideoPlayer'

export default function HolderComponent() {
  return (
    <div style={{
      position: 'fixed', // Use fixed positioning
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#242424' // Match your theme
    }}>
      <div className="app-container" style={{
        width: '100%',
        height: '100%',
        maxWidth: '1400px',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex', // Add this
        alignItems: 'center', // Add this
        justifyContent: 'center' // Add this
      }}>
        <VideoPlayer 
          src="/moun.mp4"
          title="Featured Video"
          style={{ 
            width: '100%',
            height: '100%',
            margin: 0 
          }}
        />
      </div>
    </div>
  )
}
