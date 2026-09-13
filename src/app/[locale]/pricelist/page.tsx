import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { PricingCard } from "@/components/PricingCard";
import { buildWaLink } from "@/lib/whatsapp";

type Props = PageProps<"/[locale]/pricelist">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pricelist" });

  return {
    title: `${t("title")} — Lumi Beta Works`,
    description: t("subtitle"),
  };
}

export default async function PricelistPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Pricelist" });
  const tPricing = await getTranslations({ locale, namespace: "Pricing" });

  const landingFeatures = [
    tPricing("landingFeature1"),
    tPricing("landingFeature2"),
    tPricing("landingFeature3"),
    tPricing("landingFeature4"),
    tPricing("landingFeature5"),
  ];
  const customFeatures = [
    tPricing("customFeature1"),
    tPricing("customFeature2"),
    tPricing("customFeature3"),
    tPricing("customFeature4"),
    tPricing("customFeature5"),
  ];
  const enterpriseFeatures = [
    tPricing("enterpriseFeature1"),
    tPricing("enterpriseFeature2"),
    tPricing("enterpriseFeature3"),
    tPricing("enterpriseFeature4"),
  ];

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
          <PricingCard
            highlighted
            badge={tPricing("landingBadge")}
            label={tPricing("landingLabel")}
            name={tPricing("landingName")}
            pricePrefix={tPricing("landingPricePrefix")}
            price={tPricing("landingPrice")}
            tagline={tPricing("landingTagline")}
            features={landingFeatures}
            ctaLabel={t("ctaGeneric")}
            ctaVariant="secondary"
            ctaHref={buildWaLink(
              "Halo Lumi Beta Works, saya lihat halaman pricelist dan tertarik dengan paket Landing Page. Boleh dibantu?"
            )}
            trackSection="pricelist"
          />
          <PricingCard
            label={tPricing("customLabel")}
            name={tPricing("customName")}
            pricePrefix={tPricing("customPricePrefix")}
            price={tPricing("customPrice")}
            tagline={tPricing("customTagline")}
            features={customFeatures}
            ctaLabel={t("ctaGeneric")}
            ctaHref={buildWaLink(
              "Halo Lumi Beta Works, saya lihat halaman pricelist dan tertarik dengan paket Custom Website/App. Boleh dibantu?"
            )}
            trackSection="pricelist"
          />
          <PricingCard
            label={tPricing("enterpriseLabel")}
            name={tPricing("enterpriseName")}
            pricePrefix={tPricing("enterprisePricePrefix")}
            price={tPricing("enterprisePrice")}
            tagline={tPricing("enterpriseTagline")}
            features={enterpriseFeatures}
            ctaLabel={t("ctaGeneric")}
            ctaVariant="outline"
            ctaHref={buildWaLink(
              "Halo Lumi Beta Works, saya lihat halaman pricelist dan tertarik dengan paket Enterprise. Boleh dibantu?"
            )}
            trackSection="pricelist"
          />
        </div>
      </div>
    </section>
  );
}
