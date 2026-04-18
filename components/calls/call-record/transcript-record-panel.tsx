"use client"

import { useMemo, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

import type { Objection } from "@/types"
import { cn } from "@/lib/utils"

import { InsightSpotlightSurface } from "@/components/calls/call-insights/insight-spotlight-surface"

export interface TranscriptRecordPanelProps {
  readonly text: string
  readonly objections?: Objection[]
}

function highlightParagraph(text: string, objections: Objection[]): ReactNode[] {
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
        className="cursor-help rounded-md bg-gradient-to-r from-pitchly-score-caution/30 to-pitchly-accent-amber/20 px-1 py-0.5 font-medium text-pitchly-text-primary shadow-[0_0_0_1px_rgb(245_158_11/0.35)] transition-shadow duration-200 hover:shadow-[0_0_0_1px_rgb(79_70_229/0.45)]"
      >
        {text.slice(range.start, range.end)}
      </mark>
    )
    cursor = range.end
  }
  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

const SCALE_CLASSES = {
  sm: "text-[0.8rem] leading-relaxed",
  md: "text-sm leading-relaxed",
  lg: "text-[0.95rem] leading-[1.65]",
} as const

type ScaleKey = keyof typeof SCALE_CLASSES

export function TranscriptRecordPanel({ text, objections = [] }: TranscriptRecordPanelProps) {
  const [scale, setScale] = useState<ScaleKey>("md")
  const paragraphs = useMemo(() => text.split(/\n+/).filter(Boolean), [text])
  const hasMarks = objections.length > 0

  const cycleScale = () => {
    setScale((s) => (s === "sm" ? "md" : s === "md" ? "lg" : "sm"))
  }

  return (
    <InsightSpotlightSurface
      accent="brand"
      eyebrow="Source material"
      title="Transcript"
      hint="Scroll the conversation as captured. Tagged objection quotes glow in the copy when analysis is available — hover a highlight to see the category."
      className="w-full"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-pitchly-text-secondary">
          Monospace body keeps speaker turns aligned; scale the type if you are reviewing on a small display.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={cycleScale}
            className="rounded-full border border-pitchly-border-strong/70 bg-pitchly-canvas/70 px-3 py-1.5 text-xs font-semibold text-pitchly-text-primary shadow-sm backdrop-blur-sm transition-colors hover:border-pitchly-brand/45 hover:text-pitchly-brand dark:bg-pitchly-raised/45"
          >
            Text scale · {scale.toUpperCase()}
          </motion.button>
          {hasMarks ? (
            <span className="rounded-full border border-pitchly-score-caution/35 bg-pitchly-score-caution/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-pitchly-score-caution">
              {objections.length} linked highlights
            </span>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          "relative mt-2 max-h-[min(65vh,38rem)] overflow-y-auto rounded-2xl border border-white/10 bg-pitchly-canvas/40 px-4 py-4 shadow-inner backdrop-blur-md dark:border-white/[0.06] dark:bg-pitchly-surface/20 sm:px-5 sm:py-5",
          "[scrollbar-width:thin] [scrollbar-color:rgb(148_163_184/0.6)_transparent]"
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-pitchly-brand/8 to-transparent" />
        <div className={cn("relative whitespace-pre-wrap font-mono text-pitchly-text-primary", SCALE_CLASSES[scale])}>
          {paragraphs.map((para, i) => (
            <p key={i} className="mb-4 border-l border-pitchly-border/60 pl-4 last:mb-0 dark:border-white/10">
              {highlightParagraph(para, objections)}
            </p>
          ))}
        </div>
      </div>
    </InsightSpotlightSurface>
  )
}
