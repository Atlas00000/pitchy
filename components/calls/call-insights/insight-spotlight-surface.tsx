"use client"

import { useCallback, useRef, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export type InsightAccent = "brand" | "excellence" | "caution" | "critical"

const accentSpot: Record<InsightAccent, string> = {
  brand: "rgb(99 102 241 / 0.16)",
  excellence: "rgb(16 185 129 / 0.14)",
  caution: "rgb(245 158 11 / 0.14)",
  critical: "rgb(239 68 68 / 0.14)",
}

const accentRail: Record<InsightAccent, string> = {
  brand: "from-pitchly-brand via-pitchly-brand-muted to-transparent",
  excellence: "from-pitchly-score-excellence via-pitchly-brand-light to-transparent",
  caution: "from-pitchly-score-caution via-pitchly-accent-amber/70 to-transparent",
  critical: "from-pitchly-score-critical via-pitchly-score-critical/45 to-transparent",
}

export interface InsightSpotlightSurfaceProps {
  readonly accent: InsightAccent
  readonly eyebrow: string
  readonly title: string
  readonly hint?: string
  readonly children: ReactNode
  readonly className?: string
}

export function InsightSpotlightSurface({
  accent,
  eyebrow,
  title,
  hint,
  children,
  className,
}: InsightSpotlightSurfaceProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [spot, setSpot] = useState({ x: 45, y: 30 })

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
    setSpot({ x: 50, y: 22 })
  }, [])

  return (
    <motion.div
      ref={rootRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 380, damping: 26 } }}
      className={cn("group relative", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-pitchly-surface/40 px-5 pb-5 pt-5 shadow-[0_28px_56px_-32px_rgb(15_23_42/0.5)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-pitchly-raised/30 dark:shadow-[0_32px_64px_-28px_rgb(0_0_0/0.55)]",
          "md:rounded-[1.65rem] md:px-6 md:pb-6 md:pt-6"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-85 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(560px circle at ${spot.x}% ${spot.y}%, ${accentSpot[accent]}, transparent 44%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/12"
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-4 top-8 bottom-8 w-[3px] rounded-full bg-gradient-to-b md:left-5",
            accentRail[accent]
          )}
        />

        <header className="relative space-y-1.5 pl-3 md:pl-4">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-pitchly-text-muted">{eyebrow}</p>
          <h2 className="text-lg font-semibold tracking-tight text-pitchly-text-primary md:text-xl">{title}</h2>
          {hint ? <p className="max-w-2xl text-xs leading-relaxed text-pitchly-text-secondary md:text-sm">{hint}</p> : null}
        </header>

        <div className="relative mt-6 space-y-4 pl-1 md:mt-7 md:pl-2">{children}</div>
      </div>
    </motion.div>
  )
}
