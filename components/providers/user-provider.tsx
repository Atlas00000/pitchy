"use client"

import { useEffect } from "react"
import { useMutation, useConvexAuth } from "convex/react"
import { api } from "@/convex/_generated/api"

// Ensures a Convex user record exists for the signed-in Clerk user.
// Waits for Convex auth to be ready before calling — avoids the race condition
// where the mutation fires before the Clerk token has been passed to Convex.
export function UserProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const ensureUser = useMutation(api.users.ensureCurrentUser)

  useEffect(() => {
    if (isLoading || !isAuthenticated) return
    ensureUser().catch(() => {})
  }, [isAuthenticated, isLoading, ensureUser])

  return <>{children}</>
}
