import Link from "next/link"
import type { Id } from "@/convex/_generated/dataModel"

interface RepCardProps {
  repId: Id<"users">
  name: string
  totalCalls: number
  completedCalls: number
  avgScore: number | null
}

function scoreColor(score: number): string {
  if (score <= 4) return "text-red-600"
  if (score <= 6) return "text-yellow-600"
  return "text-green-600"
}

export function RepCard({ repId, name, totalCalls, completedCalls, avgScore }: RepCardProps) {
  return (
    <Link
      href={`/reps/${repId}`}
      className="flex items-center justify-between rounded-md border px-4 py-3 hover:bg-muted/50 transition-colors"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">
          {completedCalls} of {totalCalls} calls analyzed
        </span>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div className="flex flex-col items-end gap-0.5">
          <span className="font-medium tabular-nums">{totalCalls}</span>
          <span className="text-xs text-muted-foreground">Calls</span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          {avgScore !== null ? (
            <span className={`font-semibold tabular-nums ${scoreColor(avgScore)}`}>
              {avgScore.toFixed(1)}
            </span>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
          <span className="text-xs text-muted-foreground">Avg</span>
        </div>
      </div>
    </Link>
  )
}
