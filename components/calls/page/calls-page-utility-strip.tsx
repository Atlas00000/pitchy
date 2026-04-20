"use client"

import type { CallsPageStats } from "./calls-page-types"

interface CallsPageUtilityStripProps {
  readonly stats: CallsPageStats
}

function UtilityMetric({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="rounded-xl border border-pitchly-border/80 bg-pitchly-surface/80 px-3 py-2">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-pitchly-text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold tracking-tight text-pitchly-text-primary">{value}</p>
    </div>
  )
}

export function CallsPageUtilityStrip({ stats }: CallsPageUtilityStripProps) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-2 md:mb-5 md:grid-cols-4">
      <UtilityMetric label="Total calls" value={`${stats.totalCalls}`} />
      <UtilityMetric label="Analyzed" value={`${stats.analyzedCalls}`} />
      <UtilityMetric label="Avg score" value={stats.avgScore} />
      <UtilityMetric label="Active reps" value={`${stats.activeReps}`} />
    </div>
  )
}
