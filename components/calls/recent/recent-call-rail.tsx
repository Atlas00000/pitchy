"use client"

import { RecentCallTile } from "./recent-call-tile"
import type { RecentCallViewModel } from "./recent-call-types"

interface RecentCallRailProps {
  readonly calls: readonly RecentCallViewModel[]
}

export function RecentCallRail({ calls }: RecentCallRailProps) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {calls.map((call) => (
        <RecentCallTile key={call.id} call={call} />
      ))}
    </div>
  )
}
