"use client"

import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import {
  AlignLeft,
  BarChart3,
  Files,
  Flag,
  Gauge,
  MessageSquareText,
  UserRound,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { FeatureIconKey, FeatureTag, FeatureTone, MarketingFeature } from "./features-data"
import { MARKETING_FEATURES } from "./features-data"

const ICONS: Record<FeatureIconKey, LucideIcon> = {
  "file-stack": Files,
  "align-left": AlignLeft,
  gauge: Gauge,
  flag: Flag,
  "message-square": MessageSquareText,
  "user-round": UserRound,
  "bar-chart": BarChart3,
}

const TAG_CHIP: Record<FeatureTag, string> = {
  Core: "border-pitchly-brand/25 bg-pitchly-brand-light/95 text-pitchly-brand",
  AI: "border-pitchly-border-strong bg-pitchly-raised text-pitchly-text-secondary",
  Analytics: "border-pitchly-score-excellence/30 bg-pitchly-brand-light/90 text-pitchly-score-excellence",
}

const TONE: Record<
  FeatureTone,
  { glow: string; rail: string; icon: string }
> = {
  brand: {
    glow: "shadow-[0_0_0_1px_rgb(79_70_229/0.12),0_26px_56px_-22px_rgb(79_70_229/0.38)]",
    rail: "from-pitchly-brand via-pitchly-brand-muted to-pitchly-brand-light",
    icon: "border-pitchly-brand/30 bg-pitchly-brand-light text-pitchly-brand",
  },
  neutral: {
    glow: "shadow-[0_0_0_1px_rgb(148_163_184/0.18),0_26px_56px_-22px_rgb(99_102_241/0.15)]",
    rail: "from-pitchly-border-strong via-pitchly-brand-muted to-pitchly-brand-light",
    icon: "border-pitchly-border-strong bg-pitchly-surface text-pitchly-brand-muted",
  },
  caution: {
    glow: "shadow-[0_0_0_1px_rgb(245_158_11/0.16),0_26px_56px_-22px_rgb(245_158_11/0.22)]",
    rail: "from-pitchly-score-caution via-pitchly-accent-amber to-pitchly-brand-light",
    icon: "border-pitchly-score-caution/35 bg-pitchly-brand-light/70 text-pitchly-score-caution",
  },
  critical: {
    glow: "shadow-[0_0_0_1px_rgb(239_68_68/0.12),0_26px_56px_-22px_rgb(239_68_68/0.22)]",
    rail: "from-pitchly-score-critical via-pitchly-score-critical to-pitchly-brand-light",
    icon: "border-pitchly-score-critical/30 bg-pitchly-brand-light/60 text-pitchly-score-critical",
  },
  muted: {
    glow: "shadow-[0_0_0_1px_rgb(129_140_248/0.14),0_26px_56px_-22px_rgb(99_102_241/0.18)]",
    rail: "from-pitchly-brand-muted via-pitchly-border-strong to-pitchly-brand-light",
    icon: "border-pitchly-brand-muted/40 bg-pitchly-canvas text-pitchly-brand",
  },
  excellence: {
    glow: "shadow-[0_0_0_1px_rgb(16_185_129/0.14),0_26px_56px_-22px_rgb(16_185_129/0.26)]",
    rail: "from-pitchly-score-excellence via-pitchly-brand-muted to-pitchly-brand-light",
    icon: "border-pitchly-score-excellence/35 bg-pitchly-brand-light/80 text-pitchly-score-excellence",
  },
}

function effectiveId(hover: string | null, pinned: string) {
  return hover ?? pinned
}

function FeatureTile({
  feature,
  hotId,
  onHover,
  onPick,
}: {
  feature: MarketingFeature
  hotId: string
  onHover: (id: string | null) => void
  onPick: (id: string) => void
}) {
  const Icon = ICONS[feature.icon]
  const tone = TONE[feature.tone]
  const isHot = hotId === feature.id
  const isDimmed = hotId !== feature.id
  const isHero = feature.bentoClass.includes("row-span-2")

  return (
    <motion.div
      layout
      className={cn("relative", feature.bentoClass)}
      onPointerEnter={() => onHover(feature.id)}
      onClick={() => onPick(feature.id)}
    >
      <motion.article
        className={cn(
          "relative flex h-full min-h-0 cursor-pointer flex-col overflow-hidden rounded-[1.65rem] border border-pitchly-border/80 bg-pitchly-canvas/80 p-6 shadow-sm backdrop-blur-md transition-shadow duration-300 md:rounded-[2rem] md:p-7",
          isHot && tone.glow
        )}
        animate={{
          scale: isHot ? 1.015 : 1,
          opacity: isDimmed ? 0.52 : 1,
          y: isHot ? -3 : 0,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        <div
          className={cn(
            "absolute bottom-5 left-4 top-5 w-1 rounded-full bg-gradient-to-b md:left-5",
            tone.rail
          )}
        />

        <div className="relative flex flex-1 flex-col pl-5 md:pl-6">
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-sm transition-transform duration-300 md:h-14 md:w-14",
                isHot && "md:scale-105",
                tone.icon
              )}
            >
              <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.65} aria-hidden />
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                TAG_CHIP[feature.tag]
              )}
            >
              {feature.tag}
            </span>
          </div>

          <h3
            className={cn(
              "mt-5 font-semibold tracking-tight text-pitchly-text-primary",
              isHero ? "text-xl md:text-2xl" : "text-base md:text-lg"
            )}
          >
            {feature.title}
          </h3>
          <p
            className={cn(
              "mt-2 leading-relaxed text-pitchly-text-secondary",
              isHero ? "text-sm md:text-base" : "text-sm"
            )}
          >
            {feature.description}
          </p>
          <p className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-pitchly-text-muted md:text-xs">
            {feature.proof}
          </p>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/30 via-transparent to-transparent"
          animate={{ opacity: isHot ? 0.45 : 0 }}
          transition={{ duration: 0.22 }}
        />
      </motion.article>
    </motion.div>
  )
}

