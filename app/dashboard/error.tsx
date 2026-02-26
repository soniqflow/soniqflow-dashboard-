"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[v0] Dashboard error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md space-y-6"
      >
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-destructive/20 border border-destructive/50">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-oxanium font-bold text-foreground mb-2">
            SYSTEM ERROR
          </h1>
          <p className="text-muted-foreground text-sm">
            Something went wrong in the Command Center. Please try again.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={reset}
            className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground font-oxanium"
          >
            Try Again
          </Button>
          <Button
            onClick={() => window.location.href = "/dashboard"}
            variant="outline"
            className="flex-1 border-border"
          >
            Go to Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
