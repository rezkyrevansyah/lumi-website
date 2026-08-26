"use client"

import { useState } from "react"
import Image from "next/image"
import { Eye, EyeOff, Lock, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { login } from "@/actions/auth"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(password)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center px-4 relative overflow-hidden">
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #2DD9A4 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="w-full max-w-sm relative">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo3_1920x1080.svg"
            alt="Lumi Beta Works"
            width={160}
            height={54}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm p-8">
          <div className="mb-6 text-center">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "linear-gradient(135deg, #2DD9A418 0%, #6C63FF18 100%)" }}
            >
              <Lock size={20} className="text-[#6C63FF]" />
            </div>
            <h1
              className="text-xl font-bold text-[#3D3E4A]"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Admin Login
            </h1>
            <p
              className="text-sm text-muted-foreground mt-1"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Masuk untuk mengelola konten website
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label style={{ fontFamily: "var(--font-opensans)" }}>Password</Label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError("") }}
                  placeholder="••••••••"
                  required
                  autoFocus
                  className="pl-9 pr-10"
                  style={{ fontFamily: "var(--font-opensans)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                <AlertCircle size={14} className="shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full btn-primary py-2.5 rounded-xl mt-2",
                loading && "opacity-70 cursor-not-allowed"
              )}
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Masuk...
                </span>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
        </div>

        <p
          className="text-center text-xs text-muted-foreground mt-6"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          Lumi Beta Works Admin Panel · v1.0
        </p>
      </div>
    </div>
  )
}
