"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { services } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const ServiceSchema = z.object({
  title: z.string().min(1),
  shortDesc: z.string().min(1),
  summary: z.string().optional(),
  badgeLabel: z.string().optional(),
  badgeColor: z.string().optional(),
  deliverables: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  slaLabel: z.string().optional(),
  iconPath: z.string().optional(),
  iconType: z.string().default("image"),
  slug: z.string().min(1),
  waMessage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  sortOrder: z.number().default(0),
})

export async function createService(data: z.infer<typeof ServiceSchema>) {
  const parsed = ServiceSchema.parse(data)
  const [item] = await db.insert(services).values(parsed).returning()
  revalidatePath("/")
  revalidatePath("/layanan")
  revalidatePath("/admin/services")
  return item
}

export async function updateService(id: number, data: Partial<z.infer<typeof ServiceSchema>>) {
  const [item] = await db.update(services).set(data).where(eq(services.id, id)).returning()
  revalidatePath("/")
  revalidatePath("/layanan")
  revalidatePath("/admin/services")
  return item
}

export async function deleteService(id: number) {
  await db.delete(services).where(eq(services.id, id))
  revalidatePath("/")
  revalidatePath("/layanan")
  revalidatePath("/admin/services")
}

export async function getServices() {
  return db.select().from(services).orderBy(services.sortOrder)
}
