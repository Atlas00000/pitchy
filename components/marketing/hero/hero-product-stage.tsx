"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { HERO_PREVIEW_DIMENSIONS, HERO_PREVIEW_STATS } from "./hero-data"

export function HeroProductStage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 28, damping: 14 })
  const springY = useSpring(my, { stiffness: 28, damping: 14 })
  const blobA = useTransform(springX, [-0.5, 0.5], [-18, 18])
  const blobB = useTransform(springY, [-0.5, 0.5], [-14, 14])
  const tilt = useTransform(springX, [-0.5, 0.5], [-2.4, 2.4])
  const [hotStat, setHotStat] = useState<string | null>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      mx.set((e.clientX - r.left) / r.width - 0.5)
      my.set((e.clientY - r.top) / r.height - 0.5)
    }
    const onLeave = () => {
      mx.set(0)
      my.set(0)
      setHotStat(null)
    }

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [mx, my])

  return (
    <div
      ref={rootRef}
      className="relative lg:col-span-7"
      role="region"
      aria-label="Example analysis readout for layout demonstration"
    >
      <motion.div
        className="pointer-events-none absolute -right-2 top-6 h-44 w-44 rounded-full bg-pitchly-brand/18 blur-3xl md:h-56 md:w-56"
        style={{ x: blobA, y: useTransform(springY, [-0.5, 0.5], [-8, 8]) }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -left-4 bottom-8 h-40 w-40 rounded-full bg-pitchly-score-excellence/14 blur-3xl md:h-48 md:w-48"
        style={{ x: useTransform(blobA, (v) => -v * 0.65), y: blobB }}
        aria-hidden
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.75rem] border border-pitchly-border/80 bg-pitchly-canvas/80 shadow-[0_28px_80px_-32px_rgb(15_23_42/0.32)] backdrop-blur-md md:rounded-[2rem]"
        style={{ rotate: tilt }}
      >
        <div className="flex items-center gap-2 border-b border-pitchly-border/80 bg-pitchly-surface/90 px-4 py-3 md:px-5">
          <span className="h-2.5 w-2.5 rounded-full bg-pitchly-score-critical/90" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-pitchly-score-caution/90" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-pitchly-score-excellence/90" aria-hidden />
          <span className="ml-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-pitchly-text-muted md:text-xs">
            Example readout
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-pitchly-border/70 bg-pitchly-canvas/60 px-2 py-6 md:px-4 md:py-8">
          {HERO_PREVIEW_STATS.map((s) => {
            const hot = hotStat === s.id
            return (
              <motion.button
                key={s.id}
                type="button"
                className={cn(
                  "flex flex-col items-center gap-1 px-2 outline-none transition-colors md:px-4",
                  "focus-visible:ring-2 focus-visible:ring-pitchly-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-pitchly-canvas"
                )}
                onPointerEnter={() => setHotStat(s.id)}
                whileTap={{ scale: 0.97 }}
                animate={{ scale: hot ? 1.06 : 1, opacity: hotStat !== null && !hot ? 0.55 : 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
              >
                <span
                  className={cn(
                    "font-mono text-3xl font-bold tabular-nums md:text-4xl",
                    s.id === "overall" && "text-pitchly-score-excellence",
                    s.id === "objections" && "text-pitchly-brand",
                    s.id === "notes" && "text-pitchly-score-caution"
                  )}
                >
                  {s.value}
                </span>
                <span className="text-center text-[10px] font-semibold uppercase leading-snug tracking-wide text-pitchly-text-muted md:text-xs">
                  {s.label}
                </span>
              </motion.button>
            )
          })}
        </div>

        <div className="space-y-3.5 border-t border-pitchly-border/80 bg-pitchly-surface/75 px-4 py-5 md:space-y-4 md:px-6 md:py-6">
          {HERO_PREVIEW_DIMENSIONS.map((row, i) => (
            <div key={row.id} className="flex items-center gap-2 md:gap-3">
              <span className="w-30 shrink-0 text-right text-[10px] text-pitchly-text-secondary sm:w-40 sm:text-xs">
                {row.label}
              </span>
              <div className="h-2 flex-1 rounded-full bg-pitchly-raised">
                <motion.div
                  className={cn(
                    "h-2 rounded-full",
                    row.tone === "excellence" ? "bg-pitchly-score-excellence" : "bg-pitchly-score-caution"
                  )}
                  initial={{ width: "0%" }}
                  animate={{ width: `${row.widthPct}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.12 + i * 0.07 }}
                />
              </div>
              <span className="w-6 shrink-0 text-right font-mono text-[11px] font-semibold text-pitchly-text-primary sm:text-xs">
                {row.score}
              </span>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40" aria-hidden />
      </motion.div>
    </div>
  )
}
