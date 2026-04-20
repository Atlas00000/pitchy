"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Phone, Users, Settings, LayoutDashboard, LogOut } from "lucide-react"
import { useClerk } from "@clerk/nextjs"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useDashboardMobileSidebar } from "@/components/providers/dashboard-mobile-sidebar-provider"
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
  const { open, setOpen } = useDashboardMobileSidebar()
  const links = isManager ? managerLinks : repLinks

  useEffect(() => {
    setOpen(false)
  }, [pathname, setOpen])

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        className={cn(
          "fixed inset-0 z-40 bg-pitchly-canvas/70 backdrop-blur-sm transition-opacity duration-200 md:pointer-events-none md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        id="dashboard-sidebar"
        className={cn(
          "flex h-screen w-60 shrink-0 flex-col overflow-y-auto border-r border-pitchly-border bg-sidebar px-3 py-4",
          "fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-out md:sticky md:top-0 md:z-auto md:translate-x-0",
          open ? "translate-x-0 shadow-pitchly-modal" : "-translate-x-full md:translate-x-0 md:shadow-none"
        )}
      >
        <div className="mb-6 px-3">
          <Link
            href="/dashboard"
            className="group inline-block outline-none focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
            aria-label="Pitchly — go to overview"
            onClick={() => setOpen(false)}
          >
            <span className="text-xl font-bold tracking-tight transition-opacity duration-150 group-hover:opacity-90">
              <span className="bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-pitchly-text-primary bg-clip-text text-transparent">
                Pitchly
              </span>
            </span>
            <span className="mt-2 block h-px w-0 bg-gradient-to-r from-pitchly-brand to-pitchly-brand-muted transition-all duration-300 group-hover:w-full" />
          </Link>
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
                onClick={() => setOpen(false)}
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
            onClick={() => {
              setOpen(false)
              void signOut({ redirectUrl: "/" })
            }}
            className="flex w-full items-center gap-3 rounded-md border-l-4 border-l-transparent px-3 py-2 text-left text-sm font-medium text-pitchly-text-secondary transition-all duration-150 ease-out hover:bg-pitchly-raised hover:text-pitchly-text-primary"
          >
            <LogOut size={16} className="shrink-0" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
