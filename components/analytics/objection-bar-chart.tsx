"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { AnalyticsChartCard } from "@/components/analytics/analytics-chart-card"
import { CHART, OBJECTION_BAR_HEX } from "@/components/analytics/chart-theme"

interface DataPoint {
  category: string
  count: number
}

interface ObjectionBarChartProps {
  data: DataPoint[]
}

export function ObjectionBarChart({ data }: ObjectionBarChartProps) {
  if (data.length === 0) {
    return (
      <AnalyticsChartCard title="Top objections">
        <p className="text-sm text-pitchly-text-secondary">No objections recorded yet.</p>
      </AnalyticsChartCard>
    )
  }

  const sorted = [...data].sort((a, b) => b.count - a.count)

  return (
    <AnalyticsChartCard title="Top objections">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={sorted} layout="vertical" margin={{ top: 4, right: 8, left: 16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: CHART.axis }} allowDecimals={false} />
          <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: CHART.axis }} width={72} />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              backgroundColor: CHART.tooltipBg,
              border: `1px solid ${CHART.tooltipBorder}`,
              borderRadius: 8,
              color: CHART.tooltipLabel,
            }}
            formatter={(v) => [Number(v), "Occurrences"]}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {sorted.map((entry) => (
              <Cell key={entry.category} fill={OBJECTION_BAR_HEX[entry.category] ?? OBJECTION_BAR_HEX.other} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AnalyticsChartCard>
  )
}
