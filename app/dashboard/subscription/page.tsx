"use client"

import { motion } from "framer-motion"
import {
    CreditCard,
    Check,
    Zap,
    ShieldCheck,
    Crown,
    Activity,
    Cpu,
    Globe,
    Lock,
    User
} from "lucide-react"
import { toast } from "sonner"

const plans = [
    {
        name: "Base Operator",
        price: "0",
        features: [
            "10GB Neural Storage",
            "Level 1 Clearance",
            "Single Stream Processing",
            "Community Forge Access"
        ],
        icon: User,
        color: "text-accent/40",
        borderColor: "border-accent/10"
    },
    {
        name: "Neural Voyager",
        price: "49",
        features: [
            "500GB Neural Storage",
            "Level 3 Clearance",
            "Multi-Stream Pipeline",
            "Priority Kernel Access",
            "AES-256 Vault Encryption"
        ],
        icon: Zap,
        color: "text-accent",
        borderColor: "border-accent/40",
        popular: true
    },
    {
        name: "Overlord Protocol",
        price: "199",
        features: [
            "Unlimited Neural Storage",
            "Level 5 (Admin) Clearance",
            "Global Cluster Mesh",
            "Instant gRPC Streaming",
            "24/7 Neural Guardian",
            "Custom Forge Kernels"
        ],
        icon: Crown,
        color: "text-white",
        borderColor: "border-white/20"
    }
]

export default function SubscriptionPage() {
    return (
        <div className="space-y-8">
            {/* Header section Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-oxanium font-black text-accent italic tracking-tighter uppercase glow-text">
                        Clearance & Billing
                    </h1>
                    <p className="text-accent/40 font-oxanium text-[10px] uppercase tracking-[0.3em] mt-2">
                        Account Protocol: ACTIVE :: Encryption Node: ENABLED :: Monthly Flux Cycle: DAY 12
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => toast.info("Viewing billing history archive.")}
                        className="flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/20 text-accent rounded text-[10px] font-oxanium font-bold uppercase tracking-widest hover:bg-accent hover:text-background transition-all"
                    >
                        <Lock className="w-3.5 h-3.5" />
                        Billing History
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`widget relative group flex flex-col border-2 ${plan.borderColor} ${plan.popular ? 'bg-accent/[0.03]' : ''}`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-background text-[10px] font-oxanium font-black uppercase tracking-widest rounded rounded-bl-none rounded-br-none">
                                Most Popular Sequence
                            </div>
                        )}

                        <div className="mb-8">
                            <div className={`w-12 h-12 rounded bg-accent/5 flex items-center justify-center border border-accent/10 mb-6 group-hover:scale-110 transition-transform ${plan.color}`}>
                                <plan.icon className="w-6 h-6" />
                            </div>
                            <h3 className={`text-xl font-oxanium font-black uppercase tracking-tighter ${plan.color}`}>
                                {plan.name}
                            </h3>
                            <div className="flex items-baseline gap-1 mt-2">
                                <span className="text-3xl font-oxanium font-black text-accent tracking-tighter">${plan.price}</span>
                                <span className="text-[10px] font-oxanium text-accent/30 uppercase tracking-widest">/ Cycle</span>
                            </div>
                        </div>

                        <ul className="space-y-4 flex-1">
                            {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-center gap-3">
                                    <div className="w-1 h-1 bg-accent rounded-full" />
                                    <span className="text-[11px] font-oxanium text-accent/60 uppercase tracking-wide group-hover:text-accent transition-colors">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => toast.success(`Initiating ${plan.name} handshake...`, { description: "Redirecting to neural payment gateway." })}
                            className={`w-full mt-10 py-4 px-6 font-oxanium font-black uppercase tracking-[0.2em] text-[11px] rounded transition-all flex items-center justify-center gap-2 ${plan.popular
                                ? 'bg-accent text-background hover:bg-white'
                                : 'bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20'
                                }`}
                        >
                            {plan.price === "0" ? "Maintain Current" : "Initiate Upgrade"}
                            <Zap className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Info Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8">
                <div className="widget bg-black/40 border-dashed border-accent/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-accent/40" />
                        </div>
                        <div>
                            <h4 className="text-xs font-oxanium font-black text-accent uppercase">Encrypted Payments</h4>
                            <p className="text-[9px] font-oxanium text-accent/30 uppercase mt-1 tracking-widest">All transactions are processed through AES-256 neural bridges.</p>
                        </div>
                    </div>
                </div>
                <div className="widget bg-black/40 border-dashed border-accent/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center">
                            <Activity className="w-6 h-6 text-accent/40" />
                        </div>
                        <div>
                            <h4 className="text-xs font-oxanium font-black text-accent uppercase">Enterprise Flux</h4>
                            <p className="text-[9px] font-oxanium text-accent/30 uppercase mt-1 tracking-widest">Need a custom node cluster? Contact the Overlord council.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
