interface ScoreDimensionBarProps {
  label: string
  score: number
}

function barColor(score: number): string {
  if (score <= 4) return "bg-red-500"
  if (score <= 6) return "bg-yellow-400"
  return "bg-green-500"
}

function textColor(score: number): string {
  if (score <= 4) return "text-red-600"
  if (score <= 6) return "text-yellow-600"
  return "text-green-600"
}

export function ScoreDimensionBar({ label, score }: ScoreDimensionBarProps) {
  const pct = Math.min(Math.max(score / 10, 0), 1) * 100

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-semibold tabular-nums ${textColor(score)}`}>{score}/10</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor(score)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
