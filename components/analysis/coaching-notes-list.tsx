import type { CoachingNote } from "@/types"
import { CoachingNoteCard } from "./coaching-note-card"
import { PitchlyCard } from "@/components/ui/pitchly-card"

interface CoachingNotesListProps {
  notes: CoachingNote[]
}

export function CoachingNotesList({ notes }: CoachingNotesListProps) {
  if (notes.length === 0) {
    return (
      <PitchlyCard padding="default" className="flex flex-col gap-2">
        <h2 className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">Coaching notes</h2>
        <p className="text-sm text-pitchly-text-secondary">No coaching notes available.</p>
      </PitchlyCard>
    )
  }

  const strengths = notes.filter((n) => n.type === "strength")
  const improvements = notes.filter((n) => n.type === "improvement")

  return (
    <PitchlyCard padding="default" className="flex flex-col gap-5">
      <h2 className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">
        Coaching notes ({notes.length})
      </h2>

      {strengths.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-medium uppercase tracking-widest text-pitchly-text-muted">
            What went well
          </p>
          {strengths.map((note, i) => (
            <CoachingNoteCard key={i} note={note} />
          ))}
        </div>
      )}

      {improvements.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-medium uppercase tracking-widest text-pitchly-text-muted">
            Areas to improve
          </p>
          {improvements.map((note, i) => (
            <CoachingNoteCard key={i} note={note} />
          ))}
        </div>
      )}
    </PitchlyCard>
  )
}
