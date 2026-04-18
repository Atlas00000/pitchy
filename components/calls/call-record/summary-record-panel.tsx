"use client"

import { motion } from "framer-motion"

import { InsightSpotlightSurface } from "@/components/calls/call-insights/insight-spotlight-surface"

const PROVIDER_LABEL: Record<"gemini" | "claude", string> = {
  gemini: "Gemini 2.5 Flash",
  claude: "Claude Sonnet",
}

export interface SummaryRecordPanelProps {
  readonly summary: string
  readonly analyzedWith: "gemini" | "claude"
  readonly promptVersion: string
}

export function SummaryRecordPanel({ summary, analyzedWith, promptVersion }: SummaryRecordPanelProps) {
  return (
    <InsightSpotlightSurface
      accent="excellence"
      eyebrow="Narrative arc"
      title="Summary"
      hint="One pass synthesis of tone, stakes, and motion across the call — same rubric that powers downstream scoring."
      className="w-full"
    >
      <div className="flex flex-wrap items-center gap-2">
        <motion.span
          layout
          className="rounded-full border border-pitchly-score-excellence/35 bg-pitchly-score-excellence/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-pitchly-score-excellence"
        >
          {PROVIDER_LABEL[analyzedWith]}
        </motion.span>
        <span className="rounded-full border border-pitchly-border-strong/70 bg-pitchly-canvas/60 px-3 py-1 font-mono text-[0.65rem] text-pitchly-text-secondary backdrop-blur-sm dark:bg-pitchly-raised/40">
          prompt {promptVersion}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative mt-5 rounded-2xl border border-white/10 bg-gradient-to-br from-pitchly-canvas/70 via-pitchly-surface/30 to-transparent px-5 py-5 shadow-inner backdrop-blur-md dark:border-white/[0.06] dark:from-pitchly-raised/25 dark:via-pitchly-surface/10 sm:px-6 sm:py-6"
      >
        <div aria-hidden className="pointer-events-none absolute right-6 top-5 h-24 w-24 rounded-full bg-pitchly-score-excellence/15 blur-3xl" />
        <p className="relative text-base font-medium leading-[1.75] text-pitchly-text-primary md:text-[1.05rem] md:leading-[1.8]">
          {summary}
        </p>
      </motion.div>
    </InsightSpotlightSurface>
  )
}
