import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

/** Base block with Pitchly shimmer (see `styles/tokens/skeleton-motion.css`). */
export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("pitchly-skeleton-shimmer rounded-md", className)} />
}

export function CardSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-pitchly-border bg-card p-5 shadow-pitchly-raised">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}

export function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-pitchly-border py-3 last:border-0">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="ml-auto h-4 w-16" />
    </div>
  )
}

export function RepCardSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-pitchly-border bg-card p-4 shadow-pitchly-raised">
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="h-6 w-10 rounded-full" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-pitchly-border bg-card p-5 shadow-pitchly-raised">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-[180px] w-full rounded-md" />
    </div>
  )
}
