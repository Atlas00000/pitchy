"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AnalyticsChartCard } from "@/components/analytics/analytics-chart-card"
import { CHART } from "@/components/analytics/chart-theme"

interface DataPoint {
  name: string
  calls: number
}

interface CallVolumeChartProps {
  data: DataPoint[]
}

export function CallVolumeChart({ data }: CallVolumeChartProps) {
  if (data.length === 0) {
    return (
      <AnalyticsChartCard title="Call volume by rep">
        <p className="text-sm text-pitchly-text-secondary">No calls yet.</p>
      </AnalyticsChartCard>
    )
  }

  return (
    <AnalyticsChartCard title="Call volume by rep">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: CHART.axis }} />
          <YAxis tick={{ fontSize: 11, fill: CHART.axis }} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              backgroundColor: CHART.tooltipBg,
              border: `1px solid ${CHART.tooltipBorder}`,
              borderRadius: 8,
              color: CHART.tooltipLabel,
            }}
            formatter={(v) => [Number(v), "Calls"]}
          />
          <Bar dataKey="calls" fill={CHART.brandMuted} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </AnalyticsChartCard>
  )
}
