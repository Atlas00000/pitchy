"use client"

import { cn } from "@/lib/utils"
import type { InsightSeverity } from "@/types"

interface InsightSeverityTagProps {
  readonly severity: InsightSeverity
  readonly className?: string
}

const severityClass: Record<InsightSeverity, string> = {
  high: "border-pitchly-score-critical/35 bg-pitchly-score-critical/10 text-pitchly-score-critical",
  medium: "border-pitchly-score-caution/35 bg-pitchly-score-caution/10 text-pitchly-score-caution",
  low: "border-pitchly-score-excellence/35 bg-pitchly-score-excellence/10 text-pitchly-score-excellence",
}

export function InsightSeverityTag({ severity, className }: InsightSeverityTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em]",
        severityClass[severity],
        className
      )}
    >
      {severity} severity
    </span>
  )
}
