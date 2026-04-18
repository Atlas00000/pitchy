import { SCORE_THRESHOLDS } from "@/lib/constants"
import { cn, formatScore } from "@/lib/utils"

function scoreBand(score: number): "critical" | "caution" | "excellence" {
  if (score <= SCORE_THRESHOLDS.low) return "critical"
  if (score <= SCORE_THRESHOLDS.mid) return "caution"
  return "excellence"
}

const bandClass: Record<ReturnType<typeof scoreBand>, string> = {
  critical:
    "border-pitchly-score-critical/35 bg-pitchly-surface text-pitchly-score-critical tabular-nums",
  caution:
    "border-pitchly-score-caution/35 bg-pitchly-surface text-pitchly-score-caution tabular-nums",
  excellence:
    "border-pitchly-score-excellence/35 bg-pitchly-brand-light/80 text-pitchly-score-excellence tabular-nums",
}

interface CallScorePillProps {
  score: number
  className?: string
}

/** Compact score display for call lists (Pitchly performance spectrum). */
export function CallScorePill({ score, className }: CallScorePillProps) {
  const band = scoreBand(score)
  return (
    <span
      className={cn(
        "inline-flex min-w-[2.25rem] items-center justify-center rounded-full border px-2 py-0.5 font-mono text-xs font-semibold",
        bandClass[band],
        className
      )}
    >
      {formatScore(score)}
    </span>
  )
}
