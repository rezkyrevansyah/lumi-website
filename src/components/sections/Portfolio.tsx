import { getTranslations, getLocale } from "next-intl/server";
import { FolderKanban, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { PortfolioCard } from "@/components/PortfolioCard";
import { Button } from "@/components/Button";
import { getPortfolioItems } from "@/lib/content/portfolio";

export async function Portfolio() {
  const t = await getTranslations("Portfolio");
  const locale = (await getLocale()) as "id" | "en";
  const allItems = await getPortfolioItems(locale);
  const previewItems = allItems.filter((item) => item.featured).slice(0, 6);

  const categoryLabels: Record<"web-app" | "uiux" | "qa", string> = {
    "web-app": t("categoryWebApp"),
    uiux: t("categoryUiux"),
    qa: t("categoryQa"),
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
          {previewItems.map((item, index) => (
            <PortfolioCard
              key={item.slug}
              title={item.title}
              category={categoryLabels[item.category]}
              description={item.description}
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
