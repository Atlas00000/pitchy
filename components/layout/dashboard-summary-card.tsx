import type { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const accentVariants = cva("border-t-[3px]", {
  variants: {
    accent: {
      brand: "border-t-pitchly-brand",
      excellence: "border-t-pitchly-score-excellence",
      caution: "border-t-pitchly-score-caution",
      alert: "border-t-pitchly-score-critical",
    },
  },
  defaultVariants: {
    accent: "brand",
  },
})

const iconWrapVariants = cva("flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-pitchly-raised", {
  variants: {
    accent: {
      brand: "border-pitchly-brand-light bg-pitchly-brand-light text-pitchly-brand",
      excellence: "border-pitchly-score-excellence/25 bg-pitchly-brand-light/80 text-pitchly-score-excellence",
      caution: "border-pitchly-score-caution/30 bg-pitchly-surface text-pitchly-score-caution",
      alert: "border-pitchly-score-critical/30 bg-pitchly-surface text-pitchly-score-critical",
    },
  },
  defaultVariants: {
    accent: "brand",
  },
})

export type DashboardSummaryAccent = NonNullable<VariantProps<typeof accentVariants>["accent"]>

export interface DashboardSummaryMetricCardProps {
  label: string
  value: string | number
  icon: ReactNode
  sub?: string
  accent?: DashboardSummaryAccent
  className?: string
}

export function DashboardSummaryMetricCard({
  label,
  value,
  icon,
  sub,
  accent = "brand",
  className,
}: DashboardSummaryMetricCardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl border border-pitchly-border bg-card p-5 shadow-pitchly-raised transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-pitchly-floating",
        accentVariants({ accent }),
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-widest text-pitchly-text-muted">{label}</span>
        <span className={iconWrapVariants({ accent })}>{icon}</span>
      </div>
      <p className="mt-4 font-mono text-[2rem] font-bold leading-none tracking-tight text-pitchly-text-primary">
        {value}
      </p>
      {sub ? <p className="mt-2 text-xs text-pitchly-text-secondary">{sub}</p> : null}
    </div>
  )
}
