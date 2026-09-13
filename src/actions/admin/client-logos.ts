"use server";

import { eq, asc } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { clientLogos } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export interface ClientLogoInput {
  imagePath: string;
  altText: string;
}

export async function createClientLogo(input: ClientLogoInput) {
  await requireAdminSession();
  const rows = await db.select().from(clientLogos);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(clientLogos).values({ ...input, sortOrder: maxSort + 1 });
  updateTag("client-logos");
}

export async function updateClientLogo(id: number, input: ClientLogoInput) {
  await requireAdminSession();
  await db.update(clientLogos).set(input).where(eq(clientLogos.id, id));
  updateTag("client-logos");
}

export async function deleteClientLogo(id: number) {
  await requireAdminSession();
  await db.delete(clientLogos).where(eq(clientLogos.id, id));
  updateTag("client-logos");
}

export async function moveClientLogo(id: number, direction: "up" | "down") {
  await requireAdminSession();
  const rows = await db.select().from(clientLogos).orderBy(asc(clientLogos.sortOrder));
  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return;
  const current = rows[index];
  const swap = rows[swapIndex];
  await db.update(clientLogos).set({ sortOrder: swap.sortOrder }).where(eq(clientLogos.id, current.id));
  await db.update(clientLogos).set({ sortOrder: current.sortOrder }).where(eq(clientLogos.id, swap.id));
  updateTag("client-logos");
}
