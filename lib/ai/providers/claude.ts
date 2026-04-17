import Anthropic from "@anthropic-ai/sdk"
import type { AIProvider } from "../types"
import type { CallAnalysis, CallMetadata } from "@/types"
import { buildCallAnalysisPrompt, PROMPT_VERSION } from "@/lib/prompts/callAnalysis"

export function createClaudeProvider(apiKey: string): AIProvider {
  const client = new Anthropic({ apiKey })

  return {
    async analyzeCall(transcript: string, metadata: CallMetadata): Promise<CallAnalysis> {
      const prompt = buildCallAnalysisPrompt(transcript, metadata)

      const message = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        temperature: 0.3,
        messages: [{ role: "user", content: prompt }],
      })

      const content = message.content[0]
      if (content.type !== "text") throw new Error("Unexpected response type from Claude")

      const parsed = JSON.parse(content.text) as CallAnalysis
      parsed.analyzedWith = "claude"
      parsed.promptVersion = PROMPT_VERSION
      return parsed
    },
  }
}
