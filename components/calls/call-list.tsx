"use client"

import Link from "next/link"
import { Phone } from "lucide-react"
import { useCalls } from "@/hooks/use-calls"
import { CallCard } from "./call-card"
import { EmptyState } from "@/components/shared/empty-state"
import { RowSkeleton } from "@/components/shared/loading-skeleton"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CallListProps {
  limit?: number
}

export function CallList({ limit }: CallListProps) {
  const calls = useCalls()

  if (calls === undefined) {
    return (
      <div className="overflow-hidden rounded-xl border border-pitchly-border bg-pitchly-canvas shadow-pitchly-raised">
        {Array.from({ length: 5 }).map((_, i) => (
          <RowSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (calls.length === 0) {
    return (
      <EmptyState
        icon={Phone}
        title="No calls yet"
        description="Upload your first transcript to get started."
        action={
          <Link href="/calls/new" className={cn(buttonVariants({ variant: "default", size: "default" }))}>
            Upload transcript
          </Link>
        }
      />
    )
  }

  const displayed = limit ? calls.slice(0, limit) : calls

  return (
    <div className="overflow-hidden rounded-xl border border-pitchly-border bg-pitchly-canvas shadow-pitchly-raised">
      {displayed.map((call) => (
        <CallCard key={call._id} call={call} />
      ))}
    </div>
  )
}
