"use client"

import { Phone } from "lucide-react"
import { useCalls } from "@/hooks/use-calls"
import { CallCard } from "./call-card"
import { EmptyState } from "@/components/shared/empty-state"
import { RowSkeleton } from "@/components/shared/loading-skeleton"

interface CallListProps {
  limit?: number
}

export function CallList({ limit }: CallListProps) {
  const calls = useCalls()

  if (calls === undefined) {
    return (
      <div className="rounded-xl border divide-y">
        {Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)}
      </div>
    )
  }

  if (calls.length === 0) {
    return (
      <EmptyState
        icon={Phone}
        title="No calls yet"
        description="Upload your first transcript to get started."
      />
    )
  }

  const displayed = limit ? calls.slice(0, limit) : calls

  return (
    <div className="rounded-xl border">
      {displayed.map((call) => (
        <CallCard key={call._id} call={call} />
      ))}
    </div>
  )
}
