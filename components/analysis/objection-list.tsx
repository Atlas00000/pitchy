import { ObjectionTag } from "./objection-tag"
import { PitchlyCard } from "@/components/ui/pitchly-card"

interface Objection {
  category: string
  quote: string
  position: number
  suggestedResponse?: string
}

interface ObjectionListProps {
  objections: Objection[]
}

export function ObjectionList({ objections }: ObjectionListProps) {
  if (objections.length === 0) {
    return (
      <PitchlyCard padding="default" className="flex flex-col gap-2">
        <h2 className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">Objections</h2>
        <p className="text-sm text-pitchly-text-secondary">No objections detected in this call.</p>
      </PitchlyCard>
    )
  }

  const sorted = [...objections].sort((a, b) => a.position - b.position)

  return (
    <PitchlyCard padding="default" className="flex flex-col gap-4">
      <h2 className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">
        Objections ({objections.length})
      </h2>
      <div className="flex flex-col gap-3">
        {sorted.map((obj, i) => (
          <ObjectionTag
            key={i}
            category={obj.category}
            quote={obj.quote}
            suggestedResponse={obj.suggestedResponse}
          />
        ))}
      </div>
    </PitchlyCard>
  )
}
