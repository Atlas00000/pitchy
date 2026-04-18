"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMutation, useAction, useConvexAuth } from "convex/react"
import { api } from "@/convex/_generated/api"
import { TranscriptUploadForm } from "@/components/calls/transcript-upload-form"
import { useToast } from "@/components/shared/toast"
import type { DealStage } from "@/types"
import type { Id } from "@/convex/_generated/dataModel"

interface FormData {
  transcriptText: string
  repName: string
  prospectCompany: string
  dealStage: DealStage
  callDate: string
}

export default function NewCallPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth()
  const createCall = useMutation(api.calls.createCall).withOptimisticUpdate(
    (localStore, args) => {
      const existing = localStore.getQuery(api.calls.getCalls, {})
      if (existing === undefined) return
      localStore.setQuery(api.calls.getCalls, {}, [
        {
          _id: `optimistic_${Date.now()}` as Id<"calls">,
          _creationTime: Date.now(),
          transcriptText: args.transcriptText,
          repName: args.repName,
          prospectCompany: args.prospectCompany,
          dealStage: args.dealStage,
          callDate: args.callDate,
          repId: "optimistic" as Id<"users">,
          teamId: undefined,
          status: "pending" as const,
        },
        ...existing,
      ])
    }
  )
  const analyzeCall = useAction(api.actions.analyzeCall.analyzeCall)
  const showToast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(data: FormData) {
    if (!isAuthenticated) {
      setError("Session expired — please sign in again.")
      return
    }
    setIsSubmitting(true)
    setError(null)
    try {
      const callId = await createCall(data)
      showToast("Call submitted — AI analysis running in background.", "success")
      // Fire-and-forget — analysis runs in background, status updates reactively
      analyzeCall({ callId }).catch(() => {})
      router.push(`/calls/${callId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">New Call</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Paste or upload a transcript to get AI-generated analysis, scores, and coaching notes.
        </p>
      </div>
      {error && (
        <p className="text-sm text-red-500 border border-red-200 rounded-md px-3 py-2 bg-red-50">
          {error}
        </p>
      )}
      <TranscriptUploadForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
