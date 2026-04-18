"use client"

import { useMemo } from "react"
import { useCalls } from "./use-calls"
import type { ObjectionCategory } from "@/types"

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
      }

    const completedCalls = calls.filter((c) => c.status === "complete")
    const totalCalls = calls.length

    // Placeholder derived stats — will be enriched once analysis data is joined
    return {
      isLoading: false,
      totalCalls,
      completedCalls: completedCalls.length,
      avgScore: 0 as number,
      topObjection: null as ObjectionCategory | null,
      topRep: null as string | null,
    }
  }, [calls])
}
