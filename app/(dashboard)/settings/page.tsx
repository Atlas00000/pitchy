"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useCurrentUser } from "@/hooks/use-current-user"
import { PageHeader } from "@/components/shared/page-header"
import type { AIProviderType } from "@/types"

export default function SettingsPage() {
  const { user, isLoading } = useCurrentUser()
  const updateAiProvider = useMutation(api.users.updateAiProvider)

  const [apiKey, setApiKey] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleProviderChange(provider: AIProviderType) {
    if (!user) return
    await updateAiProvider({ aiProvider: provider, encryptedApiKey: provider === "claude" ? apiKey || user.encryptedApiKey : undefined })
  }

  async function handleSaveKey() {
    if (!apiKey.trim()) return
    setSaving(true)
    try {
      await updateAiProvider({ aiProvider: "claude", encryptedApiKey: apiKey.trim() })
      setApiKey("")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) return null

  const activeProvider = user?.aiProvider ?? "gemini"

  return (
    <div className="max-w-xl space-y-8">
      <PageHeader title="Settings" description="Manage your AI provider and preferences." />

      <section className="rounded-xl border p-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold">AI Provider</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Choose which model analyzes your calls.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(["gemini", "claude"] as AIProviderType[]).map((provider) => (
            <button
              key={provider}
              onClick={() => handleProviderChange(provider)}
              className={`flex flex-col items-start gap-1 rounded-lg border p-4 text-sm transition-all ${
                activeProvider === provider
                  ? "border-foreground bg-foreground/5 font-semibold"
                  : "border-border hover:border-foreground/40"
              }`}
            >
              <span className="capitalize">{provider === "gemini" ? "Gemini Flash" : "Claude Sonnet"}</span>
              <span className="text-xs text-muted-foreground font-normal">
                {provider === "gemini" ? "Free · No setup required" : "BYOK · Your Anthropic key"}
              </span>
            </button>
          ))}
        </div>
      </section>

      {activeProvider === "claude" && (
        <section className="rounded-xl border p-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Anthropic API Key</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {user?.encryptedApiKey ? "A key is saved. Paste a new one to replace it." : "Required to use Claude for analysis."}
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="sk-ant-api03-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
            <button
              onClick={handleSaveKey}
              disabled={!apiKey.trim() || saving}
              className="px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium disabled:opacity-40 hover:opacity-90 transition"
            >
              {saving ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
