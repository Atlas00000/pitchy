import { ScoreDimensionBar } from "./score-dimension-bar"
import { ScoreRing } from "./score-ring"
import { PitchlyCard } from "@/components/ui/pitchly-card"

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

const DIMENSIONS: { key: keyof Omit<Scores, "overall">; label: string }[] = [
  { key: "discovery", label: "Discovery Quality" },
  { key: "objectionHandling", label: "Objection Handling" },
  { key: "talkListenRatio", label: "Talk / Listen Ratio" },
  { key: "nextStepClarity", label: "Next Step Clarity" },
]

export function ScoreCard({ scores }: ScoreCardProps) {
  return (
    <PitchlyCard padding="lg" className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">Call score</h2>
          <p className="mt-1 text-sm text-pitchly-text-secondary">Weighted overall from four dimensions.</p>
        </div>
        <ScoreRing score={scores.overall} className="sm:mx-0 mx-auto" />
      </div>
      <div className="flex flex-col gap-4 border-t border-pitchly-border pt-5">
        {DIMENSIONS.map(({ key, label }) => (
          <ScoreDimensionBar key={key} label={label} score={scores[key]} />
        ))}
      </div>
    </PitchlyCard>
  )
}
