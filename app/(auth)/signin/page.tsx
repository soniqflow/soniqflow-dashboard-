import Image from "next/image"
import { SignInForm } from "@/components/auth/signin-form"

export const metadata = {
  title: "Sign In - SoniqFlow",
  description: "Sign in to your SoniqFlow account",
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: 'url("/auth-bg.png")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#071952]/90 via-[#071952]/80 to-[#071952]/95 backdrop-blur-[2px]" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in zoom-in duration-1000">
        {/* Header */}
        <div className="flex flex-col items-center space-y-2">
          <Image
            src="/logo.svg"
            alt="SoniqFlow Logo"
            width={240}
            height={60}
            className="h-12 w-auto animate-pulse"
            priority
          />
        </div>

        {/* Auth Card */}
        <div className="glass-card p-8 space-y-6 border border-accent/20 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(151,254,237,0.1)]">
          <div className="text-center">
            <h2 className="text-xl font-oxanium font-bold text-accent uppercase tracking-widest">
              Command Center Access
            </h2>
            <div className="h-0.5 w-12 bg-accent/30 mx-auto mt-2" />
          </div>
          <SignInForm />
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
