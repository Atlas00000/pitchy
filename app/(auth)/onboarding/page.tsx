"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { UserRole } from "@/types"

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const createUser = useMutation(api.users.createUser)
  const updateRole = useMutation(api.users.updateRole)

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleContinue() {
    if (!selectedRole || !user) return
    setLoading(true)
    try {
      await createUser({
        clerkId: user.id,
        name: user.fullName ?? user.username ?? "Unknown",
        email: user.primaryEmailAddress?.emailAddress ?? "",
      })
      await updateRole({ role: selectedRole })
      router.push("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Welcome to Pitchly</h1>
        <p className="text-muted-foreground text-sm">How will you be using Pitchly?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {(["manager", "rep"] as UserRole[]).map((role) => (
          <button
            type="button"
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`flex flex-col items-center gap-3 rounded-xl border p-6 text-sm font-medium transition-all ${
              selectedRole === role
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:border-foreground/50"
            }`}
          >
            <span className="text-2xl">{role === "manager" ? "👔" : "🎯"}</span>
            <span className="capitalize">{role === "manager" ? "Sales Manager" : "Sales Rep"}</span>
            <span className="text-xs font-normal opacity-70">
              {role === "manager" ? "Review team calls & insights" : "Get coaching on my calls"}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!selectedRole || loading}
        className="w-full rounded-md bg-foreground text-background py-2.5 text-sm font-medium disabled:opacity-40 hover:opacity-90 transition"
      >
        {loading ? "Setting up..." : "Continue"}
      </button>
    </div>
  )
}
