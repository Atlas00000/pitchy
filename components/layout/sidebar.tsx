"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Phone, Users, Settings, LayoutDashboard, LogOut } from "lucide-react"
import { useClerk } from "@clerk/nextjs"
import { useCurrentUser } from "@/hooks/use-current-user"
import { cn } from "@/lib/utils"
import { PitchlyBadge } from "@/components/ui/pitchly-badge"

const managerLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/calls", label: "Calls", icon: Phone },
  { href: "/reps", label: "Reps", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/settings", label: "Settings", icon: Settings },
]

const repLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/calls", label: "My Calls", icon: Phone },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, isLoading, isManager } = useCurrentUser()
  const { signOut } = useClerk()
  const links = isManager ? managerLinks : repLinks

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col overflow-y-auto border-r border-pitchly-border bg-sidebar px-3 py-4">
      <div className="mb-6 flex items-center gap-2 px-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-pitchly-brand shadow-pitchly-raised">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 12L6 5L9 9L11 7L14 12H3Z" fill="white" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-lg font-bold tracking-tight text-pitchly-text-primary">Pitchly</span>
      </div>

      <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-widest text-pitchly-text-muted">
        Workspace
      </p>
      <nav className="flex flex-1 flex-col gap-0.5">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md border-l-4 px-3 py-2 text-sm font-medium transition-all duration-150 ease-out",
                active
                  ? "border-l-pitchly-brand bg-pitchly-brand-light text-pitchly-brand shadow-pitchly-raised"
                  : "border-l-transparent text-pitchly-text-secondary hover:bg-pitchly-raised hover:text-pitchly-text-primary"
              )}
            >
              <Icon size={16} strokeWidth={active ? 2 : 1.75} className="shrink-0 opacity-90" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto space-y-3 border-t border-pitchly-border pt-4">
        {isLoading ? (
          <div className="mx-3 h-10 animate-pulse rounded-md bg-pitchly-raised" aria-hidden />
        ) : user ? (
          <div className="rounded-md border border-pitchly-border bg-pitchly-canvas px-3 py-2 shadow-pitchly-raised">
            <p className="truncate text-sm font-semibold text-pitchly-text-primary">{user.name}</p>
            <div className="mt-1.5">
              <PitchlyBadge tone={user.role === "manager" ? "brand" : "neutral"} showDot={false} className="text-[10px]">
                {user.role === "manager" ? "Manager" : "Rep"}
              </PitchlyBadge>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => signOut({ redirectUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-md border-l-4 border-l-transparent px-3 py-2 text-left text-sm font-medium text-pitchly-text-secondary transition-all duration-150 ease-out hover:bg-pitchly-raised hover:text-pitchly-text-primary"
        >
          <LogOut size={16} className="shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
