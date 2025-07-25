
import './App.css'
import { useState, useRef, useEffect } from 'react'

function App() {
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
    <>
      {/* Video Player Section */}
      <div className="video-container" style={{ margin: '20px 0', position: 'relative' }}>
        <h2>Video Player</h2>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <video 
            ref={videoRef}
            width="1400" 
            height="800"
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              border: '2px solid #646cff',
              borderRadius: '8px',
              display: 'block'
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/seaa.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Custom Controls Bar */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '15px'
          }}>
            
            {/* Left Side - Sound Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={toggleMute}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume * 100}
                onChange={handleVolumeChange}
                style={{ width: '80px' }}
              />
            </div>

            {/* Center - Progress Bar */}
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              margin: '0 20px'
            }}>
              <span style={{ color: 'white', fontSize: '12px', minWidth: '40px' }}>
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
                  cursor: 'pointer'
                }}
              />
              <span style={{ color: 'white', fontSize: '12px', minWidth: '40px' }}>
                {formatTime(duration)}
              </span>
            </div>

            {/* Right Side - Playback Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={skipBackward}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                ⏪
              </button>
              <button 
                onClick={() => {
                  const video = videoRef.current
                  if (video) video.currentTime = Math.max(video.currentTime - 5, 0)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                ⏮️
              </button>
              <button 
                onClick={togglePlay}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button 
                onClick={() => {
                  const video = videoRef.current
                  if (video) video.currentTime = Math.min(video.currentTime + 5, duration)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                ⏭️
              </button>
              <button 
                onClick={skipForward}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                ⏩
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
