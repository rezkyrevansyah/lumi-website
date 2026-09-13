import { db } from "../src/db";
import { pricingTiers, pricingFeatures } from "../src/db/schema";
import id from "../messages/id.json";
import en from "../messages/en.json";

const P_ID = id.Pricing as Record<string, string>;
const P_EN = en.Pricing as Record<string, string>;

async function main() {
  const [landing] = await db
    .insert(pricingTiers)
    .values({
      key: "landing",
      nameId: P_ID.landingName,
      nameEn: P_EN.landingName,
      labelId: P_ID.landingLabel,
      labelEn: P_EN.landingLabel,
      taglineId: P_ID.landingTagline,
      taglineEn: P_EN.landingTagline,
      pricePrefixId: P_ID.landingPricePrefix,
      pricePrefixEn: P_EN.landingPricePrefix,
      priceId: P_ID.landingPrice,
      priceEn: P_EN.landingPrice,
      ctaLabelId: P_ID.landingCta,
      ctaLabelEn: P_EN.landingCta,
      badgeId: P_ID.landingBadge,
      badgeEn: P_EN.landingBadge,
      highlighted: true,
      ctaVariant: "secondary",
      sortOrder: 0,
    })
    .returning();

  const [custom] = await db
    .insert(pricingTiers)
    .values({
      key: "custom",
      nameId: P_ID.customName,
      nameEn: P_EN.customName,
      labelId: P_ID.customLabel,
      labelEn: P_EN.customLabel,
      taglineId: P_ID.customTagline,
      taglineEn: P_EN.customTagline,
      pricePrefixId: P_ID.customPricePrefix,
      pricePrefixEn: P_EN.customPricePrefix,
      priceId: P_ID.customPrice,
      priceEn: P_EN.customPrice,
      ctaLabelId: P_ID.customCta,
      ctaLabelEn: P_EN.customCta,
      badgeId: null,
      badgeEn: null,
      highlighted: false,
      ctaVariant: "primary",
      sortOrder: 1,
    })
    .returning();

  const [enterprise] = await db
    .insert(pricingTiers)
    .values({
      key: "enterprise",
      nameId: P_ID.enterpriseName,
      nameEn: P_EN.enterpriseName,
      labelId: P_ID.enterpriseLabel,
      labelEn: P_EN.enterpriseLabel,
      taglineId: P_ID.enterpriseTagline,
      taglineEn: P_EN.enterpriseTagline,
      pricePrefixId: P_ID.enterprisePricePrefix,
      pricePrefixEn: P_EN.enterprisePricePrefix,
      priceId: P_ID.enterprisePrice,
      priceEn: P_EN.enterprisePrice,
      ctaLabelId: P_ID.enterpriseCta,
      ctaLabelEn: P_EN.enterpriseCta,
      badgeId: null,
      badgeEn: null,
      highlighted: false,
      ctaVariant: "outline",
      sortOrder: 2,
    })
    .returning();

  await db.insert(pricingFeatures).values([
    ...[1, 2, 3, 4, 5].map((n, i) => ({
      tierId: landing.id,
      textId: P_ID[`landingFeature${n}`],
      textEn: P_EN[`landingFeature${n}`],
      sortOrder: i,
    })),
    ...[1, 2, 3, 4, 5].map((n, i) => ({
      tierId: custom.id,
      textId: P_ID[`customFeature${n}`],
      textEn: P_EN[`customFeature${n}`],
      sortOrder: i,
    })),
    ...[1, 2, 3, 4].map((n, i) => ({
      tierId: enterprise.id,
      textId: P_ID[`enterpriseFeature${n}`],
      textEn: P_EN[`enterpriseFeature${n}`],
      sortOrder: i,
    })),
  ]);

  console.log("Seeded 3 pricing tiers and 14 pricing features.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
