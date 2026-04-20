"use client"

import { cn } from "@/lib/utils"

interface SummaryFrictionBarsProps {
  readonly rows: ReadonlyArray<{ readonly label: string; readonly value: number }>
  readonly caption?: string
  readonly ariaLabel?: string
}

export function SummaryFrictionBars({ rows, caption, ariaLabel = "Friction distribution bars" }: SummaryFrictionBarsProps) {
  const max = rows.length > 0 ? Math.max(...rows.map((row) => row.value), 1) : 1

  return (
    <div className="space-y-2" role="img" aria-label={ariaLabel}>
      {rows.map((row) => {
        const width = `${Math.max(12, Math.round((row.value / max) * 100))}%`
        return (
          <div key={row.label} className="space-y-1">
            <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.08em] text-pitchly-text-muted">
              <span>{row.label}</span>
              <span>{row.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-pitchly-border/80">
              <div className={cn("h-full rounded-full bg-pitchly-score-critical/90")} style={{ width }} />
            </div>
          </div>
        )
      })}
      {caption ? <p className="pt-0.5 text-[0.62rem] uppercase tracking-[0.08em] text-pitchly-text-muted">{caption}</p> : null}
    </div>
  )
}
