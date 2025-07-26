import React from 'react'
import VideoPlayer from './VideoPlayer'

export default function HolderComponent() {
  return (
    <div>
      <div className="app-container">
      <div>
        {/* Main Video Player */}
        <VideoPlayer 
          src="/moun.mp4"
          width={1400}
          height={800}
          title="Featured Video"
          style={{ marginBottom: '40px' }}
      /></div>
      
    </div>
    </div>
  )
}
