"use server";

import { eq, asc } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export interface TestimonialInput {
  name: string;
  roleId: string;
  roleEn: string;
  quote: string;
  rating: number;
  featured: boolean;
}

export async function createTestimonial(input: TestimonialInput) {
  await requireAdminSession();
  const rows = await db.select().from(testimonials);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(testimonials).values({ ...input, sortOrder: maxSort + 1 });
  updateTag("testimonials");
}

export async function updateTestimonial(id: number, input: TestimonialInput) {
  await requireAdminSession();
  await db.update(testimonials).set(input).where(eq(testimonials.id, id));
  updateTag("testimonials");
}

export async function deleteTestimonial(id: number) {
  await requireAdminSession();
  await db.delete(testimonials).where(eq(testimonials.id, id));
  updateTag("testimonials");
}

export async function moveTestimonial(id: number, direction: "up" | "down") {
  await requireAdminSession();
  const rows = await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return;

  const current = rows[index];
  const swap = rows[swapIndex];
  await db.update(testimonials).set({ sortOrder: swap.sortOrder }).where(eq(testimonials.id, current.id));
  await db.update(testimonials).set({ sortOrder: current.sortOrder }).where(eq(testimonials.id, swap.id));
  updateTag("testimonials");
}
