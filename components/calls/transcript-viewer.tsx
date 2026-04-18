"use client"

interface Objection {
  quote: string
  category: string
  position: number
}

interface TranscriptViewerProps {
  text: string
  objections?: Objection[]
}

function highlight(text: string, objections: Objection[]): React.ReactNode[] {
  if (!objections.length) return [text]

  // Build list of ranges to highlight based on quote matching
  const ranges: { start: number; end: number; category: string }[] = []
  for (const obj of objections) {
    const idx = text.indexOf(obj.quote)
    if (idx !== -1) ranges.push({ start: idx, end: idx + obj.quote.length, category: obj.category })
  }
  ranges.sort((a, b) => a.start - b.start)

  const nodes: React.ReactNode[] = []
  let cursor = 0
  for (const range of ranges) {
    if (range.start > cursor) nodes.push(text.slice(cursor, range.start))
    nodes.push(
      <mark
        key={range.start}
        title={range.category}
        className="bg-yellow-200 text-yellow-900 rounded px-0.5 cursor-help"
      >
        {text.slice(range.start, range.end)}
      </mark>
    )
    cursor = range.end
  }
  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

export function TranscriptViewer({ text, objections = [] }: TranscriptViewerProps) {
  const paragraphs = text.split(/\n+/).filter(Boolean)

  return (
    <div className="rounded-md border bg-muted/30 p-4 text-sm leading-relaxed whitespace-pre-wrap font-mono overflow-y-auto max-h-[60vh]">
      {paragraphs.map((para, i) => (
        <p key={i} className="mb-3 last:mb-0">
          {highlight(para, objections)}
        </p>
      ))}
    </div>
  )
}
