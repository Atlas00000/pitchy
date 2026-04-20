"use client"

import { useState } from "react"
import Link from "next/link"
import { useAction } from "convex/react"

import { CallScorePill } from "@/components/calls/call-score-pill"
import { StatusBadge } from "@/components/shared/status-badge"
import { useToast } from "@/components/shared/toast"
import { api } from "@/convex/_generated/api"
import { DEAL_STAGES } from "@/lib/constants"
import { formatDate } from "@/lib/utils"

import type { CallsPageRowModel } from "./calls-page-types"

interface CallsStreamRowProps {
  readonly row: CallsPageRowModel
  readonly onFilterByRep: (repName: string) => void
  readonly onFilterByStage: (stage: CallsPageRowModel["dealStage"]) => void
}

export function CallsStreamRow({ row, onFilterByRep, onFilterByStage }: CallsStreamRowProps) {
  const showToast = useToast()
  const retryAnalyze = useAction(api.actions.analyzeCall.analyzeCall)
  const [retrying, setRetrying] = useState(false)

  async function handleRetry() {
    if (retrying) return
    setRetrying(true)
    try {
      await retryAnalyze({ callId: row.id })
      showToast("Analysis retry started.", "success")
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Retry failed", "error")
    } finally {
      setRetrying(false)
    }
  }

  async function handleCopySummary() {
    if (!row.summarySnippet) return
    try {
      await navigator.clipboard.writeText(row.summarySnippet)
      showToast("Summary copied.", "success")
    } catch {
      showToast("Could not copy summary.", "error")
    }
  }

  return (
    <article className="group grid grid-cols-1 gap-3 border-b border-pitchly-border/80 px-4 py-4 transition-colors duration-150 last:border-b-0 hover:bg-pitchly-surface/55 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-center md:gap-4">
      <div className="min-w-0">
        <Link
          href={`/calls/${row.id}`}
          className="truncate rounded-sm text-sm font-semibold text-pitchly-text-primary outline-none transition-colors hover:text-pitchly-brand focus-visible:ring-2 focus-visible:ring-pitchly-brand/35"
          aria-label={`Open call details for ${row.company}`}
        >
          {row.company}
        </Link>
        <p className="mt-0.5 text-xs text-pitchly-text-secondary">
          <button
            type="button"
            onClick={() => onFilterByRep(row.repName)}
            className="rounded-sm text-pitchly-text-secondary outline-none transition-colors hover:text-pitchly-brand focus-visible:ring-2 focus-visible:ring-pitchly-brand/35"
            aria-label={`Filter calls by rep ${row.repName}`}
          >
            {row.repName}
          </button>
          <span className="text-pitchly-text-muted"> · </span>
          <span className="font-mono text-pitchly-text-muted">{formatDate(row.callDate)}</span>
        </p>
        <button
          type="button"
          onClick={() => onFilterByStage(row.dealStage)}
          className="mt-1 rounded-sm text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-pitchly-text-muted outline-none transition-colors hover:text-pitchly-brand focus-visible:ring-2 focus-visible:ring-pitchly-brand/35"
          aria-label={`Filter calls by stage ${DEAL_STAGES[row.dealStage]}`}
        >
          {DEAL_STAGES[row.dealStage]}
        </button>
      </div>

      <div className="min-w-0">
        <p className="line-clamp-2 text-sm leading-relaxed text-pitchly-text-secondary">
          {row.summarySnippet ?? "No summary yet — analysis still pending for this call."}
        </p>
        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-pitchly-text-muted">
          {row.objectionsCount} objections · {row.coachingCount} coaching notes
          {row.analyzedWith ? ` · ${row.analyzedWith}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-2 md:justify-end">
        {row.score !== undefined ? <CallScorePill score={row.score} /> : null}
        <StatusBadge status={row.status} />
        <Link
          href={`/calls/${row.id}`}
          className="rounded-full border border-pitchly-border bg-pitchly-surface/80 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-pitchly-text-secondary outline-none transition-colors hover:border-pitchly-brand/35 hover:text-pitchly-brand focus-visible:ring-2 focus-visible:ring-pitchly-brand/35"
          aria-label={`Open ${row.company} call details`}
        >
          Open
        </Link>
      </div>

      <div className="md:col-span-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleCopySummary}
          disabled={!row.summarySnippet}
          className="rounded-full border border-pitchly-border bg-pitchly-surface/75 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-pitchly-text-secondary outline-none transition-colors hover:border-pitchly-brand/35 hover:text-pitchly-brand focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 disabled:opacity-45"
          aria-label={`Copy summary for ${row.company}`}
        >
          Copy summary
        </button>
        {row.status === "failed" && (
          <button
            type="button"
            onClick={handleRetry}
            disabled={retrying}
            className="rounded-full border border-pitchly-border bg-pitchly-surface/75 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-pitchly-text-secondary outline-none transition-colors hover:border-pitchly-brand/35 hover:text-pitchly-brand focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 disabled:opacity-45"
            aria-label={`Retry analysis for ${row.company}`}
          >
            {retrying ? "Retrying..." : "Retry analysis"}
          </button>
        )}
      </div>
    </article>
  )
}
