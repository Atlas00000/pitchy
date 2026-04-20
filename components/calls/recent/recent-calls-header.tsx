"use client"

import { cn } from "@/lib/utils"

interface RecentCallsHeaderProps {
  readonly total: number
  readonly analyzed: number
  readonly avgScore: string
  readonly activeRepCount: number
}

interface StatChipProps {
  readonly label: string
  readonly value: string
  readonly accent?: "brand" | "excellence"
}

function StatChip({ label, value, accent = "brand" }: StatChipProps) {
  return (
    <div className="rounded-xl border border-pitchly-border/80 bg-pitchly-surface/80 px-3 py-2">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-pitchly-text-muted">{label}</p>
      <p
        className={cn(
          "mt-1 text-sm font-semibold tracking-tight",
          accent === "excellence" ? "text-pitchly-score-excellence" : "text-pitchly-text-primary"
        )}
      >
        {value}
      </p>
    </div>
  )
}

export function RecentCallsHeader({ total, analyzed, avgScore, activeRepCount }: RecentCallsHeaderProps) {
  return (
    <header className="mb-4 flex flex-col gap-3 md:mb-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-pitchly-text-muted">
          Conversation stream
        </p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-pitchly-text-primary">
          Recent calls with live intelligence context
        </h3>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-pitchly-text-secondary">
          Review outcomes, coaching signals, and deal movement from the latest conversations.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <StatChip label="Recent calls" value={`${total}`} />
        <StatChip label="Analyzed" value={`${analyzed}`} accent="excellence" />
        <StatChip label="Avg score" value={avgScore} accent="excellence" />
        <StatChip label="Active reps" value={`${activeRepCount}`} />
      </div>
    </header>
  )
}
