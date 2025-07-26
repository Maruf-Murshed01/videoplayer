import { useState, useRef, useEffect } from 'react'

// SVG Icon Components
const PlayIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 5v14l11-7z"/>
  </svg>
)

const PauseIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
)

const VolumeIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
)

const MuteIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
  </svg>
)

const RewindIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
  </svg>
)

const FastForwardIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
  </svg>
)

const Replay5Icon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 5v14l-11-7z"/>
  </svg>
)

const Forward5Icon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 5v14l11-7z"/>
  </svg>
)

const VideoPlayer = ({ 
  src = "/moun.mp4", 
  title = "Video Player",
  style = {},
  aspectRatio = "16/9", // New prop for aspect ratio control
  maxWidth = "100%"     // New prop for maximum width
}) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime)
      const updateDuration = () => setDuration(video.duration)
      
      video.addEventListener('timeupdate', updateTime)
      video.addEventListener('loadedmetadata', updateDuration)
      
      return () => {
        video.removeEventListener('timeupdate', updateTime)
        video.removeEventListener('loadedmetadata', updateDuration)
      }
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProgressChange = (e) => {
    const video = videoRef.current
    if (video) {
      const newTime = (e.target.value / 100) * duration
      video.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const skipForward = () => {
    const video = videoRef.current
    if (video) {
      video.currentTime = Math.min(video.currentTime + 10, duration)
    }
  }

  const skipBackward = () => {
    const video = videoRef.current
    if (video) {
      video.currentTime = Math.max(video.currentTime - 10, 0)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const video = videoRef.current
    const newVolume = e.target.value / 100
    if (video) {
      video.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div 
      className="video-container" 
      style={{ 
        margin: '20px auto', 
        padding: '0 20px',
        maxWidth: maxWidth,
        width: '100%',
        boxSizing: 'border-box',
        ...style 
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{title}</h2>
      <div style={{ 
        position: 'relative', 
        width: '100%',
        aspectRatio: aspectRatio,
        maxWidth: '100%',
        margin: '0 auto'
      }}>
        <video 
          ref={videoRef}
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Ensures video maintains aspect ratio and fits within container
            border: '2px solid #646cff',
            borderRadius: '8px',
            display: 'block',
            backgroundColor: '#000' // Black background for letterboxing if needed
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Custom Controls Bar */}
        <div style={{
          position: 'absolute',
          bottom: '-130px',
          left: '0',
          right: '0',
          background: 'rgba(1, 1, 1, 0.7)',
          borderRadius: '8px',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(5px, 1vw, 15px)', // Responsive gap
          minHeight: '80px',
          overflow: 'hidden' // Prevent overflow
        }}>
          
          {/* Left Side - Sound Controls */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'clamp(5px, 0.8vw, 10px)', // Responsive gap
            minWidth: 'fit-content',
            flexShrink: 0 // Prevent shrinking
          }}>
            <button
              onClick={toggleMute}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: 'clamp(8px, 1.2vw, 15px)', // Responsive padding
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                minWidth: 'clamp(35px, 4vw, 50px)', // Responsive size
                minHeight: 'clamp(35px, 4vw, 50px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.transform = 'scale(1)'
              }}
            >
              {isMuted ? <MuteIcon /> : <VolumeIcon />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume * 100}
              onChange={handleVolumeChange}
              style={{ 
                width: 'clamp(50px, 6vw, 80px)', // More compact responsive width
                minWidth: '50px',
                flexShrink: 0
              }}
            />
          </div>

          {/* Center - Progress Bar */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'clamp(5px, 0.8vw, 10px)', // Responsive gap
            margin: '0 clamp(8px, 1.5vw, 20px)', // Responsive margin
            minWidth: '150px' // Reduced minimum width
          }}>
            <span style={{ 
              color: 'white', 
              fontSize: 'clamp(9px, 1vw, 12px)', // Smaller responsive font
              minWidth: 'clamp(30px, 3vw, 40px)', // Responsive width
              textAlign: 'center',
              flexShrink: 0
            }}>
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleProgressChange}
              style={{ 
                flex: 1,
                height: '6px',
                background: '#333',
                outline: 'none',
                cursor: 'pointer',
                minWidth: '80px' // Reduced minimum width
              }}
            />
            <span style={{ 
              color: 'white', 
              fontSize: 'clamp(9px, 1vw, 12px)', // Smaller responsive font
              minWidth: 'clamp(30px, 3vw, 40px)', // Responsive width
              textAlign: 'center',
              flexShrink: 0
            }}>
              {formatTime(duration)}
            </span>
          </div>

          {/* Right Side - Playback Controls */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'clamp(0px, 0.3vw, 2px)', // Very small responsive gap
            minWidth: 'fit-content',
            flexShrink: 0 // Prevent shrinking
          }}>
            <button 
              onClick={skipBackward}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: 'clamp(1px, 0.3vw, 2px)', // Responsive padding
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                minWidth: 'clamp(24px, 2.5vw, 32px)', // Responsive size
                minHeight: 'clamp(24px, 2.5vw, 32px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.transform = 'scale(1)'
              }}
            >
              <RewindIcon />
            </button>
            <button 
              onClick={() => {
                const video = videoRef.current
                if (video) video.currentTime = Math.max(video.currentTime - 5, 0)
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: 'clamp(1px, 0.3vw, 2px)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                minWidth: 'clamp(24px, 2.5vw, 32px)',
                minHeight: 'clamp(24px, 2.5vw, 32px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.transform = 'scale(1)'
              }}
            >
              <Replay5Icon />
            </button>
            <button 
              onClick={() => {
                const video = videoRef.current
                if (video) video.currentTime = Math.min(video.currentTime + 5, duration)
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: 'clamp(1px, 0.3vw, 2px)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                minWidth: 'clamp(24px, 2.5vw, 32px)',
                minHeight: 'clamp(24px, 2.5vw, 32px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.transform = 'scale(1)'
              }}
            >
              <Forward5Icon />
            </button>
            <button 
              onClick={skipForward}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: 'clamp(1px, 0.3vw, 2px)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                minWidth: 'clamp(24px, 2.5vw, 32px)',
                minHeight: 'clamp(24px, 2.5vw, 32px)',
                marginRight: 'clamp(8px, 1.2vw, 16px)' // Responsive margin
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.transform = 'scale(1)'
              }}
            >
              <FastForwardIcon />
            </button>
            <button 
              onClick={togglePlay}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: 'clamp(6px, 1vw, 8px)', // Responsive padding
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                minWidth: 'clamp(40px, 4vw, 50px)', // Responsive size
                minHeight: 'clamp(40px, 4vw, 50px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.transform = 'scale(1)'
              }}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer 