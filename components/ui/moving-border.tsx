'use client'

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MovingBorderProps {
  children: React.ReactNode
  duration?: number
  className?: string
  containerClassName?: string
}

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
}: MovingBorderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-base border-2 border-border bg-background shadow-shadow",
        containerClassName
      )}
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from var(--angle), transparent 70%, oklch(66.9% 0.18368 248.8066) 80%, transparent 90%)`,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <div
        className={cn(
          "relative m-[2px] rounded-base bg-background",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
