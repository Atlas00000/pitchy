import { describe, it, expect } from "vitest"
import {
  scoreToColor,
  scoreToTailwind,
  formatScore,
  truncate,
  computeOverallScore,
} from "@/lib/utils/index"
import { SCORE_WEIGHTS } from "@/lib/constants"

describe("scoreToColor", () => {
  it("returns red for scores at or below 4", () => {
    expect(scoreToColor(0)).toBe("red")
    expect(scoreToColor(4)).toBe("red")
  })

  it("returns yellow for scores between 4.1 and 7", () => {
    expect(scoreToColor(4.1)).toBe("yellow")
    expect(scoreToColor(5.5)).toBe("yellow")
    expect(scoreToColor(7)).toBe("yellow")
  })

  it("returns green for scores above 7", () => {
    expect(scoreToColor(7.1)).toBe("green")
    expect(scoreToColor(8)).toBe("green")
    expect(scoreToColor(10)).toBe("green")
  })
})

describe("scoreToTailwind", () => {
  it("returns red classes for low scores", () => {
    expect(scoreToTailwind(3)).toBe("text-red-500 bg-red-50")
  })

  it("returns yellow classes for mid scores", () => {
    expect(scoreToTailwind(6)).toBe("text-yellow-600 bg-yellow-50")
  })

  it("returns green classes for high scores", () => {
    expect(scoreToTailwind(9)).toBe("text-green-600 bg-green-50")
  })
})

describe("formatScore", () => {
  it("formats to one decimal place", () => {
    expect(formatScore(8)).toBe("8.0")
    expect(formatScore(7.56)).toBe("7.6")
    expect(formatScore(0)).toBe("0.0")
  })
})

describe("truncate", () => {
  it("returns original string if within limit", () => {
    expect(truncate("hello", 10)).toBe("hello")
    expect(truncate("hello", 5)).toBe("hello")
  })

  it("truncates and appends ellipsis when over limit", () => {
    const result = truncate("hello world", 5)
    expect(result.endsWith("…")).toBe(true)
    expect(result.length).toBeLessThanOrEqual(6)
  })
})

describe("computeOverallScore", () => {
  it("applies correct weights matching SCORE_WEIGHTS", () => {
    const scores = { discovery: 8, objectionHandling: 7, talkListenRatio: 6, nextStepClarity: 9 }
    const expected =
      scores.discovery * SCORE_WEIGHTS.discovery +
      scores.objectionHandling * SCORE_WEIGHTS.objectionHandling +
      scores.talkListenRatio * SCORE_WEIGHTS.talkListenRatio +
      scores.nextStepClarity * SCORE_WEIGHTS.nextStepClarity
    expect(computeOverallScore(scores)).toBeCloseTo(expected, 5)
  })

  it("returns 10 when all dimensions are 10", () => {
    const scores = { discovery: 10, objectionHandling: 10, talkListenRatio: 10, nextStepClarity: 10 }
    expect(computeOverallScore(scores)).toBe(10)
  })

  it("returns 0 when all dimensions are 0", () => {
    const scores = { discovery: 0, objectionHandling: 0, talkListenRatio: 0, nextStepClarity: 0 }
    expect(computeOverallScore(scores)).toBe(0)
  })

  it("result stays within 0–10 for valid inputs", () => {
    const scores = { discovery: 8, objectionHandling: 7, talkListenRatio: 6, nextStepClarity: 9 }
    const result = computeOverallScore(scores)
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(10)
  })
})

describe("SCORE_WEIGHTS", () => {
  it("sum to exactly 1.0", () => {
    const total = Object.values(SCORE_WEIGHTS).reduce((acc, w) => acc + w, 0)
    expect(total).toBeCloseTo(1.0, 10)
  })
})
