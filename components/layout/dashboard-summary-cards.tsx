"use client"

import { Phone, TrendingUp, AlertCircle, Users } from "lucide-react"
import { useTeamAnalytics } from "@/hooks/use-team-analytics"
import { CardSkeleton } from "@/components/shared/loading-skeleton"

interface SummaryCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  sub?: string
}

function SummaryCard({ label, value, icon, sub }: SummaryCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export function DashboardSummaryCards() {
  const { isLoading, totalCalls, completedCalls, avgScore, topObjection } = useTeamAnalytics()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        label="Total Calls"
        value={totalCalls}
        icon={<Phone size={16} />}
        sub="All time"
      />
      <SummaryCard
        label="Analyzed"
        value={completedCalls ?? 0}
        icon={<TrendingUp size={16} />}
        sub="With AI analysis"
      />
      <SummaryCard
        label="Avg Score"
        value={avgScore > 0 ? avgScore.toFixed(1) : "—"}
        icon={<TrendingUp size={16} />}
        sub="Across all calls"
      />
      <SummaryCard
        label="Top Objection"
        value={topObjection ? topObjection.replace("_", " ") : "—"}
        icon={<AlertCircle size={16} />}
        sub="Most frequent"
      />
    </div>
  )
}
