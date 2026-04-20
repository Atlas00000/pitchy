"use client"

export function RecentCallsLoading() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
      <div className="md:col-span-7">
        <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-pitchly-border bg-pitchly-surface/70 p-4">
          <div aria-hidden className="absolute inset-0 pitchly-skeleton-shimmer opacity-70" />
          <div className="relative z-[1] space-y-3">
            <div className="h-5 w-36 rounded bg-pitchly-border/80" />
            <div className="h-4 w-44 rounded bg-pitchly-border/70" />
            <div className="h-14 w-full rounded bg-pitchly-border/70" />
            <div className="h-14 w-full rounded bg-pitchly-border/70" />
          </div>
        </div>
      </div>
      <div className="grid gap-2.5 md:col-span-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative min-h-[86px] overflow-hidden rounded-xl border border-pitchly-border bg-pitchly-surface/70 p-3"
          >
            <div aria-hidden className="absolute inset-0 pitchly-skeleton-shimmer opacity-65" />
          </div>
        ))}
      </div>
    </div>
  )
}
