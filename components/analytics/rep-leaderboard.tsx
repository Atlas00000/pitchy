import Link from "next/link"
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

function scoreColor(score: number): string {
  if (score <= 4) return "text-red-600"
  if (score <= 6) return "text-yellow-600"
  return "text-green-600"
}

export function RepLeaderboard({ rows }: RepLeaderboardProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-md border p-4">
        <h2 className="text-sm font-semibold mb-3">Rep Leaderboard</h2>
        <p className="text-sm text-muted-foreground">No data yet.</p>
      </div>
    )
  }

  const sorted = [...rows].sort((a, b) => b.avgScore - a.avgScore)

  return (
    <div className="rounded-md border p-4 flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Rep Leaderboard</h2>
      <div className="flex flex-col gap-1">
        {sorted.map((row, i) => (
          <Link
            key={row.repId}
            href={`/reps/${row.repId}`}
            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted/50 transition-colors"
          >
            <span className="text-xs text-muted-foreground w-5 text-right tabular-nums">{i + 1}.</span>
            <span className="text-sm flex-1">{row.name}</span>
            <span className="text-xs text-muted-foreground tabular-nums">{row.callCount} calls</span>
            <span className={`text-sm font-semibold tabular-nums w-10 text-right ${scoreColor(row.avgScore)}`}>
              {row.avgScore.toFixed(1)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
