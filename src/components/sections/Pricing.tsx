import { useTranslations } from "next-intl";
import { Wallet, BookOpen } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { PricingCard } from "@/components/PricingCard";
import { Button } from "@/components/Button";
import { buildWaLink } from "@/lib/whatsapp";

export function Pricing() {
  const t = useTranslations("Pricing");

  const landingFeatures = [
    t("landingFeature1"),
    t("landingFeature2"),
    t("landingFeature3"),
    t("landingFeature4"),
    t("landingFeature5"),
  ];
  const customFeatures = [
    t("customFeature1"),
    t("customFeature2"),
    t("customFeature3"),
    t("customFeature4"),
    t("customFeature5"),
  ];
  const enterpriseFeatures = [
    t("enterpriseFeature1"),
    t("enterpriseFeature2"),
    t("enterpriseFeature3"),
    t("enterpriseFeature4"),
  ];

  return (
    <section id="pricing" className="w-full border-b border-border/60 bg-background-subtle py-24 lg:py-32">
      <div className="mx-auto max-w-7xl space-y-16 px-6 lg:px-12">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          icon={<Wallet className="h-[15px] w-[15px]" aria-hidden="true" />}
          className="mx-auto max-w-2xl"
        />

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          <PricingCard
            highlighted
            badge={t("landingBadge")}
            label={t("landingLabel")}
            name={t("landingName")}
            pricePrefix={t("landingPricePrefix")}
            price={t("landingPrice")}
            tagline={t("landingTagline")}
            features={landingFeatures}
            ctaLabel={t("landingCta")}
            ctaVariant="secondary"
            ctaHref={buildWaLink(
              "Halo Lumi Beta Works, saya mau tanya-tanya soal paket Landing Page Rp 300.000. Boleh dijelaskan detailnya?"
            )}
            trackSection="pricing_entry"
          />
          <PricingCard
            label={t("customLabel")}
            name={t("customName")}
            pricePrefix={t("customPricePrefix")}
            price={t("customPrice")}
            tagline={t("customTagline")}
            features={customFeatures}
            ctaLabel={t("customCta")}
            ctaHref={buildWaLink(
              "Halo Lumi Beta Works, saya tertarik dengan Paket Bisnis Company Profile & Web App. Bisa berbagi rinciannya?"
            )}
            trackSection="pricing_custom"
          />
          <PricingCard
            label={t("enterpriseLabel")}
            name={t("enterpriseName")}
            pricePrefix={t("enterprisePricePrefix")}
            price={t("enterprisePrice")}
            tagline={t("enterpriseTagline")}
            features={enterpriseFeatures}
            ctaLabel={t("enterpriseCta")}
            ctaVariant="outline"
            ctaHref={buildWaLink(
              "Halo Lumi Beta Works, saya tertarik paket custom/enterprise untuk project saya. Bisa dibantu diskusikan lebih lanjut?"
            )}
            trackSection="pricing_custom"
          />
        </div>

        <div className="pt-2 text-center">
          <Button
            href="/pricelist"
            variant="outline"
            icon={<BookOpen className="h-[18px] w-[18px]" />}
            iconPosition="start"
          >
            {t("viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
}
