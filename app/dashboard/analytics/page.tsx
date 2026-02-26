"use client"

import { motion } from "framer-motion"
import {
    BarChart3,
    AreaChart,
    TrendingUp,
    Users,
    Activity,
    Clock,
    Download,
    Calendar,
    Zap,
    HardDrive
} from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const stats = [
    { label: "Total Stream Volume", value: "84.2 TB", change: "+12%", type: "volume" },
    { label: "Average Fidelity", value: "98.4%", change: "+0.3%", type: "quality" },
    { label: "Active Operators", value: "124", change: "+8", type: "users" },
    { label: "System Uptime", value: "99.99%", change: "Stable", type: "health" }
]

export default function AnalyticsPage() {
    const [isExporting, setIsExporting] = useState(false)
    return (
        <div className="space-y-8">
            {/* Header section Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-oxanium font-black text-accent italic tracking-tighter uppercase glow-text">
                        Performance Analytics
                    </h1>
                    <p className="text-accent/40 font-oxanium text-[10px] uppercase tracking-[0.3em] mt-2">
                        Data Refresh: 15s :: Deep-Learning Insights Generated Hourly
                    </p>
                </div>
                <div className="flex gap-3">
                    <motion.button
                        disabled={isExporting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setIsExporting(true)
                            toast.promise(
                                new Promise((resolve) => setTimeout(resolve, 3500)),
                                {
                                    loading: 'Compiling 48H performance metrics into CSV archive...',
                                    success: () => {
                                        setIsExporting(false)
                                        return 'Dataset Exported Successfully'
                                    },
                                    error: 'Export failed: Buffer overflow',
                                }
                            )
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/20 text-accent rounded text-[10px] font-oxanium font-bold uppercase tracking-widest hover:bg-accent hover:text-background transition-all disabled:opacity-50"
                    >
                        {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                        {isExporting ? 'Exporting...' : 'Export Dataset'}
                    </motion.button>
                    <button
                        onClick={() => toast.info("Date range selector engaged.")}
                        className="p-2.5 rounded bg-black/20 border border-accent/20 text-accent/60 hover:text-accent transition-all"
                    >
                        <Calendar className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="widget group hover:border-accent/30 transition-all border-accent/10 relative overflow-hidden"
                    >
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <p className="text-[10px] uppercase font-oxanium tracking-widest text-accent/40">{stat.label}</p>
                                <div className="w-8 h-8 rounded bg-accent/5 flex items-center justify-center border border-accent/10">
                                    {stat.type === 'volume' && <HardDrive className="w-4 h-4 text-accent/60" />}
                                    {stat.type === 'quality' && <TrendingUp className="w-4 h-4 text-accent/60" />}
                                    {stat.type === 'users' && <Users className="w-4 h-4 text-accent/60" />}
                                    {stat.type === 'health' && <Activity className="w-4 h-4 text-accent/60" />}
                                </div>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-oxanium font-black text-accent tracking-tighter">{stat.value}</span>
                                <span className={`text-[10px] font-oxanium font-bold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-accent/40'}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                        {/* Background decorative chart line */}
                        <div className="absolute bottom-0 left-0 w-full h-8 opacity-10 bg-gradient-to-t from-accent to-transparent" />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Area Chart (8 cols) */}
                <div className="lg:col-span-8">
                    <div className="widget h-[440px] flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <div className="widget-title italic">
                                <AreaChart className="w-3 h-3 text-accent" />
                                Computational Throughput vs Demand
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-accent/20" />
                                    <span className="text-[9px] font-oxanium text-accent/30 uppercase tracking-widest">Global Demand</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                    <span className="text-[9px] font-oxanium text-accent/70 uppercase tracking-widest">AI Throughput</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative bg-black/40 rounded border border-accent/10 p-6 flex items-end">
                            {/* Y-Axis Labels */}
                            <div className="absolute top-6 left-2 bottom-12 flex flex-col justify-between text-[8px] font-oxanium text-accent/20">
                                <span>100 TB</span>
                                <span>75 TB</span>
                                <span>50 TB</span>
                                <span>25 TB</span>
                                <span>0 TB</span>
                            </div>

                            {/* Simulated Area Chart */}
                            <div className="flex-1 ml-10 h-full flex items-end gap-1.5 overflow-hidden">
                                {Array.from({ length: 48 }).map((_, i) => (
                                    <div key={i} className="flex-1 flex flex-col gap-0.5 justify-end h-full">
                                        <div className="w-full bg-accent/10" style={{ height: `${Math.random() * 40 + 20}%` }} />
                                        <div className="w-full bg-accent" style={{ height: `${Math.random() * 30 + 10}%` }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-6 px-4">
                            <p className="text-[10px] font-oxanium uppercase tracking-[0.2em] text-accent/30">Temporal Resolution: 1 Hour Steps</p>
                            <div className="flex gap-1.5">
                                {['24H', '7D', '30D', '90D'].map(period => (
                                    <button key={period} className={`px-2 py-1 text-[8px] font-oxanium font-black border rounded transition-all ${period === '7D' ? 'bg-accent/20 border-accent/40 text-accent' : 'bg-black/20 border-accent/5 text-accent/20 hover:text-accent/50'}`}>
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Distributed Stats (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="widget flex-1">
                        <div className="widget-title mb-8">
                            <Zap className="w-3 h-3 text-accent" />
                            Regional Node Latency
                        </div>
                        <div className="space-y-6">
                            {[
                                { region: "NA_EAST_01", latency: "12ms", load: 68 },
                                { region: "EU_WEST_04", latency: "18ms", load: 42 },
                                { region: "AP_SOUTH_02", latency: "45ms", load: 89 },
                                { region: "SA_EAST_01", latency: "38ms", load: 24 }
                            ].map((node, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[9px] uppercase font-oxanium tracking-widest">
                                        <span className="text-accent/60">{node.region}</span>
                                        <span className="text-accent">{node.latency}</span>
                                    </div>
                                    <div className="w-full h-1 bg-accent/5 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-accent/40 group-hover:bg-accent transition-all" style={{ width: `${node.load}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-8 border-t border-accent/10 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-oxanium font-black text-accent uppercase tracking-tighter">Global Efficiency Index</p>
                                <p className="text-[8px] font-oxanium text-accent/40 uppercase mt-1 tracking-widest">Target: 0.950 | Current: 0.982</p>
                            </div>
                            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center p-1">
                                <div className="w-full h-full rounded-full border-2 border-accent flex items-center justify-center font-oxanium font-black text-accent text-[10px]">98</div>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => toast.message("Neural Reporting Interface", { description: "Generating deep-learning insight dossier..." })}
                        className="widget bg-accent/5 border-dashed border-accent/30 flex items-center justify-center py-10 group cursor-pointer hover:bg-accent/10 transition-all"
                    >
                        <div className="text-center space-y-3">
                            <div className="w-12 h-12 rounded bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                                <TrendingUp className="w-6 h-6 text-accent" />
                            </div>
                            <p className="text-[10px] font-oxanium font-black uppercase tracking-[0.3em] text-accent">Generate Neural Report</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
