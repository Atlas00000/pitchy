"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

import type { CoachingNote, Objection } from "@/types"
import { staggerContainerVariants, staggerItemVariants } from "@/components/motion/motion-config"

import { CoachingImprovementPanel } from "./coaching-improvement-panel"
import { CoachingStrengthPanel } from "./coaching-strength-panel"
import { ObjectionsInsightPanel } from "./objections-insight-panel"

export interface CallAnalysisInsightsProps {
  readonly objections: Objection[]
  readonly coachingNotes: CoachingNote[]
}

export function CallAnalysisInsights({ objections, coachingNotes }: CallAnalysisInsightsProps) {
  const strengths = useMemo(() => coachingNotes.filter((n) => n.type === "strength"), [coachingNotes])
  const improvements = useMemo(() => coachingNotes.filter((n) => n.type === "improvement"), [coachingNotes])

  return (
    <motion.div
      className="flex flex-col gap-5 md:gap-6"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={staggerItemVariants}>
        <ObjectionsInsightPanel objections={objections} />
      </motion.div>
      <motion.div variants={staggerItemVariants}>
        <CoachingStrengthPanel notes={strengths} />
      </motion.div>
      <motion.div variants={staggerItemVariants}>
        <CoachingImprovementPanel notes={improvements} />
      </motion.div>
    </motion.div>
  )
}
