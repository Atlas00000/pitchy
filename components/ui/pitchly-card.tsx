import type { HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pitchlyCardVariants = cva(
  "rounded-xl border border-pitchly-border bg-card text-card-foreground shadow-pitchly-raised transition-[transform,box-shadow] duration-150 ease-out",
  {
    variants: {
      interactive: {
        true: "hover:-translate-y-0.5 hover:shadow-pitchly-floating",
        false: "",
      },
      accent: {
        none: "",
        brand: "border-l-4 border-l-pitchly-brand",
        amber: "border-l-4 border-l-pitchly-accent-amber",
        excellence: "border-l-4 border-l-pitchly-score-excellence",
        caution: "border-l-4 border-l-pitchly-score-caution",
        critical: "border-l-4 border-l-pitchly-score-critical",
      },
      padding: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        none: "p-0",
      },
    },
    defaultVariants: {
      interactive: false,
      accent: "none",
      padding: "default",
    },
  }
)

type PitchlyCardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof pitchlyCardVariants>

export function PitchlyCard({ className, interactive, accent, padding, ...props }: PitchlyCardProps) {
  return (
    <div
      data-slot="pitchly-card"
      className={cn(pitchlyCardVariants({ interactive, accent, padding }), className)}
      {...props}
    />
  )
}

export { pitchlyCardVariants }
