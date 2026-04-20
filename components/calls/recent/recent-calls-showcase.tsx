"use client"

import { useMemo } from "react"
import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { useCalls } from "@/hooks/use-calls"

import { RecentCallsShell } from "./recent-calls-shell"
import { RecentCallsHeader } from "./recent-calls-header"
import { RecentCallSpotlight } from "./recent-call-spotlight"
import { RecentCallRail } from "./recent-call-rail"
import { RecentCallsLoading } from "./recent-calls-loading"
import { RecentCallsEmpty } from "./recent-calls-empty"
import type { RecentCallViewModel } from "./recent-call-types"

type RecentAnalysisLite = {
  callId: string
  scores: { overall: number }
  summary: string
  objections: unknown[]
  coachingNotes: unknown[]
  analyzedWith: "gemini" | "claude"
}

function buildRecentCallsViewModel(
  limitCalls: ReturnType<typeof useCalls>,
  allAnalyses: RecentAnalysisLite[] | undefined
) {
  if (!limitCalls || !allAnalyses) return []

  const analysisByCallId = new Map(
    allAnalyses.map((analysis: RecentAnalysisLite) => [
      analysis.callId as string,
      {
        score: analysis.scores.overall,
        summarySnippet: analysis.summary,
        objectionsCount: analysis.objections.length,
        coachingCount: analysis.coachingNotes.length,
        analyzedWith: analysis.analyzedWith,
      },
    ])
  )

  return limitCalls.map((call) => {
    const analysis = analysisByCallId.get(call._id as string)
    return {
      id: call._id,
      company: call.prospectCompany,
      repName: call.repName,
      callDate: call.callDate,
      status: call.status,
      dealStage: call.dealStage,
      score: analysis?.score,
      objectionsCount: analysis?.objectionsCount ?? 0,
      coachingCount: analysis?.coachingCount ?? 0,
      summarySnippet: analysis?.summarySnippet,
      analyzedWith: analysis?.analyzedWith,
    } satisfies RecentCallViewModel
  })
}

export function RecentCallsShowcase() {
  const calls = useCalls()
  const allAnalyses = useQuery(api.analysis.getAllAnalyses)

  const recentCalls = useMemo(() => {
    if (!calls) return []
    return calls.slice(0, 7)
  }, [calls])

  const mapped = useMemo(
    () => buildRecentCallsViewModel(recentCalls, allAnalyses),
    [recentCalls, allAnalyses]
  )

  const analytics = useMemo(() => {
    const analyzed = mapped.filter((call) => call.score !== undefined)
    const avg =
      analyzed.length > 0
        ? (analyzed.reduce((acc, call) => acc + (call.score ?? 0), 0) / analyzed.length).toFixed(1)
        : "—"
    const reps = new Set(mapped.map((call) => call.repName))
    return {
      analyzedCount: analyzed.length,
      avgScore: avg,
      activeRepCount: reps.size,
    }
  }, [mapped])

  return (
    <RecentCallsShell>
      <RecentCallsHeader
        total={mapped.length}
        analyzed={analytics.analyzedCount}
        avgScore={analytics.avgScore}
        activeRepCount={analytics.activeRepCount}
      />

      {calls === undefined || allAnalyses === undefined ? (
        <RecentCallsLoading />
      ) : mapped.length === 0 ? (
        <RecentCallsEmpty />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-7">
            <RecentCallSpotlight call={mapped[0]} />
          </div>
          <div className="md:col-span-5">
            <RecentCallRail calls={mapped.slice(1)} />
          </div>
        </div>
      )}
    </RecentCallsShell>
  )
}
