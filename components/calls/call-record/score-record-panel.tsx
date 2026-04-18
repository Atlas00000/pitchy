"use client"

import { motion } from "framer-motion"

import { ScoreDimensionBar } from "@/components/analysis/score-dimension-bar"
import { ScoreRing } from "@/components/analysis/score-ring"
import { InsightSpotlightSurface } from "@/components/calls/call-insights/insight-spotlight-surface"
import type { ScoreDimensions } from "@/types"

export interface ScoreRecordPanelProps {
  readonly scores: ScoreDimensions
}

const DIMENSIONS: { key: keyof Pick<ScoreDimensions, "discovery" | "objectionHandling" | "talkListenRatio" | "nextStepClarity">; label: string }[] = [
  { key: "discovery", label: "Discovery quality" },
  { key: "objectionHandling", label: "Objection handling" },
  { key: "talkListenRatio", label: "Talk / listen ratio" },
  { key: "nextStepClarity", label: "Next step clarity" },
]

export function ScoreRecordPanel({ scores }: ScoreRecordPanelProps) {
  return (
    <InsightSpotlightSurface
      accent="caution"
      eyebrow="Rubric pulse"
      title="Call score"
      hint="Overall is a weighted read of the four dimensions. Bars animate in so you can scan weak lanes before diving into objections and coaching."
      className="w-full"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="flex flex-1 flex-col items-center justify-center gap-4 rounded-[1.35rem] border border-white/10 bg-pitchly-canvas/45 px-6 py-8 shadow-inner backdrop-blur-md dark:border-white/[0.06] dark:bg-pitchly-surface/20"
        >
          <ScoreRing score={scores.overall} size={152} />
          <p className="max-w-[14rem] text-center text-xs leading-relaxed text-pitchly-text-secondary">
            Composite score on a 0–10 scale. Use it as a headline; the lanes to the right tell you where to coach.
          </p>
        </motion.div>

        <div className="grid flex-[1.25] grid-cols-1 gap-3 sm:grid-cols-2">
          {DIMENSIONS.map(({ key, label }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 28, delay: 0.05 * i }}
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 22 } }}
              className="rounded-2xl border border-white/10 bg-pitchly-canvas/40 px-4 py-4 shadow-sm backdrop-blur-md dark:border-white/[0.06] dark:bg-pitchly-raised/25 md:px-5 md:py-4"
            >
              <ScoreDimensionBar label={label} score={scores[key]} />
            </motion.div>
          ))}
        </div>
      </div>
    </InsightSpotlightSurface>
  )
}
