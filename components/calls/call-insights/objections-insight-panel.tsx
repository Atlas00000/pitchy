"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Objection, ObjectionCategory } from "@/types"
import { InsightSeverityTag } from "@/components/calls/call-insights/insight-severity-tag"
import { TalkTrackList } from "@/components/calls/call-insights/talk-track-list"

import { InsightSpotlightSurface } from "./insight-spotlight-surface"

export interface ObjectionsInsightPanelProps {
  readonly objections: Objection[]
}

const CATEGORY_ACCENT: Record<ObjectionCategory, "critical" | "caution" | "brand" | "excellence"> = {
  price: "critical",
  timing: "caution",
  authority: "brand",
  need: "caution",
  competitor: "brand",
  other: "caution",
}

function formatCategory(category: string) {
  return category.replaceAll("_", " ")
}

export function ObjectionsInsightPanel({ objections }: ObjectionsInsightPanelProps) {
  const sorted = useMemo(() => [...objections].sort((a, b) => a.position - b.position), [objections])

  if (objections.length === 0) {
    return (
      <InsightSpotlightSurface
        accent="brand"
        eyebrow="Friction map"
        title="Objections"
        hint="When the model tags pushback in the transcript, each moment lands here with category, quote, and a suggested pivot."
      >
        <p className="text-sm leading-relaxed text-pitchly-text-secondary">
          No objections were tagged on this call. If the transcript is thin on buyer pushback, try a longer recording or
          re-run analysis after edits.
        </p>
      </InsightSpotlightSurface>
    )
  }

  return (
    <InsightSpotlightSurface
      accent="critical"
      eyebrow="Friction map"
      title={`Objections · ${objections.length}`}
      hint="Scroll the timeline: each block is ordered by where it surfaced in the call. Open the drawer for a ready-made pivot line."
    >
      <div className="relative space-y-0 pl-1 md:pl-2">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-pitchly-score-critical/50 via-pitchly-border to-pitchly-score-caution/40 md:left-[13px]"
        />
        <div role="list" className="relative">
        {sorted.map((obj, i) => {
          const hasPlaybook = Boolean(obj.suggestedResponse?.trim())
          const rowAccent = CATEGORY_ACCENT[obj.category] ?? "caution"

          return (
            <div key={`${obj.position}-${i}`} className="relative pb-8 last:pb-0" role="listitem">
              <div className="flex gap-4 md:gap-5">
                <div className="relative z-10 flex w-6 shrink-0 flex-col items-center md:w-7">
                  <span
                    className={cn(
                      "mt-1 flex h-6 w-6 items-center justify-center rounded-full border text-[0.65rem] font-bold tabular-nums ring-4 ring-pitchly-canvas dark:ring-pitchly-surface",
                      rowAccent === "critical" &&
                        "border-pitchly-score-critical/50 bg-pitchly-score-critical/15 text-pitchly-score-critical",
                      rowAccent === "caution" &&
                        "border-pitchly-score-caution/45 bg-pitchly-score-caution/12 text-pitchly-score-caution",
                      rowAccent === "brand" &&
                        "border-pitchly-brand/45 bg-pitchly-brand-light text-pitchly-brand",
                      rowAccent === "excellence" &&
                        "border-pitchly-score-excellence/45 bg-pitchly-brand-light/90 text-pitchly-score-excellence"
                    )}
                  >
                    {i + 1}
                  </span>
                </div>

                <motion.div
                  layout
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-pitchly-canvas/55 px-4 py-4 shadow-inner backdrop-blur-sm dark:border-white/[0.06] dark:bg-pitchly-surface/25 md:px-5 md:py-5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest",
                        rowAccent === "critical" &&
                          "border-pitchly-score-critical/35 bg-pitchly-score-critical/10 text-pitchly-score-critical",
                        rowAccent === "caution" &&
                          "border-pitchly-score-caution/35 bg-pitchly-score-caution/10 text-pitchly-score-caution",
                        rowAccent === "brand" &&
                          "border-pitchly-brand/35 bg-pitchly-brand-light/90 text-pitchly-brand",
                        rowAccent === "excellence" &&
                          "border-pitchly-score-excellence/35 bg-pitchly-score-excellence/10 text-pitchly-score-excellence"
                      )}
                    >
                      {formatCategory(obj.category)}
                    </span>
                    <span className="font-mono text-[0.65rem] text-pitchly-text-muted">pos {obj.position}</span>
                    <InsightSeverityTag severity={obj.severity} />
                  </div>

                  <blockquote className="mt-3 border-l-2 border-pitchly-border-strong/80 pl-4 text-sm leading-relaxed text-pitchly-text-primary md:text-[0.95rem]">
                    {obj.quote}
                  </blockquote>

                  {hasPlaybook ? (
                    <details className="mt-4">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-pitchly-border-strong/60 bg-pitchly-canvas/70 px-3 py-1.5 text-xs font-semibold text-pitchly-text-primary marker:content-none [&::-webkit-details-marker]:hidden transition-colors hover:border-pitchly-brand/40 hover:text-pitchly-brand dark:bg-pitchly-raised/50">
                        <span>Playbook line</span>
                        <ChevronDown size={16} strokeWidth={2} className="opacity-70" aria-hidden />
                      </summary>
                      <div className="mt-3 rounded-xl border border-pitchly-border/80 bg-pitchly-surface/50 px-4 py-3 text-sm leading-relaxed text-pitchly-text-secondary dark:bg-pitchly-raised/35">
                        {obj.suggestedResponse}
                      </div>
                    </details>
                  ) : null}

                  <TalkTrackList items={obj.talkTrackSuggestions} title="Talk track suggestions" />
                </motion.div>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </InsightSpotlightSurface>
  )
}
