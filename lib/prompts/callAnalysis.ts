import type { CallMetadata } from "@/types"
import { PROMPT_VERSION } from "@/lib/constants"

export { PROMPT_VERSION }

export function buildCallAnalysisPrompt(transcript: string, metadata: CallMetadata): string {
  return `You are an expert sales coach analyzing a B2B sales call transcript.

Call details:
- Rep: ${metadata.repName}
- Prospect company: ${metadata.prospectCompany}
- Deal stage: ${metadata.dealStage}
- Call date: ${metadata.callDate}

Transcript:
"""
${transcript}
"""

Analyze this call and return a single JSON object with exactly this structure. No markdown, no explanation, only the JSON object:

{
  "summary": "A concise 2-3 sentence summary covering: what was discussed, key prospect pain points, and agreed next steps.",
  "scores": {
    "discovery": <integer 0-10: how well the rep uncovered prospect pain, goals, and context>,
    "objectionHandling": <integer 0-10: how effectively objections were addressed>,
    "talkListenRatio": <integer 0-10: 10 = balanced dialogue, 0 = rep dominated or barely spoke>,
    "nextStepClarity": <integer 0-10: whether a clear committed next step was established>,
    "overall": <weighted average: discovery*0.3 + objectionHandling*0.3 + talkListenRatio*0.2 + nextStepClarity*0.2, rounded to 1 decimal>
  },
  "objections": [
    {
      "category": <one of: "price" | "timing" | "authority" | "need" | "competitor" | "other">,
      "quote": <exact quoted text from the transcript where the objection occurred>,
      "position": <integer: approximate character position in the transcript>,
      "suggestedResponse": <a specific, actionable suggested response the rep could have used>
    }
  ],
  "coachingNotes": [
    {
      "type": <"strength" | "improvement">,
      "observation": <specific observation about what happened in the call>,
      "suggestion": <concrete actionable suggestion — for strengths, how to reinforce; for improvements, what to do differently>
    }
  ],
  "analyzedWith": "gemini",
  "promptVersion": "${PROMPT_VERSION}"
}

Rules:
- Return 2-3 strengths and 2-3 improvements in coachingNotes
- Only include objections that actually appear in the transcript
- Scores must be integers 0-10 except overall which is a decimal
- Write coaching notes in second person ("You did well..." / "Next time, try...")
- Be specific — reference actual moments from the call, not generic advice`
}
