"use client"

import { useSpectralData } from "@/hooks/use-realtime-data"
import { motion } from "framer-motion"

export function SpectralAnalyzer() {
  const data = useSpectralData()

  // Normalize data to 0-100 range
  const maxMagnitude = Math.max(...data.map(d => d.magnitude))
  const normalizedData = data.map(d => ({
    ...d,
    normalizedMagnitude: (d.magnitude / maxMagnitude) * 100,
  }))

  return (
    <div className="widget">
      <h3 className="widget-title">Spectral Analysis (LIVE)</h3>

      {/* Waveform bars */}
      <div className="flex items-end justify-between gap-1 h-32 py-4 px-2 bg-muted/20 rounded-lg">
        {normalizedData.map((bar, idx) => (
          <motion.div
            key={idx}
            className="flex-1 bg-gradient-to-t from-primary to-accent rounded-sm opacity-80 hover:opacity-100"
            initial={{ height: 0 }}
            animate={{ height: `${bar.normalizedMagnitude}%` }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            style={{
              minHeight: "2px",
            }}
          />
        ))}
      </div>

      {/* Frequency bands info */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        <div className="text-center p-2 rounded-lg bg-card/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Bass</p>
          <p className="text-xs font-oxanium font-bold text-accent mt-1">
            {Math.floor(normalizedData.slice(0, 8).reduce((sum, d) => sum + d.magnitude, 0) / 8)}%
          </p>
        </div>
        <div className="text-center p-2 rounded-lg bg-card/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Mid-Low</p>
          <p className="text-xs font-oxanium font-bold text-primary mt-1">
            {Math.floor(normalizedData.slice(8, 16).reduce((sum, d) => sum + d.magnitude, 0) / 8)}%
          </p>
        </div>
        <div className="text-center p-2 rounded-lg bg-card/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Mid-High</p>
          <p className="text-xs font-oxanium font-bold text-secondary mt-1">
            {Math.floor(normalizedData.slice(16, 24).reduce((sum, d) => sum + d.magnitude, 0) / 8)}%
          </p>
        </div>
        <div className="text-center p-2 rounded-lg bg-card/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Treble</p>
          <p className="text-xs font-oxanium font-bold text-accent mt-1">
            {Math.floor(normalizedData.slice(24, 32).reduce((sum, d) => sum + d.magnitude, 0) / 8)}%
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-accent"
          animate={{
            opacity: [1, 0.5, 1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
        <p className="text-xs text-muted-foreground">Real-time audio input detected</p>
      </div>
    </div>
  )
}
