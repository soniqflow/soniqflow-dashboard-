"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Upload,
  Radio,
  Cpu,
  Activity,
  ShieldCheck,
  Zap,
  Mic2,
  Volume2,
  Share2,
  Plus,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardPage() {
  const { user: session, loading: authLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUplinking, setIsUplinking] = useState(false)
  const [isHoveringLog, setIsHoveringLog] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !authLoading && !session) {
      router.push("/signin")
    }
  }, [mounted, authLoading, session, router])

  if (!mounted || authLoading || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-border border-t-accent animate-spin mx-auto" />
          <p className="text-accent font-oxanium animate-pulse">Establishing Secure Uplink...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Top Stats Bar */}
      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-oxanium font-bold text-accent glow-text tracking-tighter">
            MISSION CONTROL
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent/40 font-oxanium">
            System Status: Active • Operator: {session?.displayName || session?.email?.split('@')[0] || "Unknown"}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full md:w-auto">
          {[
            { label: "Active Workflows", value: "07" },
            { label: "Optimized Today", value: "14" },
            { label: "Quality Gain", value: "+28%", color: "text-accent" },
          ].map((stat, i) => (
            <div key={i} className="bg-black/20 border border-accent/10 px-4 py-2 rounded">
              <p className="text-[8px] uppercase tracking-widest text-accent/40 font-oxanium">{stat.label}</p>
              <p className={`text-xl font-oxanium font-bold ${stat.color || "text-foreground"}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Widget A: Audio Input & Streams (Left, 4 cols) */}
        <div className="xl:col-span-4 space-y-6 flex flex-col">
          <div className="widget flex-1 flex flex-col group relative overflow-hidden">
            {/* Corner decorator */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent/20 rounded-tr-lg group-hover:border-accent/40 transition-colors" />

            <div className="widget-title mb-6">
              <Mic2 className="w-3 h-3 text-accent" />
              Audio Input & Streams
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex flex-col justify-center space-y-6 border-2 border-dashed border-accent/5 rounded-lg p-8 bg-black/20 hover:bg-black/40 hover:border-accent/30 transition-all cursor-pointer group/upload relative overflow-hidden"
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="audio/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    toast.success("Audio Payload Locked", {
                      description: `Initializing pre-processing for ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`
                    })
                  }
                }}
              />
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/upload:opacity-100 transition-opacity" />
              <div className="text-center space-y-4 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-accent/5 flex items-center justify-center mx-auto border border-accent/10 group-hover/upload:border-accent/30 transition-all duration-500 shadow-[0_0_30px_rgba(151,254,237,0.05)]"
                >
                  <Upload className="w-10 h-10 text-accent/20 group-hover/upload:text-accent transition-colors" />
                </motion.div>
                <div>
                  <p className="text-sm font-oxanium font-black text-accent/70 uppercase tracking-[0.2em] group-hover/upload:text-accent transition-colors">
                    Upload Audio Payload
                  </p>
                  <p className="text-[10px] text-accent/20 uppercase mt-2 font-oxanium tracking-widest">
                    AI-Driven Pre-Processing Active
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <Button
                disabled={isUplinking}
                onClick={() => {
                  setIsUplinking(true)
                  toast.promise(
                    new Promise((resolve) => setTimeout(resolve, 2000)),
                    {
                      loading: 'establishing secure satellite uplink...',
                      success: () => {
                        setIsUplinking(false)
                        return 'Live Uplink Synchronized // Channel Alpha Primary Active'
                      },
                      error: 'Uplink Failed',
                    }
                  )
                }}
                className="w-full bg-accent/5 border border-accent/20 text-accent hover:bg-accent hover:text-background font-oxanium font-bold py-6 uppercase tracking-[0.3em] gap-3 group/btn relative overflow-hidden"
              >
                {isUplinking ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Radio className="w-4 h-4 animate-pulse group-hover/btn:scale-110 transition-transform" />
                )}
                {isUplinking ? 'Synchronizing...' : 'Live Uplink Stream'}
                <div className="absolute -inset-1 bg-white/10 opacity-0 group-hover/btn:opacity-100 blur-sm transition-opacity" />
              </Button>

              <div className="space-y-3 pt-6 border-t border-accent/5">
                <div className="flex justify-between items-center px-1">
                  <p className="text-[10px] uppercase font-oxanium tracking-[0.2em] text-accent/30">Signal Status</p>
                  <p className="text-[10px] font-oxanium text-accent/50">87% Strength</p>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "CH_ALPHA_PRIMARY", status: "LIVE", load: "12%" },
                    { name: "CH_BETA_BACKUP", status: "LIVE", load: "04%" },
                  ].map((stream, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-black/40 rounded border border-accent/5 hover:border-accent/20 transition-colors cursor-default">
                      <div className="flex items-center gap-3">
                        <div className="status-led active scale-75 shadow-[0_0_8px_rgba(151,254,237,0.5)]" />
                        <span className="text-[10px] font-oxanium font-bold uppercase tracking-widest text-accent/80">{stream.name}</span>
                      </div>
                      <span className="text-[9px] font-oxanium font-bold text-accent/40">{stream.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget B: AI Processing (Center, 5 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="widget flex-1 relative overflow-hidden group">
            {/* Ambient background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />

            <div className="flex justify-between items-start mb-6">
              <div className="widget-title">
                <Cpu className="w-3 h-3 text-accent" />
                AI Processing Sequence
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 bg-accent/5 border border-accent/20 rounded shadow-[0_0_15px_rgba(151,254,237,0.1)]">
                <div className="flex -space-x-1">
                  <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <span className="text-[9px] font-oxanium font-bold uppercase tracking-[0.2em] text-accent">
                  MAXINE SDK :: ACCELERATED
                </span>
              </div>
            </div>

            <div className="h-72 relative overflow-hidden bg-black/40 rounded border border-accent/10 shadow-inner">
              {/* Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

              {/* Mock Waveform Visualizer */}
              <div className="absolute inset-0 flex items-center justify-around px-12 gap-1">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-accent/20 rounded-full transition-all duration-300"
                    style={{
                      height: `${Math.sin(i * 0.2) * 40 + 50}%`,
                      backgroundColor: i % 8 === 0 ? 'rgba(151, 254, 237, 0.6)' : undefined,
                      boxShadow: i % 8 === 0 ? '0 0 10px rgba(151, 254, 237, 0.4)' : 'none'
                    }}
                  />
                ))}
              </div>

              {/* Overlay Flow UI */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                <div className="flex gap-3">
                  {['NOISE_CANX', 'REVERB_REM', 'VOICE_ISO'].map(t => (
                    <div key={t} className="flex items-center gap-2 px-3 py-1 bg-black/60 border border-accent/20 rounded text-[9px] font-oxanium font-bold text-accent backdrop-blur-sm">
                      <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                      {t}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-oxanium tracking-[0.3em] text-accent/30">Buffer Status</p>
                    <div className="w-32 h-1 bg-accent/10 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-accent animate-pulse" />
                    </div>
                  </div>
                  <p className="text-5xl font-oxanium font-black text-accent/5 italic tracking-tighter uppercase">Processing</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-5 bg-black/20 border border-accent/5 rounded-lg space-y-3 group/sub">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-accent/60 group-hover/sub:text-accent transition-colors">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-[10px] font-oxanium font-bold uppercase tracking-widest">Spectral Analysis</span>
                  </div>
                  <span className="text-[10px] font-oxanium text-accent/40">24-bit / 96kHz</span>
                </div>
                <div className="h-16 flex items-baseline gap-0.5">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-accent/20 group-hover/sub:bg-accent/40 transition-all"
                      style={{ height: `${Math.random() * 90 + 10}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="p-5 bg-black/20 border border-accent/5 rounded-lg space-y-3 group/sub">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-accent/60 group-hover/sub:text-accent transition-colors">
                    <Activity className="w-4 h-4" />
                    <span className="text-[10px] font-oxanium font-bold uppercase tracking-widest">Neural Optimization</span>
                  </div>
                  <span className="text-[10px] font-oxanium text-accent/40">Load: 64.2%</span>
                </div>
                <div className="flex items-center justify-center h-16 bg-black/20 rounded border border-accent/5">
                  <div className="w-full h-px bg-accent/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-accent to-transparent -translate-x-full animate-[scan_2s_linear_infinite]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget C: Infrastructure Health (Bottom Right/Side) */}
        <div className="xl:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="widget md:col-span-1 group">
            <div className="widget-title mb-6">
              <Zap className="w-3 h-3 text-accent" />
              System Health & Compute
            </div>

            <div className="flex items-center justify-around py-2">
              <div className="text-center space-y-3">
                <div className="relative w-28 h-28 rounded-full border-2 border-accent/5 flex items-center justify-center p-2">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-accent/10" />
                    <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-accent drop-shadow-[0_0_8px_rgba(151,254,237,0.5)]" strokeDasharray="314" strokeDashoffset="62.8" strokeLinecap="round" />
                  </svg>
                  <div className="relative z-10 text-center">
                    <p className="text-3xl font-oxanium font-black text-accent tracking-tighter">80 <span className="text-xs">%</span></p>
                    <p className="text-[8px] uppercase font-oxanium tracking-[0.3em] text-accent/50 mt-1">GPU Load</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Latency", value: "42 ms", color: "text-green-400" },
                  { label: "Memory", value: "6.4 GB", color: "text-accent" },
                  { label: "Uptime", value: "99.9%", color: "text-accent" },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-[9px] uppercase font-oxanium tracking-widest text-accent/30">{item.label}</p>
                    <p className={`text-xl font-oxanium font-bold ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="widget md:col-span-2 group">
            <div className="flex justify-between items-center mb-6">
              <div className="widget-title italic">
                <Share2 className="w-3 h-3 text-accent" />
                Workflow Throughput (Live Feed)
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-1 h-3 rounded-full ${i === 1 ? 'bg-accent' : 'bg-accent/20'}`} />
                ))}
              </div>
            </div>

            <div className="h-40 flex items-end gap-1 px-4 border-b border-accent/10 bg-black/20 rounded-t overflow-hidden relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(151,254,237,0.3),transparent_70%)]" />
              {Array.from({ length: 80 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-accent/20 hover:bg-accent transition-all duration-300 cursor-crosshair min-w-[2px]"
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between items-center pt-4">
              <div className="flex items-center gap-3">
                <div className="px-2 py-1 bg-accent/10 border border-accent/20 rounded text-[9px] font-oxanium font-bold text-accent">
                  NET :: 18.7 STREAMS/SEC
                </div>
                <div className="px-2 py-1 bg-accent/5 border border-accent/10 rounded text-[9px] font-oxanium font-bold text-accent/50">
                  PEAK :: 24.1
                </div>
              </div>
              <p className="text-[9px] font-oxanium uppercase text-accent/30 tracking-[0.2em]">Operational Excellence Index: 0.982</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Notifications/Logs */}
      <div
        onMouseEnter={() => setIsHoveringLog(true)}
        onMouseLeave={() => setIsHoveringLog(false)}
        className="bg-black/40 border border-accent/5 p-3 rounded-lg overflow-hidden flex items-center gap-4 group/log cursor-help shadow-[0_0_20px_rgba(151,254,237,0.02)] hover:border-accent/20 transition-all"
      >
        <div className="flex items-center gap-2 whitespace-nowrap border-r border-accent/20 pr-4">
          <div className={`status-led active scale-75 ${isHoveringLog ? 'shadow-[0_0_12px_rgba(151,254,237,0.8)]' : ''}`} />
          <span className="text-[10px] font-oxanium font-bold uppercase tracking-widest text-accent">System Log</span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            animate={{
              x: isHoveringLog ? 0 : "-100%"
            }}
            initial={{ x: "100%" }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 20,
                ease: "linear",
                paused: isHoveringLog
              }
            }}
            className="flex gap-8 whitespace-nowrap"
          >
            <p className="text-[10px] font-oxanium uppercase tracking-widest text-accent/50">
              [16:34:28] :: NVIDIA_MAXINE_ENGINE :: CORE_STATUS_READY // [16:34:27] :: AUTH_TOKEN_RENEWED :: SESSION_UPLINK_STABLE // [16:34:25] :: BATCH_PROCESSING_COMPLETE :: ID_8721_SONIQ_FLOW
            </p>
            <p className="text-[10px] font-oxanium uppercase tracking-widest text-accent/50">
              [16:34:28] :: NVIDIA_MAXINE_ENGINE :: CORE_STATUS_READY // [16:34:27] :: AUTH_TOKEN_RENEWED :: SESSION_UPLINK_STABLE // [16:34:25] :: BATCH_PROCESSING_COMPLETE :: ID_8721_SONIQ_FLOW
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
