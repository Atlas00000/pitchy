"use client"

import { useState } from "react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { PageHeader } from "@/components/shared/page-header"
import { FadeInUp } from "@/components/motion/fade-in-up"
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
    <div className="flex max-w-xl flex-col gap-6">
      <FadeInUp delay={0}>
        <PageHeader title="Settings" description="Manage your AI provider and preferences." />
      </FadeInUp>

      <FadeInUp delay={0.06}>
        <AIProviderSwitcher
          current={activeProvider}
          hasClaudeKey={hasClaudeKey}
          onSwitch={setSelectedProvider}
        />
      </FadeInUp>

      {activeProvider === "claude" && (
        <FadeInUp delay={0.12}>
          <ApiKeyForm
            hasExistingKey={hasClaudeKey}
            onSaved={() => setSelectedProvider("claude")}
          />
        </FadeInUp>
      )}
    </div>
  )
}
