"use client"

import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { Home, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useDashboardMobileSidebar } from "@/components/providers/dashboard-mobile-sidebar-provider"
import { cn } from "@/lib/utils"

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/calls": "Calls",
  "/reps": "Reps",
  "/analytics": "Analytics",
  "/settings": "Settings",
}

function getTitle(pathname: string): string {
  for (const [path, title] of Object.entries(pageTitles)) {
    if (pathname === path || pathname.startsWith(path + "/")) return title
  }
  return "Pitchly"
}

export function Topbar() {
  const pathname = usePathname()
  const title = getTitle(pathname)
  const homeActive = pathname === "/dashboard"
  const { open, toggle } = useDashboardMobileSidebar()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-pitchly-border/80 bg-pitchly-canvas/90 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-pitchly-canvas/75 md:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-pitchly-border/80 bg-pitchly-canvas/90 text-pitchly-text-secondary transition-colors hover:text-pitchly-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open ? "true" : "false"}
          aria-controls="dashboard-sidebar"
          onClick={toggle}
        >
          <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>

        <Link
          href="/dashboard"
          className={cn(
            "group inline-flex shrink-0 items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-pitchly-canvas md:px-3.5",
            homeActive
              ? "border-pitchly-brand/35 bg-pitchly-brand-light text-pitchly-brand"
              : "border-pitchly-border/80 bg-pitchly-canvas/90 text-pitchly-text-secondary hover:border-pitchly-brand/30 hover:text-pitchly-brand"
          )}
          aria-current={homeActive ? "page" : undefined}
        >
          <Home className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-px" strokeWidth={2} aria-hidden />
          <span>Home</span>
        </Link>

        <div className="hidden h-8 w-px bg-pitchly-border/90 sm:block" aria-hidden />

        <h1 className="min-w-0 truncate text-base font-semibold tracking-tight text-pitchly-text-primary md:text-lg">
          {title}
        </h1>
      </div>

      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: "ring-2 ring-pitchly-border ring-offset-2 ring-offset-pitchly-canvas",
          },
        }}
      />
    </header>
  )
}
