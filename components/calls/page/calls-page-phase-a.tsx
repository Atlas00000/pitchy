"use client"

import { useState } from "react"

import { CallsPageShell } from "@/components/calls/page/calls-page-shell"
import { CallsPageUtilityStrip } from "@/components/calls/page/calls-page-utility-strip"
import { CallsPageSpotlight } from "@/components/calls/page/calls-page-spotlight"
import { CallsPageRail } from "@/components/calls/page/calls-page-rail"
import { CallsPageStream } from "@/components/calls/page/calls-page-stream"
import { CallsPageToolbar } from "@/components/calls/page/calls-page-toolbar"
import { CallsPageLoading } from "@/components/calls/page/calls-page-loading"
import { CallsPageEmpty } from "@/components/calls/page/calls-page-empty"
import { defaultCallsPageQueryState } from "@/components/calls/page/calls-page-query-state"
import { FadeInUp } from "@/components/motion/fade-in-up"
import { useCallsPageView } from "@/hooks/use-calls-page-view"

export function CallsPagePhaseA() {
  const [query, setQuery] = useState(defaultCallsPageQueryState)
  const { isLoading, rows, filteredRows, groups, stats } = useCallsPageView(query)

  const spotlightRow = filteredRows[0]!
  const railRows = filteredRows.slice(1, 5)

  return (
    <CallsPageShell>
      {isLoading ? (
        <CallsPageLoading />
      ) : rows.length === 0 ? (
        <CallsPageEmpty />
      ) : (
        <>
          <FadeInUp delay={0}>
            <CallsPageUtilityStrip stats={stats} />
          </FadeInUp>
          <FadeInUp delay={0.04}>
            <CallsPageToolbar query={query} onQueryChange={setQuery} />
          </FadeInUp>
          {filteredRows.length > 0 ? (
            <>
              <FadeInUp delay={0.08}>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                  <div className="md:col-span-7">
                    <CallsPageSpotlight row={spotlightRow} />
                  </div>
                  <div className="md:col-span-5">
                    <CallsPageRail rows={railRows} />
                  </div>
                </div>
              </FadeInUp>
              <FadeInUp delay={0.12}>
                <CallsPageStream
                  rows={filteredRows}
                  groups={groups}
                  onFilterByRep={(repName) => setQuery((prev) => ({ ...prev, search: repName, groupBy: "none" }))}
                  onFilterByStage={(stage) => setQuery((prev) => ({ ...prev, stage, groupBy: "none" }))}
                />
              </FadeInUp>
            </>
          ) : (
            <FadeInUp delay={0.06}>
              <CallsPageEmpty />
            </FadeInUp>
          )}
        </>
      )}
    </CallsPageShell>
  )
}
