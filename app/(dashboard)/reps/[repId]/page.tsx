"use client"

import { use, useMemo } from "react"
import { useCallsByRep } from "@/hooks/use-calls"
import { useAnalysisByRep } from "@/hooks/use-analysis"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { FadeInUp } from "@/components/motion/fade-in-up"
import { RepStatsHeader } from "@/components/reps/rep-stats-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { CallScorePill } from "@/components/calls/call-score-pill"
import Link from "next/link"
import { cn } from "@/lib/utils"
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
    return <p className="text-sm text-pitchly-text-muted">Loading…</p>
  }

  if (rep === null) {
    return <p className="text-sm font-medium text-pitchly-score-critical">Rep not found.</p>
  }

  const completedCalls = calls?.filter((c) => c.status === "complete").length ?? 0

  return (
    <div className="flex flex-col gap-6">
      <FadeInUp delay={0}>
        <RepStatsHeader
          name={rep.name}
          email={rep.email}
          totalCalls={calls?.length ?? 0}
          completedCalls={completedCalls}
          avgScore={avgScore}
        />
      </FadeInUp>

      <FadeInUp delay={0.08}>
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">Calls</h2>
          {!calls || calls.length === 0 ? (
            <p className="text-sm text-pitchly-text-secondary">No calls yet.</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-pitchly-border bg-pitchly-canvas shadow-pitchly-raised">
              {calls.map((call, i) => {
                const analysis = analyses
                  ?.filter((a): a is NonNullable<typeof a> => a !== null)
                  .find((a) => a.callId === call._id)
                return (
                  <Link
                    key={call._id}
                    href={`/calls/${call._id}`}
                    className={cn(
                      "flex items-center justify-between border-b border-pitchly-border px-4 py-3 transition-colors duration-150 last:border-b-0",
                      i % 2 === 1 ? "bg-pitchly-surface/50" : "bg-pitchly-canvas",
                      "hover:bg-pitchly-surface"
                    )}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-pitchly-text-primary">{call.prospectCompany}</span>
                      <span className="font-mono text-xs text-pitchly-text-muted">{call.callDate}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {analysis !== null && analysis !== undefined && (
                        <CallScorePill score={analysis.scores.overall} />
                      )}
                      <StatusBadge status={call.status} />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </FadeInUp>
    </div>
  )
}

export default function RepDetailPage({ params }: PageProps) {
  const { repId } = use(params)
  return <RepDetailContent repId={repId as Id<"users">} />
}
