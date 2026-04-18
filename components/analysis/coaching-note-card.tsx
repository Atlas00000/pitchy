import type { CoachingNote } from "@/types"
import { cn } from "@/lib/utils"

const TYPE_CONFIG = {
  strength: {
    label: "Strength",
    chip: "border border-pitchly-score-excellence/35 bg-pitchly-brand-light/80 text-pitchly-score-excellence",
    accent: "border-l-pitchly-score-excellence",
    icon: "✓",
  },
  improvement: {
    label: "Improve",
    chip: "border border-pitchly-score-caution/40 bg-pitchly-surface text-pitchly-score-caution",
    accent: "border-l-pitchly-score-caution",
    icon: "↑",
  },
} as const

interface CoachingNoteCardProps {
  note: CoachingNote
}

export function CoachingNoteCard({ note }: CoachingNoteCardProps) {
  const config = TYPE_CONFIG[note.type]

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-pitchly-border border-l-4 bg-pitchly-canvas p-4",
        config.accent
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", config.chip)}>
          {config.icon} {config.label}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-pitchly-text-primary">{note.observation}</p>
      {note.suggestion && (
        <div className="border-l-2 border-pitchly-border-strong pl-3">
          <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-pitchly-text-muted">
            Try this
          </p>
          <p className="text-xs leading-relaxed text-pitchly-text-secondary">{note.suggestion}</p>
        </div>
      )}
    </div>
  )
}
