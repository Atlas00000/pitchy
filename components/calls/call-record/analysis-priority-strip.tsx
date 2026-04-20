"use client"

import type { OutcomeConfidence, TopAction } from "@/types"

import { OutcomeConfidenceIndicator } from "@/components/calls/call-record/outcome-confidence-indicator"
import { TopActionsCard } from "@/components/calls/call-record/top-actions-card"

interface AnalysisPriorityStripProps {
  readonly confidence: OutcomeConfidence
  readonly topActions: readonly TopAction[]
}

export function AnalysisPriorityStrip({ confidence, topActions }: AnalysisPriorityStripProps) {
  const hasActions = topActions.length > 0

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
      <div className="md:col-span-4">
        <OutcomeConfidenceIndicator confidence={confidence} />
      </div>
      <div className="md:col-span-8">
        {hasActions ? (
          <TopActionsCard actions={topActions} />
        ) : (
          <section className="rounded-xl border border-pitchly-border/80 bg-pitchly-surface/60 px-4 py-4">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-pitchly-text-muted">Priority plan</p>
            <p className="mt-2 text-sm leading-relaxed text-pitchly-text-secondary">
              Action items are unavailable for this legacy analysis record. Re-run analysis to generate the Top 3 actions.
            </p>
          </section>
        )}
      </div>
    </div>
  )
}
