"use client"

import { use, useMemo } from "react"
import { useCallsByRep } from "@/hooks/use-calls"
import { useAnalysisByRep } from "@/hooks/use-analysis"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { RepStatsHeader } from "@/components/reps/rep-stats-header"
import { StatusBadge } from "@/components/shared/status-badge"
import Link from "next/link"
import type { Id } from "@/convex/_generated/dataModel"

interface PageProps {
  params: Promise<{ repId: string }>
}

function RepDetailContent({ repId }: { repId: Id<"users"> }) {
  const rep = useQuery(api.users.getUser, { userId: repId })
  const calls = useCallsByRep(repId)
  const analyses = useAnalysisByRep(repId)

  const avgScore = useMemo(() => {
    const valid = analyses?.filter((a): a is NonNullable<typeof a> => a !== null) ?? []
    if (valid.length === 0) return null
    return valid.reduce((acc, a) => acc + a.scores.overall, 0) / valid.length
  }, [analyses])

  if (rep === undefined || calls === undefined) {
    return <p className="text-sm text-muted-foreground">Loading…</p>
  }

  if (rep === null) {
    return <p className="text-sm text-red-500">Rep not found.</p>
  }

  const completedCalls = calls?.filter((c) => c.status === "complete").length ?? 0

  return (
    <div className="flex flex-col gap-6">
      <RepStatsHeader
        name={rep.name}
        email={rep.email}
        totalCalls={calls?.length ?? 0}
        completedCalls={completedCalls}
        avgScore={avgScore}
      />

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold">Calls</h2>
        {!calls || calls.length === 0 ? (
          <p className="text-sm text-muted-foreground">No calls yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {calls.map((call) => {
              const analysis = analyses?.filter((a): a is NonNullable<typeof a> => a !== null).find((a) => a.callId === call._id)
              return (
                <Link
                  key={call._id}
                  href={`/calls/${call._id}`}
                  className="flex items-center justify-between rounded-md border px-4 py-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{call.prospectCompany}</span>
                    <span className="text-xs text-muted-foreground">{call.callDate}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {analysis !== null && analysis !== undefined && (
                      <span className="text-sm font-semibold tabular-nums">
                        {analysis.scores.overall.toFixed(1)}
                      </span>
                    )}
                    <StatusBadge status={call.status} />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function RepDetailPage({ params }: PageProps) {
  const { repId } = use(params)
  return <RepDetailContent repId={repId as Id<"users">} />
}
