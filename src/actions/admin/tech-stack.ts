"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { techStackCategories, techStackItems } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export async function createTechStackCategory(input: { key: string; labelId: string; labelEn: string }) {
  await requireAdminSession();
  const rows = await db.select().from(techStackCategories);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(techStackCategories).values({ ...input, sortOrder: maxSort + 1 });
  updateTag("tech-stack");
}

export async function deleteTechStackCategory(id: number) {
  await requireAdminSession();
  await db.delete(techStackCategories).where(eq(techStackCategories.id, id));
  updateTag("tech-stack");
}

export async function addTechStackItem(categoryId: number, name: string) {
  await requireAdminSession();
  const rows = await db.select().from(techStackItems);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(techStackItems).values({ categoryId, name, sortOrder: maxSort + 1 });
  updateTag("tech-stack");
}

export async function deleteTechStackItem(id: number) {
  await requireAdminSession();
  await db.delete(techStackItems).where(eq(techStackItems.id, id));
  updateTag("tech-stack");
}
