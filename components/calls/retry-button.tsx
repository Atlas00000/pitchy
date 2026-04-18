"use client"

import { useState } from "react"
import { useAction } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useToast } from "@/components/shared/toast"
import { Button } from "@/components/ui/button"
import type { Id } from "@/convex/_generated/dataModel"

interface RetryButtonProps {
  callId: Id<"calls">
}

export function RetryButton({ callId }: RetryButtonProps) {
  const analyzeCall = useAction(api.actions.analyzeCall.analyzeCall)
  const showToast = useToast()
  const [retrying, setRetrying] = useState(false)

  async function handleRetry() {
    setRetrying(true)
    try {
      await analyzeCall({ callId })
      showToast("Analysis restarted — results will appear shortly.", "info")
    } catch {
      showToast("Failed to retry analysis. Please try again.", "error")
    } finally {
      setRetrying(false)
    }
  }

  return (
    <Button type="button" size="sm" onClick={handleRetry} disabled={retrying} className="mt-2 self-start">
      {retrying ? "Retrying…" : "Retry analysis"}
    </Button>
  )
}
