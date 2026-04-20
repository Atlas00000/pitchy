"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function RecentCallsEmpty() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-pitchly-border/80 bg-pitchly-surface/70 px-5 py-10 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(99,102,241,0.2),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(34,197,94,0.12),transparent_32%)]"
      />
      <div className="relative z-[1] mx-auto max-w-xl">
        <h4 className="text-xl font-semibold tracking-tight text-pitchly-text-primary">No calls yet, no insights yet</h4>
        <p className="mt-2 text-sm leading-relaxed text-pitchly-text-secondary">
          Upload your first transcript to activate this command center with live deal movement, objections, and coaching signals.
        </p>
        <div className="mt-5">
          <Link href="/calls/new" className={cn(buttonVariants({ variant: "default", size: "default" }))}>
            Upload transcript
          </Link>
        </div>
      </div>
    </div>
  )
}
