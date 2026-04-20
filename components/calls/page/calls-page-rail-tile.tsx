"use client"

import Link from "next/link"

import { CallScorePill } from "@/components/calls/call-score-pill"
import { StatusBadge } from "@/components/shared/status-badge"
import { formatDate } from "@/lib/utils"

import type { CallsPageRowModel } from "./calls-page-types"

interface CallsPageRailTileProps {
  readonly row: CallsPageRowModel
}

export function CallsPageRailTile({ row }: CallsPageRailTileProps) {
  return (
    <Link
      href={`/calls/${row.id}`}
      className="group relative overflow-hidden rounded-xl border border-pitchly-border/70 bg-pitchly-surface/70 px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-pitchly-brand/45 hover:bg-pitchly-surface"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:bg-[radial-gradient(circle_at_100%_-20%,rgba(99,102,241,0.18),transparent_48%)]"
      />
      <div className="relative z-[1]">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-pitchly-text-primary">{row.company}</p>
          {row.score !== undefined ? <CallScorePill score={row.score} /> : null}
        </div>
        <p className="truncate text-xs text-pitchly-text-secondary">
          {row.repName} · <span className="font-mono text-pitchly-text-muted">{formatDate(row.callDate)}</span>
        </p>
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <StatusBadge status={row.status} className="scale-[0.95]" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-pitchly-text-muted">
            {row.objectionsCount} obj · {row.coachingCount} notes
          </span>
        </div>
      </div>
    </Link>
  )
}
