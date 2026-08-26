"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { siteSettings, stats, trustedBrands, certifications } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

export async function getSetting(key: string) {
  const [row] = await db.select().from(siteSettings).where(eq(siteSettings.key, key))
  return row?.value ?? null
}

export async function setSetting(key: string, value: unknown) {
  await db
    .insert(siteSettings)
    .values({ key, value: value as never })
    .onConflictDoUpdate({ target: siteSettings.key, set: { value: value as never } })
  revalidatePath("/", "layout")
  revalidatePath("/")
  revalidatePath("/about")
  revalidatePath("/layanan")
  revalidatePath("/portfolio")
  revalidatePath("/umkm")
  revalidatePath("/admin/settings")
}

// Stats
export async function getStats() {
  return db.select().from(stats).orderBy(stats.sortOrder)
}

export async function updateStat(id: number, data: { value?: string; label?: string; sortOrder?: number }) {
  const [item] = await db.update(stats).set(data).where(eq(stats.id, id)).returning()
  revalidatePath("/")
  revalidatePath("/admin/settings")
  return item
}

export async function createStat(data: { value: string; label: string; sortOrder?: number }) {
  const [item] = await db.insert(stats).values(data).returning()
  revalidatePath("/")
  revalidatePath("/admin/settings")
  return item
}

export async function deleteStat(id: number) {
  await db.delete(stats).where(eq(stats.id, id))
  revalidatePath("/")
  revalidatePath("/admin/settings")
}

// Trusted Brands
export async function getTrustedBrands() {
  return db.select().from(trustedBrands).orderBy(trustedBrands.sortOrder)
}

export async function createTrustedBrand(data: { name: string; logoUrl?: string; sortOrder?: number }) {
  const [item] = await db.insert(trustedBrands).values(data).returning()
  revalidatePath("/")
  revalidatePath("/admin/brands")
  revalidatePath("/admin/settings")
  return item
}

export async function bulkCreateTrustedBrands(
  items: Array<{ name: string; logoUrl?: string; sortOrder?: number }>
) {
  if (!items.length) return []
  const created = await db.insert(trustedBrands).values(items).returning()
  revalidatePath("/")
  revalidatePath("/admin/brands")
  revalidatePath("/admin/settings")
  return created
}

export async function updateTrustedBrand(
  id: number,
  data: { name?: string; logoUrl?: string; sortOrder?: number }
) {
  const [item] = await db.update(trustedBrands).set(data).where(eq(trustedBrands.id, id)).returning()
  revalidatePath("/")
  revalidatePath("/admin/brands")
  revalidatePath("/admin/settings")
  return item
}

export async function reorderTrustedBrands(
  items: Array<{ id: number; sortOrder: number }>
) {
  await Promise.all(
    items.map((item) =>
      db
        .update(trustedBrands)
        .set({ sortOrder: item.sortOrder })
        .where(eq(trustedBrands.id, item.id))
    )
  )
  revalidatePath("/")
  revalidatePath("/admin/brands")
  revalidatePath("/admin/settings")
}

export async function deleteTrustedBrand(id: number) {
  await db.delete(trustedBrands).where(eq(trustedBrands.id, id))
  revalidatePath("/")
  revalidatePath("/admin/brands")
  revalidatePath("/admin/settings")
}

// Certifications
export async function getCertifications() {
  return db.select().from(certifications).orderBy(certifications.sortOrder)
}

export async function createCertification(data: { imageUrl: string; altText: string; isDark?: boolean; sortOrder?: number }) {
  const [item] = await db.insert(certifications).values(data).returning()
  revalidatePath("/")
  revalidatePath("/admin/certifications")
  return item
}

export async function updateCertification(id: number, data: { imageUrl?: string; altText?: string; isDark?: boolean; sortOrder?: number }) {
  const [item] = await db.update(certifications).set(data).where(eq(certifications.id, id)).returning()
  revalidatePath("/")
  revalidatePath("/admin/certifications")
  return item
}

export async function deleteCertification(id: number) {
  await db.delete(certifications).where(eq(certifications.id, id))
  revalidatePath("/")
  revalidatePath("/admin/certifications")
}
