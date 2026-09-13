"use server";

import { eq, asc } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { portfolioItems, serviceCategoryEnum } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export interface PortfolioInput {
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  category: (typeof serviceCategoryEnum.enumValues)[number];
  imagePath: string;
  featured: boolean;
  isPublished: boolean;
}

export async function createPortfolioItem(input: PortfolioInput) {
  await requireAdminSession();
  const rows = await db.select().from(portfolioItems);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(portfolioItems).values({ ...input, sortOrder: maxSort + 1 });
  updateTag("portfolio");
}

export async function updatePortfolioItem(id: number, input: PortfolioInput) {
  await requireAdminSession();
  await db.update(portfolioItems).set(input).where(eq(portfolioItems.id, id));
  updateTag("portfolio");
}

export async function deletePortfolioItem(id: number) {
  await requireAdminSession();
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
  updateTag("portfolio");
}

export async function movePortfolioItem(id: number, direction: "up" | "down") {
  await requireAdminSession();
  const rows = await db.select().from(portfolioItems).orderBy(asc(portfolioItems.sortOrder));
  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return;
  const current = rows[index];
  const swap = rows[swapIndex];
  await db.update(portfolioItems).set({ sortOrder: swap.sortOrder }).where(eq(portfolioItems.id, current.id));
  await db.update(portfolioItems).set({ sortOrder: current.sortOrder }).where(eq(portfolioItems.id, swap.id));
  updateTag("portfolio");
}
