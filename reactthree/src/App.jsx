
import './App.css'
import VideoPlayer from './VideoPlayer'

function App() {
  return (
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
  )
}

export default App
