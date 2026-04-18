import { PitchlyCard } from "@/components/ui/pitchly-card"
import { bandText, scoreToBand } from "@/components/analysis/analysis-score-bands"
import { cn } from "@/lib/utils"

interface RepStatsHeaderProps {
  name: string
  email: string
  totalCalls: number
  completedCalls: number
  avgScore: number | null
}

export function RepStatsHeader({ name, email, totalCalls, completedCalls, avgScore }: RepStatsHeaderProps) {
  return (
    <PitchlyCard padding="lg" accent="brand" className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-pitchly-text-primary">{name}</h1>
        <p className="mt-1 font-mono text-sm text-pitchly-text-secondary">{email}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 border-t border-pitchly-border pt-5 sm:grid-cols-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-3xl font-bold tabular-nums text-pitchly-text-primary">{totalCalls}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-pitchly-text-muted">Total calls</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-3xl font-bold tabular-nums text-pitchly-text-primary">{completedCalls}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-pitchly-text-muted">Analyzed</span>
        </div>
        <div className="flex flex-col gap-0.5">
          {avgScore !== null ? (
            <span
              className={cn(
                "font-mono text-3xl font-bold tabular-nums",
                bandText[scoreToBand(avgScore)]
              )}
            >
              {avgScore.toFixed(1)}
            </span>
          ) : (
            <span className="font-mono text-3xl font-bold text-pitchly-text-muted">—</span>
          )}
          <span className="text-xs font-medium uppercase tracking-wide text-pitchly-text-muted">Avg score</span>
        </div>
      </div>
    </PitchlyCard>
  )
}
