"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { umkmUseCases, umkmProcessSteps, umkmMarketStats } from "@/db/schema"
import { eq } from "drizzle-orm"
import { setSetting, getSetting } from "./settings"

// UMKM Use Cases
export async function getUmkmUseCases() {
  return db.select().from(umkmUseCases).orderBy(umkmUseCases.sortOrder)
}

export async function createUmkmUseCase(data: {
  iconName: string; title: string; description: string;
  tags?: string[]; isHighlighted?: boolean; sortOrder?: number
}) {
  const [item] = await db.insert(umkmUseCases).values(data).returning()
  revalidatePath("/umkm")
  revalidatePath("/admin/umkm")
  return item
}

export async function updateUmkmUseCase(id: number, data: Partial<{
  iconName: string; title: string; description: string;
  tags?: string[]; isHighlighted?: boolean; sortOrder?: number
}>) {
  const [item] = await db.update(umkmUseCases).set(data).where(eq(umkmUseCases.id, id)).returning()
  revalidatePath("/umkm")
  revalidatePath("/admin/umkm")
  return item
}

export async function deleteUmkmUseCase(id: number) {
  await db.delete(umkmUseCases).where(eq(umkmUseCases.id, id))
  revalidatePath("/umkm")
  revalidatePath("/admin/umkm")
}

// UMKM Process Steps
export async function getUmkmProcessSteps() {
  return db.select().from(umkmProcessSteps).orderBy(umkmProcessSteps.sortOrder)
}

export async function createUmkmProcessStep(data: {
  stepNumber: number; title: string; description: string; sortOrder?: number
}) {
  const [item] = await db.insert(umkmProcessSteps).values(data).returning()
  revalidatePath("/umkm")
  revalidatePath("/admin/umkm")
  return item
}

export async function updateUmkmProcessStep(id: number, data: Partial<{
  stepNumber: number; title: string; description: string; sortOrder?: number
}>) {
  const [item] = await db.update(umkmProcessSteps).set(data).where(eq(umkmProcessSteps.id, id)).returning()
  revalidatePath("/umkm")
  revalidatePath("/admin/umkm")
  return item
}

export async function deleteUmkmProcessStep(id: number) {
  await db.delete(umkmProcessSteps).where(eq(umkmProcessSteps.id, id))
  revalidatePath("/umkm")
  revalidatePath("/admin/umkm")
}

// UMKM Market Stats
export async function getUmkmMarketStats() {
  return db.select().from(umkmMarketStats).orderBy(umkmMarketStats.sortOrder)
}

export async function createUmkmMarketStat(data: { value: string; label: string; sortOrder?: number }) {
  const [item] = await db.insert(umkmMarketStats).values(data).returning()
  revalidatePath("/umkm")
  revalidatePath("/admin/umkm")
  return item
}

export async function updateUmkmMarketStat(id: number, data: { value?: string; label?: string; sortOrder?: number }) {
  const [item] = await db.update(umkmMarketStats).set(data).where(eq(umkmMarketStats.id, id)).returning()
  revalidatePath("/umkm")
  revalidatePath("/admin/umkm")
  return item
}

export async function deleteUmkmMarketStat(id: number) {
  await db.delete(umkmMarketStats).where(eq(umkmMarketStats.id, id))
  revalidatePath("/umkm")
  revalidatePath("/admin/umkm")
}

// UMKM Why Us (stored in site_settings as JSON array)
export async function getUmkmWhyUs() {
  return getSetting("umkm_why_us")
}

export async function updateUmkmWhyUs(data: Array<{
  icon: string; title: string; description: string; accentColor?: string; bgColor?: string
}>) {
  await setSetting("umkm_why_us", data)
  revalidatePath("/umkm")
  revalidatePath("/admin/umkm")
}
