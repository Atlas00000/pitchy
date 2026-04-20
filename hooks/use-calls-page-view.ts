"use client"

import { useMemo } from "react"
import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { useCalls } from "@/hooks/use-calls"
import { DEAL_STAGES } from "@/lib/constants"
import type { CallsPageGroup, CallsPageRowModel, CallsPageStats } from "@/components/calls/page/calls-page-types"
import type { CallsPageQueryState } from "@/components/calls/page/calls-page-query-state"

function formatSummarySnippet(value: string | undefined) {
  if (!value) return undefined
  return value.length > 160 ? `${value.slice(0, 157)}...` : value
}

function applySort(rows: CallsPageRowModel[], sort: CallsPageQueryState["sort"]) {
  const clone = [...rows]
  if (sort === "score_high") {
    clone.sort((a, b) => (b.score ?? -1) - (a.score ?? -1))
    return clone
  }
  if (sort === "score_low") {
    clone.sort((a, b) => (a.score ?? 999) - (b.score ?? 999))
    return clone
  }
  clone.sort((a, b) => b.callDate.localeCompare(a.callDate))
  return clone
}

function applyFilters(rows: CallsPageRowModel[], query: CallsPageQueryState) {
  const needle = query.search.trim().toLowerCase()
  return rows.filter((row) => {
    if (query.status !== "all" && row.status !== query.status) return false
    if (query.stage !== "all" && row.dealStage !== query.stage) return false
    if (!needle) return true
    return row.company.toLowerCase().includes(needle) || row.repName.toLowerCase().includes(needle)
  })
}

function buildGroups(rows: CallsPageRowModel[], groupBy: CallsPageQueryState["groupBy"]): CallsPageGroup[] {
  if (groupBy === "none") return [{ key: "all", label: "All calls", rows }]

  const map = new Map<string, CallsPageRowModel[]>()
  for (const row of rows) {
    const key = groupBy === "status" ? row.status : groupBy === "stage" ? row.dealStage : row.repName
    map.set(key, [...(map.get(key) ?? []), row])
  }

  return [...map.entries()].map(([key, groupedRows]) => ({
    key,
    label: groupBy === "stage" ? DEAL_STAGES[key as keyof typeof DEAL_STAGES] ?? key : key,
    rows: groupedRows,
  }))
}

export function useCallsPageView(query: CallsPageQueryState) {
  const calls = useCalls()
  const analyses = useQuery(api.analysis.getAllAnalyses)

  return useMemo(() => {
    const isLoading = calls === undefined || analyses === undefined
    if (isLoading) {
      return {
        isLoading: true,
        rows: [] as CallsPageRowModel[],
        stats: {
          totalCalls: 0,
          analyzedCalls: 0,
          avgScore: "—",
          activeReps: 0,
        } satisfies CallsPageStats,
        filteredRows: [] as CallsPageRowModel[],
        groups: [] as CallsPageGroup[],
      }
    }

    const analysisByCall = new Map(
      analyses.map((analysis) => [
        analysis.callId as string,
        {
          score: analysis.scores.overall,
          summarySnippet: formatSummarySnippet(analysis.summary),
          objectionsCount: analysis.objections.length,
          coachingCount: analysis.coachingNotes.length,
          analyzedWith: analysis.analyzedWith,
        },
      ])
    )

    const rows: CallsPageRowModel[] = calls.map((call) => {
      const insight = analysisByCall.get(call._id as string)
      return {
        id: call._id,
        company: call.prospectCompany,
        repName: call.repName,
        callDate: call.callDate,
        status: call.status,
        dealStage: call.dealStage,
        score: insight?.score,
        summarySnippet: insight?.summarySnippet,
        objectionsCount: insight?.objectionsCount ?? 0,
        coachingCount: insight?.coachingCount ?? 0,
        analyzedWith: insight?.analyzedWith,
      }
    })

    const analyzed = rows.filter((row) => row.score !== undefined)
    const avgScore =
      analyzed.length > 0
        ? (analyzed.reduce((acc, row) => acc + (row.score ?? 0), 0) / analyzed.length).toFixed(1)
        : "—"

    const stats: CallsPageStats = {
      totalCalls: rows.length,
      analyzedCalls: analyzed.length,
      avgScore,
      activeReps: new Set(rows.map((row) => row.repName)).size,
    }

    const filteredRows = applySort(applyFilters(rows, query), query.sort)
    const groups = buildGroups(filteredRows, query.groupBy)

    return { isLoading: false, rows, stats, filteredRows, groups }
  }, [calls, analyses, query])
}
