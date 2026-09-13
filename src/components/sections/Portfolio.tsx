import { useTranslations, useLocale } from "next-intl";
import { FolderKanban, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { PortfolioCard } from "@/components/PortfolioCard";
import { Button } from "@/components/Button";
import { portfolioItems, type ServiceCategory } from "@/data/portfolio";

export function Portfolio() {
  const t = useTranslations("Portfolio");
  const locale = useLocale() as "id" | "en";

  const categoryLabels: Record<ServiceCategory, string> = {
    "web-app": t("categoryWebApp"),
    uiux: t("categoryUiux"),
    qa: t("categoryQa"),
  };

  // Preview 6 featured items across all 3 capabilities
  const previewItems = [
    portfolioItems[0], // Athro Barbershop (web-app)
    portfolioItems[12], // Primaya App Revamp (uiux)
    portfolioItems[2], // BAZNAS Website (qa)
    portfolioItems[1], // Bali Pass Website (web-app)
    portfolioItems[14], // SAFTY (uiux)
    portfolioItems[6], // EKRAF HUB (qa)
  ];

  return (
    <section id="portfolio" className="w-full border-b border-border/60 bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl space-y-16 px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            align="left"
            eyebrow={t("eyebrow")}
            title={t("title")}
            icon={<FolderKanban className="h-[15px] w-[15px]" aria-hidden="true" />}
            className="max-w-xl"
          />
          <p className="max-w-md text-base text-text-secondary">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previewItems.map((item, index) => (
            <PortfolioCard
              key={item.slug}
              title={item.title}
              category={categoryLabels[item.category]}
              description={item.description[locale] ?? item.description.id}
              image={item.image}
              priority={index === 0}
            />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Button
            href="/portfolio"
            variant="outline"
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="end"
            className="hover:border-zinc-400"
          >
            {t("viewMore")}
          </Button>
        </div>
      </div>
    </section>
  );
}

