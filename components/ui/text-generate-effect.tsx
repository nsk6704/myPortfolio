'use client'

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface TextGenerateEffectProps {
  words: string
  className?: string
  duration?: number
  delay?: number
}

export function TextGenerateEffect({
  words,
  className,
  duration = 0.5,
  delay = 0,
}: TextGenerateEffectProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const wordsArray = words.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: delay 
      },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.4, 0.0, 0.2, 1] as const,
      },
    },
  }

  return (
    <div ref={ref}>
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className={cn("", className)}
      >
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            variants={child}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
