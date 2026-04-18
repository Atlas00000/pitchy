"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

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

  return (
    <header className="flex items-center justify-between border-b px-6 h-14 bg-background shrink-0">
      <h1 className="text-sm font-semibold">{getTitle(pathname)}</h1>
      <UserButton />
    </header>
  )
}
