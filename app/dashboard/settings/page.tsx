"use client"

import { motion } from "framer-motion"
import {
  Settings,
  User,
  Shield,
  Bell,
  Monitor,
  Database,
  Globe,
  Lock,
  ChevronRight,
  LogOut,
  Save,
  ScanEye,
  Clock
} from "lucide-react"
import { toast } from "sonner"

const categories = [
  { id: 'account', label: 'Account Profile', icon: User },
  { id: 'sec', label: 'Security & Access', icon: Shield },
  { id: 'notif', label: 'Notifications', icon: Bell },
  { id: 'sys', label: 'System Preferences', icon: Monitor },
  { id: 'storage', label: 'Data & Storage', icon: Database },
  { id: 'api', label: 'Network & API', icon: Globe }
]

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header section Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-oxanium font-black text-accent italic tracking-tighter uppercase glow-text">
            System Settings
          </h1>
          <p className="text-accent/40 font-oxanium text-[10px] uppercase tracking-[0.3em] mt-2">
            Clearance Level: ALPHA-01 :: Operator Node ID: SQ-USR-992
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => toast.success("Commit Successful", { description: "System configuration synced to neural mesh." })}
            className="flex items-center gap-2 px-6 py-2 bg-accent text-background rounded text-[10px] font-oxanium font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(151,254,237,0.2)]"
          >
            <Save className="w-3.5 h-3.5" />
            Commit Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3">
          <div className="widget bg-black/40 p-2 space-y-1">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => toast.info(`Switching Category: ${cat.label}`)}
                className={`w-full flex items-center justify-between p-4 rounded transition-all group ${i === 0 ? 'bg-accent/10 border border-accent/20' : 'hover:bg-accent/5 border border-transparent'}`}
              >
                <div className="flex items-center gap-4">
                  <cat.icon className={`w-5 h-5 ${i === 0 ? 'text-accent' : 'text-accent/30 group-hover:text-accent'} transition-colors`} />
                  <span className={`text-[11px] font-oxanium font-bold uppercase tracking-widest ${i === 0 ? 'text-accent' : 'text-accent/40 group-hover:text-accent'}`}>
                    {cat.label}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 ${i === 0 ? 'text-accent' : 'text-accent/10'}`} />
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-accent/10">
              <button
                onClick={() => toast.error("Session Termination Protocol Engaged", { description: "Purging AES-256 buffers and decoupling operator node." })}
                className="w-full flex items-center gap-4 p-4 text-red-400/40 hover:text-red-400 hover:bg-red-400/5 transition-all rounded font-oxanium font-bold uppercase tracking-widest text-[11px]"
              >
                <LogOut className="w-5 h-5" />
                Terminate Session
              </button>
            </div>
          </div>
        </div>

        {/* Content Area (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Section 1: Identity */}
          <div className="widget group">
            <div className="widget-title mb-8">
              <User className="w-3 h-3 text-accent" />
              Operator Identity
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-2 border-accent/20 p-1 group-hover:border-accent/50 transition-colors">
                    <div className="w-full h-full rounded-full bg-accent/10 flex items-center justify-center border border-accent/10 overflow-hidden bg-[url('https://api.dicebear.com/7.x/pixel-art/svg?seed=992')] bg-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-2 rounded-full bg-accent text-background border-4 border-[#071952] cursor-pointer hover:scale-110 transition-transform">
                    <Monitor className="w-3 h-3" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-oxanium font-black text-accent uppercase tracking-tighter">Demo_Operator_01</h3>
                  <p className="text-[10px] font-oxanium text-accent/40 uppercase tracking-[0.2em]">Registered: Feb 14, 2026</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <p className="text-[10px] uppercase font-oxanium font-black text-accent/40 tracking-widest">Public Operator Handle</p>
                  <input
                    type="text"
                    defaultValue="SONIQ_CORE_992"
                    className="w-full p-3 bg-black/40 border border-accent/10 rounded font-oxanium text-accent focus:border-accent/40 outline-none transition-all uppercase text-[11px] tracking-widest"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Security */}
          <div className="widget">
            <div className="widget-title mb-8">
              <Shield className="w-3 h-3 text-accent" />
              Security & Encryption
            </div>
            <div className="space-y-6">
              {[
                { label: "Two-Factor Authentication (Biometric)", status: "Active", icon: ScanEye },
                { label: "Hardware Key Verification", status: "Enabled", icon: Lock },
                { label: "Automatic Session Decoupling", status: "15 Mins", icon: Clock }
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => toast.message(`Security Protocol: ${item.label}`, { description: "Verification check initiated." })}
                  className="flex justify-between items-center p-4 bg-black/20 border border-accent/5 rounded hover:border-accent/20 transition-all cursor-pointer group/sec"
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5 text-accent/30 group-hover/sec:text-accent transition-colors" />
                    <span className="text-[11px] font-oxanium font-bold uppercase tracking-widest text-accent/60 group-hover/sec:text-accent">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[11px] font-oxanium font-black text-accent/90">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Tech Preferences */}
          <div className="widget">
            <div className="widget-title mb-8">
              <Monitor className="w-3 h-3 text-accent" />
              Neural Node Preferences
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <p className="text-[10px] font-oxanium font-black uppercase tracking-widest text-accent/40">Inference Core Target</p>
                <div className="grid grid-cols-2 gap-3">
                  {['CUDA-Optimized', 'CPU-Fallback', 'Edge-Direct', 'Mesh-Grid'].map(target => (
                    <div
                      key={target}
                      onClick={() => toast.success(`Switching Inference Core: ${target}`)}
                      className={`p-4 border rounded text-center cursor-pointer transition-all ${target === 'CUDA-Optimized' ? 'bg-accent/20 border-accent/40 text-accent' : 'bg-black/20 border-accent/5 text-accent/10 hover:border-accent/30 hover:text-accent/50'}`}
                    >
                      <span className="text-[9px] font-oxanium font-black uppercase tracking-widest">{target}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-[10px] font-oxanium font-black uppercase tracking-widest text-accent/40">Interface Aesthetic</p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center bg-black/20 p-4 border border-accent/5 rounded">
                    <span className="text-[10px] font-oxanium uppercase tracking-widest text-accent/60">CRT Overlay Intensity</span>
                    <span className="text-accent font-oxanium font-black text-xs">8%</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/20 p-4 border border-accent/5 rounded">
                    <span className="text-[10px] font-oxanium uppercase tracking-widest text-accent/60">Neon Pulse Frequency</span>
                    <span className="text-accent font-oxanium font-black text-xs">2.4s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
