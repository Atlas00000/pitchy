"use client"

import type { ReactNode } from "react"

import { PitchlyCard } from "@/components/ui/pitchly-card"
import { cn } from "@/lib/utils"

import type { SummaryMetricTone, SummaryTrendDirection } from "./summary-metric-types"

const toneClass: Record<SummaryMetricTone, string> = {
  brand: "bg-pitchly-brand",
  positive: "bg-pitchly-score-excellence",
  warning: "bg-pitchly-score-caution",
  critical: "bg-pitchly-score-critical",
}

interface SummaryCardShellProps {
  readonly title: string
  readonly value: string
  readonly helper: string
  readonly tone: SummaryMetricTone
  readonly delta?: string
  readonly deltaLabel?: string
  readonly contextLabel?: string
  readonly trendDirection?: SummaryTrendDirection
  readonly visual?: ReactNode
  readonly className?: string
}

export function SummaryCardShell({
  title,
  value,
  helper,
  tone,
  delta,
  deltaLabel,
  contextLabel,
  trendDirection,
  visual,
  className,
}: SummaryCardShellProps) {
  const trendGlyph = trendDirection === "up" ? "↑" : trendDirection === "down" ? "↓" : "→"
  const trendClass =
    trendDirection === "up"
      ? "text-pitchly-score-excellence"
      : trendDirection === "down"
        ? "text-pitchly-score-critical"
        : "text-pitchly-text-muted"

  return (
    <PitchlyCard
      padding="none"
      className={cn(
        "rounded-2xl border-pitchly-border bg-pitchly-surface px-4 py-3.5 md:px-5 md:py-4.5",
        className
      )}
    >
      <header className="mb-3.5 flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pitchly-text-muted">{title}</p>
          <p className="mt-1.5 text-[1.7rem] font-semibold tracking-tight text-pitchly-text-primary md:text-[1.85rem]">
            {value}
          </p>
        </div>
        <span className={cn("mt-1 h-2.5 w-2.5 rounded-full", toneClass[tone])} aria-hidden />
      </header>

      <div className="space-y-2.5">
        {visual}
        <p className="text-xs leading-relaxed text-pitchly-text-secondary">{helper}</p>
      </div>

      {(delta || deltaLabel) && (
        <footer className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          {delta ? (
            <span className="inline-flex items-center gap-1 font-semibold text-pitchly-text-primary">
              {trendDirection ? <span className={cn("text-[0.72rem]", trendClass)}>{trendGlyph}</span> : null}
              {delta}
            </span>
          ) : null}
          {deltaLabel ? <span className="text-pitchly-text-muted">{deltaLabel}</span> : null}
          {contextLabel ? <span className="text-pitchly-text-muted/80">· {contextLabel}</span> : null}
        </footer>
      )}
    </PitchlyCard>
  )
}
