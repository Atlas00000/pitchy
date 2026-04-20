"use client"

import { useCallback, useRef, useState } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

import type { SummaryMetricModel, SummaryMetricTone } from "./summary-metric-types"

const toneRail: Record<SummaryMetricTone, string> = {
  brand: "from-pitchly-brand via-pitchly-brand-muted to-transparent",
  positive: "from-pitchly-score-excellence via-pitchly-brand-light to-transparent",
  warning: "from-pitchly-score-caution via-pitchly-accent-amber/80 to-transparent",
  critical: "from-pitchly-score-critical via-pitchly-score-critical/50 to-transparent",
}

const toneSpot: Record<SummaryMetricTone, string> = {
  brand: "rgb(99 102 241 / 0.14)",
  positive: "rgb(34 197 94 / 0.12)",
  warning: "rgb(245 158 11 / 0.12)",
  critical: "rgb(239 68 68 / 0.12)",
}

export interface SummaryMetricTileProps {
  readonly metric: SummaryMetricModel
  readonly className?: string
  /** When set (0–1), renders a compact progress ring suited to the analyzed metric. */
  readonly ringProgress?: number | null
}

export function SummaryMetricTile({ metric, className, ringProgress }: SummaryMetricTileProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [spot, setSpot] = useState({ x: 50, y: 35 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = rootRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    })
  }, [])

  const onLeave = useCallback(() => {
    setSpot({ x: 50, y: 28 })
  }, [])

  const showRing = ringProgress != null && Number.isFinite(ringProgress)
  const clamped = showRing ? Math.min(1, Math.max(0, ringProgress as number)) : 0
  const circumference = 2 * Math.PI * 18
  const dash = circumference * (1 - clamped)

  return (
    <motion.div
      ref={rootRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 420, damping: 28 } }}
      whileTap={{ scale: 0.985 }}
      className={cn("group relative min-h-0", className)}
    >
      <div
        className={cn(
          "relative flex h-full min-h-[9.5rem] flex-col justify-between overflow-hidden rounded-[1.35rem] border border-white/10 bg-pitchly-surface/45 px-5 pb-5 pt-5 shadow-[0_24px_48px_-28px_rgb(15_23_42/0.45)] backdrop-blur-xl transition-[box-shadow] duration-300 dark:border-white/[0.06] dark:bg-pitchly-raised/35 dark:shadow-[0_28px_56px_-24px_rgb(0_0_0/0.55)]",
          "md:min-h-[10.5rem] md:rounded-[1.5rem] md:px-6 md:pb-6 md:pt-6"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(520px circle at ${spot.x}% ${spot.y}%, ${toneSpot[metric.tone]}, transparent 42%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent dark:via-white/10"
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-4 top-7 bottom-7 w-[3px] rounded-full bg-gradient-to-b md:left-5",
            toneRail[metric.tone]
          )}
        />

        <div className="relative flex items-start justify-between gap-3 pl-2 md:pl-3">
          <p className="max-w-[14rem] text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-pitchly-text-muted">
            {metric.title}
          </p>
          {showRing ? (
            <div className="relative h-12 w-12 shrink-0">
              <svg className="-rotate-90" viewBox="0 0 44 44" width="48" height="48" aria-hidden>
                <circle cx="22" cy="22" r="18" fill="none" className="stroke-pitchly-border/80" strokeWidth="4" />
                <motion.circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  className="stroke-pitchly-score-excellence"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: dash }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[0.65rem] font-semibold tabular-nums text-pitchly-text-secondary">
                {Math.round(clamped * 100)}
                <span className="text-[0.55rem] font-medium text-pitchly-text-muted">%</span>
              </span>
            </div>
          ) : (
            <span
              aria-hidden
              className={cn(
                "h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_20px_currentColor] md:h-3 md:w-3",
                metric.tone === "brand" && "bg-pitchly-brand text-pitchly-brand",
                metric.tone === "positive" && "bg-pitchly-score-excellence text-pitchly-score-excellence",
                metric.tone === "warning" && "bg-pitchly-score-caution text-pitchly-score-caution",
                metric.tone === "critical" && "bg-pitchly-score-critical text-pitchly-score-critical"
              )}
            />
          )}
        </div>

        <div className="relative mt-auto pl-2 md:pl-3">
          <p className="font-mono text-[1.85rem] font-bold leading-none tracking-tight text-pitchly-text-primary md:text-[2.1rem]">
            <span className="bg-gradient-to-br from-pitchly-text-primary via-pitchly-text-primary to-pitchly-text-secondary/90 bg-clip-text text-transparent">
              {metric.value}
            </span>
          </p>
          <p className="mt-2 max-w-[18rem] text-xs leading-relaxed text-pitchly-text-secondary">{metric.helper}</p>
        </div>
      </div>
    </motion.div>
  )
}
