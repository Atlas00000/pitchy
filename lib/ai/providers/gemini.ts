import { GoogleGenerativeAI } from "@google/generative-ai"
import type { AIProvider } from "../types"
import type { CallAnalysis, CallMetadata } from "@/types"
import { buildCallAnalysisPrompt, PROMPT_VERSION } from "@/lib/prompts/callAnalysis"

export function createGeminiProvider(apiKey: string): AIProvider {
  const genAI = new GoogleGenerativeAI(apiKey)

  return {
    async analyzeCall(transcript: string, metadata: CallMetadata): Promise<CallAnalysis> {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json",
        },
      })

      const prompt = buildCallAnalysisPrompt(transcript, metadata)
      const result = await model.generateContent(prompt)
      const text = result.response.text()

      const parsed = JSON.parse(text) as CallAnalysis
      parsed.analyzedWith = "gemini"
      parsed.promptVersion = PROMPT_VERSION
      return parsed
    },
  }
}
