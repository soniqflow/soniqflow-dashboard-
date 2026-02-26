"use client"

import { useAudioJobs } from "@/hooks/use-realtime-data"
import { motion } from "framer-motion"
import { FileAudio, CheckCircle2, AlertCircle, Clock } from "lucide-react"

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    processing: {
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      label: "Processing",
      icon: "⚙️",
    },
    completed: {
      color: "bg-green-500/20 text-green-300 border-green-500/30",
      label: "Completed",
      icon: "✓",
    },
    queued: {
      color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      label: "Queued",
      icon: "⏳",
    },
    failed: {
      color: "bg-red-500/20 text-red-300 border-red-500/30",
      label: "Failed",
      icon: "✕",
    },
  }

  const config =
    statusConfig[status as keyof typeof statusConfig] ||
    statusConfig.queued

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border font-medium ${config.color}`}
    >
      <span>{config.icon}</span>
      {config.label}
    </span>
  )
}

export function ProcessingQueue() {
  const jobs = useAudioJobs()

  return (
    <div className="widget">
      <h3 className="widget-title">Active Processing Queue</h3>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {jobs.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <FileAudio className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-medium text-foreground truncate">
                    {job.name}
                  </p>
                  <StatusBadge status={job.status} />
                </div>

                {job.status === "processing" && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: job.progress }}
                        animate={{ width: job.progress + 20 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {job.progress}%
                    </span>
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-1">
                  Duration: {Math.round(job.duration / 60)}m {job.duration % 60}s
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-muted-foreground">
            <span className="font-medium">{jobs.filter(j => j.status === "processing").length}</span> processing
          </div>
          <div className="text-right text-muted-foreground">
            <span className="font-medium">{jobs.filter(j => j.status === "completed").length}</span> completed
          </div>
        </div>
      </div>
    </div>
  )
}
