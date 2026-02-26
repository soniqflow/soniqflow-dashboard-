"use client"

import { useTimeSeriesData } from "@/hooks/use-realtime-data"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{
    dataKey: string
    value: number
    color: string
  }>
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-primary rounded-lg p-2 shadow-lg">
        <p className="text-xs text-foreground font-medium">
          {payload[0].dataKey}: {payload[0].value}%
        </p>
      </div>
    )
  }
  return null
}

export function LiveMetricsChart() {
  const data = useTimeSeriesData()

  return (
    <div className="widget">
      <h3 className="widget-title">Audio Quality Metrics</h3>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient
              id="qualityGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#97FEED" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#97FEED" stopOpacity={0} />
            </linearGradient>
            <linearGradient
              id="processedGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#35A29F" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#35A29F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#0B666A"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            stroke="#7db3d3"
            style={{ fontSize: "12px" }}
            tick={{ fill: "#7db3d3" }}
          />
          <YAxis
            stroke="#7db3d3"
            style={{ fontSize: "12px" }}
            tick={{ fill: "#7db3d3" }}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="quality"
            stroke="#97FEED"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            name="Quality"
          />
          <Line
            type="monotone"
            dataKey="processed"
            stroke="#35A29F"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            name="Processed"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex gap-4 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-muted-foreground">Quality</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-muted-foreground">Processed</span>
        </div>
      </div>
    </div>
  )
}
