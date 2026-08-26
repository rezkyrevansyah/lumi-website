"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { testimonials } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const TestimonialSchema = z.object({
  quote: z.string().min(1),
  authorName: z.string().min(1),
  authorRole: z.string().min(1),
  rating: z.number().min(1).max(5).default(5),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().default(0),
})

export async function createTestimonial(data: z.infer<typeof TestimonialSchema>) {
  const parsed = TestimonialSchema.parse(data)
  const [item] = await db.insert(testimonials).values(parsed).returning()
  revalidatePath("/")
  revalidatePath("/admin/testimonials")
  return item
}

export async function updateTestimonial(id: number, data: Partial<z.infer<typeof TestimonialSchema>>) {
  const [item] = await db.update(testimonials).set(data).where(eq(testimonials.id, id)).returning()
  revalidatePath("/")
  revalidatePath("/admin/testimonials")
  return item
}

export async function deleteTestimonial(id: number) {
  await db.delete(testimonials).where(eq(testimonials.id, id))
  revalidatePath("/")
  revalidatePath("/admin/testimonials")
}

export async function getTestimonials() {
  return db.select().from(testimonials).orderBy(testimonials.sortOrder, testimonials.createdAt)
}
