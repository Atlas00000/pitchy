import Link from "next/link"
import { cn, formatDate } from "@/lib/utils"
import { StatusBadge } from "@/components/shared/status-badge"
import { CallScorePill } from "@/components/calls/call-score-pill"
import type { Doc } from "@/convex/_generated/dataModel"

interface CallCardProps {
  call: Doc<"calls">
  score?: number
}

export function CallCard({ call, score }: CallCardProps) {
  return (
    <Link
      href={`/calls/${call._id}`}
      className={cn(
        "group flex items-center gap-4 border-b border-pitchly-border px-4 py-3 transition-colors duration-150 ease-out last:border-b-0",
        "even:bg-pitchly-surface/50 hover:bg-pitchly-surface"
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-pitchly-text-primary">{call.prospectCompany}</p>
        <p className="text-xs text-pitchly-text-muted">
          <span className="text-pitchly-text-secondary">{call.repName}</span>
          <span className="text-pitchly-text-muted"> · </span>
          <span className="font-mono text-pitchly-text-secondary">{formatDate(call.callDate)}</span>
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {score !== undefined && <CallScorePill score={score} />}
        <StatusBadge status={call.status} />
      </div>
    </Link>
  )
}
