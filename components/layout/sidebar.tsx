"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Phone, Users, Settings, LayoutDashboard, LogOut } from "lucide-react"
import { useClerk } from "@clerk/nextjs"
import { useCurrentUser } from "@/hooks/use-current-user"
import { cn } from "@/lib/utils"

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
  const { isManager } = useCurrentUser()
  const { signOut } = useClerk()
  const links = isManager ? managerLinks : repLinks

  return (
    <aside className="flex flex-col w-56 h-screen sticky top-0 border-r bg-background px-3 py-4 shrink-0 overflow-y-auto">
      <div className="px-3 mb-6">
        <span className="text-lg font-bold tracking-tight">Pitchly</span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === href || pathname.startsWith(href + "/")
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => signOut({ redirectUrl: "/" })}
        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </aside>
  )
}
