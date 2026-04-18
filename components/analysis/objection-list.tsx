import { ObjectionTag } from "./objection-tag"

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
      <div className="rounded-md border p-4">
        <h2 className="text-sm font-semibold mb-2">Objections</h2>
        <p className="text-sm text-muted-foreground">No objections detected in this call.</p>
      </div>
    )
  }

  // Sort by position in transcript
  const sorted = [...objections].sort((a, b) => a.position - b.position)

  return (
    <div className="rounded-md border p-4 flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Objections ({objections.length})</h2>
      <div className="flex flex-col gap-2">
        {sorted.map((obj, i) => (
          <ObjectionTag
            key={i}
            category={obj.category}
            quote={obj.quote}
            suggestedResponse={obj.suggestedResponse}
          />
        ))}
      </div>
    </div>
  )
}
