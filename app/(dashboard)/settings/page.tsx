"use client"

import { useState } from "react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { PageHeader } from "@/components/shared/page-header"
import { AIProviderSwitcher } from "@/components/settings/ai-provider-switcher"
import { ApiKeyForm } from "@/components/settings/api-key-form"
import type { AIProviderType } from "@/types"

export default function SettingsPage() {
  const { user, isLoading } = useCurrentUser()
  const [selectedProvider, setSelectedProvider] = useState<AIProviderType | null>(null)

  if (isLoading || !user) return null

  const activeProvider: AIProviderType = selectedProvider ?? user.aiProvider ?? "gemini"
  const hasClaudeKey = Boolean(user.encryptedApiKey)

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <PageHeader title="Settings" description="Manage your AI provider and preferences." />

      <AIProviderSwitcher
        current={activeProvider}
        hasClaudeKey={hasClaudeKey}
        onSwitch={setSelectedProvider}
      />

      {activeProvider === "claude" && (
        <ApiKeyForm
          hasExistingKey={hasClaudeKey}
          onSaved={() => setSelectedProvider("claude")}
        />
      )}
    </div>
  )
}
