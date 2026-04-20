"use client"

interface SummarySparklineProps {
  readonly values: readonly number[]
  readonly leftLabel?: string
  readonly rightLabel?: string
  readonly ariaLabel?: string
}

export function SummarySparkline({ values, leftLabel, rightLabel, ariaLabel = "Sparkline trend" }: SummarySparklineProps) {
  const points = values.length > 0 ? values : [0, 0, 0, 0]
  const max = Math.max(...points, 1)
  const min = Math.min(...points, 0)
  const range = Math.max(max - min, 1)

  const path = points
    .map((value, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * 100
      const y = 100 - ((value - min) / range) * 100
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  return (
    <div className="space-y-1.5" role="img" aria-label={ariaLabel}>
      <div className="h-14 w-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <path d={path} fill="none" className="stroke-pitchly-score-caution" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      {(leftLabel || rightLabel) && (
        <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.08em] text-pitchly-text-muted">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  )
}
