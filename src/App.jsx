import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Portfolio</h1>
        <p className="text-xl text-blue-100 mb-8">
          React + Tailwind CSS project with Vite
        </p>
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
          >
            Count is {count}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
