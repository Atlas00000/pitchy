"use client"

import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

export function NavAuthLinks() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return <div className="h-9 w-24 animate-pulse rounded-md bg-pitchly-raised" />
  }

  if (isSignedIn) {
    return (
      <Link
        href="/dashboard"
        className="rounded-md bg-pitchly-brand px-4 py-2 text-sm font-semibold text-white shadow-pitchly-raised transition-all duration-150 ease-out hover:opacity-90 hover:shadow-pitchly-floating active:scale-[0.97]"
      >
        Dashboard
      </Link>
    )
  }

  return (
    <Link
      href="/sign-in"
      className="rounded-md border border-pitchly-border bg-pitchly-canvas px-4 py-2 text-sm font-semibold text-pitchly-text-secondary shadow-pitchly-raised transition-all duration-150 ease-out hover:border-pitchly-border-strong hover:shadow-pitchly-floating hover:text-pitchly-text-primary active:scale-[0.97]"
    >
      Sign In
    </Link>
  )
}
