import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { PricingCard } from "@/components/PricingCard";
import { buildWaLink } from "@/lib/whatsapp";
import { getPricingTiers } from "@/lib/content/pricing";

type Props = PageProps<"/[locale]/pricelist">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pricelist" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PricelistPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Pricelist" });
  const tiers = await getPricingTiers(locale as "id" | "en");

  return (
    <section className="w-full bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-14 px-6 lg:px-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-text-secondary">
          <Link href="/" className="transition-colors hover:text-text-primary">
            {t("breadcrumbHome")}
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="font-medium text-text-primary">{t("breadcrumbCurrent")}</span>
        </nav>

        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.key}
              highlighted={tier.highlighted}
              badge={tier.badge}
              label={tier.label}
              name={tier.name}
              pricePrefix={tier.pricePrefix}
              price={tier.price}
              tagline={tier.tagline}
              features={tier.features}
              ctaLabel={t("ctaGeneric")}
              ctaVariant={tier.ctaVariant}
              ctaHref={buildWaLink(PRICELIST_WA_MESSAGES[tier.key])}
              trackSection="pricelist"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const PRICELIST_WA_MESSAGES: Record<string, string> = {
  landing: "Halo Lumi Beta Works, saya lihat halaman pricelist dan tertarik dengan paket Landing Page. Boleh dibantu?",
  custom: "Halo Lumi Beta Works, saya lihat halaman pricelist dan tertarik dengan paket Custom Website/App. Boleh dibantu?",
  enterprise: "Halo Lumi Beta Works, saya lihat halaman pricelist dan tertarik dengan paket Enterprise. Boleh dibantu?",
};
