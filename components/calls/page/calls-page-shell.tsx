"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CallsPageShellProps {
  readonly children: ReactNode
  readonly className?: string
}

export function CallsPageShell({ children, className }: CallsPageShellProps) {
  return (
    <section
      aria-label="Calls intelligence workspace"
      className={cn(
        "relative overflow-hidden rounded-[1.8rem] border border-pitchly-border/80 bg-pitchly-canvas p-3.5 shadow-pitchly-floating md:p-5",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_-6%,rgba(99,102,241,0.18),transparent_38%),radial-gradient(circle_at_92%_4%,rgba(34,197,94,0.12),transparent_34%),linear-gradient(160deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pitchly-brand/35 to-transparent"
      />
      <div className="relative z-[1]">{children}</div>
    </section>
  )
}
