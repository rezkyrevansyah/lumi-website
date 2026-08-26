"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "@/lib/session"
import { timingSafeEqual } from "crypto"

export async function login(password: string): Promise<{ error: string } | never> {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return { error: "Server configuration error." }

  let match = false
  try {
    const stored = Buffer.from(adminPassword)
    const input = Buffer.from(password)
    match = stored.length === input.length && timingSafeEqual(stored, input)
  } catch {
    match = false
  }

  if (!match) {
    return { error: "Password salah. Coba lagi." }
  }

  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  session.isAdmin = true
  await session.save()

  redirect("/admin")
}

export async function logout() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  session.destroy()
  redirect("/admin/login")
}

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  return session
}
