"use client"

import { CallsStreamRow } from "./calls-stream-row"
import type { CallsPageGroup, CallsPageRowModel } from "./calls-page-types"

interface CallsPageStreamProps {
  readonly rows: readonly CallsPageRowModel[]
  readonly groups: readonly CallsPageGroup[]
  readonly onFilterByRep: (repName: string) => void
  readonly onFilterByStage: (stage: CallsPageRowModel["dealStage"]) => void
}

export function CallsPageStream({ rows, groups, onFilterByRep, onFilterByStage }: CallsPageStreamProps) {
  return (
    <section className="mt-3 overflow-hidden rounded-2xl border border-pitchly-border/80 bg-pitchly-canvas shadow-pitchly-raised md:mt-4">
      <header className="border-b border-pitchly-border/80 px-4 py-3">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-pitchly-text-muted">
          Full call stream · {rows.length}
        </p>
      </header>
      <div className="divide-y divide-pitchly-border/80">
        {groups.map((group) => (
          <div key={group.key}>
            {groups.length > 1 && (
              <div className="border-b border-pitchly-border/60 bg-pitchly-surface/45 px-4 py-2">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-pitchly-text-muted">
                  {group.label} · {group.rows.length}
                </p>
              </div>
            )}
            {group.rows.map((row) => (
              <CallsStreamRow
                key={row.id}
                row={row}
                onFilterByRep={onFilterByRep}
                onFilterByStage={onFilterByStage}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
