"use client"

import { DEAL_STAGES } from "@/lib/constants"
import type { CallStatus } from "@/types"

import type { CallsPageQueryState } from "./calls-page-query-state"

interface CallsPageToolbarProps {
  readonly query: CallsPageQueryState
  readonly onQueryChange: (next: CallsPageQueryState) => void
}

const statusOptions: Array<{ id: "all" | CallStatus; label: string }> = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "analyzing", label: "Analyzing" },
  { id: "complete", label: "Complete" },
  { id: "failed", label: "Failed" },
]

export function CallsPageToolbar({ query, onQueryChange }: CallsPageToolbarProps) {
  return (
    <div className="mb-4 space-y-3 md:mb-5">
      <div className="rounded-xl border border-pitchly-border/75 bg-pitchly-surface/70 p-2.5 md:p-3">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
        <input
          type="search"
          value={query.search}
          onChange={(e) => onQueryChange({ ...query, search: e.target.value })}
          placeholder="Search company or rep..."
          className="h-10 rounded-lg border border-pitchly-border bg-pitchly-canvas/80 px-3 text-sm text-pitchly-text-primary outline-none ring-0 transition-colors placeholder:text-pitchly-text-muted focus:border-pitchly-brand/45"
          aria-label="Search calls by company or rep"
        />

        <select
          value={query.stage}
          onChange={(e) => onQueryChange({ ...query, stage: e.target.value as CallsPageQueryState["stage"] })}
          className="h-10 rounded-lg border border-pitchly-border bg-pitchly-canvas/80 px-3 text-sm text-pitchly-text-primary outline-none transition-colors focus:border-pitchly-brand/45"
          aria-label="Filter calls by deal stage"
        >
          <option value="all">All stages</option>
          {Object.entries(DEAL_STAGES).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={query.sort}
          onChange={(e) => onQueryChange({ ...query, sort: e.target.value as CallsPageQueryState["sort"] })}
          className="h-10 rounded-lg border border-pitchly-border bg-pitchly-canvas/80 px-3 text-sm text-pitchly-text-primary outline-none transition-colors focus:border-pitchly-brand/45"
          aria-label="Sort call results"
        >
          <option value="recent">Newest first</option>
          <option value="score_high">Score high to low</option>
          <option value="score_low">Score low to high</option>
        </select>

        <select
          value={query.groupBy}
          onChange={(e) => onQueryChange({ ...query, groupBy: e.target.value as CallsPageQueryState["groupBy"] })}
          className="h-10 rounded-lg border border-pitchly-border bg-pitchly-canvas/80 px-3 text-sm text-pitchly-text-primary outline-none transition-colors focus:border-pitchly-brand/45"
          aria-label="Group calls by field"
        >
          <option value="none">No grouping</option>
          <option value="status">Group: status</option>
          <option value="stage">Group: stage</option>
          <option value="rep">Group: rep</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {statusOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onQueryChange({ ...query, status: opt.id })}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
              query.status === opt.id
                ? "border-pitchly-brand/45 bg-pitchly-brand-light text-pitchly-brand"
                : "border-pitchly-border bg-pitchly-surface/75 text-pitchly-text-secondary hover:border-pitchly-brand/35 hover:text-pitchly-brand"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      </div>
    </div>
  )
}
