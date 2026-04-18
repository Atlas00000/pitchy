"use client"

import { useMemo } from "react"
import { Users } from "lucide-react"
import { useCalls } from "@/hooks/use-calls"
import { RepCard } from "./rep-card"
import { EmptyState } from "@/components/shared/empty-state"
import { RepCardSkeleton } from "@/components/shared/loading-skeleton"
import type { Id } from "@/convex/_generated/dataModel"

interface RepRow {
  repId: Id<"users">
  name: string
  totalCalls: number
  completedCalls: number
  avgScore: number | null
}

export function RepList() {
  const calls = useCalls()

  const reps = useMemo<RepRow[]>(() => {
    if (!calls) return []

    const map = new Map<string, RepRow>()
    for (const call of calls) {
      const key = call.repId as string
      if (!map.has(key)) {
        map.set(key, {
          repId: call.repId as Id<"users">,
          name: call.repName,
          totalCalls: 0,
          completedCalls: 0,
          avgScore: null,
        })
      }
      const row = map.get(key)!
      row.totalCalls++
      if (call.status === "complete") row.completedCalls++
    }

    return [...map.values()].sort((a, b) => b.totalCalls - a.totalCalls)
  }, [calls])

  if (calls === undefined) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, i) => <RepCardSkeleton key={i} />)}
      </div>
    )
  }

  if (reps.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No reps yet"
        description="Rep profiles appear here once calls are uploaded and tagged with a rep name."
      />
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {reps.map((rep) => (
        <RepCard key={rep.repId} {...rep} />
      ))}
    </div>
  )
}
