"use client"

import { useClerk } from "@clerk/nextjs"

export function SignOutButton() {
  const { signOut } = useClerk()

  return (
    <button
      type="button"
      onClick={() => signOut({ redirectUrl: "/" })}
      className="px-5 py-2.5 rounded-md border text-sm font-medium hover:bg-muted transition"
    >
      Sign Out
    </button>
  )
}
