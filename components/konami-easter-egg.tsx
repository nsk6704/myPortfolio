'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function KonamiEasterEgg() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const inputRef = useRef<string[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      inputRef.current.push(e.key.length === 1 ? e.key.toLowerCase() : e.key)
      if (inputRef.current.length > 10) {
        inputRef.current.shift()
      }

      if (
        inputRef.current.length === 10 &&
        inputRef.current.every((key, i) => key === KONAMI_CODE[i])
      ) {
        setShowConfetti(true)
        setGlitch(true)
        setTimeout(() => setShowConfetti(false), 5000)
        setTimeout(() => setGlitch(false), 2500)
        inputRef.current = []
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          colors={['#FF6B35', '#00D9FF', '#1EFF00', '#B794F6', '#FFD23F']}
        />
      )}
      <AnimatePresence>
        {glitch && (
          <motion.div
            key="glitch"
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              x: [0, -8, 6, -4, 4, -2, 2, 0],
              opacity: [0, 0.25, 0.15, 0.2, 0.1, 0.15, 0.05, 0],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              times: [0, 0.1, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
            }}
            exit={{ opacity: 0 }}
          >
            <div className="h-full w-full bg-gradient-to-b from-main/20 via-transparent to-main/10 mix-blend-overlay" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
