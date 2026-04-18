"use client"

import { useMemo } from "react"
import { useQuery } from "convex/react"
import { Users } from "lucide-react"
import { api } from "@/convex/_generated/api"
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
  const allAnalyses = useQuery(api.analysis.getAllAnalyses)

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

    const scoresByRep = new Map<string, number[]>()
    if (allAnalyses) {
      for (const a of allAnalyses) {
        if (!a) continue
        const call = calls.find((c) => c._id === a.callId)
        if (!call) continue
        const key = call.repId as string
        const list = scoresByRep.get(key) ?? []
        list.push(a.scores.overall)
        scoresByRep.set(key, list)
      }
    }

    for (const row of map.values()) {
      const scores = scoresByRep.get(row.repId as string)
      if (scores && scores.length > 0) {
        row.avgScore = scores.reduce((s, x) => s + x, 0) / scores.length
      }
    }

    return [...map.values()].sort((a, b) => b.totalCalls - a.totalCalls)
  }, [calls, allAnalyses])

  if (calls === undefined || allAnalyses === undefined) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <RepCardSkeleton key={i} />
        ))}
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
    <div className="flex flex-col gap-3">
      {reps.map((rep) => (
        <RepCard key={rep.repId} {...rep} />
      ))}
    </div>
  )
}
