"use client"

import { use, useEffect, useRef } from "react"
import { useCall } from "@/hooks/use-calls"
import { useAnalysis } from "@/hooks/use-analysis"
import { TranscriptViewer } from "@/components/calls/transcript-viewer"
import { StatusBadge } from "@/components/shared/status-badge"
import { AnalysisSummaryCard } from "@/components/analysis/analysis-summary-card"
import { ScoreCard } from "@/components/analysis/score-card"
import { ObjectionList } from "@/components/analysis/objection-list"
import { CoachingNotesList } from "@/components/analysis/coaching-notes-list"
import { AnalyzedWithBadge } from "@/components/analysis/analyzed-with-badge"
import { RetryButton } from "@/components/calls/retry-button"
import { FadeInUp } from "@/components/motion/fade-in-up"
import { useToast } from "@/components/shared/toast"
import { DEAL_STAGES } from "@/lib/constants"
import type { Id } from "@/convex/_generated/dataModel"

interface PageProps {
  params: Promise<{ callId: string }>
}

function CallDetailContent({ callId }: { callId: Id<"calls"> }) {
  const call = useCall(callId)
  const analysis = useAnalysis(callId)
  const showToast = useToast()
  const prevStatus = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!call) return
    const prev = prevStatus.current
    const next = call.status
    if (prev === "analyzing" && next === "complete") {
      showToast("Analysis complete!", "success")
    }
    if (prev === "analyzing" && next === "failed") {
      showToast("Analysis failed. You can retry below.", "error")
    }
    prevStatus.current = next
  }, [call?.status, call, showToast])

  if (call === undefined) {
    return <p className="text-sm text-pitchly-text-muted">Loading…</p>
  }

  if (call === null) {
    return <p className="text-sm font-medium text-pitchly-score-critical">Call not found.</p>
  }

  const objections = analysis?.objections ?? []

  return (
    <div className="flex flex-col gap-6">
      <FadeInUp delay={0}>
        <div className="flex items-start justify-between gap-4 border-b border-pitchly-border pb-6">
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-xl font-semibold tracking-tight text-pitchly-text-primary">
              {call.prospectCompany}
            </h1>
            <p className="text-sm text-pitchly-text-secondary">
              {call.repName} · <span className="font-mono text-pitchly-text-muted">{call.callDate}</span> ·{" "}
              {DEAL_STAGES[call.dealStage]}
            </p>
            {analysis && (
              <div className="mt-1">
                <AnalyzedWithBadge
                  analyzedWith={analysis.analyzedWith}
                  promptVersion={analysis.promptVersion}
                />
              </div>
            )}
          </div>
          <StatusBadge status={call.status} />
        </div>
      </FadeInUp>

      {call.status === "analyzing" && (
        <FadeInUp delay={0.04}>
          <p className="rounded-md border border-pitchly-border-strong bg-pitchly-surface px-3 py-2 text-sm text-pitchly-text-secondary shadow-pitchly-raised">
            AI analysis in progress — this page updates automatically when complete.
          </p>
        </FadeInUp>
      )}
      {call.status === "failed" && (
        <FadeInUp delay={0.04}>
          <div className="flex flex-col gap-2 rounded-md border border-pitchly-score-critical/35 bg-pitchly-surface px-3 py-3 shadow-pitchly-raised">
            <p className="text-sm font-medium text-pitchly-score-critical">
              Analysis failed{call.errorMessage ? `: ${call.errorMessage}` : "."}
            </p>
            <RetryButton callId={callId} />
          </div>
        </FadeInUp>
      )}

      <FadeInUp delay={0.08}>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">Transcript</h2>
          <TranscriptViewer text={call.transcriptText} objections={objections} />
        </div>
      </FadeInUp>

      {analysis && (
        <FadeInUp delay={0.12}>
          <div className="flex flex-col gap-4">
            <FadeInUp delay={0}>
              <AnalysisSummaryCard
                summary={analysis.summary}
                analyzedWith={analysis.analyzedWith}
                promptVersion={analysis.promptVersion}
              />
            </FadeInUp>
            <FadeInUp delay={0.06}>
              <ScoreCard scores={analysis.scores} />
            </FadeInUp>
            <FadeInUp delay={0.12}>
              <ObjectionList objections={analysis.objections} />
            </FadeInUp>
            <FadeInUp delay={0.18}>
              <CoachingNotesList notes={analysis.coachingNotes} />
            </FadeInUp>
          </div>
        </FadeInUp>
      )}
    </div>
  )
}

export default function CallDetailPage({ params }: PageProps) {
  const { callId } = use(params)
  return <CallDetailContent callId={callId as Id<"calls">} />
}
