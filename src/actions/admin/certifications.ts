"use server";

import { eq, asc } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { certifications } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export interface CertificationInput {
  key: string;
  name: string;
  imagePath: string;
  altText: string;
}

export async function createCertification(input: CertificationInput) {
  await requireAdminSession();
  const rows = await db.select().from(certifications);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(certifications).values({ ...input, sortOrder: maxSort + 1 });
  updateTag("certifications");
}

export async function updateCertification(id: number, input: CertificationInput) {
  await requireAdminSession();
  await db.update(certifications).set(input).where(eq(certifications.id, id));
  updateTag("certifications");
}

export async function deleteCertification(id: number) {
  await requireAdminSession();
  await db.delete(certifications).where(eq(certifications.id, id));
  updateTag("certifications");
}

export async function moveCertification(id: number, direction: "up" | "down") {
  await requireAdminSession();
  const rows = await db.select().from(certifications).orderBy(asc(certifications.sortOrder));
  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return;
  const current = rows[index];
  const swap = rows[swapIndex];
  await db.update(certifications).set({ sortOrder: swap.sortOrder }).where(eq(certifications.id, current.id));
  await db.update(certifications).set({ sortOrder: current.sortOrder }).where(eq(certifications.id, swap.id));
  updateTag("certifications");
}
