"use client"

import type { TopAction } from "@/types"

import { InsightSeverityTag } from "@/components/calls/call-insights/insight-severity-tag"

interface TopActionsCardProps {
  readonly actions: readonly TopAction[]
}

export function TopActionsCard({ actions }: TopActionsCardProps) {
  if (actions.length === 0) return null

  return (
    <section className="rounded-xl border border-pitchly-border/80 bg-pitchly-surface/60 px-4 py-4">
      <header className="mb-3">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-pitchly-text-muted">Priority plan</p>
        <h3 className="mt-1 text-sm font-semibold tracking-tight text-pitchly-text-primary">Top 3 actions</h3>
      </header>
      <ol className="space-y-3">
        {actions.map((action, index) => (
          <li key={`${action.title.slice(0, 24)}-${index}`} className="rounded-lg border border-pitchly-border/70 bg-pitchly-canvas/70 px-3 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium text-pitchly-text-primary">
                {index + 1}. {action.title}
              </p>
              <InsightSeverityTag severity={action.priority} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-pitchly-text-secondary">{action.rationale}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
