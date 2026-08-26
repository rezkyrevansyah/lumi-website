"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { aboutPrinciples, achievements } from "@/db/schema"
import { eq } from "drizzle-orm"
import { setSetting, getSetting } from "./settings"

// About Principles (why_choose_us | work_principles)
export async function getAboutPrinciples(section?: string) {
  if (section) {
    return db.select().from(aboutPrinciples).where(eq(aboutPrinciples.section, section)).orderBy(aboutPrinciples.sortOrder)
  }
  return db.select().from(aboutPrinciples).orderBy(aboutPrinciples.sortOrder)
}

export async function createAboutPrinciple(data: {
  section: string; icon: string; title: string; description: string;
  accentColor?: string; bgColor?: string; sortOrder?: number
}) {
  const [item] = await db.insert(aboutPrinciples).values(data).returning()
  revalidatePath("/about")
  revalidatePath("/admin/about")
  return item
}

export async function updateAboutPrinciple(id: number, data: Partial<{
  section: string; icon: string; title: string; description: string;
  accentColor?: string; bgColor?: string; sortOrder?: number
}>) {
  const [item] = await db.update(aboutPrinciples).set(data).where(eq(aboutPrinciples.id, id)).returning()
  revalidatePath("/about")
  revalidatePath("/admin/about")
  return item
}

export async function deleteAboutPrinciple(id: number) {
  await db.delete(aboutPrinciples).where(eq(aboutPrinciples.id, id))
  revalidatePath("/about")
  revalidatePath("/admin/about")
}

// Achievements
export async function getAchievements() {
  return db.select().from(achievements).orderBy(achievements.sortOrder)
}

export async function createAchievement(data: {
  value: string; label: string; description?: string;
  accentColor?: string; bgColor?: string; sortOrder?: number
}) {
  const [item] = await db.insert(achievements).values(data).returning()
  revalidatePath("/about")
  revalidatePath("/admin/about")
  return item
}

export async function updateAchievement(id: number, data: Partial<{
  value: string; label: string; description?: string;
  accentColor?: string; bgColor?: string; sortOrder?: number
}>) {
  const [item] = await db.update(achievements).set(data).where(eq(achievements.id, id)).returning()
  revalidatePath("/about")
  revalidatePath("/admin/about")
  return item
}

export async function deleteAchievement(id: number) {
  await db.delete(achievements).where(eq(achievements.id, id))
  revalidatePath("/about")
  revalidatePath("/admin/about")
}

// Founder profile (stored in site_settings)
export async function getFounder() {
  return getSetting("founder")
}

export async function updateFounder(data: {
  name: string; title: string; bio: string; photoUrl: string;
  credentials: string[]; quote: string; fastworkUrl?: string
}) {
  await setSetting("founder", data)
  revalidatePath("/about")
  revalidatePath("/admin/about")
}

// About story text (stored in site_settings)
export async function getAboutStory() {
  return getSetting("about_story")
}

export async function updateAboutStory(data: { paragraph1: string; paragraph2: string; paragraph3?: string }) {
  await setSetting("about_story", data)
  revalidatePath("/about")
  revalidatePath("/admin/about")
}
