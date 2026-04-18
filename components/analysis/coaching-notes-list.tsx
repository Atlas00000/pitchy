interface CoachingNote {
  type: "strength" | "improvement"
  observation: string
  suggestion: string
}

interface CoachingNotesListProps {
  notes: CoachingNote[]
}

const TYPE_CONFIG = {
  strength: {
    label: "Strength",
    chip: "bg-green-100 text-green-800",
    border: "border-green-200",
    icon: "✓",
  },
  improvement: {
    label: "Improve",
    chip: "bg-orange-100 text-orange-800",
    border: "border-orange-200",
    icon: "↑",
  },
}

export function CoachingNotesList({ notes }: CoachingNotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="rounded-md border p-4">
        <h2 className="text-sm font-semibold mb-2">Coaching Notes</h2>
        <p className="text-sm text-muted-foreground">No coaching notes available.</p>
      </div>
    )
  }

  const strengths = notes.filter((n) => n.type === "strength")
  const improvements = notes.filter((n) => n.type === "improvement")

  return (
    <div className="rounded-md border p-4 flex flex-col gap-4">
      <h2 className="text-sm font-semibold">Coaching Notes ({notes.length})</h2>

      {strengths.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            What went well
          </p>
          {strengths.map((note, i) => (
            <CoachingNoteCard key={i} note={note} />
          ))}
        </div>
      )}

      {improvements.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Areas to improve
          </p>
          {improvements.map((note, i) => (
            <CoachingNoteCard key={i} note={note} />
          ))}
        </div>
      )}
    </div>
  )
}

function CoachingNoteCard({ note }: { note: CoachingNote }) {
  const config = TYPE_CONFIG[note.type]

  return (
    <div className={`rounded-md border p-3 flex flex-col gap-2 ${config.border}`}>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-semibold rounded px-2 py-0.5 ${config.chip}`}>
          {config.icon} {config.label}
        </span>
      </div>
      <p className="text-sm text-foreground">{note.observation}</p>
      {note.suggestion && (
        <div className="border-l-2 border-muted pl-3">
          <p className="text-xs font-medium text-muted-foreground mb-0.5">Try this</p>
          <p className="text-xs text-muted-foreground">{note.suggestion}</p>
        </div>
      )}
    </div>
  )
}
