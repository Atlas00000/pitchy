"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import type { CoachingNote } from "@/types"
import { InsightSeverityTag } from "@/components/calls/call-insights/insight-severity-tag"
import { TalkTrackList } from "@/components/calls/call-insights/talk-track-list"

export type CoachingMomentVariant = "strength" | "improvement"

export interface CoachingMomentBlockProps {
  readonly note: CoachingNote
  readonly variant: CoachingMomentVariant
  readonly index: number
}

export function CoachingMomentBlock({ note, variant, index }: CoachingMomentBlockProps) {
  const hasSuggestion = Boolean(note.suggestion?.trim())

  const isStrength = variant === "strength"

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 32, delay: index * 0.04 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-pitchly-canvas/50 px-4 py-4 backdrop-blur-md dark:border-white/[0.06] dark:bg-pitchly-surface/25 md:px-5 md:py-5",
        isStrength && "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)]",
        !isStrength && "shadow-[inset_0_0_0_1px_rgb(245_158_11/0.08)]"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-4 left-0 w-1 rounded-full bg-gradient-to-b",
          isStrength ? "from-pitchly-score-excellence via-pitchly-brand-light to-transparent" : "from-pitchly-score-caution via-pitchly-accent-amber/80 to-transparent"
        )}
      />
      <div className="pl-4 md:pl-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em]",
              isStrength
                ? "border border-pitchly-score-excellence/35 bg-pitchly-score-excellence/10 text-pitchly-score-excellence"
                : "border border-pitchly-score-caution/35 bg-pitchly-score-caution/10 text-pitchly-score-caution"
            )}
          >
            {isStrength ? "Signal" : "Tune-up"}
          </span>
          <span className="font-mono text-[0.65rem] text-pitchly-text-muted">#{index + 1}</span>
          <InsightSeverityTag severity={note.severity} />
        </div>

        <p className="mt-3 text-sm font-medium leading-relaxed text-pitchly-text-primary md:text-[0.95rem]">
          {note.observation}
        </p>

        {hasSuggestion ? (
          <details className="mt-4">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-pitchly-border-strong/60 bg-pitchly-canvas/70 px-3 py-1.5 text-xs font-semibold text-pitchly-text-primary marker:content-none [&::-webkit-details-marker]:hidden transition-colors hover:border-pitchly-brand/40 hover:text-pitchly-brand dark:bg-pitchly-raised/50">
              <span>Execution detail</span>
              <ChevronDown size={16} strokeWidth={2} className="opacity-70" aria-hidden />
            </summary>
            <p className="mt-3 rounded-xl border border-pitchly-border/80 bg-pitchly-surface/55 px-4 py-3 text-sm leading-relaxed text-pitchly-text-secondary dark:bg-pitchly-raised/35">
              {note.suggestion}
            </p>
          </details>
        ) : null}

        <TalkTrackList items={note.talkTrackSuggestions} title="Talk tracks to practice" />
      </div>
    </motion.article>
  )
}
