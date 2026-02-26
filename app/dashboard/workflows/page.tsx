"use client"

import { motion } from "framer-motion"
import {
    GitBranch,
    Play,
    Pause,
    CheckCircle2,
    Clock,
    Settings,
    MoreVertical,
    Zap,
    Activity,
    Plus,
    Loader2
} from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const workflows = [
    {
        id: "WF-001",
        name: "Neural Audio Upscaling v4",
        status: "Active",
        lastRun: "2 mins ago",
        progress: 65,
        signals: ["INPUT_RAW", "DENOISE", "UPSAMPLE", "OUT_HQ"],
    },
    {
        id: "WF-002",
        name: "Spectral Voice Isolation",
        status: "Paused",
        lastRun: "1 hour ago",
        progress: 100,
        signals: ["INPUT_MOV", "FFT_DECOMP", "VOICE_EXT", "RECONSTRUCT"],
    },
    {
        id: "WF-003",
        name: "Real-time Stream Cleanse",
        status: "Active",
        lastRun: "Live",
        progress: 88,
        signals: ["UDP_STREAM", "BUFFER_SYNC", "AI_ENHANCE", "RTMP_PUSH"],
    }
]

export default function WorkflowsPage() {
    const [isCreating, setIsCreating] = useState(false)
    const [open, setOpen] = useState(false)

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault()
        setIsCreating(true)
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Initializing neural automation bridge...',
                success: () => {
                    setIsCreating(false)
                    setOpen(false)
                    return 'New Pipeline Deployed Successfully'
                },
                error: 'Deployment failed',
            }
        )
    }

    return (
        <div className="space-y-8">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-oxanium font-black text-accent italic tracking-tighter uppercase glow-text">
                        Automation Pipelines
                    </h1>
                    <p className="text-accent/40 font-oxanium text-[10px] uppercase tracking-[0.3em] mt-2">
                        System Node: Workflow-Orchestrator-01 :: Operational
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="hidden sm:block px-4 py-2 bg-accent/5 border border-accent/20 rounded text-[10px] font-oxanium font-bold text-accent uppercase tracking-widest">
                        Total Pipelines: 14
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <motion.div
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-accent text-background rounded text-[10px] font-oxanium font-bold uppercase tracking-widest cursor-pointer shadow-[0_0_20px_rgba(151,254,237,0.3)] hover:shadow-[0_0_30px_rgba(151,254,237,0.6)] transition-all flex items-center gap-2"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                + New Pipeline
                            </motion.div>
                        </DialogTrigger>
                        <DialogContent className="bg-background border-accent/20 text-accent font-oxanium w-[95vw] max-w-[425px] rounded-lg">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter glow-text">Initialize New Bridge</DialogTitle>
                                <DialogDescription className="text-accent/40 text-[10px] uppercase tracking-widest">
                                    Allocate neural storage and define automation topology.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreate} className="space-y-6 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold">Pipeline Designation</Label>
                                    <Input id="name" placeholder="e.g. Spectral_v5_Deploy" className="bg-black/40 border-accent/10 focus:border-accent/40 text-accent placeholder:text-accent/10" required />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="type" className="text-[10px] uppercase tracking-widest font-bold">Topology Type</Label>
                                        <Select defaultValue="neural">
                                            <SelectTrigger id="type" className="bg-black/40 border-accent/10 text-accent">
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-background border-accent/20 text-accent font-oxanium">
                                                <SelectItem value="neural">Neural Synth</SelectItem>
                                                <SelectItem value="linear">Linear Processing</SelectItem>
                                                <SelectItem value="hybrid">Hybrid Engine</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="priority" className="text-[10px] uppercase tracking-widest font-bold">Priority Level</Label>
                                        <Select defaultValue="alpha">
                                            <SelectTrigger id="priority" className="bg-black/40 border-accent/10 text-accent">
                                                <SelectValue placeholder="Select Priority" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-background border-accent/20 text-accent font-oxanium">
                                                <SelectItem value="alpha">Alpha-01 (High)</SelectItem>
                                                <SelectItem value="beta">Beta-02 (Medium)</SelectItem>
                                                <SelectItem value="gamma">Gamma-03 (Low)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isCreating}
                                        className="w-full bg-accent text-background font-black uppercase italic tracking-widest hover:bg-white transition-all disabled:opacity-50"
                                    >
                                        {isCreating ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Synchronizing...
                                            </>
                                        ) : (
                                            'Deploy Automation Bridge'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Workflow Grid */}
            <div className="grid grid-cols-1 gap-6">
                {workflows.map((wf, idx) => (
                    <motion.div
                        key={wf.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="widget group overflow-visible"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            {/* Info Section */}
                            <div className="flex items-start gap-4 flex-1">
                                <div className={`p-3 rounded-lg border ${wf.status === 'Active' ? 'bg-accent/10 border-accent/30' : 'bg-white/5 border-white/10'}`}>
                                    <GitBranch className={`w-6 h-6 ${wf.status === 'Active' ? 'text-accent' : 'text-white/40'}`} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-oxanium font-bold text-accent/90">{wf.name}</h3>
                                        <span className="text-[9px] font-oxanium px-2 py-0.5 bg-black/40 border border-accent/10 rounded-full text-accent/50">
                                            ID: {wf.id}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1.5 text-[10px] font-oxanium uppercase tracking-widest text-accent/40">
                                            <Clock className="w-3 h-3" />
                                            Last Run: {wf.lastRun}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-oxanium uppercase tracking-widest text-accent/40">
                                            <Zap className="w-3 h-3" />
                                            Throughput: 1.2 GB/s
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress map */}
                            <div className="flex-1 max-w-md hidden lg:block">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-[9px] uppercase font-oxanium tracking-[0.2em] text-accent/30">Pipeline Topology</p>
                                    <p className="text-[10px] font-oxanium font-bold text-accent">{wf.progress}% Completed</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {wf.signals.map((sig, i) => (
                                        <div key={i} className="flex items-center gap-2 group/node">
                                            <div className={`px-2 py-1 rounded text-[8px] font-oxanium font-bold border ${i / wf.signals.length * 100 < wf.progress ? 'bg-accent/20 border-accent/40 text-accent' : 'bg-black/20 border-accent/5 text-accent/20'}`}>
                                                {sig}
                                            </div>
                                            {i < wf.signals.length - 1 && (
                                                <div className={`w-4 h-px ${i / wf.signals.length * 100 < wf.progress ? 'bg-accent/40' : 'bg-accent/10'}`} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-2 sm:gap-3 ml-auto lg:ml-0">
                                <button
                                    onClick={() => toast.info(`${wf.status === 'Active' ? 'Suspending' : 'Resuming'} pipeline: ${wf.id}`)}
                                    className="p-2 rounded bg-accent/5 border border-accent/10 text-accent hover:bg-accent hover:text-background transition-all"
                                >
                                    {wf.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => toast.message(`Configuring Node: ${wf.id}`, { description: "Opening advanced neural topology settings." })}
                                    className="p-2 rounded bg-accent/5 border border-accent/10 text-accent hover:bg-accent/10 transition-all"
                                >
                                    <Settings className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => toast.error("System Override Required", { description: "Access level 4 required for deeper diagnostics." })}
                                    className="p-2 rounded hover:bg-accent/5 transition-all text-accent/30"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Activity Feed and Stats Sidebar/Bottom */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2 widget">
                    <div className="widget-title">
                        <Activity className="w-3 h-3 text-accent" />
                        Node Execution Thread
                    </div>
                    <div className="space-y-3 font-mono text-[10px] text-accent/60 leading-relaxed uppercase">
                        <p className="flex gap-4">
                            <span className="text-accent/20">[17:00:24]</span>
                            <span className="text-green-500">INIT</span>
                            <span>Pipeline NF-001 connected to Global Mesh</span>
                        </p>
                        <p className="flex gap-4">
                            <span className="text-accent/20">[17:00:25]</span>
                            <span className="text-accent">PROC</span>
                            <span>Neural weights loaded: MAXINE_ENG_v4.2.1-base</span>
                        </p>
                        <p className="flex gap-4">
                            <span className="text-accent/20">[17:00:28]</span>
                            <span className="text-blue-500">SYNC</span>
                            <span>Buffer alignment optimized: Input Lag 2.4ms</span>
                        </p>
                        <div className="w-full h-px bg-accent/5 my-2" />
                        <p className="flex gap-4 italic opacity-50">
                            <span className="text-accent/20">[17:01:02]</span>
                            <span>WAIT</span>
                            <span>Listening for upstream audio payload...</span>
                        </p>
                    </div>
                </div>

                <div className="widget">
                    <div className="widget-title">
                        <Zap className="w-3 h-3 text-accent" />
                        Compute Distribution
                    </div>
                    <div className="space-y-4 py-2">
                        {[
                            { label: "AI Engine", value: 84 },
                            { label: "Signal Proc", value: 42 },
                            { label: "Network I/O", value: 18 },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1.5">
                                <div className="flex justify-between text-[9px] uppercase font-oxanium tracking-widest">
                                    <span className="text-accent/40">{stat.label}</span>
                                    <span className="text-accent">{stat.value}%</span>
                                </div>
                                <div className="w-full h-1 bg-accent/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stat.value}%` }}
                                        className="h-full bg-accent"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
