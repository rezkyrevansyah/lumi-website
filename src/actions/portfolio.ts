"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { portfolioItems } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const PortfolioSchema = z.object({
  title: z.string().min(1),
  client: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()).default([]),
  platforms: z.array(z.string()).default([]),
  accentColor: z.string().optional(),
  bgColor: z.string().optional(),
  imageUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  isUmkmCaseStudy: z.boolean().default(false),
  sortOrder: z.number().default(0),
  isPublished: z.boolean().default(true),
})

export async function createPortfolioItem(data: z.infer<typeof PortfolioSchema>) {
  const parsed = PortfolioSchema.parse(data)
  const [item] = await db.insert(portfolioItems).values(parsed).returning()
  revalidatePath("/")
  revalidatePath("/portfolio")
  revalidatePath("/admin/portfolio")
  return item
}

export async function updatePortfolioItem(id: number, data: Partial<z.infer<typeof PortfolioSchema>>) {
  const [item] = await db.update(portfolioItems).set(data).where(eq(portfolioItems.id, id)).returning()
  revalidatePath("/")
  revalidatePath("/portfolio")
  revalidatePath("/admin/portfolio")
  return item
}

export async function deletePortfolioItem(id: number) {
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id))
  revalidatePath("/")
  revalidatePath("/portfolio")
  revalidatePath("/admin/portfolio")
}

export async function getPortfolioItems() {
  return db.select().from(portfolioItems).orderBy(portfolioItems.sortOrder, portfolioItems.createdAt)
}
