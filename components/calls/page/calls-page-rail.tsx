"use client"

import { CallsPageRailTile } from "./calls-page-rail-tile"
import type { CallsPageRowModel } from "./calls-page-types"

interface CallsPageRailProps {
  readonly rows: readonly CallsPageRowModel[]
}

export function CallsPageRail({ rows }: CallsPageRailProps) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-1">
      {rows.map((row) => (
        <CallsPageRailTile key={row.id} row={row} />
      ))}
    </div>
  )
}
