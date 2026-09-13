"use server";

import { eq, asc } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { pricingTiers, pricingFeatures } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export interface PricingTierInput {
  nameId: string;
  nameEn: string;
  labelId: string;
  labelEn: string;
  taglineId: string;
  taglineEn: string;
  pricePrefixId: string;
  pricePrefixEn: string;
  priceId: string;
  priceEn: string;
  ctaLabelId: string;
  ctaLabelEn: string;
  badgeId: string | null;
  badgeEn: string | null;
  highlighted: boolean;
  ctaVariant: string;
}

export async function updatePricingTier(id: number, input: PricingTierInput) {
  await requireAdminSession();
  await db.update(pricingTiers).set(input).where(eq(pricingTiers.id, id));
  updateTag("pricing");
}

export async function addPricingFeature(tierId: number, textId: string, textEn: string) {
  await requireAdminSession();
  const rows = await db.select().from(pricingFeatures).where(eq(pricingFeatures.tierId, tierId));
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(pricingFeatures).values({ tierId, textId, textEn, sortOrder: maxSort + 1 });
  updateTag("pricing");
}

export async function updatePricingFeature(id: number, textId: string, textEn: string) {
  await requireAdminSession();
  await db.update(pricingFeatures).set({ textId, textEn }).where(eq(pricingFeatures.id, id));
  updateTag("pricing");
}

export async function deletePricingFeature(id: number) {
  await requireAdminSession();
  await db.delete(pricingFeatures).where(eq(pricingFeatures.id, id));
  updateTag("pricing");
}

export async function movePricingFeature(id: number, direction: "up" | "down") {
  await requireAdminSession();
  const feature = (await db.select().from(pricingFeatures).where(eq(pricingFeatures.id, id)))[0];
  if (!feature) return;
  const siblings = await db
    .select()
    .from(pricingFeatures)
    .where(eq(pricingFeatures.tierId, feature.tierId))
    .orderBy(asc(pricingFeatures.sortOrder));
  const index = siblings.findIndex((f) => f.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= siblings.length) return;
  const swap = siblings[swapIndex];
  await db.update(pricingFeatures).set({ sortOrder: swap.sortOrder }).where(eq(pricingFeatures.id, feature.id));
  await db.update(pricingFeatures).set({ sortOrder: feature.sortOrder }).where(eq(pricingFeatures.id, swap.id));
  updateTag("pricing");
}
