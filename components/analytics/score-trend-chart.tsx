"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
      <div className="rounded-md border p-4">
        <h2 className="text-sm font-semibold mb-3">Score Trend</h2>
        <p className="text-sm text-muted-foreground">No analyzed calls yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border p-4 flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Score Trend</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ fontSize: 12 }}
            formatter={(v) => [Number(v).toFixed(1), "Score"]}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
