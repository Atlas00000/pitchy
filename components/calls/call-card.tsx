import Link from "next/link"
import { formatDate, formatScore, scoreToTailwind } from "@/lib/utils"
import { StatusBadge } from "@/components/shared/status-badge"
import type { Doc } from "@/convex/_generated/dataModel"

interface CallCardProps {
  call: Doc<"calls">
  score?: number
}

export function CallCard({ call, score }: CallCardProps) {
  return (
    <Link
      href={`/calls/${call._id}`}
      className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors border-b last:border-0 group"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{call.prospectCompany}</p>
        <p className="text-xs text-muted-foreground">{call.repName} · {formatDate(call.callDate)}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {score !== undefined && (
          <span className={`text-sm font-semibold ${scoreToTailwind(score)}`}>
            {formatScore(score)}
          </span>
        )}
        <StatusBadge status={call.status} />
      </div>
    </Link>
  )
}
