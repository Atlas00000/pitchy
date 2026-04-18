"use client"

import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

export function NavAuthLinks() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
  }

  if (isSignedIn) {
    return (
      <Link
        href="/dashboard"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
      >
        Dashboard
      </Link>
    )
  }

  return (
    <Link
      href="/sign-in"
      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
    >
      Sign In
    </Link>
  )
}
