"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMutation, useAction, useConvexAuth } from "convex/react"
import { api } from "@/convex/_generated/api"
import { TranscriptUploadForm } from "@/components/calls/transcript-upload-form"
import { FadeInUp } from "@/components/motion/fade-in-up"
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
      analyzeCall({ callId }).catch(() => {})
      router.push(`/calls/${callId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return <p className="text-sm text-pitchly-text-muted">Loading…</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <FadeInUp delay={0}>
        <div className="border-b border-pitchly-border pb-6">
          <h1 className="text-xl font-semibold tracking-tight text-pitchly-text-primary">New call</h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-pitchly-text-secondary">
            Paste or upload a transcript to get AI-generated analysis, scores, and coaching notes.
          </p>
        </div>
      </FadeInUp>
      {error && (
        <FadeInUp delay={0.04}>
          <p className="rounded-md border border-pitchly-score-critical/35 bg-pitchly-surface px-3 py-2 text-sm font-medium text-pitchly-score-critical shadow-pitchly-raised">
            {error}
          </p>
        </FadeInUp>
      )}
      <FadeInUp delay={0.06}>
        <TranscriptUploadForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </FadeInUp>
    </div>
  )
}
