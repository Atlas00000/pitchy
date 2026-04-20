"use client"

import { OBJECTION_CATEGORIES } from "@/lib/constants"

interface SummaryObjectionMixProps {
  readonly rows: ReadonlyArray<{ readonly category: string; readonly count: number }>
}

export function SummaryObjectionMix({ rows }: SummaryObjectionMixProps) {
  const total = rows.reduce((acc, row) => acc + row.count, 0)

  return (
    <div role="img" aria-label="Objection mix stacked bar and category counts">
      <div className="flex h-3 overflow-hidden rounded-full border border-pitchly-border/80 bg-pitchly-border/40">
        {rows.map((row, index) => {
          const width = total > 0 ? (row.count / total) * 100 : 0
          const palette = [
            "bg-pitchly-score-critical",
            "bg-pitchly-score-caution",
            "bg-pitchly-brand",
            "bg-pitchly-score-excellence",
            "bg-pitchly-brand-muted",
          ]
          return <span key={row.category} className={palette[index % palette.length]} style={{ width: `${width}%` }} />
        })}
      </div>
      <div className="mt-3 space-y-1.5">
        {rows.map((row) => (
          <div key={row.category} className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.1em] text-pitchly-text-muted">
            <span>{OBJECTION_CATEGORIES[row.category as keyof typeof OBJECTION_CATEGORIES] ?? row.category}</span>
            <span className="font-semibold text-pitchly-text-secondary">{row.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
