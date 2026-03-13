import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import './App.css'
import Envelope from './components/Envelope'
import Letter from './components/Letter'

function App() {
  const [showLetter, setShowLetter] = useState(false)

  return (
    <>
      <AnimatePresence>
        <Envelope
          isOpen={showLetter}
          onOpen={() => setShowLetter(true)}
        />
        {showLetter && <Letter onClose={() => setShowLetter(false)} />}
      </AnimatePresence>
    </>
  )
}

export default App
