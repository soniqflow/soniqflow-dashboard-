"use client"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Layout,
  GitBranch,
  FolderOpen,
  Sparkles,
  Zap,
  AreaChart,
  Code,
  ShieldAlert
} from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Layout },
  { label: "Workflows", href: "/dashboard/workflows", icon: GitBranch },
  { label: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { label: "Generation", href: "/dashboard/generation", icon: Sparkles },
  { label: "Optimization", href: "/dashboard/optimization", icon: Zap },
  { label: "Analytics", href: "/dashboard/analytics", icon: AreaChart },
  { label: "API", href: "/dashboard/api", icon: Code },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user: session } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut(auth)
    router.push("/signin")
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border lg:hidden"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-accent" />
        ) : (
          <Menu className="w-5 h-5 text-accent" />
        )}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : (typeof window !== "undefined" && window.innerWidth >= 1024 ? 0 : -300)
        }}
        transition={{ duration: 0.3 }}
        className="fixed lg:static lg:translate-x-0 left-0 top-0 h-screen w-64 bg-sidebar/40 backdrop-blur-xl border-r border-sidebar-border/50 flex flex-col z-40 overflow-hidden shrink-0"
      >
        {/* Decorative background accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        {/* Logo */}
        <div className="p-8 border-b border-sidebar-border/30">
          <Link href="/dashboard" className="block group">
            <div className="flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="SoniqFlow Logo"
                width={160}
                height={40}
                className="h-8 w-auto group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-[10px] text-accent/50 uppercase tracking-[0.3em] mt-3 font-oxanium text-center">
              Command Center v2.1
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <motion.button
                  whileHover={{ x: 4, backgroundColor: "rgba(151, 254, 237, 0.05)" }}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded group transition-all duration-300 border ${isActive
                    ? "bg-accent/10 border-accent/20 text-accent"
                    : "border-transparent text-accent/40 hover:text-accent"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                    <span className="text-xs font-oxanium font-medium uppercase tracking-[0.2em]">{item.label}</span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(151,254,237,1)]" />
                  )}
                </motion.button>
              </Link>
            )
          })}
        </nav>

        {/* Upgrade Support */}
        <div className="p-4 px-6 mb-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => toast.info("Opening Enterprise Portal...", { description: "Redirecting to high-priority support terminal." })}
              className="w-full bg-accent hover:bg-white text-background font-oxanium font-bold text-[10px] uppercase tracking-[0.2em] py-5 group relative overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(151,254,237,0.2)] hover:shadow-[0_0_30px_rgba(151,254,237,0.5)]"
            >
              <ShieldAlert className="w-4 h-4 mr-2" />
              Upgrade to Enterprise
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border/30 bg-black/20">
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded border border-transparent hover:border-accent/20 hover:bg-black/40 transition-all duration-300">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative">
                      {session.photoURL ? (
                        <img
                          src={session.photoURL}
                          alt={session.displayName || "User"}
                          className="w-8 h-8 rounded border border-accent/20"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded border border-accent/20 bg-accent/10 flex items-center justify-center text-accent">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-[#071952] shadow-[0_0_5px_rgba(151,254,237,1)]" />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-xs font-oxanium font-bold text-accent uppercase tracking-tighter truncate">
                        {session.displayName || session.email?.split('@')[0] || "Operator"}
                      </p>
                      <p className="text-[9px] text-accent/30 uppercase font-oxanium tracking-widest truncate">
                        Level: Alpha
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-accent/40 flex-shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/90 backdrop-blur-xl border-accent/20 text-accent font-oxanium">
                <div className="px-2 py-1.5">
                  <p className="text-[10px] uppercase tracking-widest text-accent/50">Operator Status</p>
                  <p className="text-sm font-bold uppercase truncate">{session.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-accent/10" />
                <DropdownMenuItem asChild className="hover:bg-accent/10 focus:bg-accent/10 focus:text-accent">
                  <Link href="/dashboard/profile" className="w-full flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Operator Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-accent/10 focus:bg-accent/10 focus:text-accent">
                  <Link href="/dashboard/settings" className="w-full flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-accent/10" />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Terminate Session
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </motion.aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
