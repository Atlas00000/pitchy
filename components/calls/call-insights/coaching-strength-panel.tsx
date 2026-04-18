"use client"

import type { CoachingNote } from "@/types"

import { CoachingMomentBlock } from "./coaching-moment-block"
import { InsightSpotlightSurface } from "./insight-spotlight-surface"

export interface CoachingStrengthPanelProps {
  readonly notes: CoachingNote[]
}

export function CoachingStrengthPanel({ notes }: CoachingStrengthPanelProps) {
  if (notes.length === 0) {
    return (
      <InsightSpotlightSurface
        accent="excellence"
        eyebrow="Momentum"
        title="What went well"
        hint="Strengths are the behaviors to double down on — crisp talk tracks, discovery depth, and confident pacing."
      >
        <p className="text-sm leading-relaxed text-pitchly-text-secondary">
          No strength notes on this pass. Re-run analysis if you have added context, or keep recording longer discovery
          sections so the model can anchor positives.
        </p>
      </InsightSpotlightSurface>
    )
  }

  return (
    <InsightSpotlightSurface
      accent="excellence"
      eyebrow="Momentum"
      title={`What went well · ${notes.length}`}
      hint="Each card isolates a bright spot. Expand execution detail when you want the exact play to repeat on the next call."
    >
      <div className="flex flex-col gap-4">
        {notes.map((note, i) => (
          <CoachingMomentBlock key={`${note.observation.slice(0, 24)}-${i}`} note={note} variant="strength" index={i} />
        ))}
      </div>
    </InsightSpotlightSurface>
  )
}
