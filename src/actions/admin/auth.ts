"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { timingSafeEqual } from "crypto";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function login(_prevState: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "Server belum dikonfigurasi (ADMIN_PASSWORD kosong)." };
  }

  const stored = Buffer.from(adminPassword);
  const input = Buffer.from(password);
  const match = stored.length === input.length && timingSafeEqual(stored, input);

  if (!match) {
    return { error: "Password salah. Coba lagi." };
  }

  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.isAdmin = true;
  await session.save();
  redirect("/admin");
}

export async function logout() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.destroy();
  redirect("/admin/login");
}
