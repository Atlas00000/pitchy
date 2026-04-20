"use client"

import { useMemo } from "react"
import { useCalls } from "./use-calls"
import type { ObjectionCategory } from "@/types"

function buildDateRange(days: number, offsetDays = 0) {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - offsetDays - (days - 1 - i))
    return date.toISOString().slice(0, 10)
  })
}

function sum(values: readonly number[]) {
  return values.reduce((acc, value) => acc + value, 0)
}

function percentDelta(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 100)
}

export function useTeamAnalytics() {
  const calls = useCalls()

  return useMemo(() => {
    if (!calls)
      return {
        isLoading: true,
        totalCalls: 0,
        completedCalls: 0,
        avgScore: 0,
        topObjection: null,
        topRep: null,
        weeklyVolume: [0, 0, 0, 0, 0, 0, 0] as number[],
        scoreTrend: [0, 0, 0, 0, 0, 0, 0] as number[],
        frictionDistribution: [
          { label: "price", value: 0 },
          { label: "timing", value: 0 },
          { label: "need", value: 0 },
        ] as Array<{ label: string; value: number }>,
        volumeLast7: 0,
        volumePrev7: 0,
        volumeDeltaPercent: 0,
        volumeLast30: 0,
        coverageLast7: 0,
        coveragePrev7: 0,
        coverageDeltaPercent: 0,
      }

    const completedCalls = calls.filter((call) => call.status === "complete")
    const totalCalls = calls.length

    const last7Days = buildDateRange(7, 0)
    const prev7Days = buildDateRange(7, 7)
    const last30Days = buildDateRange(30, 0)

    const volumeByDate = new Map<string, number>()
    for (const call of calls) {
      volumeByDate.set(call.callDate, (volumeByDate.get(call.callDate) ?? 0) + 1)
    }
    const weeklyVolume = last7Days.map((date) => volumeByDate.get(date) ?? 0)
    const prevWeekVolumeSeries = prev7Days.map((date) => volumeByDate.get(date) ?? 0)
    const monthVolumeSeries = last30Days.map((date) => volumeByDate.get(date) ?? 0)

    const volumeLast7 = sum(weeklyVolume)
    const volumePrev7 = sum(prevWeekVolumeSeries)
    const volumeLast30 = sum(monthVolumeSeries)
    const volumeDeltaPercent = percentDelta(volumeLast7, volumePrev7)

    const completedByDate = new Map<string, number>()
    for (const call of completedCalls) {
      completedByDate.set(call.callDate, (completedByDate.get(call.callDate) ?? 0) + 1)
    }
    const scoreTrend = last7Days.map((date, index) => {
      const volume = weeklyVolume[index]
      if (volume === 0) return 0
      const completed = completedByDate.get(date) ?? 0
      return Number(((completed / volume) * 10).toFixed(1))
    })

    const completedLast7 = sum(last7Days.map((date) => completedByDate.get(date) ?? 0))
    const completedPrev7 = sum(prev7Days.map((date) => completedByDate.get(date) ?? 0))
    const coverageLast7 = volumeLast7 > 0 ? Math.round((completedLast7 / volumeLast7) * 100) : 0
    const coveragePrev7 = volumePrev7 > 0 ? Math.round((completedPrev7 / volumePrev7) * 100) : 0
    const coverageDeltaPercent = coverageLast7 - coveragePrev7

    const stageCounts = new Map<string, number>()
    for (const call of calls) {
      stageCounts.set(call.dealStage, (stageCounts.get(call.dealStage) ?? 0) + 1)
    }
    const frictionDistribution = [
      { label: "timing", value: stageCounts.get("prospecting") ?? 0 },
      { label: "need", value: stageCounts.get("discovery") ?? 0 },
      { label: "price", value: stageCounts.get("proposal") ?? 0 },
    ]

    return {
      isLoading: false,
      totalCalls,
      completedCalls: completedCalls.length,
      avgScore: 0 as number,
      topObjection: null as ObjectionCategory | null,
      topRep: null as string | null,
      weeklyVolume,
      scoreTrend,
      frictionDistribution,
      volumeLast7,
      volumePrev7,
      volumeDeltaPercent,
      volumeLast30,
      coverageLast7,
      coveragePrev7,
      coverageDeltaPercent,
    }
  }, [calls])
}
