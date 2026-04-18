"use client"

import type { CoachingNote } from "@/types"

import { CoachingMomentBlock } from "./coaching-moment-block"
import { InsightSpotlightSurface } from "./insight-spotlight-surface"

export interface CoachingImprovementPanelProps {
  readonly notes: CoachingNote[]
}

export function CoachingImprovementPanel({ notes }: CoachingImprovementPanelProps) {
  if (notes.length === 0) {
    return (
      <InsightSpotlightSurface
        accent="caution"
        eyebrow="Calibration"
        title="Areas to improve"
        hint="Improvements are surgical — tighten language, clarify next steps, or sharpen how objections get handled."
      >
        <p className="text-sm leading-relaxed text-pitchly-text-secondary">
          No improvement notes surfaced. That is rare for a full discovery call — if this feels off, retry analysis or
          enrich the transcript with speaker labels.
        </p>
      </InsightSpotlightSurface>
    )
  }

  return (
    <InsightSpotlightSurface
      accent="caution"
      eyebrow="Calibration"
      title={`Areas to improve · ${notes.length}`}
      hint="These are the highest leverage tweaks. Expand execution detail for the concrete rewrite or behavior shift."
    >
      <div className="flex flex-col gap-4">
        {notes.map((note, i) => (
          <CoachingMomentBlock key={`${note.observation.slice(0, 24)}-${i}`} note={note} variant="improvement" index={i} />
        ))}
      </div>
    </InsightSpotlightSurface>
  )
}
