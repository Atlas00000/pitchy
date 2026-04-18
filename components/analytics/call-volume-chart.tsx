"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
      <div className="rounded-md border p-4">
        <h2 className="text-sm font-semibold mb-3">Call Volume by Rep</h2>
        <p className="text-sm text-muted-foreground">No calls yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border p-4 flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Call Volume by Rep</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
          <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v) => [Number(v), "Calls"]} />
          <Bar dataKey="calls" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
