"use client"

import { formatScore } from "@/lib/utils"

interface SummaryRepMomentumProps {
  readonly rows: ReadonlyArray<{ readonly repName: string; readonly calls: number; readonly avgScore: number | null }>
}

export function SummaryRepMomentum({ rows }: SummaryRepMomentumProps) {
  const max = rows.length > 0 ? Math.max(...rows.map((row) => row.calls), 1) : 1

  return (
    <div className="space-y-2" role="img" aria-label="Top reps by recent call momentum">
      {rows.map((row) => {
        const width = `${Math.max(10, Math.round((row.calls / max) * 100))}%`
        return (
          <div key={row.repName} className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-pitchly-text-secondary">
                {row.repName}
              </p>
              <p className="text-[0.65rem] uppercase tracking-[0.08em] text-pitchly-text-muted">
                {row.calls} calls · {row.avgScore !== null ? formatScore(row.avgScore) : "—"}
              </p>
            </div>
            <div className="h-1.5 rounded-full bg-pitchly-border/80">
              <div className="h-full rounded-full bg-pitchly-score-excellence" style={{ width }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
