"use client"

import { useCPUMemory } from "@/hooks/use-realtime-data"
import { motion } from "framer-motion"

function ResourceGauge({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  const isHigh = value > 70
  const isCritical = value > 85

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <motion.span
            className={`w-2 h-2 rounded-full ${
              isCritical ? "bg-destructive" : isHigh ? "bg-yellow-500" : "bg-accent"
            }`}
            animate={{
              opacity: isCritical ? [1, 0.5, 1] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: isCritical ? Infinity : 0,
            }}
          />
          <span className="text-sm font-oxanium font-bold">{value}%</span>
        </div>
      </div>
      <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
        <div className="absolute inset-0 flex items-center">
          {[0, 33, 66, 100].map((mark) => (
            <div
              key={mark}
              className="absolute h-full w-px bg-background/20"
              style={{ left: `${mark}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CPUMemoryMonitor() {
  const { cpu, memory, gpu } = useCPUMemory()

  return (
    <div className="widget">
      <h3 className="widget-title">System Resources</h3>

      <div className="space-y-5">
        <ResourceGauge
          label="CPU"
          value={cpu}
          color="bg-gradient-to-r from-blue-500 to-cyan-500"
        />
        <ResourceGauge
          label="Memory"
          value={memory}
          color="bg-gradient-to-r from-green-500 to-emerald-500"
        />
        <ResourceGauge
          label="GPU"
          value={gpu}
          color="bg-gradient-to-r from-purple-500 to-pink-500"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">Temp</p>
          <p className="text-sm font-oxanium font-bold text-foreground">45°C</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">Load</p>
          <p className="text-sm font-oxanium font-bold text-foreground">
            {Math.round((cpu + memory + gpu) / 3)}%
          </p>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">Uptime</p>
          <p className="text-sm font-oxanium font-bold text-foreground">12d</p>
        </div>
      </div>
    </div>
  )
}
