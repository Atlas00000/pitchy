import Link from "next/link"
import { CallScorePill } from "@/components/calls/call-score-pill"
import { cn } from "@/lib/utils"
import type { Id } from "@/convex/_generated/dataModel"

interface RepCardProps {
  repId: Id<"users">
  name: string
  totalCalls: number
  completedCalls: number
  avgScore: number | null
}

export function RepCard({ repId, name, totalCalls, completedCalls, avgScore }: RepCardProps) {
  return (
    <Link
      href={`/reps/${repId}`}
      className={cn(
        "flex items-center justify-between rounded-xl border border-pitchly-border bg-pitchly-canvas px-4 py-3 shadow-pitchly-raised transition-all duration-150 ease-out",
        "hover:-translate-y-0.5 hover:bg-pitchly-surface hover:shadow-pitchly-floating"
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-pitchly-text-primary">{name}</span>
        <span className="text-xs text-pitchly-text-secondary">
          {completedCalls} of {totalCalls} calls analyzed
        </span>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div className="flex flex-col items-end gap-0.5">
          <span className="font-mono text-base font-semibold tabular-nums text-pitchly-text-primary">
            {totalCalls}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-pitchly-text-muted">Calls</span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          {avgScore !== null ? (
            <CallScorePill score={avgScore} />
          ) : (
            <span className="font-mono text-sm text-pitchly-text-muted">—</span>
          )}
          <span className="text-xs font-medium uppercase tracking-wide text-pitchly-text-muted">Avg</span>
        </div>
      </div>
    </Link>
  )
}
