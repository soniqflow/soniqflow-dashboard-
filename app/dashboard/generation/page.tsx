"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    Sparkles,
    Cpu,
    Layers,
    Zap,
    Volume2,
    Sliders,
    Wand2,
    BrainCircuit,
    Settings2,
    PlayCircle
} from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const models = [
    { name: "Soniq-Vocoder-RT", status: "Loaded", load: "12%", type: "Neural Synth" },
    { name: "Maxine-DENOISE-04", status: "Active", load: "45%", type: "Cleaning" },
    { name: "A-Spatial-Surround", status: "Standby", load: "0%", type: "Upmixing" }
]

export default function GenerationPage() {
    const [isIgniting, setIsIgniting] = useState(false)
    const [isBatching, setIsBatching] = useState(false)
    return (
        <div className="space-y-8">
            {/* Header section Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-oxanium font-black text-accent italic tracking-tighter uppercase glow-text">
                        Neural Generation
                    </h1>
                    <p className="text-accent/40 font-oxanium text-[10px] uppercase tracking-[0.3em] mt-2">
                        AI Kernels: 1024 :: Quantization: FP16 :: Tensor Core Optimization Active
                    </p>
                </div>
                <div className="flex gap-3">
                    <motion.button
                        disabled={isBatching}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setIsBatching(true)
                            toast.promise(
                                new Promise((resolve) => setTimeout(resolve, 2000)),
                                {
                                    loading: 'Queuing 24 assets for neural synth...',
                                    success: () => {
                                        setIsBatching(false)
                                        return 'Batch process sequence initiated'
                                    },
                                    error: 'Batch processing failed',
                                }
                            )
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-background rounded text-[10px] font-oxanium font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                    >
                        {isBatching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Layers className="w-3.5 h-3.5" />}
                        {isBatching ? 'Batching...' : 'Batch Processing'}
                    </motion.button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Generation Controls (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="widget flex-1 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="widget-title mb-8">
                            <Wand2 className="w-3 h-3 text-accent" />
                            Prompt-to-Audio Synthesis
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-oxanium font-bold uppercase tracking-widest text-accent/50">
                                    <span>Input Audio Directive</span>
                                    <span className="text-accent/20 italic hidden sm:block">CTRL+CMD+P</span>
                                </div>
                                <div className="relative">
                                    <textarea
                                        placeholder="Specify tone, acoustic environment, and neural texture..."
                                        className="w-full h-32 bg-black/40 border border-accent/10 rounded-lg p-4 font-oxanium text-accent placeholder:text-accent/10 focus:border-accent/30 transition-all outline-none resize-none"
                                    />
                                    <div className="absolute right-3 bottom-3 flex items-center gap-2">
                                        <span className="text-[9px] font-oxanium text-accent/20 uppercase">Model: GPT-Audio-X</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-oxanium font-bold uppercase tracking-widest text-accent/50">
                                            <span>Spectral Density</span>
                                            <span className="text-accent">0.84</span>
                                        </div>
                                        <div className="w-full h-1 bg-accent/10 rounded-full relative cursor-pointer">
                                            <div className="absolute top-1/2 left-[84%] -translate-y-1/2 w-3 h-3 bg-accent rounded-full border-2 border-background shadow-[0_0_10px_rgba(151,254,237,0.5)]" />
                                            <div className="w-[84%] h-full bg-accent" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-oxanium font-bold uppercase tracking-widest text-accent/50">
                                            <span>Neural Sampling Rate</span>
                                            <span className="text-accent">96kHz</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {['48k', '96k', '192k'].map(rate => (
                                                <button
                                                    key={rate}
                                                    onClick={() => toast.info(`Neural Sampling Rate: ${rate}Hz`)}
                                                    className={`flex-1 min-w-[60px] py-1.5 text-[10px] font-oxanium font-black border rounded transition-all ${rate === '96k' ? 'bg-accent/20 border-accent/40 text-accent' : 'bg-black/20 border-accent/5 text-accent/10 hover:border-accent/20 hover:text-accent/50'}`}
                                                >
                                                    {rate}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-oxanium font-bold uppercase tracking-widest text-accent/50">
                                        <span>Inference Pipeline</span>
                                        <Settings2 className="w-3 h-3" />
                                    </div>
                                    <div className="space-y-2">
                                        {['Multi-stage Upsample', 'Phase Alignment', 'Dither v2'].map(item => (
                                            <div
                                                key={item}
                                                onClick={() => toast.message(`Pipeline Module: ${item}`, { description: "Toggling neural stage state." })}
                                                className="flex items-center justify-between p-3 bg-black/40 border border-accent/5 rounded group/item hover:border-accent/20 transition-all cursor-pointer"
                                            >
                                                <span className="text-[10px] font-oxanium uppercase tracking-widest text-accent/70 group-hover/item:text-accent">{item}</span>
                                                <div className="w-4 h-4 rounded border border-accent/30 flex items-center justify-center p-0.5">
                                                    <div className="w-full h-full bg-accent rounded-[1px]" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                disabled={isIgniting}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => {
                                    setIsIgniting(true)
                                    toast.promise(
                                        new Promise((resolve) => setTimeout(resolve, 4000)),
                                        {
                                            loading: 'Seeding neural forge with temporal noise...',
                                            success: () => {
                                                setIsIgniting(false)
                                                return 'Neural Forge Ignited // Stable Synthesis Stream Active'
                                            },
                                            error: 'Ignition failed: Entropy levels unstable',
                                        }
                                    )
                                }}
                                className="w-full py-5 bg-accent/10 border border-accent/40 rounded-lg group/gen relative overflow-hidden transition-all hover:bg-accent/20 hover:border-accent disabled:opacity-50 disabled:cursor-wait shadow-[0_0_30px_rgba(151,254,237,0.1)] hover:shadow-[0_0_50px_rgba(151,254,237,0.3)]"
                            >
                                <motion.span
                                    animate={isIgniting ? { opacity: [1, 0.5, 1], scale: [1, 1.05, 1] } : {}}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="relative z-10 text-lg font-oxanium font-black text-accent italic uppercase tracking-[0.5em] group-hover:glow-text"
                                >
                                    {isIgniting ? 'Igniting Neural Forge...' : 'Ignite Neural Forge'}
                                </motion.span>
                                <AnimatePresence>
                                    {isIgniting && (
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "100%" }}
                                            exit={{ opacity: 0 }}
                                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
                                        />
                                    )}
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-accent/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                <Sparkles className={`absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 transition-all ${isIgniting ? 'text-accent animate-spin-slow scale-150 drop-shadow-[0_0_15px_rgba(151,254,237,1)]' : 'text-accent/10 group-hover:text-accent/30 group-hover:scale-125'}`} />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Model Status & Outputs (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="widget flex-1">
                        <div className="widget-title mb-6">
                            <BrainCircuit className="w-3 h-3 text-accent" />
                            Active Inference Engines
                        </div>
                        <div className="space-y-4">
                            {models.map((engine, i) => (
                                <div key={i} className="p-4 bg-black/20 border border-accent/5 rounded-lg space-y-3 group/engine hover:border-accent/20 transition-all">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-oxanium font-black text-accent/90">{engine.name}</p>
                                            <p className="text-[9px] font-oxanium text-accent/30 uppercase tracking-widest">{engine.type}</p>
                                        </div>
                                        <div className={`px-2 py-0.5 rounded text-[8px] font-oxanium font-bold ${engine.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-accent/10 text-accent/40 border border-accent/10'}`}>
                                            {engine.status}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-1 bg-accent/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent/40" style={{ width: engine.load }} />
                                        </div>
                                        <span className="text-[9px] font-oxanium text-accent/40">{engine.load}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="widget">
                        <div className="widget-title mb-6">
                            <Layers className="w-3 h-3 text-accent" />
                            Recent Generation Thread
                        </div>
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="flex items-center gap-4 p-3 bg-black/40 rounded border border-accent/5 group/out hover:border-accent/20 transition-all cursor-pointer">
                                    <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center text-accent/40 group-hover/out:text-accent group-hover/out:scale-110 transition-all">
                                        <PlayCircle className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-oxanium font-bold text-accent truncate uppercase">Neural_Sample_Synth_00{i}.wav</p>
                                        <p className="text-[8px] font-oxanium text-accent/30 mt-1 uppercase">Vibe: Cinematic Tech :: 3.2s</p>
                                    </div>
                                    <div className="h-4 flex items-baseline gap-0.5">
                                        {Array.from({ length: 8 }).map((_, j) => (
                                            <div key={j} className="w-0.5 bg-accent/20" style={{ height: `${Math.random() * 100}%` }} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => toast.info("Exporting buffer stream to local cache.")}
                            className="w-full mt-4 py-2 border border-accent/5 text-[9px] font-oxanium font-bold uppercase tracking-widest text-accent/30 hover:text-accent hover:border-accent/20 transition-all"
                        >
                            Export Buffer Stream
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
