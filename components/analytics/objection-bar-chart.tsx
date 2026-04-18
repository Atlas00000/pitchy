"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface DataPoint {
  category: string
  count: number
}

interface ObjectionBarChartProps {
  data: DataPoint[]
}

const COLORS: Record<string, string> = {
  price: "#ef4444",
  timing: "#eab308",
  authority: "#a855f7",
  need: "#3b82f6",
  other: "#6b7280",
}

export function ObjectionBarChart({ data }: ObjectionBarChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-md border p-4">
        <h2 className="text-sm font-semibold mb-3">Top Objections</h2>
        <p className="text-sm text-muted-foreground">No objections recorded yet.</p>
      </div>
    )
  }

  const sorted = [...data].sort((a, b) => b.count - a.count)

  return (
    <div className="rounded-md border p-4 flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Top Objections</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={sorted} layout="vertical" margin={{ top: 4, right: 8, left: 16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
          <YAxis type="category" dataKey="category" tick={{ fontSize: 11 }} width={70} />
          <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v) => [Number(v), "Occurrences"]} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {sorted.map((entry) => (
              <Cell key={entry.category} fill={COLORS[entry.category] ?? COLORS.other} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
