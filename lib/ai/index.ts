import type { AIProvider } from "./types"
import type { AIProviderType } from "@/types"
import { createGeminiProvider } from "./providers/gemini"
import { createClaudeProvider } from "./providers/claude"

export function getProvider(
  providerType: AIProviderType,
  keys: { geminiKey: string; claudeKey?: string }
): AIProvider {
  if (providerType === "claude") {
    if (!keys.claudeKey) throw new Error("Claude API key is required but not set")
    return createClaudeProvider(keys.claudeKey)
  }

  return createGeminiProvider(keys.geminiKey)
}
