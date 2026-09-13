"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { login } from "@/actions/admin/auth";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50/80 px-4 py-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-50/80 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Situs Utama</span>
          </Link>
        </div>

        {/* Card */}
        <form
          action={formAction}
          className="rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-xl sm:p-9"
        >
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1 shadow-xs">
              <Image
                src="/brand/logo-square.png"
                alt="Lumi Beta Works"
                fill
                className="object-cover p-1"
                priority
              />
            </div>
            <h1 className="mt-3 text-lg font-bold tracking-tight text-zinc-900">
              Lumi Beta Works
            </h1>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Console</span>
            </div>
            <p className="mt-2 text-xs text-zinc-500 max-w-xs">
              Masuk dengan kata sandi terenkripsi untuk mengelola portofolio, harga, dan konten.
            </p>
          </div>

          {/* Form Fields */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-700">
                Kata Sandi Administrator
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Masukkan kata sandi..."
                  required
                  autoFocus
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 py-2.5 pl-10 pr-10 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                  aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {state?.error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{state.error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-zinc-800 disabled:opacity-50 active:scale-[0.98]"
            >
              <span>{pending ? "Memverifikasi..." : "Masuk ke Konsol"}</span>
            </button>
          </div>

          <div className="mt-6 border-t border-zinc-100 pt-4 text-center">
            <span className="text-[11px] text-zinc-400">
              Sesi dilindungi iron-session dengan HTTP-only cookie
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
