"use client"

import { useMemo } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useCalls } from "@/hooks/use-calls"
import { BarChart2 } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { ScoreTrendChart } from "@/components/analytics/score-trend-chart"
import { ObjectionBarChart } from "@/components/analytics/objection-bar-chart"
import { RepLeaderboard } from "@/components/analytics/rep-leaderboard"
import { CallVolumeChart } from "@/components/analytics/call-volume-chart"
import { ChartSkeleton } from "@/components/shared/loading-skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { FadeInUp } from "@/components/motion/fade-in-up"
import type { Id } from "@/convex/_generated/dataModel"

export default function AnalyticsPage() {
  const calls = useCalls()
  // Get all analyses for completed calls
  const allAnalyses = useQuery(api.analysis.getAllAnalyses)

  const scoreTrend = useMemo(() => {
    if (!allAnalyses) return []
    return allAnalyses
      .filter((a): a is NonNullable<typeof a> => a !== null)
      .map((a) => ({ date: a.callDate ?? "", score: a.scores.overall }))
      .filter((d) => d.date)
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [allAnalyses])

  const objectionData = useMemo(() => {
    if (!allAnalyses) return []
    const counts: Record<string, number> = {}
    for (const a of allAnalyses.filter((x): x is NonNullable<typeof x> => x !== null)) {
      for (const obj of a.objections) {
        counts[obj.category] = (counts[obj.category] ?? 0) + 1
      }
    }
    return Object.entries(counts).map(([category, count]) => ({ category, count }))
  }, [allAnalyses])

  const { leaderboard, volumeData } = useMemo(() => {
    if (!calls) return { leaderboard: [], volumeData: [] }

    const repMap = new Map<string, { repId: Id<"users">; name: string; callCount: number; scores: number[] }>()
    for (const call of calls) {
      const key = call.repId as string
      if (!repMap.has(key)) {
        repMap.set(key, { repId: call.repId as Id<"users">, name: call.repName, callCount: 0, scores: [] })
      }
      const row = repMap.get(key)!
      row.callCount++
    }

    if (allAnalyses) {
      for (const analysis of allAnalyses.filter((x): x is NonNullable<typeof x> => x !== null)) {
        const callMatch = calls.find((c) => c._id === analysis.callId)
        if (!callMatch) continue
        const row = repMap.get(callMatch.repId as string)
        if (row) row.scores.push(analysis.scores.overall)
      }
    }

    const leaderboard = [...repMap.values()]
      .filter((r) => r.scores.length > 0)
      .map((r) => ({
        repId: r.repId,
        name: r.name,
        avgScore: r.scores.reduce((a, b) => a + b, 0) / r.scores.length,
        callCount: r.callCount,
      }))

    const volumeData = [...repMap.values()].map((r) => ({
      name: r.name.split(" ")[0],
      calls: r.callCount,
    }))

    return { leaderboard, volumeData }
  }, [calls, allAnalyses])

  const isLoading = calls === undefined || allAnalyses === undefined
  const hasData = (calls?.length ?? 0) > 0

  return (
    <div className="flex flex-col gap-6">
      <FadeInUp delay={0}>
        <PageHeader
          title="Analytics"
          description="Team-level performance trends and insights."
        />
      </FadeInUp>
      {isLoading ? (
        <FadeInUp delay={0.06}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <ChartSkeleton key={i} />
            ))}
          </div>
        </FadeInUp>
      ) : !hasData ? (
        <FadeInUp delay={0.06}>
          <EmptyState
            icon={BarChart2}
            title="No data yet"
            description="Analytics will populate once calls are uploaded and analyzed."
          />
        </FadeInUp>
      ) : (
        <FadeInUp delay={0.06}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ScoreTrendChart data={scoreTrend} />
            <ObjectionBarChart data={objectionData} />
            <RepLeaderboard rows={leaderboard} />
            <CallVolumeChart data={volumeData} />
          </div>
        </FadeInUp>
      )}
    </div>
  )
}
