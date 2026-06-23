import { useState } from 'react'
import Preloader from './components/preLoader'
import Hero from './components/hero'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && <Hero />}
    </>
  )
}

export default App