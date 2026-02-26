"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Mail, User, Calendar, ShieldAlert } from "lucide-react"

export default function ProfilePage() {
  const { user: session, loading: authLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: session?.displayName || "",
    email: session?.email || "",
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!authLoading && !session) {
      router.push("/signin")
    }
  }, [authLoading, session, router])

  if (authLoading || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-border border-t-accent animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate save
    setTimeout(() => {
      setSaved(true)
      setLoading(false)
      setTimeout(() => setSaved(false), 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8 lg:ml-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-oxanium font-bold text-accent mb-2">
          PROFILE SETTINGS
        </h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </motion.div>

      <div className="max-w-2xl">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 mb-6"
        >
          <h2 className="text-lg font-oxanium font-bold text-foreground mb-6">
            PROFILE PICTURE
          </h2>

          <div className="flex items-center gap-6">
            <img
              src={session?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=demo"}
              alt="Profile"
              className="w-24 h-24 rounded-lg border-2 border-primary"
            />
            <div className="flex-1">
              <Button
                variant="outline"
                className="border-primary text-foreground hover:bg-primary/20"
              >
                Upload New Photo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended: Square image, 512x512px or larger
              </p>
            </div>
          </div>
        </motion.div>

        {/* Account Information */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-6"
        >
          <h2 className="text-lg font-oxanium font-bold text-foreground mb-6">
            ACCOUNT INFORMATION
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-input border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </Label>
              <Input
                type="email"
                value={formData.email}
                disabled
                className="bg-muted border-border text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Account Created
              </Label>
              <div className="px-3 py-2 rounded-md border border-border bg-input text-muted-foreground text-sm">
                January 15, 2024
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-oxanium font-bold"
            >
              {loading ? "Saving..." : saved ? "✓ Saved" : "Save Changes"}
            </Button>
          </form>
        </motion.div>

        {/* Password Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 mb-6"
        >
          <h2 className="text-lg font-oxanium font-bold text-foreground mb-6">
            SECURITY
          </h2>

          <div className="space-y-4">
            <div>
              <Label className="text-sm text-foreground flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-destructive" />
                Password
              </Label>
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-card"
              >
                Change Password
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <p className="text-xs text-primary-foreground">
                ✓ Two-factor authentication can be enabled in settings
              </p>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 border-destructive/50"
        >
          <h2 className="text-lg font-oxanium font-bold text-destructive mb-4">
            DANGER ZONE
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Permanently delete your account and all associated data.
          </p>
          <Button
            variant="destructive"
            className="w-full"
          >
            Delete Account
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
