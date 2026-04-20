"use client"

interface SummaryProgressRingProps {
  readonly value: number
  readonly label?: string
  readonly ariaLabel?: string
}

export function SummaryProgressRing({ value, label, ariaLabel }: SummaryProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (clamped / 100) * circumference

  return (
    <div className="inline-flex items-center gap-3" role="img" aria-label={ariaLabel ?? `Coverage ${clamped}%`}>
      <div className="relative h-14 w-14 shrink-0">
        <svg viewBox="0 0 44 44" width="56" height="56" className="-rotate-90">
          <circle cx="22" cy="22" r={radius} fill="none" className="stroke-pitchly-border" strokeWidth="4" />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            className="stroke-pitchly-score-excellence"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[0.65rem] font-semibold text-pitchly-text-secondary">
          {clamped}%
        </span>
      </div>
      {label ? <span className="text-[0.65rem] uppercase tracking-[0.08em] text-pitchly-text-muted">{label}</span> : null}
    </div>
  )
}
