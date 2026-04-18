"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { bandStroke, scoreToBand } from "@/components/analysis/analysis-score-bands"

const R = 44
const C = 2 * Math.PI * R

interface ScoreRingProps {
  score: number
  /** Outer diameter in CSS px (viewBox scales). */
  size?: number
  className?: string
}

/**
 * Circular progress ring for overall call score (docs/UI-OVERHAUL — Week 6).
 * Count-up on mount (~800ms).
 */
export function ScoreRing({ score, size = 132, className }: ScoreRingProps) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const clamped = Math.min(Math.max(score, 0), 10)
    const start = performance.now()
    const duration = 800
    let frame: number

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - t) * (1 - t)
      setDisplayed(clamped * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
      else setDisplayed(clamped)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [score])

  const progress = Math.min(Math.max(displayed / 10, 0), 1)
  const offset = C * (1 - progress)
  const band = scoreToBand(score)

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      aria-label={`Overall score ${score.toFixed(1)} out of 10`}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="7"
          className="text-pitchly-border"
          stroke="currentColor"
        />
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          stroke="currentColor"
          className={cn("transition-[stroke-dashoffset] duration-100 ease-out", bandStroke[band])}
          strokeDasharray={C}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-bold leading-none tracking-tight text-pitchly-text-primary tabular-nums">
          {displayed.toFixed(1)}
        </span>
        <span className="mt-0.5 text-xs font-medium text-pitchly-text-muted">/ 10</span>
      </div>
    </div>
  )
}
