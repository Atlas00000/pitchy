"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

interface ApiKeyFormProps {
  hasExistingKey: boolean
  onSaved: () => void
}

export function ApiKeyForm({ hasExistingKey, onSaved }: ApiKeyFormProps) {
  const updateAiProvider = useMutation(api.users.updateAiProvider)
  const [key, setKey] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    const trimmed = key.trim()
    if (!trimmed) return
    if (!trimmed.startsWith("sk-ant-")) {
      setError("Key should start with sk-ant-")
      return
    }
    setError(null)
    setSaving(true)
    try {
      await updateAiProvider({ aiProvider: "claude", encryptedApiKey: trimmed })
      setKey("")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save key")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-md border p-4 flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-semibold">Anthropic API Key</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {hasExistingKey
            ? "A key is saved. Paste a new one to replace it."
            : "Required to use Claude Sonnet for analysis."}
        </p>
      </div>
      <div className="flex gap-2">
        <input
          type="password"
          placeholder="sk-ant-api03-..."
          value={key}
          onChange={(e) => { setKey(e.target.value); setError(null) }}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={!key.trim() || saving}
          className="px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium disabled:opacity-40 hover:opacity-90 transition"
        >
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hasExistingKey && !saved && (
        <p className="text-xs text-green-600">✓ Claude key is active</p>
      )}
    </div>
  )
}
