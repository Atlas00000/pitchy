"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface RecentCallsShellProps {
  readonly children: ReactNode
  readonly className?: string
}

export function RecentCallsShell({ children, className }: RecentCallsShellProps) {
  return (
    <section
      aria-label="Recent calls"
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-pitchly-border/80 bg-pitchly-canvas px-4 py-4 shadow-pitchly-floating",
        "md:rounded-[2rem] md:px-5 md:py-5",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_-4%,rgba(99,102,241,0.18),transparent_40%),radial-gradient(circle_at_88%_2%,rgba(34,197,94,0.12),transparent_32%),linear-gradient(160deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pitchly-brand/30 to-transparent"
      />
      <div className="relative z-[1]">{children}</div>
    </section>
  )
}
