import Link from "next/link"
import { PitchlyCard } from "@/components/ui/pitchly-card"
import { bandText, scoreToBand } from "@/components/analysis/analysis-score-bands"
import { cn } from "@/lib/utils"
import type { Id } from "@/convex/_generated/dataModel"

interface RepRow {
  repId: Id<"users">
  name: string
  avgScore: number
  callCount: number
}

interface RepLeaderboardProps {
  rows: RepRow[]
}

export function RepLeaderboard({ rows }: RepLeaderboardProps) {
  if (rows.length === 0) {
    return (
      <PitchlyCard padding="default" className="flex flex-col gap-3">
        <h2 className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">Rep leaderboard</h2>
        <p className="text-sm text-pitchly-text-secondary">No data yet.</p>
      </PitchlyCard>
    )
  }

  const sorted = [...rows].sort((a, b) => b.avgScore - a.avgScore)

  return (
    <PitchlyCard padding="default" className="flex flex-col gap-3">
      <h2 className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">Rep leaderboard</h2>
      <div className="flex flex-col overflow-hidden rounded-lg border border-pitchly-border">
        {sorted.map((row, i) => (
          <Link
            key={row.repId}
            href={`/reps/${row.repId}`}
            className={cn(
              "flex items-center gap-3 border-b border-pitchly-border px-3 py-2.5 transition-colors duration-150 last:border-b-0",
              i % 2 === 1 ? "bg-pitchly-surface/50" : "bg-pitchly-canvas",
              "hover:bg-pitchly-surface"
            )}
          >
            <span className="w-6 text-right font-mono text-xs tabular-nums text-pitchly-text-muted">
              {i + 1}.
            </span>
            <span className="flex-1 text-sm font-medium text-pitchly-text-primary">{row.name}</span>
            <span className="font-mono text-xs tabular-nums text-pitchly-text-muted">{row.callCount} calls</span>
            <span
              className={cn(
                "w-12 text-right font-mono text-sm font-semibold tabular-nums",
                bandText[scoreToBand(row.avgScore)]
              )}
            >
              {row.avgScore.toFixed(1)}
            </span>
          </Link>
        ))}
      </div>
    </PitchlyCard>
  )
}
