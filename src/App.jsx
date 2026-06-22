import { useState } from 'react'
import Preloader from './components/preLoader'

function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      {!booted && <Preloader onComplete={() => setBooted(true)} />}
      {booted && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="font-mono text-sm tracking-widest" style={{ color: 'var(--color-primary)' }}>
            SYSTEM_READY
          </p>
        </div>
      )}
    </>
  )
}

export default App