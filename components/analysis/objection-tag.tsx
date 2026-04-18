import { cn } from "@/lib/utils"

const CATEGORY_STYLES: Record<string, { chip: string; accent: string }> = {
  price: {
    chip: "border border-pitchly-score-critical/35 bg-pitchly-surface text-pitchly-score-critical",
    accent: "border-l-pitchly-score-critical",
  },
  timing: {
    chip: "border border-pitchly-score-caution/35 bg-pitchly-surface text-pitchly-score-caution",
    accent: "border-l-pitchly-score-caution",
  },
  authority: {
    chip: "border border-pitchly-brand-muted/40 bg-pitchly-brand-light text-pitchly-brand",
    accent: "border-l-pitchly-brand",
  },
  need: {
    chip: "border border-pitchly-border-strong bg-pitchly-surface text-pitchly-text-secondary",
    accent: "border-l-pitchly-text-muted",
  },
  competitor: {
    chip: "border border-pitchly-brand-muted/40 bg-pitchly-surface text-pitchly-brand-muted",
    accent: "border-l-pitchly-brand-muted",
  },
  other: {
    chip: "border border-pitchly-border bg-pitchly-surface text-pitchly-text-muted",
    accent: "border-l-pitchly-border-strong",
  },
}

interface ObjectionTagProps {
  category: string
  quote: string
  suggestedResponse?: string
}

export function ObjectionTag({ category, quote, suggestedResponse }: ObjectionTagProps) {
  const styles = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.other

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-pitchly-border border-l-4 bg-pitchly-surface/50 p-4 transition-colors duration-150 hover:bg-pitchly-surface",
        styles.accent
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize", styles.chip)}>
          {category}
        </span>
      </div>
      <p className="text-sm italic leading-relaxed text-pitchly-text-secondary">&ldquo;{quote}&rdquo;</p>
      {suggestedResponse && (
        <div className="mt-1 border-l-2 border-pitchly-border-strong pl-3">
          <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-pitchly-text-muted">
            Suggested response
          </p>
          <p className="text-xs leading-relaxed text-pitchly-text-secondary">{suggestedResponse}</p>
        </div>
      )}
    </div>
  )
}
