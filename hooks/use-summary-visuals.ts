"use client"

import { useMemo } from "react"
import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { useCalls } from "@/hooks/use-calls"
import { SCORE_THRESHOLDS } from "@/lib/constants"

const stageOrder = ["prospecting", "discovery", "demo", "proposal", "negotiation"] as const
const statusOrder = ["pending", "analyzing", "complete", "failed"] as const
const objectionOrder = ["price", "timing", "need", "authority", "competitor"] as const

export function useSummaryVisuals() {
  const calls = useCalls()
  const analyses = useQuery(api.analysis.getAllAnalyses)

  return useMemo(() => {
    const loading = calls === undefined || analyses === undefined
    if (loading) {
      return {
        isLoading: true,
        stageFunnel: stageOrder.map((stage) => ({ stage, count: 0 })),
        statusMix: statusOrder.map((status) => ({ status, count: 0 })),
        objectionMix: objectionOrder.map((category) => ({ category, count: 0 })),
        repMomentum: [] as Array<{ repName: string; calls: number; avgScore: number | null }>,
        scoreBands: [
          { band: "low", count: 0 },
          { band: "mid", count: 0 },
          { band: "high", count: 0 },
        ] as Array<{ band: "low" | "mid" | "high"; count: number }>,
      }
    }

    const stageCounts = new Map<string, number>()
    const statusCounts = new Map<string, number>()
    const objectionCounts = new Map<string, number>()
    const repAgg = new Map<string, { calls: number; scores: number[] }>()
    const scoreBands = { low: 0, mid: 0, high: 0 }

    const analysisByCall = new Map(analyses.map((analysis) => [analysis.callId as string, analysis]))

    for (const call of calls) {
      stageCounts.set(call.dealStage, (stageCounts.get(call.dealStage) ?? 0) + 1)
      statusCounts.set(call.status, (statusCounts.get(call.status) ?? 0) + 1)

      const currentRep = repAgg.get(call.repName) ?? { calls: 0, scores: [] }
      currentRep.calls += 1

      const analysis = analysisByCall.get(call._id as string)
      if (analysis) {
        currentRep.scores.push(analysis.scores.overall)

        for (const objection of analysis.objections) {
          objectionCounts.set(objection.category, (objectionCounts.get(objection.category) ?? 0) + 1)
        }

        if (analysis.scores.overall <= SCORE_THRESHOLDS.low) scoreBands.low += 1
        else if (analysis.scores.overall <= SCORE_THRESHOLDS.mid) scoreBands.mid += 1
        else scoreBands.high += 1
      }

      repAgg.set(call.repName, currentRep)
    }

    return {
      isLoading: false,
      stageFunnel: stageOrder.map((stage) => ({ stage, count: stageCounts.get(stage) ?? 0 })),
      statusMix: statusOrder.map((status) => ({ status, count: statusCounts.get(status) ?? 0 })),
      objectionMix: objectionOrder.map((category) => ({ category, count: objectionCounts.get(category) ?? 0 })),
      repMomentum: [...repAgg.entries()]
        .map(([repName, agg]) => ({
          repName,
          calls: agg.calls,
          avgScore: agg.scores.length > 0 ? agg.scores.reduce((a, b) => a + b, 0) / agg.scores.length : null,
        }))
        .sort((a, b) => b.calls - a.calls)
        .slice(0, 5),
      scoreBands: [
        { band: "low" as const, count: scoreBands.low },
        { band: "mid" as const, count: scoreBands.mid },
        { band: "high" as const, count: scoreBands.high },
      ],
    }
  }, [calls, analyses])
}
