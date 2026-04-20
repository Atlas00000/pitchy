"use client"

import Link from "next/link"

import { CallScorePill } from "@/components/calls/call-score-pill"
import { StatusBadge } from "@/components/shared/status-badge"
import { DEAL_STAGES } from "@/lib/constants"
import { formatDate } from "@/lib/utils"

import type { CallsPageRowModel } from "./calls-page-types"

interface CallsPageSpotlightProps {
  readonly row: CallsPageRowModel
}

export function CallsPageSpotlight({ row }: CallsPageSpotlightProps) {
  return (
    <Link
      href={`/calls/${row.id}`}
      className="group relative overflow-hidden rounded-2xl border border-pitchly-border/80 bg-pitchly-surface/85 p-4 shadow-pitchly-raised transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pitchly-floating md:p-5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(99,102,241,0.16),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]"
      />
      <div className="relative z-[1]">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={row.status} />
          <span className="rounded-full border border-pitchly-border bg-pitchly-canvas/70 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-pitchly-text-secondary">
            {DEAL_STAGES[row.dealStage]}
          </span>
          {row.score !== undefined ? <CallScorePill score={row.score} /> : null}
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-pitchly-text-primary">{row.company}</h3>
        <p className="mt-1 text-sm text-pitchly-text-secondary">
          {row.repName} · <span className="font-mono text-pitchly-text-muted">{formatDate(row.callDate)}</span>
        </p>

        <p className="mt-4 text-sm leading-relaxed text-pitchly-text-secondary">
          {row.summarySnippet ??
            "Analysis is in progress. Open this call to review transcript, objections, and coaching details once complete."}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-pitchly-border bg-pitchly-canvas/70 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-pitchly-text-secondary">
            {row.objectionsCount} objections
          </span>
          <span className="rounded-full border border-pitchly-border bg-pitchly-canvas/70 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-pitchly-text-secondary">
            {row.coachingCount} coaching notes
          </span>
          {row.analyzedWith ? (
            <span className="rounded-full border border-pitchly-border bg-pitchly-canvas/70 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-pitchly-text-secondary">
              {row.analyzedWith}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
