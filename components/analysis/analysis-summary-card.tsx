import { PitchlyCard } from "@/components/ui/pitchly-card"

interface AnalysisSummaryCardProps {
  summary: string
  analyzedWith: "gemini" | "claude"
  promptVersion: string
}

const PROVIDER_LABEL: Record<"gemini" | "claude", string> = {
  gemini: "Gemini 2.5 Flash",
  claude: "Claude Sonnet",
}

export function AnalysisSummaryCard({ summary, analyzedWith, promptVersion }: AnalysisSummaryCardProps) {
  return (
    <PitchlyCard accent="excellence" padding="lg" className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">Summary</h2>
        <span className="shrink-0 rounded-full border border-pitchly-border bg-pitchly-surface px-2.5 py-1 text-xs font-medium text-pitchly-text-secondary">
          {PROVIDER_LABEL[analyzedWith]} · {promptVersion}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-pitchly-text-secondary">{summary}</p>
    </PitchlyCard>
  )
}
