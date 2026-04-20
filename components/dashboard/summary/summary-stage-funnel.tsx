"use client"

import { DEAL_STAGES } from "@/lib/constants"

interface SummaryStageFunnelProps {
  readonly rows: ReadonlyArray<{ readonly stage: string; readonly count: number }>
}

export function SummaryStageFunnel({ rows }: SummaryStageFunnelProps) {
  const max = rows.length > 0 ? Math.max(...rows.map((row) => row.count), 1) : 1

  return (
    <div className="space-y-2" role="img" aria-label="Deal stage funnel distribution">
      {rows.map((row) => {
        const width = `${Math.max(8, Math.round((row.count / max) * 100))}%`
        return (
          <div key={row.stage} className="space-y-1">
            <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.1em] text-pitchly-text-muted">
              <span>{DEAL_STAGES[row.stage as keyof typeof DEAL_STAGES] ?? row.stage}</span>
              <span>{row.count}</span>
            </div>
            <div className="h-1.5 rounded-full bg-pitchly-border/80">
              <div className="h-full rounded-full bg-pitchly-brand" style={{ width }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
