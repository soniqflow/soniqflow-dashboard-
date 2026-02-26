"use client"

import { motion } from "framer-motion"
import {
    FolderOpen,
    Search,
    Filter,
    FileAudio,
    Calendar,
    HardDrive,
    MoreHorizontal,
    Download,
    Share2,
    Trash2,
    Activity
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const projects = [
    {
        name: "Soniq_Pod_Ep12_V1",
        type: "Multi-Track",
        size: "1.4 GB",
        date: "Feb 23, 2026",
        status: "Finalized",
        node: "STORAGE_CLUSTER_A"
    },
    {
        name: "Voice_Isolation_Test_88k",
        type: "RAW Waveform",
        size: "240 MB",
        date: "Feb 24, 2026",
        status: "Processing",
        node: "LOCAL_CACHE"
    },
    {
        name: "Master_Live_Concert_02",
        type: "Surround 5.1",
        size: "4.2 GB",
        date: "Feb 21, 2026",
        status: "Archived",
        node: "COLD_DEEP_S3"
    },
    {
        name: "AI_Vocal_Synth_Demo",
        type: "Neural Patch",
        size: "12 MB",
        date: "Feb 24, 2026",
        status: "Draft",
        node: "DEV_SANDBOX"
    }
]

export default function ProjectsPage() {
    const [isOptimizing, setIsOptimizing] = useState(false)
    return (
        <div className="space-y-8">
            {/* Header section Area */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-oxanium font-black text-accent italic tracking-tighter uppercase glow-text">
                        Project Repositories
                    </h1>
                    <p className="text-accent/40 font-oxanium text-[10px] uppercase tracking-[0.3em] mt-2">
                        Secure Encryption: AES-256-GCM :: Master Vault Connected
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group flex-1 sm:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/30 group-focus-within:text-accent transition-colors" />
                        <Input
                            placeholder="Search Archives..."
                            className="pl-10 h-10 w-full sm:w-64 bg-black/20 border-accent/10 focus:border-accent/30 text-accent font-oxanium uppercase text-[9px] tracking-widest"
                        />
                    </div>
                    <button
                        onClick={() => toast.message("Filtering Repository", { description: "Applying neural metadata filters to the vault." })}
                        className="p-2.5 rounded bg-accent/5 border border-accent/20 text-accent hover:bg-accent/10 transition-all"
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {projects.map((proj, idx) => (
                    <motion.div
                        key={proj.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="widget flex flex-col group relative overflow-hidden"
                    >
                        {/* Folder tab accent */}
                        <div className="absolute top-0 left-6 w-12 h-1 bg-accent/20 group-hover:bg-accent transition-colors" />

                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 rounded bg-accent/5 border border-accent/10 group-hover:border-accent/30 transition-colors">
                                <FolderOpen className="w-5 h-5 text-accent/60 group-hover:text-accent transition-colors" />
                            </div>
                            <div className="flex gap-1.6">
                                <button
                                    onClick={() => toast.success(`Downloading ${proj.name}`, { description: "Preparing AES-256 encrypted archive." })}
                                    className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent text-accent/40"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => toast.info(`Sharing link generated for ${proj.name}`)}
                                    className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent text-accent/40"
                                >
                                    <Share2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => toast.message(`Asset Actions: ${proj.name}`, { description: "Opening cluster management options." })}
                                    className="p-1.5 text-accent/20 hover:text-accent transition-colors"
                                >
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            <h3 className="text-sm font-oxanium font-bold text-accent group-hover:glow-text transition-all truncate">
                                {proj.name}
                            </h3>
                            <p className="text-[10px] font-oxanium text-accent/40 uppercase tracking-widest">
                                {proj.type}
                            </p>
                        </div>

                        <div className="mt-auto pt-4 border-t border-accent/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-[8px] uppercase font-oxanium text-accent/30">
                                    <HardDrive className="w-3 h-3" />
                                    Storage
                                </div>
                                <p className="text-[10px] font-oxanium text-accent/70">{proj.size}</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-[8px] uppercase font-oxanium text-accent/30">
                                    <Calendar className="w-3 h-3" />
                                    Accessed
                                </div>
                                <p className="text-[10px] font-oxanium text-accent/70">{proj.date}</p>
                            </div>
                        </div>

                        {/* Status bar bottom */}
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${proj.status === 'Archived' ? 'bg-accent/20' : 'bg-accent animate-pulse'}`} />
                                <span className="text-[9px] font-oxanium uppercase tracking-widest text-accent/50">{proj.status}</span>
                            </div>
                            <span className="text-[8px] font-oxanium text-accent/20 truncate max-w-[80px]">{proj.node}</span>
                        </div>
                    </motion.div>
                ))}

                {/* Create New Card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(151, 254, 237, 0.05)",
                        borderColor: "rgba(151, 254, 237, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toast.success("Initializing new vault sector...", {
                        description: "Allocating neural storage buffers..."
                    })}
                    className="border-2 border-dashed border-accent/10 rounded-lg flex flex-col items-center justify-center p-8 bg-black/10 transition-all group cursor-pointer"
                >
                    <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10 group-hover:scale-110 group-hover:border-accent transition-all duration-500">
                        <span className="text-2xl text-accent/40 group-hover:text-accent">+</span>
                    </div>
                    <p className="mt-4 text-[10px] font-oxanium font-bold uppercase tracking-[0.3em] text-accent/40 group-hover:text-accent transition-colors">
                        Initialize Project
                    </p>
                </motion.div>
            </div>

            {/* Bottom info section */}
            <div className="widget bg-accent/5 flex flex-col md:flex-row md:items-center justify-between gap-6 p-10 mt-8 border-accent/20 shadow-[0_0_30px_rgba(151,254,237,0.05)]">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center relative">
                        <Activity className="w-8 h-8 text-accent animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-[#071952] flex items-center justify-center">
                            <span className="text-[8px] font-black text-background">!</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-oxanium font-black text-accent uppercase tracking-tighter">Vault Capacity: 84.7 TB</h4>
                        <div className="w-full h-1 bg-accent/10 rounded-full mt-2 overflow-hidden">
                            <div className="w-[65%] h-full bg-accent relative">
                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </div>
                        </div>
                        <p className="text-[9px] font-oxanium text-accent/40 uppercase tracking-[0.2em] mt-2">6.2 PB Estimated EOL at Current Bit-Flux Rate</p>
                    </div>
                </div>
                <motion.button
                    disabled={isOptimizing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setIsOptimizing(true)
                        toast.promise(
                            new Promise((resolve) => setTimeout(resolve, 2500)),
                            {
                                loading: 'Calibrating metadata structural alignment...',
                                success: () => {
                                    setIsOptimizing(false)
                                    return 'Metadata Optimization Complete'
                                },
                                error: 'Optimization Failed',
                            }
                        )
                    }}
                    className="px-8 py-3 bg-accent text-background rounded font-oxanium font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-3 disabled:opacity-50 disabled:cursor-wait"
                >
                    {isOptimizing && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isOptimizing ? 'Optimizing...' : 'Optimize Metadata'}
                </motion.button>
            </div>
        </div>
    )
}
