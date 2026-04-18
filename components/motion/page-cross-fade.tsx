"use client"

import type { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { pageCrossFadeVariants } from "@/components/motion/motion-config"

interface PageCrossFadeProps {
  children: ReactNode
  className?: string
}

/**
 * Route segment transitions: fade + slight vertical shift (UI-OVERHAUL Week 8).
 * Wrap the slot that swaps on navigation (e.g. `main` children).
 */
export function PageCrossFade({ children, className }: PageCrossFadeProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={className}
        variants={pageCrossFadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
