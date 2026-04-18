"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Hourglass, Scale, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProblemPainIconKey, ProblemPainPoint, ProblemPainTone } from "./problem-pain-data"
import { PROBLEM_PAIN_POINTS } from "./problem-pain-data"

const ICONS: Record<ProblemPainIconKey, LucideIcon> = {
  clock: Clock,
  scale: Scale,
  hourglass: Hourglass,
}

const TONE_STYLES: Record<
  ProblemPainTone,
  { bar: string; glow: string; iconWrap: string; stat: string }
> = {
  brand: {
    bar: "from-pitchly-brand via-pitchly-brand-muted to-pitchly-brand-light",
    glow: "shadow-[0_0_0_1px_rgb(79_70_229/0.12),0_24px_48px_-20px_rgb(79_70_229/0.35)]",
    iconWrap: "border-pitchly-brand/25 bg-pitchly-brand-light/80 text-pitchly-brand",
    stat: "text-pitchly-brand",
  },
  caution: {
    bar: "from-pitchly-score-caution via-pitchly-accent-amber to-pitchly-brand-light",
    glow: "shadow-[0_0_0_1px_rgb(245_158_11/0.15),0_24px_48px_-20px_rgb(245_158_11/0.22)]",
    iconWrap: "border-pitchly-score-caution/30 bg-pitchly-brand-light/50 text-pitchly-score-caution",
    stat: "text-pitchly-score-caution",
  },
  critical: {
    bar: "from-pitchly-score-critical via-pitchly-score-critical to-pitchly-brand-light",
    glow: "shadow-[0_0_0_1px_rgb(239_68_68/0.12),0_24px_48px_-20px_rgb(239_68_68/0.25)]",
    iconWrap: "border-pitchly-score-critical/25 bg-pitchly-brand-light/40 text-pitchly-score-critical",
    stat: "text-pitchly-score-critical",
  },
}

function PainCard({ point, index, activeId, onActivate, onDeactivate }: PainCardProps) {
  const Icon = ICONS[point.icon]
  const tone = TONE_STYLES[point.tone]
  const isActive = activeId === point.id
  const isDimmed = activeId !== null && !isActive

  return (
    <motion.article
      layout
      tabIndex={0}
      aria-label={`${point.title}. ${point.description}`}
      onPointerEnter={() => onActivate(point.id)}
      onFocus={() => onActivate(point.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onActivate(point.id)
        }
        if (e.key === "Escape") onDeactivate()
      }}
      className={cn(
        "group relative cursor-default rounded-[1.75rem] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-pitchly-surface",
        index % 2 === 1 && "lg:translate-x-4"
      )}
      animate={{
        scale: isActive ? 1.02 : 1,
        opacity: isDimmed ? 0.48 : 1,
        y: isActive ? -2 : 0,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.85 }}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.75rem] border border-pitchly-border/70 bg-pitchly-canvas/75 py-6 pl-5 pr-6 backdrop-blur-md transition-shadow duration-300 md:rounded-[2rem] md:py-7 md:pl-7 md:pr-8",
          isActive && tone.glow
        )}
      >
        {/* Left spectrum bar */}
        <div
          className={cn(
            "absolute bottom-4 left-3 top-4 w-1 rounded-full bg-gradient-to-b md:left-4",
            tone.bar
          )}
        />

        <div className="relative flex flex-col gap-4 pl-4 md:flex-row md:items-start md:gap-6 md:pl-2">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-sm transition-transform duration-300 group-hover:rotate-[-6deg] md:h-14 md:w-14",
              tone.iconWrap
            )}
          >
            <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} aria-hidden />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold tracking-tight text-pitchly-text-primary md:text-xl">
                {point.title}
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-pitchly-text-secondary md:text-[15px] md:leading-relaxed">
              {point.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start border-t border-pitchly-border/60 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <span className={cn("font-mono text-2xl font-semibold tabular-nums md:text-3xl", tone.stat)}>
              {point.stat}
            </span>
            <span className="mt-1 max-w-[10rem] text-[11px] font-medium uppercase leading-snug tracking-wider text-pitchly-text-muted">
              {point.statLabel}
            </span>
          </div>
        </div>

        {/* Hover sheen */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/25 via-transparent to-transparent opacity-0"
          animate={{ opacity: isActive ? 0.55 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </div>
    </motion.article>
  )
}

interface PainCardProps {
  point: ProblemPainPoint
  index: number
  activeId: string | null
  onActivate: (id: string) => void
  onDeactivate: () => void
}

export function ProblemPainRail() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div
      className="relative flex flex-col gap-5 lg:col-span-7"
      onPointerLeave={() => setActiveId(null)}
    >
      <div className="mb-1 flex items-center justify-between gap-4 lg:justify-end">
        <p className="text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-pitchly-text-muted lg:text-right">
          Three failure modes before structured AI review
        </p>
      </div>

      <div
        className="flex flex-col gap-4 md:gap-5"
        onBlurCapture={(e) => {
          const next = e.relatedTarget
          if (!(next instanceof Node) || !e.currentTarget.contains(next)) {
            setActiveId(null)
          }
        }}
      >
        {PROBLEM_PAIN_POINTS.map((point, index) => (
          <PainCard
            key={point.id}
            point={point}
            index={index}
            activeId={activeId}
            onActivate={setActiveId}
            onDeactivate={() => setActiveId(null)}
          />
        ))}
      </div>
    </div>
  )
}
