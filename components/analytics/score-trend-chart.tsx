"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AnalyticsChartCard } from "@/components/analytics/analytics-chart-card"
import { CHART } from "@/components/analytics/chart-theme"

interface DataPoint {
  date: string
  score: number
}

interface ScoreTrendChartProps {
  data: DataPoint[]
}

export function ScoreTrendChart({ data }: ScoreTrendChartProps) {
  if (data.length === 0) {
    return (
      <AnalyticsChartCard title="Score trend">
        <p className="text-sm text-pitchly-text-secondary">No analyzed calls yet.</p>
      </AnalyticsChartCard>
    )
  }

  return (
    <AnalyticsChartCard title="Score trend">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: CHART.axis }} />
          <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: CHART.axis }} />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              backgroundColor: CHART.tooltipBg,
              border: `1px solid ${CHART.tooltipBorder}`,
              borderRadius: 8,
              color: CHART.tooltipLabel,
            }}
            formatter={(v) => [Number(v).toFixed(1), "Score"]}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke={CHART.brand}
            strokeWidth={2}
            dot={{ r: 3, fill: CHART.brand }}
            activeDot={{ r: 5, fill: CHART.brandMuted }}
          />
        </LineChart>
      </ResponsiveContainer>
    </AnalyticsChartCard>
  )
}
