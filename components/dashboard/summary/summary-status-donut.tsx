"use client"

import type { CallStatus } from "@/types"

const colorByStatus: Record<CallStatus, string> = {
  pending: "#64748b",
  analyzing: "#f59e0b",
  complete: "#22c55e",
  failed: "#ef4444",
}

interface SummaryStatusDonutProps {
  readonly rows: ReadonlyArray<{ readonly status: CallStatus; readonly count: number }>
}

export function SummaryStatusDonut({ rows }: SummaryStatusDonutProps) {
  const total = rows.reduce((acc, row) => acc + row.count, 0)
  const radius = 34
  const circumference = 2 * Math.PI * radius
  let currentOffset = 0

  return (
    <div className="flex items-center gap-4" role="img" aria-label="Call status distribution donut">
      <div className="relative h-[84px] w-[84px] shrink-0">
        <svg viewBox="0 0 100 100" className="-rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="10" />
          {rows.map((row) => {
            const ratio = total > 0 ? row.count / total : 0
            const dashLength = ratio * circumference
            const segment = (
              <circle
                key={row.status}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={colorByStatus[row.status]}
                strokeWidth="10"
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={-currentOffset}
                strokeLinecap="butt"
              />
            )
            currentOffset += dashLength
            return segment
          })}
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-pitchly-text-primary">
          {total}
        </span>
      </div>
      <div className="space-y-1.5">
        {rows.map((row) => (
          <div key={row.status} className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.1em] text-pitchly-text-muted">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colorByStatus[row.status] }} />
            <span>{row.status}</span>
            <span className="font-semibold text-pitchly-text-secondary">{row.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
