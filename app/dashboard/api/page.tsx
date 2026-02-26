"use client"

import { motion } from "framer-motion"
import {
    Code,
    Key,
    Terminal,
    FileText,
    Copy,
    RefreshCw,
    Activity,
    ShieldCheck,
    Server,
    Zap,
    Globe
} from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const apiKeys = [
    { name: "Main API Key", prefix: "sq_live_...", lastUsed: "4 mins ago", status: "Active" },
    { name: "Dev/Test Key", prefix: "sq_test_...", lastUsed: "1 day ago", status: "Active" },
    { name: "Webook Primary", prefix: "sq_hook_...", lastUsed: "Never", status: "Inactive" }
]

export default function APIPage() {
    const [isGenerating, setIsGenerating] = useState(false)
    return (
        <div className="space-y-8">
            {/* Header section Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-oxanium font-black text-accent italic tracking-tighter uppercase glow-text">
                        API Documentation
                    </h1>
                    <p className="text-accent/40 font-oxanium text-[10px] uppercase tracking-[0.3em] mt-2">
                        REST v3.1 :: gRPC Streaming Enabled :: SDK v4.0.2 Stable
                    </p>
                </div>
                <div className="flex gap-3">
                    <motion.button
                        disabled={isGenerating}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setIsGenerating(true)
                            toast.promise(
                                new Promise((resolve) => setTimeout(resolve, 2000)),
                                {
                                    loading: 'Requesting new entropy prefix from vault...',
                                    success: () => {
                                        setIsGenerating(false)
                                        return 'New API Key Generated // Level Alpha-01'
                                    },
                                    error: 'Generation failed',
                                }
                            )
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-background rounded text-[10px] font-oxanium font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Key className="w-3.5 h-3.5" />}
                        {isGenerating ? 'Generating...' : 'Generate Key'}
                    </motion.button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* API Console & Keys (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    {/* API Keys Table */}
                    <div className="widget">
                        <div className="widget-title mb-8">
                            <Key className="w-3 h-3 text-accent" />
                            Access Authentication
                        </div>
                        <div className="space-y-4">
                            {apiKeys.map((key, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-black/40 border border-accent/5 rounded-lg group hover:border-accent/20 transition-all gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-accent/5 border border-accent/10 flex items-center justify-center flex-shrink-0">
                                            <Code className="w-5 h-5 text-accent/60" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-oxanium font-bold text-accent/90">{key.name}</p>
                                            <p className="text-[10px] font-oxanium text-accent/30 mt-1 uppercase tracking-widest truncate">{key.prefix} <span className="text-accent/10">••••••••••••••••</span></p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-accent/5 pt-3 sm:pt-0">
                                        <div className="text-left sm:text-right">
                                            <p className="text-[9px] font-oxanium text-accent/30 uppercase tracking-widest">Last Used</p>
                                            <p className="text-[10px] font-oxanium text-accent/60">{key.lastUsed}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(key.prefix + "••••••••••••••••");
                                                    toast.success("Key copied to clipboard", { description: "AES-256 buffer secured." });
                                                }}
                                                className="p-2 text-accent/30 hover:text-accent transition-colors"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => toast.info(`Rolling Key: ${key.name}`, { description: "Invalidating old prefix, re-seeding entropy." })}
                                                className="p-2 text-accent/30 hover:text-accent transition-colors"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Snippet / Docs */}
                    <div className="widget flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div className="widget-title italic">
                                <FileText className="w-3 h-3 text-accent" />
                                Quick Start: Neural Synthesis
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['CURL', 'JS', 'PY', 'GO'].map(lang => (
                                    <button
                                        key={lang}
                                        onClick={() => toast.info(`Switching SDK Context: ${lang}`)}
                                        className={`px-2.5 py-1 text-[8px] font-oxanium font-black border rounded transition-all ${lang === 'PY' ? 'bg-accent/20 border-accent/40 text-accent' : 'bg-black/20 border-accent/5 text-accent/20 hover:text-accent/50'}`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 bg-black/60 rounded border border-accent/10 p-6 font-mono text-[11px] leading-relaxed relative group">
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-accent/10 border border-accent/20 rounded text-accent hover:bg-accent hover:text-background transition-all">
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-1">
                                <p className="text-accent/30"># Initialize SoniqFlow Neural Forge</p>
                                <p className="text-accent">import <span className="text-blue-400">soniqflow</span> as <span className="text-blue-400">sf</span></p>
                                <p>&nbsp;</p>
                                <p className="text-accent">client = sf.<span className="text-yellow-400">Client</span>(api_key=<span className="text-green-400">"your_api_key_here"</span>)</p>
                                <p>&nbsp;</p>
                                <p className="text-accent">response = client.neural.<span className="text-yellow-400">synthesize</span>({"{"})</p>
                                <p className="pl-4 text-accent"><span className="text-orange-400">"prompt"</span>: <span className="text-green-400">"Cinematic bass swell with 96kHz texture"</span>,</p>
                                <p className="pl-4 text-accent"><span className="text-orange-400">"model"</span>: <span className="text-green-400">"soniq-vocoder-rt"</span>,</p>
                                <p className="pl-4 text-accent"><span className="text-orange-400">"precision"</span>: <span className="text-green-400">"float16"</span></p>
                                <p className="text-accent">{"}"})</p>
                                <p>&nbsp;</p>
                                <p className="text-accent">print(response.output_url)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Endpoints & Logs (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="widget">
                        <div className="widget-title mb-6">
                            <Globe className="w-3 h-3 text-accent" />
                            Global Endpoint Status
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "US-EAST (Primary)", url: "api.soniqflow.com/v3", status: "99.99%", ping: "8ms" },
                                { name: "EU-WEST (Failover)", url: "api.eu.soniqflow.com/v3", status: "100%", ping: "14ms" },
                                { name: "gRPC Streaming", url: "rt-stream.soniqflow.com", status: "Active", ping: "2ms" }
                            ].map((endpoint, i) => (
                                <div key={i} className="p-4 bg-black/20 border border-accent/5 rounded-lg group hover:border-accent/20 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-[10px] font-oxanium font-black text-accent uppercase">{endpoint.name}</p>
                                        <span className="text-[8px] font-oxanium text-green-500 font-bold">{endpoint.status}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[9px] font-mono text-accent/30 truncate max-w-[180px]">{endpoint.url}</p>
                                        <span className="text-[9px] font-oxanium text-accent/40">{endpoint.ping}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="widget flex-1">
                        <div className="widget-title mb-6">
                            <Terminal className="w-3 h-3 text-accent" />
                            Real-time Request Log
                        </div>
                        <div className="space-y-3 font-mono text-[9px] leading-relaxed">
                            {[
                                { method: "POST", path: "/neural/synth", code: 200, time: "184ms" },
                                { method: "GET", path: "/projects/list", code: 200, time: "42ms" },
                                { method: "POST", path: "/neural/upscale", code: 202, time: "12ms" },
                                { method: "PATCH", path: "/settings/config", code: 200, time: "24ms" },
                                { method: "GET", path: "/api/usage", code: 200, time: "18ms" }
                            ].map((log, i) => (
                                <div key={i} className="flex items-center justify-between py-1 border-b border-accent/5 opacity-60 hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-3">
                                        <span className={`${log.method === 'POST' ? 'text-blue-400' : 'text-green-400'} font-bold`}>{log.method}</span>
                                        <span className="text-accent/70">{log.path}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-accent/40">{log.code}</span>
                                        <span className="text-accent/20 w-12 text-right">{log.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => toast.message("Live Inspector Initialized", { description: "Attaching to gRPC stream: rt-stream.soniqflow.com" })}
                                className="flex items-center gap-2 text-[9px] font-oxanium font-bold uppercase tracking-widest text-accent/30 hover:text-accent transition-colors"
                            >
                                <Activity className="w-3 h-3" />
                                Open Live Inspector
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
