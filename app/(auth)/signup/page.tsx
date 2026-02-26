import Image from "next/image"
import { SignUpForm } from "@/components/auth/signup-form"

export const metadata = {
    title: "Sign Up - SoniqFlow",
    description: "Create your SoniqFlow operator account",
}

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
                style={{ backgroundImage: 'url("/auth-bg.png")' }}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1b3d]/95 via-[#071952]/80 to-[#0b1b3d]/95 backdrop-blur-[1px]" />
                {/* Overlay grid for tech feel */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(151,254,237,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(151,254,237,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {/* Header */}
                <div className="flex flex-col items-center space-y-2">
                    <Image
                        src="/logo.svg"
                        alt="SoniqFlow Logo"
                        width={280}
                        height={70}
                        className="h-14 w-auto animate-pulse"
                        priority
                    />
                </div>

                {/* Auth Card */}
                <div className="glass-card relative p-8 border border-accent/20 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(151,254,237,0.1)] overflow-hidden">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-accent/30 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-accent/30 pointer-events-none" />

                    <div className="relative z-10 space-y-6">
                        <div className="text-center">
                            <h2 className="text-xl font-oxanium font-bold text-accent uppercase tracking-widest">
                                Initialize Clearance
                            </h2>
                            <p className="text-accent/40 font-oxanium text-[9px] uppercase mt-1 tracking-widest">
                                New Operator Registration Sequence
                            </p>
                            <div className="h-0.5 w-12 bg-accent/30 mx-auto mt-3" />
                        </div>

                        <SignUpForm />
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center space-y-1">
                    <p className="text-[10px] text-accent/30 uppercase tracking-[0.2em]">
                        Secure Terminal Connection Established
                    </p>
                    <p className="text-[10px] text-accent/20 uppercase tracking-widest">
                        Powered by NVIDIA MAXINE TECH
                    </p>
                </div>
            </div>
        </div>
    )
}
