"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { mountFadeUp } from "@/components/motion/motion-config"
import { cn } from "@/lib/utils"

interface FadeInUpProps {
  children: ReactNode
  /** Stagger offset in seconds (default 0). */
  delay?: number
  className?: string
}

/** Section mount: fade in + translate up 8px (~300ms, docs/UI-OVERHAUL Week 8). */
export function FadeInUp({ children, delay = 0, className }: FadeInUpProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={mountFadeUp.initial}
      animate={mountFadeUp.animate}
      transition={mountFadeUp.transition(delay)}
    >
      {children}
    </motion.div>
  )
}
