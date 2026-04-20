"use client"

import type { ReactNode } from "react"

import { PitchlyCard } from "@/components/ui/pitchly-card"
import { cn } from "@/lib/utils"

interface SummaryVisualPanelProps {
  readonly title: string
  readonly subtitle: string
  readonly children: ReactNode
  readonly prominence?: "feature" | "standard" | "compact"
  readonly className?: string
}

const panelProminenceClass = {
  feature: "p-5 md:p-6",
  standard: "p-4 md:p-5",
  compact: "p-4",
} as const

export function SummaryVisualPanel({
  title,
  subtitle,
  children,
  prominence = "standard",
  className,
}: SummaryVisualPanelProps) {
  return (
    <PitchlyCard
      padding="none"
      className={cn(
        "rounded-2xl border-pitchly-border bg-pitchly-surface",
        panelProminenceClass[prominence],
        className
      )}
    >
      <header className="mb-3">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-pitchly-text-muted">{title}</p>
        <p className="mt-1 text-xs text-pitchly-text-secondary">{subtitle}</p>
      </header>
      {children}
    </PitchlyCard>
  )
}

export function SummaryVisualsGrid({ children }: { readonly children: ReactNode }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 md:mt-5 md:grid-cols-12 md:auto-rows-[minmax(152px,auto)] md:gap-3.5">
      {children}
    </div>
  )
}
