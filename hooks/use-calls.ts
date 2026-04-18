"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"

export function useCalls() {
  return useQuery(api.calls.getCalls)
}

export function useCall(callId: Id<"calls"> | undefined) {
  return useQuery(api.calls.getCall, callId ? { callId } : "skip")
}

export function useCallsByRep(repId: Id<"users"> | undefined) {
  return useQuery(api.calls.getCallsByRep, repId ? { repId } : "skip")
}
