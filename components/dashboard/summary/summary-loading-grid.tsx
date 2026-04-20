"use client"

import { cn } from "@/lib/utils"

function ShimmerCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-pitchly-border bg-pitchly-surface p-4">
      <div aria-hidden className="absolute inset-0 pitchly-skeleton-shimmer opacity-70" />
      <div className="relative z-[1] space-y-3">
        <div className="h-3 w-24 rounded bg-pitchly-border/80" />
        <div className="h-8 w-20 rounded bg-pitchly-border/70" />
        <div className="h-14 rounded bg-pitchly-border/70" />
      </div>
    </div>
  )
}

export function SummaryLoadingGrid() {
  return (
    <div className={cn("grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4")}>
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
    </div>
  )
}
