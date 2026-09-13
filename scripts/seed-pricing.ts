import { db } from "../src/db";
import { pricingTiers, pricingFeatures } from "../src/db/schema";

// Snapshot of the formerly-hardcoded `Pricing` namespace from
// messages/id.json + messages/en.json, inlined here (not imported) so this
// seed script has no dependency on those files — Task 14 deleted them once
// this was the last consumer left.
const P_ID: Record<string, string> = {
  landingBadge: "Paling Populer untuk UMKM",
  landingLabel: "Entry Level",
  landingName: "Landing Page",
  landingPricePrefix: "Mulai dari",
  landingPrice: "Rp 300.000",
  landingTagline: "Cocok buat kamu yang butuh halaman promosi cepat jadi.",
  landingCta: "Ambil Paket Ini",
  landingFeature1: "1 Halaman Responsive (Mobile-First)",
  landingFeature2: "Integrasi WhatsApp Direct Button",
  landingFeature3: "Fast Loading & SEO Ready",
  landingFeature4: "Free Hosting Setup 1 Bulan",
  landingFeature5: "Revisi Desain 2x & Garansi 14 Hari",
  customLabel: "Professional Tier",
  customName: "Custom Website/App",
  customPricePrefix: "Rentang Investasi",
  customPrice: "Rp 2,5jt – 5jt",
  customTagline:
    "Untuk kebutuhan yang lebih dari sekadar landing page — profil perusahaan, sistem internal sederhana, atau MVP produk.",
  customCta: "Diskusikan Kebutuhan Saya",
  customFeature1: "Multi-halaman (hingga 7 halaman kustom)",
  customFeature2: "CMS Mandiri (Kelola Artikel & Produk)",
  customFeature3: "Custom Form & Email Notification",
  customFeature4: "Optimasi Kecepatan & Schema SEO Lanjutan",
  customFeature5: "Support Teknis & Maintenance 3 Bulan",
  enterpriseLabel: "Enterprise Tier",
  enterpriseName: "Enterprise / Kustomisasi Penuh",
  enterprisePricePrefix: "Investasi",
  enterprisePrice: "Hubungi Kami",
  enterpriseTagline:
    "Untuk proyek skala besar dengan kebutuhan spesifik — integrasi sistem, keamanan tingkat lanjut, atau tim dedicated.",
  enterpriseCta: "Hubungi Kami",
  enterpriseFeature1: "Fullstack Custom Architecture (Next.js/Go)",
  enterpriseFeature2: "Multi-API, Payment Gateway & Database Kompleks",
  enterpriseFeature3: "QA Automation, Penetration Test & Audit",
  enterpriseFeature4: "SLA Terjamin & Dedicated Senior Engineer",
};

const P_EN: Record<string, string> = {
  landingBadge: "Most Popular for SMEs",
  landingLabel: "Entry Level",
  landingName: "Landing Page",
  landingPricePrefix: "Starting from",
  landingPrice: "IDR 300,000",
  landingTagline: "Perfect if you need a promo page up and running fast.",
  landingCta: "Get This Package",
  landingFeature1: "1 Responsive Page (Mobile-First)",
  landingFeature2: "WhatsApp Direct Button Integration",
  landingFeature3: "Fast Loading & SEO Ready",
  landingFeature4: "Free Hosting Setup for 1 Month",
  landingFeature5: "2x Design Revisions & 14-Day Guarantee",
  customLabel: "Professional Tier",
  customName: "Custom Website/App",
  customPricePrefix: "Investment Range",
  customPrice: "IDR 2.5M – 5M",
  customTagline:
    "For needs beyond a landing page — company profiles, simple internal systems, or a product MVP.",
  customCta: "Discuss My Needs",
  customFeature1: "Multi-page (up to 7 custom pages)",
  customFeature2: "Self-Managed CMS (Articles & Products)",
  customFeature3: "Custom Form & Email Notifications",
  customFeature4: "Advanced Speed & SEO Schema Optimization",
  customFeature5: "3 Months of Technical Support & Maintenance",
  enterpriseLabel: "Enterprise Tier",
  enterpriseName: "Enterprise / Full Customization",
  enterprisePricePrefix: "Investment",
  enterprisePrice: "Contact Us",
  enterpriseTagline:
    "For large-scale projects with specific needs — system integration, advanced security, or a dedicated team.",
  enterpriseCta: "Contact Us",
  enterpriseFeature1: "Fullstack Custom Architecture (Next.js/Go)",
  enterpriseFeature2: "Multi-API, Payment Gateway & Complex Database",
  enterpriseFeature3: "QA Automation, Penetration Testing & Audit",
  enterpriseFeature4: "Guaranteed SLA & Dedicated Senior Engineer",
};

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
