"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/firebase"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Authenticate with Firebase only
      await signInWithEmailAndPassword(auth, email.trim(), password.trim())

      // Manual redirection
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (err: any) {
      console.error("Firebase Signin Error:", err)
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password")
      } else {
        setError(err.message || "An error occurred. Please try again.")
      }
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError("")
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Google Signin Error:", err)
      setError("Google sign-in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground text-xs uppercase tracking-widest font-oxanium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="demo@soniqflow.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="bg-input border-border text-foreground placeholder-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground text-xs uppercase tracking-widest font-oxanium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="demo123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="bg-input border-border text-foreground placeholder-muted-foreground"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-oxanium font-bold"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-4 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">or</span>
        </div>
      </div>

      <Button
        onClick={handleGoogleSignIn}
        disabled={loading}
        variant="outline"
        className="w-full mt-4 border-border text-foreground hover:bg-card"
      >
        {loading ? "Loading..." : "Sign in with Google"}
      </Button>

      <div className="mt-8 pt-6 border-t border-border/50 text-center">
        <p className="text-muted-foreground text-sm">
          New operator?{" "}
          <Link href="/signup" className="text-accent hover:text-accent/80 font-bold transition-colors">
            Request Clearance
          </Link>
        </p>
      </div>
    </div>
  )
}
