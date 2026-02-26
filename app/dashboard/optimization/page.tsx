"use client"

import { motion } from "framer-motion"
import {
    Zap,
    Search,
    BarChart3,
    Cpu,
    Activity,
    TrendingUp,
    Terminal,
    ArrowUpRight,
    Maximize2,
    RefreshCcw,
    VolumeX,
    Radio,
    Loader2
} from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

const metrics = [
    { label: "Signal Fidelity", value: "0.992", change: "+0.004", status: "Optimal" },
    { label: "Neural Latency", value: "1.2 ms", change: "-0.4 ms", status: "Optimal" },
    { label: "Bit-Rate Flux", value: "32 MB/s", change: "+2.1 MB/s", status: "Nominal" },
    { label: "Phase Stability", value: "98.7%", change: "+0.2%", status: "Nominal" }
]

export default function OptimizationPage() {
    const [isResyncing, setIsResyncing] = useState(false)
    return (
        <div className="space-y-8">
            {/* Header section Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-oxanium font-black text-accent italic tracking-tighter uppercase glow-text">
                        Signal Optimization
                    </h1>
                    <p className="text-accent/40 font-oxanium text-[10px] uppercase tracking-[0.3em] mt-2">
                        Auto-Correction Level: MAX :: Harmonic Alignment: ENABLED :: Jitter Buffer: 128ms
                    </p>
                </div>
                <div className="flex gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toast.success("Calibrating Audio Engine", { description: "Re-aligning phase buffers and signal fidelity." })}
                        className="flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/20 text-accent rounded text-[10px] font-oxanium font-bold uppercase tracking-widest hover:bg-accent hover:text-background transition-all"
                    >
                        <RefreshCcw className="w-3.5 h-3.5" />
                        Force Re-Sync
                    </motion.button>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="widget group hover:border-accent/30 transition-all border-accent/10"
                    >
                        <div className="flex justify-between items-start">
                            <p className="text-[10px] uppercase font-oxanium tracking-widest text-accent/40">{m.label}</p>
                            <span className={`text-[9px] font-oxanium px-1.5 py-0.5 rounded ${m.status === 'Optimal' ? 'bg-green-500/10 text-green-500' : 'bg-accent/10 text-accent'}`}>
                                {m.status}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-3 mt-4">
                            <span className="text-3xl font-oxanium font-black text-accent tracking-tighter">{m.value}</span>
                            <span className="text-[10px] font-oxanium text-green-400 font-bold">{m.change}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Tuning Console (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="widget flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <div className="widget-title italic">
                                <Activity className="w-3 h-3 text-accent" />
                                Harmonic Flux Comparison (Pre vs Post)
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-accent/20" />
                                    <span className="text-[9px] font-oxanium text-accent/30 uppercase">Raw Input</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                    <span className="text-[9px] font-oxanium text-accent/70 uppercase">Optimized</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-64 relative bg-black/40 rounded border border-accent/10 flex items-center justify-center overflow-hidden">
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(151,254,237,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(151,254,237,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />

                            {/* Complex Waves (SVG) */}
                            <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none" viewBox="0 0 1000 200" preserveAspectRatio="none">
                                {/* Raw wave */}
                                <path
                                    d="M 0 100 Q 25 10 50 100 T 100 100 T 150 100 T 200 100 T 250 100 T 300 100 T 350 100 T 400 100 T 450 100 T 500 100 T 550 100 T 600 100 T 650 100 T 700 100 T 750 100 T 800 100 T 850 100 T 900 100 T 950 100 T 1000 100"
                                    fill="none" stroke="rgba(151, 254, 237, 0.15)" strokeWidth="1"
                                />
                                <path
                                    d="M 0 100 Q 25 150 50 100 T 100 100 T 150 100 T 200 100 T 250 100 T 300 100 T 350 100 T 400 100 T 450 100 T 500 100 T 550 100 T 600 100 T 650 100 T 700 100 T 750 100 T 800 100 T 850 100 T 900 100 T 950 100 T 1000 100"
                                    fill="none" stroke="rgba(151, 254, 237, 0.1)" strokeWidth="1"
                                />
                                {/* Optimized wave */}
                                <path
                                    d="M 0 100 Q 12 70 25 100 T 50 100 T 75 100 T 100 100 T 125 100 T 150 100 T 175 100 T 200 100 T 225 100 T 250 100 T 275 100 T 300 100 T 325 100 T 350 100 T 375 100 T 400 100 T 425 100 T 450 100 T 475 100 T 500 100 T 525 100 T 550 100 T 575 100 T 600 100 T 625 100 T 650 100 T 675 100 T 700 100 T 725 100 T 750 100 T 775 100 T 800 100 T 825 100 T 850 100 T 875 100 T 900 100 T 925 100 T 950 100 T 975 100 T 1000 100"
                                    fill="none" stroke="rgba(151, 254, 237, 0.8)" strokeWidth="2" className="animate-pulse"
                                />
                            </svg>

                            <div className="absolute top-4 left-4 flex gap-2">
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-black/60 border border-accent/20 rounded text-[8px] font-oxanium text-accent backdrop-blur-md">
                                    <Radio className="w-2 h-2 animate-ping" />
                                    REAL-TIME PROXY
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="space-y-4">
                                <h5 className="text-[10px] font-oxanium font-bold uppercase tracking-widest text-accent/40">Dynamic EQ Alignment</h5>
                                <div className="flex justify-between items-end h-32 gap-1.5 px-2">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div key={i} className="flex-1 group/slider relative">
                                            <div className="absolute inset-0 bg-accent/5 rounded opacity-0 group-hover/slider:opacity-100 transition-opacity" />
                                            <div className="h-full w-full bg-black/30 rounded border border-accent/5 relative">
                                                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-accent/10" />
                                                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-5 bg-accent/20 border border-accent/40 rounded flex items-center justify-center group-hover/slider:bg-accent group-hover/slider:text-background transition-all" style={{ top: `${Math.random() * 80 + 10}%` }}>
                                                    <div className="w-1.5 h-0.5 bg-accent group-hover/slider:bg-background" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h5 className="text-[10px] font-oxanium font-bold uppercase tracking-widest text-accent/40">Optimization Modules</h5>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Denoise Pro', 'De-Reverb', 'Phase Align', 'Gain Normalize'].map(item => (
                                        <button
                                            key={item}
                                            onClick={() => toast.message(`Switching Module: ${item}`, { description: "Optimizing neural processing path." })}
                                            className="p-3 bg-black/40 border border-accent/5 rounded flex flex-col items-center gap-2 group/mod hover:border-accent/20 transition-all"
                                        >
                                            <Zap className="w-4 h-4 text-accent/20 group-hover/mod:text-accent group-hover/mod:scale-110 transition-all" />
                                            <span className="text-[9px] font-oxanium uppercase tracking-widest text-accent/40 group-hover/mod:text-accent">{item}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Settings Side (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="widget flex-1">
                        <div className="widget-title mb-6">
                            <Terminal className="w-3 h-3 text-accent" />
                            Deeper Node Config
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: "Oversampling", value: "8x", note: "Recommended for HQ" },
                                { label: "Jitter Correction", value: "MED", note: "Target: 42ms" },
                                { label: "Inference Depth", value: "Turbo", note: "NVIDIA MAXINE ACCEL" }
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-black/20 border border-accent/5 rounded group hover:border-accent/20 transition-all cursor-pointer">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-oxanium font-bold uppercase tracking-widest text-accent/50">{item.label}</span>
                                        <span className="text-xs font-oxanium font-black text-accent">{item.value}</span>
                                    </div>
                                    <p className="text-[8px] font-oxanium text-accent/20 mt-1 uppercase tracking-widest">{item.note}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-accent/10 space-y-4">
                            <div className="flex items-center justify-between text-[10px] font-oxanium font-bold uppercase text-accent/40">
                                <span>Hardware Acceleration</span>
                                <span className="text-green-500">Active</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                                <div className="w-10 h-10 rounded border border-accent/30 flex items-center justify-center">
                                    <Cpu className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-oxanium font-black text-accent uppercase">RTX-A6000 Found</p>
                                    <p className="text-[8px] font-oxanium text-accent/40 uppercase mt-0.5">Driver v551.23 :: CUDA 12.4</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.button
                        disabled={isResyncing}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            setIsResyncing(true)
                            toast.promise(
                                new Promise((resolve) => setTimeout(resolve, 3000)),
                                {
                                    loading: 'Flushing jitter buffers and re-establishing temporal sync...',
                                    success: () => {
                                        setIsResyncing(false)
                                        return 'Global Re-Sync Successful'
                                    },
                                    error: 'Re-Sync Failed',
                                }
                            )
                        }}
                        className="widget w-full bg-accent hover:bg-white disabled:bg-accent/50 disabled:cursor-wait transition-colors flex items-center justify-between group"
                    >
                        <span className="text-lg font-oxanium font-black text-background italic uppercase tracking-widest">
                            {isResyncing ? 'Re-Syncing...' : 'Force Re-Sync'}
                        </span>
                        {isResyncing ? (
                            <Loader2 className="w-6 h-6 text-background animate-spin" />
                        ) : (
                            <RefreshCcw className="w-6 h-6 text-background group-hover:rotate-180 transition-transform duration-700" />
                        )}
                    </motion.button>
                </div>
            </div>
        </div>
    )
}
