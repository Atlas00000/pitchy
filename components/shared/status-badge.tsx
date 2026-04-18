import { cn } from "@/lib/utils"
import type { CallStatus } from "@/types"

const statusConfig: Record<
  CallStatus,
  { label: string; pill: string; dot: string; dotPulse?: boolean }
> = {
  pending: {
    label: "Pending",
    pill: "border-pitchly-border bg-pitchly-surface text-pitchly-text-secondary",
    dot: "bg-pitchly-text-muted",
  },
  analyzing: {
    label: "Analyzing",
    pill: "border-pitchly-score-caution/40 bg-pitchly-surface text-pitchly-score-caution",
    dot: "bg-pitchly-score-caution",
    dotPulse: true,
  },
  complete: {
    label: "Complete",
    pill: "border-pitchly-score-excellence/35 bg-pitchly-brand-light/80 text-pitchly-score-excellence",
    dot: "bg-pitchly-score-excellence",
  },
  failed: {
    label: "Failed",
    pill: "border-pitchly-score-critical/35 bg-pitchly-surface text-pitchly-score-critical",
    dot: "bg-pitchly-score-critical",
  },
}

interface StatusBadgeProps {
  status: CallStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.pill,
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          config.dot,
          config.dotPulse && "animate-pulse"
        )}
        aria-hidden
      />
      {config.label}
    </span>
  )
}
