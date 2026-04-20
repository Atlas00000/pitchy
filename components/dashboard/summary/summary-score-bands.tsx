"use client"

interface SummaryScoreBandsProps {
  readonly rows: ReadonlyArray<{ readonly band: "low" | "mid" | "high"; readonly count: number }>
}

const bandLabel = {
  low: "Low",
  mid: "Mid",
  high: "High",
} as const

const bandClass = {
  low: "bg-pitchly-score-critical",
  mid: "bg-pitchly-score-caution",
  high: "bg-pitchly-score-excellence",
} as const

export function SummaryScoreBands({ rows }: SummaryScoreBandsProps) {
  const max = rows.length > 0 ? Math.max(...rows.map((row) => row.count), 1) : 1

  return (
    <div className="space-y-2.5" role="img" aria-label="Score band distribution">
      {rows.map((row) => (
        <div key={row.band} className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-pitchly-text-muted">
            {bandLabel[row.band]}
          </span>
          <div className="h-2 rounded-full bg-pitchly-border/75">
            <div
              className={`h-full rounded-full ${bandClass[row.band]}`}
              style={{ width: `${Math.max(8, Math.round((row.count / max) * 100))}%` }}
            />
          </div>
          <span className="text-[0.65rem] font-semibold text-pitchly-text-secondary">{row.count}</span>
        </div>
      ))}
    </div>
  )
}
