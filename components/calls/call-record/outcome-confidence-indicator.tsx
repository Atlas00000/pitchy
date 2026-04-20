"use client"

import { cn } from "@/lib/utils"
import type { OutcomeConfidence } from "@/types"

interface OutcomeConfidenceIndicatorProps {
  readonly confidence: OutcomeConfidence
}

const labelClass: Record<OutcomeConfidence["label"], string> = {
  high: "text-pitchly-score-excellence",
  medium: "text-pitchly-score-caution",
  low: "text-pitchly-score-critical",
}

export function OutcomeConfidenceIndicator({ confidence }: OutcomeConfidenceIndicatorProps) {
  const width = `${Math.max(6, Math.min(100, confidence.score))}%`
  return (
    <div className="rounded-xl border border-pitchly-border/80 bg-pitchly-surface/60 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-pitchly-text-muted">
          Outcome confidence
        </p>
        <p className={cn("text-xs font-semibold uppercase tracking-[0.14em]", labelClass[confidence.label])}>
          {confidence.label} · {confidence.score}%
        </p>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-pitchly-border/80">
        <div className="h-full rounded-full bg-pitchly-brand" style={{ width }} />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-pitchly-text-secondary">{confidence.rationale}</p>
    </div>
  )
}
