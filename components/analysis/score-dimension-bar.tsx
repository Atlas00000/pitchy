"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { bandBarFill, bandText, scoreToBand } from "@/components/analysis/analysis-score-bands"

interface ScoreDimensionBarProps {
  label: string
  score: number
}

export function ScoreDimensionBar({ label, score }: ScoreDimensionBarProps) {
  const pct = Math.min(Math.max(score / 10, 0), 1) * 100
  const band = scoreToBand(score)
  const [widthPct, setWidthPct] = useState(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => setWidthPct(pct))
    return () => cancelAnimationFrame(id)
  }, [pct])

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-pitchly-text-secondary">{label}</span>
        <span className={cn("font-semibold tabular-nums", bandText[band])}>{score}/10</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-pitchly-raised">
        <div
          className={cn(
            "h-full max-w-full rounded-full transition-[width] duration-700 ease-out",
            bandBarFill[band]
          )}
          style={{ width: `${widthPct}%` }}
        />
      </div>
    </div>
  )
}
