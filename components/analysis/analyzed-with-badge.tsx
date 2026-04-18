import { cn } from "@/lib/utils"

interface AnalyzedWithBadgeProps {
  analyzedWith: "gemini" | "claude"
  promptVersion: string
}

const CONFIG = {
  gemini: {
    label: "Gemini 2.5 Flash",
    style: "border-pitchly-brand-light bg-pitchly-brand-light text-pitchly-brand",
  },
  claude: {
    label: "Claude Sonnet",
    style: "border-pitchly-brand-muted/40 bg-pitchly-surface text-pitchly-brand",
  },
} as const

export function AnalyzedWithBadge({ analyzedWith, promptVersion }: AnalyzedWithBadgeProps) {
  const { label, style } = CONFIG[analyzedWith]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        style
      )}
    >
      <span>Analyzed with {label}</span>
      <span className="text-pitchly-text-muted">·</span>
      <span className="font-mono text-[11px] text-pitchly-text-secondary">{promptVersion}</span>
    </span>
  )
}
