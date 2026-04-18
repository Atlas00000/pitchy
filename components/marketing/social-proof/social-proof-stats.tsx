"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { SocialStat, SocialStatTone } from "./social-proof-data"
import { SOCIAL_STATS } from "./social-proof-data"

const TONE: Record<
  SocialStatTone,
  { glow: string; rail: string; value: string }
> = {
  brand: {
    glow: "shadow-[0_0_0_1px_rgb(79_70_229/0.12),0_24px_52px_-20px_rgb(79_70_229/0.35)]",
    rail: "from-pitchly-brand via-pitchly-brand-muted to-pitchly-brand-light",
    value: "text-pitchly-brand",
  },
  caution: {
    glow: "shadow-[0_0_0_1px_rgb(245_158_11/0.14),0_24px_52px_-20px_rgb(245_158_11/0.22)]",
    rail: "from-pitchly-score-caution via-pitchly-accent-amber to-pitchly-brand-light",
    value: "text-pitchly-score-caution",
  },
  excellence: {
    glow: "shadow-[0_0_0_1px_rgb(16_185_129/0.14),0_24px_52px_-20px_rgb(16_185_129/0.26)]",
    rail: "from-pitchly-score-excellence via-pitchly-brand-muted to-pitchly-brand-light",
    value: "text-pitchly-score-excellence",
  },
}

function StatOrb({
  stat,
  index,
  hotId,
  onHover,
}: {
  stat: SocialStat
  index: number
  hotId: string | null
  onHover: (id: string | null) => void
}) {
  const tone = TONE[stat.tone]
  const isHot = hotId === stat.id
  const isDim = hotId !== null && !isHot

  return (
    <motion.div
      className={cn(
        "relative cursor-default",
        index === 1 && "lg:-translate-x-2 lg:translate-y-3",
        index === 2 && "lg:-translate-y-2 lg:translate-x-1"
      )}
      onPointerEnter={() => onHover(stat.id)}
    >
      <motion.article
        className={cn(
          "relative overflow-hidden rounded-[1.75rem] border border-pitchly-border/75 bg-pitchly-canvas/80 px-6 py-6 backdrop-blur-md md:rounded-[2rem] md:px-7 md:py-7",
          isHot && tone.glow
        )}
        animate={{
          scale: isHot ? 1.04 : 1,
          opacity: isDim ? 0.5 : 1,
          rotate: isHot ? (index === 1 ? -0.8 : index === 2 ? 0.6 : 0) : index === 1 ? -1.2 : index === 2 ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <div className={cn("absolute bottom-4 left-4 top-4 w-1 rounded-full bg-gradient-to-b md:left-5", tone.rail)} />
        <div className="relative space-y-2 pl-5 md:pl-6">
          <p className={cn("font-mono text-4xl font-bold tabular-nums tracking-tight md:text-5xl", tone.value)}>{stat.value}</p>
          <p className="text-sm font-semibold text-pitchly-text-primary md:text-base">{stat.label}</p>
          <motion.p
            className="text-xs leading-relaxed text-pitchly-text-secondary md:text-sm"
            initial={false}
            animate={{ opacity: isHot ? 1 : 0.72, y: isHot ? 0 : 2 }}
            transition={{ duration: 0.2 }}
          >
            {stat.context}
          </motion.p>
        </div>
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/25 via-transparent to-transparent"
          animate={{ opacity: isHot ? 0.5 : 0 }}
        />
      </motion.article>
    </motion.div>
  )
}

export function SocialProofStats() {
  const [hotId, setHotId] = useState<string | null>(null)

  return (
    <div
      className="relative flex flex-col gap-4 lg:col-span-7 lg:gap-5"
      onPointerLeave={() => setHotId(null)}
    >
      <p className="text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-pitchly-text-muted lg:text-right">
        Live metrics · hover to spotlight
      </p>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3 lg:items-stretch">
        {SOCIAL_STATS.map((stat, index) => (
          <StatOrb key={stat.id} stat={stat} index={index} hotId={hotId} onHover={setHotId} />
        ))}
      </div>
    </div>
  )
}
