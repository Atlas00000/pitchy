"use client"

import { cn } from "@/lib/utils"

interface SummaryMiniBarsProps {
  readonly values: readonly number[]
  readonly leftLabel?: string
  readonly rightLabel?: string
  readonly ariaLabel?: string
  readonly className?: string
}

export function SummaryMiniBars({
  values,
  leftLabel,
  rightLabel,
  ariaLabel = "Mini bar trend",
  className,
}: SummaryMiniBarsProps) {
  const max = values.length > 0 ? Math.max(...values, 1) : 1

  return (
    <div className={cn("space-y-1.5", className)} role="img" aria-label={ariaLabel}>
      <div className="grid h-14 grid-cols-7 items-end gap-1.5" aria-hidden>
        {values.map((value, index) => {
          const normalized = Math.max(10, Math.round((value / max) * 100))
          return (
            <span
              key={index}
              className="rounded-sm bg-pitchly-brand"
              style={{ height: `${normalized}%` }}
            />
          )
        })}
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
