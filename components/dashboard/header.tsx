"use client"

import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@/components/auth/auth-provider"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Search, Bell, User, Settings, CreditCard, LogOut, ChevronDown, Activity, Clock, CheckCircle2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const mockNotifications = [
    {
        id: 1,
        title: "Analysis Complete",
        description: "Audio batch #842 has been successfully processed.",
        time: "2 mins ago",
        unread: true,
        icon: CheckCircle2,
        color: "text-accent"
    },
    {
        id: 2,
        title: "System Update",
        description: "NVIDIA Maxine SDK updated to v3.4.1.",
        time: "1 hour ago",
        unread: true,
        icon: Activity,
        color: "text-blue-400"
    },
    {
        id: 3,
        title: "Storage Alert",
        description: "Buffer capacity at 85%. Consider purging old logs.",
        time: "5 hours ago",
        unread: false,
        icon: Clock,
        color: "text-yellow-400"
    }
]

export function Header() {
    const { user: session } = useAuth()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")

    const handleSignOut = async () => {
        await signOut(auth)
        router.push("/signin")
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            toast.success(`Broadcasting search: ${searchQuery}`, {
                description: "Querying encrypted databases across all sectors."
            })
            // In a real app, you might redirect to /search?q=...
        }
    }

    return (
        <header className="h-16 border-b border-sidebar-border/30 bg-[#071952] flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
            {/* Logo Left */}
            <div className="flex items-center gap-2 sm:min-w-[200px]">
                <Image
                    src="/logo.svg"
                    alt="SoniqFlow Logo"
                    width={140}
                    height={35}
                    className="h-7 w-auto"
                />
            </div>

            {/* Search Input Center */}
            <div className="flex-1 max-w-xl mx-auto hidden lg:block">
                <form onSubmit={handleSearch} className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/40 group-focus-within:text-accent transition-colors" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search commands..."
                        className="pl-10 bg-black/20 border-accent/10 focus:border-accent/40 text-accent font-oxanium text-[10px] uppercase tracking-widest placeholder:text-accent/20 h-9"
                    />
                </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 sm:gap-6 ml-auto">
                {/* Notifications Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="relative p-2 text-accent/40 hover:text-accent transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-[#071952] shadow-[0_0_5px_rgba(151,254,237,1)]" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 bg-card/95 backdrop-blur-xl border-accent/20 text-accent font-oxanium p-0">
                        <div className="p-4 border-b border-accent/10 flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-widest">Notifications</h3>
                            <button className="text-[10px] uppercase tracking-tighter text-accent/40 hover:text-accent transition-colors">Mark all read</button>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                            {mockNotifications.map((notif) => (
                                <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-4 border-b border-accent/5 focus:bg-accent/10 cursor-pointer">
                                    <div className="flex items-start gap-3 w-full">
                                        <div className={`p-1.5 rounded bg-accent/5 ${notif.color}`}>
                                            <notif.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[11px] font-bold uppercase tracking-tight">{notif.title}</p>
                                                <span className="text-[9px] text-accent/30 font-oxanium">{notif.time}</span>
                                            </div>
                                            <p className="text-[10px] text-accent/60 leading-relaxed">{notif.description}</p>
                                        </div>
                                        {notif.unread && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1 flex-shrink-0" />
                                        )}
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </div>
                        <div className="p-2 text-center border-t border-accent/10">
                            <Link href="/dashboard/notifications" className="text-[10px] uppercase tracking-[0.2em] text-accent/40 hover:text-accent transition-all py-1 block">View all logs</Link>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 group px-2 py-1 rounded hover:bg-white/5 transition-colors">
                            <div className="relative">
                                {session?.photoURL ? (
                                    <img
                                        src={session.photoURL}
                                        alt="User"
                                        className="w-8 h-8 rounded-full border border-accent/20 group-hover:border-accent transition-colors"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full border border-accent/20 bg-accent/10 flex items-center justify-center text-accent group-hover:border-accent transition-colors">
                                        <User className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                            <ChevronDown className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-card/90 backdrop-blur-xl border-accent/20 text-accent font-oxanium">
                        <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-accent/50 pb-0">Operator</DropdownMenuLabel>
                        <div className="px-2 py-1.5 pt-0">
                            <p className="text-sm font-bold uppercase truncate">{session?.displayName || session?.email?.split('@')[0] || "Guest Operator"}</p>
                        </div>
                        <DropdownMenuSeparator className="bg-accent/10" />
                        <DropdownMenuItem asChild className="hover:bg-accent/10 focus:bg-accent/10 focus:text-accent">
                            <Link href="/dashboard/profile" className="w-full flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:bg-accent/10 focus:bg-accent/10 focus:text-accent">
                            <Link href="/dashboard/settings" className="w-full flex items-center">
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:bg-accent/10 focus:bg-accent/10 focus:text-accent">
                            <Link href="/dashboard/subscription" className="w-full flex items-center">
                                <CreditCard className="w-4 h-4 mr-2" />
                                Subscription
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-accent/10" />
                        <DropdownMenuItem onClick={handleSignOut} className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
