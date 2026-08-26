"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { faqs } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const FaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  page: z.enum(["layanan", "umkm", "global"]),
  sortOrder: z.number().default(0),
})

export async function createFaq(data: z.infer<typeof FaqSchema>) {
  const parsed = FaqSchema.parse(data)
  const [item] = await db.insert(faqs).values(parsed).returning()
  revalidatePath("/layanan")
  revalidatePath("/umkm")
  revalidatePath("/admin/faqs")
  return item
}

export async function updateFaq(id: number, data: Partial<z.infer<typeof FaqSchema>>) {
  const [item] = await db.update(faqs).set(data).where(eq(faqs.id, id)).returning()
  revalidatePath("/layanan")
  revalidatePath("/umkm")
  revalidatePath("/admin/faqs")
  return item
}

export async function deleteFaq(id: number) {
  await db.delete(faqs).where(eq(faqs.id, id))
  revalidatePath("/layanan")
  revalidatePath("/umkm")
  revalidatePath("/admin/faqs")
}

export async function getFaqs(page?: string) {
  if (page) {
    return db.select().from(faqs).where(eq(faqs.page, page)).orderBy(faqs.sortOrder)
  }
  return db.select().from(faqs).orderBy(faqs.sortOrder)
}
