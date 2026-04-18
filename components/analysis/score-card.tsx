import { ScoreDimensionBar } from "./score-dimension-bar"

interface Scores {
  overall: number
  discovery: number
  objectionHandling: number
  talkListenRatio: number
  nextStepClarity: number
}

interface ScoreCardProps {
  scores: Scores
}

function overallColor(score: number): string {
  if (score <= 4) return "text-red-600"
  if (score <= 6) return "text-yellow-600"
  return "text-green-600"
}

const DIMENSIONS: { key: keyof Omit<Scores, "overall">; label: string }[] = [
  { key: "discovery", label: "Discovery Quality" },
  { key: "objectionHandling", label: "Objection Handling" },
  { key: "talkListenRatio", label: "Talk / Listen Ratio" },
  { key: "nextStepClarity", label: "Next Step Clarity" },
]

export function ScoreCard({ scores }: ScoreCardProps) {
  return (
    <div className="rounded-md border p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Call Score</h2>
        <span className={`text-2xl font-bold tabular-nums ${overallColor(scores.overall)}`}>
          {scores.overall.toFixed(1)}<span className="text-sm font-normal text-muted-foreground">/10</span>
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {DIMENSIONS.map(({ key, label }) => (
          <ScoreDimensionBar key={key} label={label} score={scores[key]} />
        ))}
      </div>
    </div>
  )
}
