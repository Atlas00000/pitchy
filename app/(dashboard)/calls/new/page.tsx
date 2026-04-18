"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMutation, useAction } from "convex/react"
import { api } from "@/convex/_generated/api"
import { TranscriptUploadForm } from "@/components/calls/transcript-upload-form"
import type { DealStage } from "@/types"

interface FormData {
  transcriptText: string
  repName: string
  prospectCompany: string
  dealStage: DealStage
  callDate: string
}

export default function NewCallPage() {
  const router = useRouter()
  const createCall = useMutation(api.calls.createCall)
  const analyzeCall = useAction(api.actions.analyzeCall.analyzeCall)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(data: FormData) {
    setIsSubmitting(true)
    setError(null)
    try {
      const callId = await createCall(data)
      // Fire-and-forget — analysis runs in background, status updates reactively
      analyzeCall({ callId }).catch(() => {})
      router.push(`/calls/${callId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setIsSubmitting(false)
    }
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
