import type { ReactNode } from "react"
import { PitchlyCard } from "@/components/ui/pitchly-card"
import { cn } from "@/lib/utils"

interface AnalyticsChartCardProps {
  title: string
  children: ReactNode
  className?: string
}

/** Shared shell for Recharts blocks (Week 7 — Reps & analytics). */
export function AnalyticsChartCard({ title, children, className }: AnalyticsChartCardProps) {
  return (
    <PitchlyCard padding="default" className={cn("flex flex-col gap-4", className)}>
      <h2 className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">{title}</h2>
      {children}
    </PitchlyCard>
  )
}
