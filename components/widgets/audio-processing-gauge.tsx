"use client"

import { useProcessingStats } from "@/hooks/use-realtime-data"
import { motion } from "framer-motion"

interface ProcessingGaugeProps {
  label?: string
}

function GaugeBar({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-oxanium font-bold text-accent">{value}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </div>
    </div>
  )
}

export function AudioProcessingGauge({ label }: ProcessingGaugeProps) {
  const stats = useProcessingStats()

  return (
    <div className="widget">
      <h3 className="widget-title">NVIDIA Maxine Processing</h3>

      <div className="space-y-4">
        <GaugeBar
          label="Denoising"
          value={stats.denoising}
          icon="🔊"
        />
        <GaugeBar
          label="Dereverb"
          value={stats.dereverb}
          icon="🎙️"
        />
        <GaugeBar
          label="Enhancement"
          value={stats.enhancement}
          icon="✨"
        />
        <GaugeBar
          label="Super-Resolution"
          value={stats.superResolution}
          icon="📶"
        />
        <GaugeBar
          label="Echo Cancellation"
          value={stats.echoCancellation}
          icon="🔇"
        />
      </div>

      <div className="mt-4 p-3 bg-primary/20 rounded-lg border border-primary/30">
        <p className="text-xs text-accent font-oxanium">
          ✓ All systems optimal
        </p>
      </div>
    </div>
  )
}
