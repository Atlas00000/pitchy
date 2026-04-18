"use client"

import { motion } from "framer-motion"

const driftKeys = {
  x: [0, 18, -12, 0] as number[],
  y: [0, -14, 10, 0] as number[],
  scale: [1, 1.06, 0.98, 1] as number[],
}

const driftTransition = { duration: 22, repeat: Infinity, ease: "easeInOut" as const }

export function SummaryStageBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[2.25rem]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pitchly-brand/12 via-transparent to-pitchly-score-excellence/10" />
      <motion.div
        className="absolute -left-[18%] -top-[40%] h-[120%] w-[55%] rounded-full bg-pitchly-brand/25 blur-[100px]"
        animate={driftKeys}
        transition={driftTransition}
      />
      <motion.div
        className="absolute -right-[12%] top-[10%] h-[85%] w-[48%] rounded-full bg-pitchly-score-excellence/20 blur-[90px]"
        animate={driftKeys}
        transition={{ ...driftTransition, delay: 4 }}
      />
      <motion.div
        className="absolute bottom-[-30%] left-[25%] h-[70%] w-[60%] rounded-full bg-pitchly-brand-muted/30 blur-[110px]"
        animate={driftKeys}
        transition={{ ...driftTransition, delay: 8 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]" />
    </div>
  )
}
