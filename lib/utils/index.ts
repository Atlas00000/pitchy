import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SCORE_THRESHOLDS } from "@/lib/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatScore(score: number): string {
  return score.toFixed(1)
}

export function scoreToColor(score: number): "red" | "yellow" | "green" {
  if (score <= SCORE_THRESHOLDS.low) return "red"
  if (score <= SCORE_THRESHOLDS.mid) return "yellow"
  return "green"
}

export function scoreToTailwind(score: number): string {
  const color = scoreToColor(score)
  if (color === "red") return "text-red-500 bg-red-50"
  if (color === "yellow") return "text-yellow-600 bg-yellow-50"
  return "text-green-600 bg-green-50"
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + "…"
}

export function computeOverallScore(scores: {
  discovery: number
  objectionHandling: number
  talkListenRatio: number
  nextStepClarity: number
}): number {
  const { discovery, objectionHandling, talkListenRatio, nextStepClarity } = scores
  return (
    discovery * 0.3 +
    objectionHandling * 0.3 +
    talkListenRatio * 0.2 +
    nextStepClarity * 0.2
  )
}
