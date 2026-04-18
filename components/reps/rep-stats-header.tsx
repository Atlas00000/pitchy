interface RepStatsHeaderProps {
  name: string
  email: string
  totalCalls: number
  completedCalls: number
  avgScore: number | null
}

function scoreColor(score: number): string {
  if (score <= 4) return "text-red-600"
  if (score <= 6) return "text-yellow-600"
  return "text-green-600"
}

export function RepStatsHeader({ name, email, totalCalls, completedCalls, avgScore }: RepStatsHeaderProps) {
  return (
    <div className="rounded-md border p-4 flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">{name}</h1>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold tabular-nums">{totalCalls}</span>
          <span className="text-xs text-muted-foreground">Total Calls</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold tabular-nums">{completedCalls}</span>
          <span className="text-xs text-muted-foreground">Analyzed</span>
        </div>
        <div className="flex flex-col gap-0.5">
          {avgScore !== null ? (
            <span className={`text-2xl font-bold tabular-nums ${scoreColor(avgScore)}`}>
              {avgScore.toFixed(1)}
            </span>
          ) : (
            <span className="text-2xl font-bold text-muted-foreground">—</span>
          )}
          <span className="text-xs text-muted-foreground">Avg Score</span>
        </div>
      </div>
    </div>
  )
}
