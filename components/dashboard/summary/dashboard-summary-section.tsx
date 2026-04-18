"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

import { useTeamAnalytics } from "@/hooks/use-team-analytics"
import { staggerContainerVariants, staggerItemVariants } from "@/components/motion/motion-config"

import { SummaryLoadingGrid } from "./summary-loading-grid"
import { SummaryMetricTile } from "./summary-metric-tile"
import { SummaryStageBackdrop } from "./summary-stage-backdrop"
import type { SummaryMetricModel } from "./summary-metric-types"

function formatObjection(raw: string | null) {
  if (!raw) return "—"
  return raw.replaceAll("_", " ")
}

export function DashboardSummaryCards() {
  const { isLoading, totalCalls, completedCalls, avgScore, topObjection } = useTeamAnalytics()

  const analyzedRatio = totalCalls > 0 ? completedCalls / totalCalls : 0

  const metrics = useMemo((): readonly SummaryMetricModel[] => {
    return [
      {
        id: "total",
        label: "Call volume",
        value: totalCalls,
        hint: "Every recording and upload in your org, all time.",
        accent: "brand",
      },
      {
        id: "analyzed",
        label: "AI coverage",
        value: completedCalls,
        hint: "Calls with a structured read — scores, objections, coaching.",
        accent: "excellence",
      },
      {
        id: "avgScore",
        label: "Team rubric",
        value: avgScore > 0 ? avgScore.toFixed(1) : "—",
        hint: "Rolling blend of opener, discovery, value, and close.",
        accent: "caution",
      },
      {
        id: "objection",
        label: "Leading friction",
        value: formatObjection(topObjection),
        hint: "Most tagged objection theme across analyzed calls.",
        accent: "alert",
      },
    ]
  }, [totalCalls, completedCalls, avgScore, topObjection])

  if (isLoading) {
    return (
      <section aria-label="Team metrics loading" className="relative">
        <div className="relative overflow-hidden rounded-[2rem] border border-pitchly-border/70 bg-pitchly-canvas/40 p-4 shadow-pitchly-raised dark:border-white/[0.07] dark:bg-pitchly-surface/20 md:rounded-[2.25rem] md:p-5">
          <SummaryStageBackdrop />
          <div className="relative z-[1]">
            <SummaryLoadingGrid />
          </div>
        </div>
      </section>
    )
  }

  const totalMetric = metrics[0]
  const analyzedMetric = metrics[1]
  const avgMetric = metrics[2]
  const objectionMetric = metrics[3]

  return (
    <section aria-label="Team metrics" className="relative">
      <div className="relative overflow-hidden rounded-[2rem] border border-pitchly-border/70 bg-pitchly-canvas/40 p-4 shadow-pitchly-raised dark:border-white/[0.07] dark:bg-pitchly-surface/20 md:rounded-[2.25rem] md:p-5">
        <SummaryStageBackdrop />
        <div className="relative z-[1]">
          <header className="mb-4 flex flex-col gap-1 px-1 md:mb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-pitchly-text-muted">Live pulse</p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-pitchly-text-primary md:text-xl">
                What your pipeline sounds like right now
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-pitchly-text-secondary md:text-right">
              Motion, glass, and depth track the same tokens as the rest of Pitchly — no clip art, no filler metrics.
            </p>
          </header>

          <motion.div
            className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-4"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={staggerItemVariants} className="md:col-span-8 md:row-span-2">
              <SummaryMetricTile metric={totalMetric} className="h-full" />
            </motion.div>
            <motion.div variants={staggerItemVariants} className="md:col-span-4 md:col-start-9 md:row-start-1">
              <SummaryMetricTile metric={analyzedMetric} ringProgress={analyzedRatio} className="h-full" />
            </motion.div>
            <motion.div variants={staggerItemVariants} className="md:col-span-2 md:col-start-9 md:row-start-2">
              <SummaryMetricTile metric={avgMetric} className="h-full" />
            </motion.div>
            <motion.div variants={staggerItemVariants} className="md:col-span-2 md:col-start-11 md:row-start-2">
              <SummaryMetricTile metric={objectionMetric} className="h-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
