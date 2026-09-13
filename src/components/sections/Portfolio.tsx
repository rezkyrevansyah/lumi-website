import { useTranslations } from "next-intl";
import { FolderKanban } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { PortfolioCard } from "@/components/PortfolioCard";
import { portfolioItems, type ServiceCategory } from "@/data/portfolio";

export function Portfolio() {
  const t = useTranslations("Portfolio");

  const categoryLabels: Record<ServiceCategory, string> = {
    "web-dev": t("categoryWebDev"),
    uiux: t("categoryUiux"),
    qa: t("categoryQa"),
    consulting: t("categoryConsulting"),
  };

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
          {portfolioItems.map((item, index) => (
            <PortfolioCard
              key={item.slug}
              title={item.title}
              category={categoryLabels[item.category]}
              image={item.image}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
