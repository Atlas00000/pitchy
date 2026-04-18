"use client"

import { useMemo } from "react"
import { useCalls } from "@/hooks/use-calls"
import { RepCard } from "./rep-card"
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
    return <p className="text-sm text-muted-foreground">Loading…</p>
  }

  if (reps.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No reps found. Calls will appear here once transcripts are uploaded.
      </p>
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
