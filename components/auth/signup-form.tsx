"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function SignUpForm() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setLoading(true)

        try {
            // 1. Create user in Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim())
            const user = userCredential.user

            // 2. Update profile name
            if (name) {
                await updateProfile(user, { displayName: name.trim() })
            }

            setSuccess(true)
            setTimeout(() => {
                router.push("/dashboard")
            }, 2000)
        } catch (err: any) {
            console.error("Firebase Signup Error:", err)
            if (err.code === "auth/email-already-in-use") {
                setError("Email is already registered")
            } else if (err.code === "auth/weak-password") {
                setError("Password is too weak")
            } else {
                setError(err.message || "Registration failed. Please try again.")
            }
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-oxanium font-bold text-foreground">Account Created</h3>
                    <p className="text-muted-foreground text-sm">
                        Your command center access has been provisioned.<br />
                        Redirecting to bridge...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground text-xs uppercase tracking-widest font-oxanium">
                        Operator Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Identity identifier"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent/50 transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground text-xs uppercase tracking-widest font-oxanium">
                        Comm Channel (Email)
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@soniqflow.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent/50 transition-colors"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-foreground text-xs uppercase tracking-widest font-oxanium">
                            Access Code
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            className="bg-input border-border text-foreground placeholder-muted-foreground/50 focus:border-accent/50 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-foreground text-xs uppercase tracking-widest font-oxanium">
                            Verify Code
                        </Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                            className="bg-input border-border text-foreground placeholder-muted-foreground/50 focus:border-accent/50 transition-colors"
                        />
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded border border-destructive/20 animate-in slide-in-from-top-1 duration-300">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-oxanium font-bold py-6 group relative overflow-hidden transition-all duration-300"
                >
                    <span className="relative z-10">{loading ? "Provisioning..." : "Initialize Operator"}</span>
                    <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border/50 text-center">
                <p className="text-muted-foreground text-sm">
                    Already have clearance?{" "}
                    <Link href="/signin" className="text-accent hover:text-accent/80 font-bold transition-colors">
                        Return to Bridge
                    </Link>
                </p>
            </div>
        </div>
    )
}
