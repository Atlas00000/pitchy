"use client"

import { motion } from "framer-motion"
import { Phone, TrendingUp, BarChart2, AlertCircle } from "lucide-react"
import { useTeamAnalytics } from "@/hooks/use-team-analytics"
import { CardSkeleton } from "@/components/shared/loading-skeleton"
import { DashboardSummaryMetricCard } from "@/components/layout/dashboard-summary-card"
import { staggerContainerVariants, staggerItemVariants } from "@/components/motion/motion-config"

export function DashboardSummaryCards() {
  const { isLoading, totalCalls, completedCalls, avgScore, topObjection } = useTeamAnalytics()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={staggerItemVariants}>
        <DashboardSummaryMetricCard
          label="Total Calls"
          value={totalCalls}
          icon={<Phone size={18} strokeWidth={1.75} />}
          sub="All time"
          accent="brand"
        />
      </motion.div>
      <motion.div variants={staggerItemVariants}>
        <DashboardSummaryMetricCard
          label="Analyzed"
          value={completedCalls ?? 0}
          icon={<TrendingUp size={18} strokeWidth={1.75} />}
          sub="With AI analysis"
          accent="excellence"
        />
      </motion.div>
      <motion.div variants={staggerItemVariants}>
        <DashboardSummaryMetricCard
          label="Avg Score"
          value={avgScore > 0 ? avgScore.toFixed(1) : "—"}
          icon={<BarChart2 size={18} strokeWidth={1.75} />}
          sub="Across all calls"
          accent="caution"
        />
      </motion.div>
      <motion.div variants={staggerItemVariants}>
        <DashboardSummaryMetricCard
          label="Top Objection"
          value={topObjection ? topObjection.replace("_", " ") : "—"}
          icon={<AlertCircle size={18} strokeWidth={1.75} />}
          sub="Most frequent"
          accent="alert"
        />
      </motion.div>
    </motion.div>
  )
}
