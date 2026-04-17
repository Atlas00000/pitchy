import type { CallAnalysis, CallMetadata } from "@/types"

export interface AIProvider {
  analyzeCall(transcript: string, metadata: CallMetadata): Promise<CallAnalysis>
}
