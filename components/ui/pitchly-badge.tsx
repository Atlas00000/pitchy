import type { HTMLAttributes, ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pitchlyBadgeVariants = cva(
  "inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium [&_[data-dot]]:h-1.5 [&_[data-dot]]:w-1.5 [&_[data-dot]]:shrink-0 [&_[data-dot]]:rounded-full",
  {
    variants: {
      tone: {
        neutral:
          "border-pitchly-border bg-pitchly-surface text-pitchly-text-secondary [&_[data-dot]]:bg-pitchly-text-muted",
        brand:
          "border-pitchly-brand-light bg-pitchly-brand-light text-pitchly-brand [&_[data-dot]]:bg-pitchly-brand",
        success:
          "border-pitchly-score-excellence/30 bg-pitchly-brand-light/80 text-pitchly-score-excellence [&_[data-dot]]:bg-pitchly-score-excellence",
        caution:
          "border-pitchly-score-caution/35 bg-pitchly-surface text-pitchly-score-caution [&_[data-dot]]:bg-pitchly-score-caution",
        danger:
          "border-pitchly-score-critical/35 bg-pitchly-surface text-pitchly-score-critical [&_[data-dot]]:bg-pitchly-score-critical",
        amber:
          "border-pitchly-accent-amber/40 bg-pitchly-surface text-pitchly-text-primary [&_[data-dot]]:bg-pitchly-accent-amber",
      },
      showDot: {
        true: "",
        false: "pl-2",
      },
    },
    defaultVariants: {
      tone: "neutral",
      showDot: true,
    },
  }
)

type PitchlyBadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> &
  VariantProps<typeof pitchlyBadgeVariants> & {
    children: ReactNode
    /** When false, no leading status dot (e.g. compact tags). */
    showDot?: boolean
  }

export function PitchlyBadge({ className, tone, showDot = true, children, ...props }: PitchlyBadgeProps) {
  return (
    <span
      data-slot="pitchly-badge"
      className={cn(pitchlyBadgeVariants({ tone, showDot }), className)}
      {...props}
    >
      {showDot && <span data-dot aria-hidden />}
      {children}
    </span>
  )
}

export { pitchlyBadgeVariants }
