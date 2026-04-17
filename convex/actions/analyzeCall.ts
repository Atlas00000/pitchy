import { v } from "convex/values"
import { action } from "../_generated/server"
import { api } from "../_generated/api"
import { getProvider } from "../../lib/ai/index"
import type { CallMetadata } from "../../types"

export const analyzeCall = action({
  args: { callId: v.id("calls") },
  handler: async (ctx, { callId }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const call = await ctx.runQuery(api.calls.getCall, { callId })
    if (!call) throw new Error("Call not found")

    const user = await ctx.runQuery(api.users.getCurrentUser)
    if (!user) throw new Error("User not found")

    await ctx.runMutation(api.calls.updateCallStatus, {
      callId,
      status: "analyzing",
    })

    try {
      const geminiKey = process.env.GEMINI_API_KEY
      if (!geminiKey) throw new Error("GEMINI_API_KEY is not configured")

      const provider = getProvider(user.aiProvider, {
        geminiKey,
        claudeKey: user.encryptedApiKey,
      })

      const metadata: CallMetadata = {
        repName: call.repName,
        dealStage: call.dealStage,
        prospectCompany: call.prospectCompany,
        callDate: call.callDate,
      }

      const analysis = await provider.analyzeCall(call.transcriptText, metadata)

      await ctx.runMutation(api.analysis.saveAnalysis, {
        callId,
        summary: analysis.summary,
        scores: analysis.scores,
        objections: analysis.objections,
        coachingNotes: analysis.coachingNotes,
        analyzedWith: analysis.analyzedWith,
        promptVersion: analysis.promptVersion,
      })

      await ctx.runMutation(api.calls.updateCallStatus, {
        callId,
        status: "complete",
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"
      await ctx.runMutation(api.calls.updateCallStatus, {
        callId,
        status: "failed",
        errorMessage: message,
      })
      throw err
    }
  },
})
