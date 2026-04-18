"use client"

import { use } from "react"
import { useCall } from "@/hooks/use-calls"
import { useAnalysis } from "@/hooks/use-analysis"
import { TranscriptViewer } from "@/components/calls/transcript-viewer"
import { StatusBadge } from "@/components/shared/status-badge"
import { AnalysisSummaryCard } from "@/components/analysis/analysis-summary-card"
import { ScoreCard } from "@/components/analysis/score-card"
import { ObjectionList } from "@/components/analysis/objection-list"
import { CoachingNotesList } from "@/components/analysis/coaching-notes-list"
import { DEAL_STAGES } from "@/lib/constants"
import type { Id } from "@/convex/_generated/dataModel"

interface PageProps {
  params: Promise<{ callId: string }>
}

function CallDetailContent({ callId }: { callId: Id<"calls"> }) {
  const call = useCall(callId)
  const analysis = useAnalysis(callId)

  if (call === undefined) {
    return <p className="text-sm text-muted-foreground">Loading…</p>
  }

  if (call === null) {
    return <p className="text-sm text-red-500">Call not found.</p>
  }

  const objections = analysis?.objections ?? []

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">{call.prospectCompany}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {call.repName} · {call.callDate} · {DEAL_STAGES[call.dealStage]}
          </p>
        </div>
        <StatusBadge status={call.status} />
      </div>

      {/* Analysis status messages */}
      {call.status === "analyzing" && (
        <p className="text-sm text-muted-foreground border rounded-md px-3 py-2 bg-muted/40">
          AI analysis in progress — this page updates automatically when complete.
        </p>
      )}
      {call.status === "failed" && (
        <p className="text-sm text-red-500 border border-red-200 rounded-md px-3 py-2 bg-red-50">
          Analysis failed{call.errorMessage ? `: ${call.errorMessage}` : "."} You can retry by re-submitting the transcript.
        </p>
      )}

      {/* Transcript */}
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold">Transcript</h2>
        <TranscriptViewer text={call.transcriptText} objections={objections} />
      </div>

      {/* Analysis panels */}
      {analysis && (
        <div className="flex flex-col gap-4">
          <AnalysisSummaryCard
            summary={analysis.summary}
            analyzedWith={analysis.analyzedWith}
            promptVersion={analysis.promptVersion}
          />
          <ScoreCard scores={analysis.scores} />
          <ObjectionList objections={analysis.objections} />
          <CoachingNotesList notes={analysis.coachingNotes} />
        </div>
      )}
    </div>
  )
}

export default function CallDetailPage({ params }: PageProps) {
  const { callId } = use(params)
  return <CallDetailContent callId={callId as Id<"calls">} />
}
