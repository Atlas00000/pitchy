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
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-pitchly-border bg-pitchly-canvas/95 px-6 backdrop-blur-md supports-[backdrop-filter]:bg-pitchly-canvas/80">
      <h1 className="text-lg font-semibold tracking-tight text-pitchly-text-primary">
        {getTitle(pathname)}
      </h1>
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
