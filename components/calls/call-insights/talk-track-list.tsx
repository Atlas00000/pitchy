"use client"

interface TalkTrackListProps {
  readonly title?: string
  readonly items: readonly string[]
}

export function TalkTrackList({ title = "Talk track suggestions", items }: TalkTrackListProps) {
  if (items.length === 0) return null

  return (
    <div className="mt-3 rounded-xl border border-pitchly-border/80 bg-pitchly-surface/55 px-4 py-3 dark:bg-pitchly-raised/35">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-pitchly-text-muted">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((line, index) => (
          <li key={`${line.slice(0, 32)}-${index}`} className="text-sm leading-relaxed text-pitchly-text-secondary">
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}
