import "server-only";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { pricingTiers, pricingFeatures } from "@/db/schema";

export const getPricingTiers = unstable_cache(
  async (locale: "id" | "en") => {
    const tiers = await db.select().from(pricingTiers).orderBy(asc(pricingTiers.sortOrder));
    const features = await db.select().from(pricingFeatures).orderBy(asc(pricingFeatures.sortOrder));

    return tiers.map((tier) => ({
      key: tier.key,
      name: locale === "en" ? tier.nameEn : tier.nameId,
      label: locale === "en" ? tier.labelEn : tier.labelId,
      tagline: locale === "en" ? tier.taglineEn : tier.taglineId,
      pricePrefix: locale === "en" ? tier.pricePrefixEn : tier.pricePrefixId,
      price: locale === "en" ? tier.priceEn : tier.priceId,
      ctaLabel: locale === "en" ? tier.ctaLabelEn : tier.ctaLabelId,
      badge: (locale === "en" ? tier.badgeEn : tier.badgeId) ?? undefined,
      highlighted: tier.highlighted,
      ctaVariant: tier.ctaVariant as "primary" | "secondary" | "outline",
      features: features
        .filter((f) => f.tierId === tier.id)
        .map((f) => (locale === "en" ? f.textEn : f.textId)),
    }));
  },
  ["pricing-tiers-all"],
  { tags: ["pricing"] }
);
