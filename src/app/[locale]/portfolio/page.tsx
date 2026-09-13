import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChevronRight, FolderKanban } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { getPortfolioItems } from "@/lib/content/portfolio";

type Props = PageProps<"/[locale]/portfolio">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PortfolioPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "PortfolioPage" });

  const labels = {
    all: t("filterAll"),
    "web-app": t("categoryWebApp"),
    uiux: t("categoryUiux"),
    qa: t("categoryQa"),
    emptyState: t("emptyState"),
  };

  const localizedItems = await getPortfolioItems(locale as "id" | "en");

  return (
    <section className="w-full bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-12 px-6 lg:px-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-text-secondary">
          <Link href="/" className="transition-colors hover:text-text-primary">
            {t("breadcrumbHome")}
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="font-medium text-text-primary">{t("breadcrumbCurrent")}</span>
        </nav>

        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          icon={<FolderKanban className="h-[15px] w-[15px]" aria-hidden="true" />}
        />

        <PortfolioGallery items={localizedItems} labels={labels} />
      </div>
    </section>
  );
}