export function FeaturesBento() {
  const defaultId = MARKETING_FEATURES[0]?.id ?? ""
  const [pinned, setPinned] = useState(defaultId)
  const [hover, setHover] = useState<string | null>(null)
  const hotId = effectiveId(hover, pinned)

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const ids = MARKETING_FEATURES.map((f) => f.id)
      const idx = ids.indexOf(pinned)
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        setHover(null)
        setPinned(ids[Math.min(ids.length - 1, idx + 1)] ?? pinned)
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        setHover(null)
        setPinned(ids[Math.max(0, idx - 1)] ?? pinned)
      }
      if (e.key === "Home") {
        e.preventDefault()
        setHover(null)
        setPinned(ids[0] ?? pinned)
      }
      if (e.key === "End") {
        e.preventDefault()
        setHover(null)
        setPinned(ids[ids.length - 1] ?? pinned)
      }
    },
    [pinned]
  )

  return (
    <div
      className="relative rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 focus-visible:ring-offset-4 focus-visible:ring-offset-pitchly-surface lg:col-span-7"
      tabIndex={0}
      role="region"
      aria-label="Product features. Hover tiles to spotlight. Click to pin. Arrow keys move the pin when this grid is focused."
      onKeyDown={onKeyDown}
      onPointerLeave={() => setHover(null)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget
        if (!(next instanceof Node) || !e.currentTarget.contains(next)) {
          setHover(null)
        }
      }}
    >
      <p className="mb-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-pitchly-text-muted lg:text-right">
        Bento layout · hover spotlight · click to pin · arrows when focused
      </p>

      <div className="grid auto-rows-auto grid-cols-12 gap-4 md:gap-5">
        {MARKETING_FEATURES.map((feature) => (
          <FeatureTile
            key={feature.id}
            feature={feature}
            hotId={hotId}
            onHover={setHover}
            onPick={(id) => {
              setPinned(id)
              setHover(null)
            }}
          />
        ))}
      </div>
    </div>
  )
}
