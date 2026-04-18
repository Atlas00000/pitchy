"use client"

import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { AIProviderType } from "@/types"

interface AIProviderSwitcherProps {
  current: AIProviderType
  hasClaudeKey: boolean
  onSwitch: (provider: AIProviderType) => void
}

const PROVIDERS: { id: AIProviderType; label: string; description: string }[] = [
  {
    id: "gemini",
    label: "Gemini 2.5 Flash",
    description: "Free · No setup required",
  },
  {
    id: "claude",
    label: "Claude Sonnet",
    description: "BYOK · Your Anthropic key",
  },
]

export function AIProviderSwitcher({ current, hasClaudeKey, onSwitch }: AIProviderSwitcherProps) {
  const updateAiProvider = useMutation(api.users.updateAiProvider)

  async function handleSelect(provider: AIProviderType) {
    if (provider === current) return
    if (provider === "claude" && !hasClaudeKey) {
      // Just switch UI selection — user still needs to save a key
      onSwitch(provider)
      return
    }
    await updateAiProvider({ aiProvider: provider })
    onSwitch(provider)
  }

  return (
    <div className="rounded-md border p-4 flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-semibold">AI Provider</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Choose which model analyzes your calls.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PROVIDERS.map(({ id, label, description }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleSelect(id)}
            className={`flex flex-col items-start gap-1 rounded-md border p-4 text-sm transition-all ${
              current === id
                ? "border-foreground bg-foreground/5 font-semibold"
                : "border-border hover:border-foreground/40"
            }`}
          >
            <span className="flex items-center gap-1.5">
              {label}
              {id === "claude" && (
                <span className="text-[10px] text-muted-foreground/50 font-normal">under development</span>
              )}
            </span>
            <span className="text-xs text-muted-foreground font-normal">{description}</span>
            {current === id && (
              <span className="mt-1 text-xs font-medium text-green-600">● Active</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
