import { getLocale, getTranslations } from "next-intl/server";
import { Wallet, BookOpen } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { PricingCard } from "@/components/PricingCard";
import { Button } from "@/components/Button";
import { buildWaLink } from "@/lib/whatsapp";
import { getPricingTiers } from "@/lib/content/pricing";

export async function Pricing() {
  const t = await getTranslations("Pricing");
  const locale = (await getLocale()) as "id" | "en";
  const tiers = await getPricingTiers(locale);

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
              ctaLabel={tier.ctaLabel}
              ctaVariant={tier.ctaVariant}
              ctaHref={buildWaLink(WA_MESSAGES[tier.key])}
              trackSection={tier.key === "landing" ? "pricing_entry" : "pricing_custom"}
            />
          ))}
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

const WA_MESSAGES: Record<string, string> = {
  landing: "Halo Lumi Beta Works, saya mau tanya-tanya soal paket Landing Page Rp 300.000. Boleh dijelaskan detailnya?",
  custom: "Halo Lumi Beta Works, saya tertarik dengan Paket Bisnis Company Profile & Web App. Bisa berbagi rinciannya?",
  enterprise: "Halo Lumi Beta Works, saya tertarik paket custom/enterprise untuk project saya. Bisa dibantu diskusikan lebih lanjut?",
};
