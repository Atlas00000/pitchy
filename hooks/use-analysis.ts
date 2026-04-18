"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"

export function useAnalysis(callId: Id<"calls"> | undefined) {
  return useQuery(api.analysis.getAnalysis, callId ? { callId } : "skip")
}

export function useAnalysisByRep(repId: Id<"users"> | undefined) {
  return useQuery(api.analysis.getAnalysisByRep, repId ? { repId } : "skip")
}
