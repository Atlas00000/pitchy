"use client"

export function CallsPageLoading() {
  return (
    <div className="space-y-3.5 md:space-y-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative min-h-[64px] overflow-hidden rounded-xl border border-pitchly-border bg-pitchly-surface/70 p-3"
          >
            <div aria-hidden className="absolute inset-0 pitchly-skeleton-shimmer opacity-70" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-pitchly-border bg-pitchly-surface/70 p-4">
            <div aria-hidden className="absolute inset-0 pitchly-skeleton-shimmer opacity-70" />
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

      <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-pitchly-border bg-pitchly-canvas p-4 md:min-h-[280px]">
        <div aria-hidden className="absolute inset-0 pitchly-skeleton-shimmer opacity-65" />
      </div>
    </div>
  )
}
