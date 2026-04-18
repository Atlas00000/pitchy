"use client"

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
    <div className="rounded-md border p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">Summary</h2>
        <span className="text-xs text-muted-foreground border rounded px-2 py-0.5">
          {PROVIDER_LABEL[analyzedWith]} · {promptVersion}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
    </div>
  )
}
