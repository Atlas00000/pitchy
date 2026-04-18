"use client"

import type { ReactNode } from "react"

interface Objection {
  quote: string
  category: string
  position: number
}

interface TranscriptViewerProps {
  text: string
  objections?: Objection[]
}

function highlight(text: string, objections: Objection[]): ReactNode[] {
  if (!objections.length) return [text]

  const ranges: { start: number; end: number; category: string }[] = []
  for (const obj of objections) {
    const idx = text.indexOf(obj.quote)
    if (idx !== -1) ranges.push({ start: idx, end: idx + obj.quote.length, category: obj.category })
  }
  ranges.sort((a, b) => a.start - b.start)

  const nodes: ReactNode[] = []
  let cursor = 0
  for (const range of ranges) {
    if (range.start > cursor) nodes.push(text.slice(cursor, range.start))
    nodes.push(
      <mark
        key={range.start}
        title={range.category}
        className="cursor-help rounded px-0.5 bg-pitchly-score-caution/25 text-pitchly-text-primary ring-1 ring-pitchly-score-caution/40"
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
    <div className="max-h-[60vh] overflow-y-auto rounded-xl border border-pitchly-border bg-pitchly-surface/60 p-4 font-mono text-sm leading-relaxed text-pitchly-text-primary shadow-pitchly-raised whitespace-pre-wrap">
      {paragraphs.map((para, i) => (
        <p key={i} className="mb-3 last:mb-0">
          {highlight(para, objections)}
        </p>
      ))}
    </div>
  )
}
