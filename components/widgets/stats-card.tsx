"use client"

import { useStatsKPIs } from "@/hooks/use-realtime-data"
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

function StatCard({
  label,
  value,
  unit,
  trend,
  color,
  icon,
  index,
}: {
  label: string
  value: string | number
  unit: string
  trend: number
  color: string
  icon: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-4 space-y-2 border border-border/50 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-oxanium">
          {label}
        </span>
        <span className="text-lg">{icon}</span>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-oxanium font-bold text-accent">
          {value}
        </span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>

      <div className="flex items-center gap-1">
        <motion.div
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <TrendingUp className={`w-3 h-3 ${color}`} />
        </motion.div>
        <span className="text-xs text-muted-foreground">
          {trend > 0 ? "+" : ""}{trend}% this month
        </span>
      </div>
    </motion.div>
  )
}

export function StatsCard() {
  const stats = useStatsKPIs()
  const trend = Math.floor(Math.random() * 40) + 10

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        index={0}
        label="Files Processed"
        value={stats.filesProcessed}
        unit="files"
        trend={trend}
        color="text-accent"
        icon="📁"
      />
      <StatCard
        index={1}
        label="Hours Saved"
        value={stats.hoursSaved}
        unit="hours"
        trend={Math.floor(Math.random() * 35) + 15}
        color="text-primary"
        icon="⏱️"
      />
      <StatCard
        index={2}
        label="Total Duration"
        value={stats.totalDuration}
        unit="processed"
        trend={Math.floor(Math.random() * 25) + 10}
        color="text-secondary"
        icon="📊"
      />
      <StatCard
        index={3}
        label="Avg Quality"
        value={stats.avgQuality}
        unit="%"
        trend={Math.floor(Math.random() * 15) + 5}
        color="text-accent"
        icon="⭐"
      />
    </div>
  )
}
