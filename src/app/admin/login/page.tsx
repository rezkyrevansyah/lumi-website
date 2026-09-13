"use client";

import { useActionState } from "react";
import { login } from "@/actions/admin/auth";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <form action={formAction} className="w-full max-w-sm space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-zinc-900">Lumi Admin</h1>
        <p className="text-sm text-zinc-500">Masuk untuk mengelola konten situs.</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoFocus
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
        />
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {pending ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
