import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border p-5 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}

export function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3 border-b last:border-0">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-16 ml-auto" />
    </div>
  )
}

export function RepCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 flex items-center justify-between gap-4">
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
    <div className="rounded-xl border p-5 space-y-3">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-[180px] w-full rounded-md" />
    </div>
  )
}
