"use client"

import { useMemo } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { normalizeCallAnalysis } from "@/lib/ai/normalize-analysis"

export function useAnalysis(callId: Id<"calls"> | undefined) {
  const analysis = useQuery(api.analysis.getAnalysis, callId ? { callId } : "skip")
  return useMemo(() => {
    if (analysis === undefined || analysis === null) return analysis
    return { ...analysis, ...normalizeCallAnalysis(analysis) }
  }, [analysis])
}

export function useAnalysisByRep(repId: Id<"users"> | undefined) {
  const analyses = useQuery(api.analysis.getAnalysisByRep, repId ? { repId } : "skip")
  return useMemo(() => {
    if (!analyses) return analyses
    return analyses
      .filter((analysis): analysis is NonNullable<typeof analysis> => analysis !== null)
      .map((analysis) => ({
        ...analysis,
        ...normalizeCallAnalysis(analysis),
      }))
  }, [analyses])
}
