import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ChevronRight,
  Sparkles,
  Lightbulb,
  FlaskConical,
  Rocket,
  Terminal,
  MessagesSquare,
  TrendingUp,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { SpotlightCard } from "@/components/SpotlightCard";
import { RollingNumber } from "@/components/RollingNumber";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { buildWaLink } from "@/lib/whatsapp";

type Props = PageProps<"/[locale]/about">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AboutPage" });

  const philosophies = [
    {
      word: t("pillarLumiTitle"),
      desc: t("pillarLumiDesc"),
      icon: Lightbulb,
      color: "text-amber-500 bg-amber-50",
    },
    {
      word: t("pillarBetaTitle"),
      desc: t("pillarBetaDesc"),
      icon: FlaskConical,
      color: "text-accent-700 bg-accent-50",
    },
    {
      word: t("pillarWorksTitle"),
      desc: t("pillarWorksDesc"),
      icon: Rocket,
      color: "text-blue-600 bg-blue-50",
    },
  ];

  const values = [
    {
      title: t("val1Title"),
      desc: t("val1Desc"),
      icon: Terminal,
    },
    {
      title: t("val2Title"),
      desc: t("val2Desc"),
      icon: MessagesSquare,
    },
    {
      title: t("val3Title"),
      desc: t("val3Desc"),
      icon: TrendingUp,
    },
  ];

  return (
    <section className="w-full bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-16 px-6 lg:px-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-text-secondary">
          <Link href="/" className="transition-colors hover:text-text-primary">
            {t("breadcrumbHome")}
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="font-medium text-text-primary">{t("breadcrumbCurrent")}</span>
        </nav>

        {/* Page Header with Brand Logo Presentation */}
        <div className="space-y-8 text-center">
          <div className="mx-auto flex justify-center">
            <div className="inline-flex items-center justify-center rounded-3xl border border-zinc-200/80 bg-white px-8 py-5 shadow-xs transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/brand/logo-landscape.png"
                alt="Lumi Beta Works"
                width={260}
                height={68}
                priority
                style={{ width: "auto" }}
                className="h-12 sm:h-14 object-contain"
              />
            </div>
          </div>

          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            icon={<Sparkles className="h-[15px] w-[15px]" aria-hidden="true" />}
          />
        </div>

        {/* Brand Origin & Philosophy Grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Origin Story Narrative */}
          <div className="flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-background-subtle p-8 sm:p-10 lg:col-span-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-zinc-200/80 bg-white p-2 shadow-xs">
                  <Image
                    src="/brand/logo-square.png"
                    alt="Lumi Beta Works Icon"
                    width={48}
                    height={48}
                    priority
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-accent-50 px-3 py-0.5 text-xs font-semibold text-accent-800">
                    {t("storyBadge")}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-text-primary text-balance sm:text-3xl">
                    {t("storyTitle")}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-text-secondary text-pretty">
                <p>{t("storyP1")}</p>
                <p>{t("storyP2")}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-zinc-200/60 pt-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent-800">
                <span className="h-2 w-2 rounded-full bg-accent-600" />
                <span>Solusi Nyata untuk UMKM & Korporasi</span>
              </div>
            </div>
          </div>

          {/* 3 Brand Words / Philosophy */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-6">
            {philosophies.map((p) => (
              <SpotlightCard
                key={p.word}
                className="flex items-center gap-5 p-6 shadow-xs"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${p.color}`}>
                  <p.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-lg font-bold text-text-primary">
                    {p.word}
                  </h4>
                  <p className="text-sm leading-relaxed text-text-secondary text-pretty">
                    {p.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Core Values / How We Work */}
        <div className="space-y-10">
          <SectionHeader
            align="center"
            eyebrow={t("valuesEyebrow")}
            title={t("valuesTitle")}
            icon={<ShieldCheck className="h-[15px] w-[15px]" aria-hidden="true" />}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((val) => (
              <SpotlightCard key={val.title} className="p-7">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-800 transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-500 group-hover:text-white">
                    <val.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display text-lg font-bold text-text-primary transition-colors group-hover:text-accent-800">
                      {val.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-text-secondary text-pretty">
                      {val.desc}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Live Metrics Counter */}
        <div className="rounded-3xl border border-zinc-200/80 bg-background-subtle p-8 sm:p-12">
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            <div className="space-y-1">
              <div className="font-display text-3xl font-extrabold tabular-nums text-text-primary sm:text-4xl">
                <RollingNumber value={36} />+
              </div>
              <p className="text-xs font-medium text-text-secondary sm:text-sm">
                {t("statOrders")}
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-display text-3xl font-extrabold tabular-nums text-text-primary sm:text-4xl">
                <RollingNumber value={24} />+
              </div>
              <p className="text-xs font-medium text-text-secondary sm:text-sm">
                {t("statClients")}
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-display text-3xl font-extrabold tabular-nums text-text-primary sm:text-4xl">
                <RollingNumber value={13} />+
              </div>
              <p className="text-xs font-medium text-text-secondary sm:text-sm">
                {t("statRehired")}
              </p>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center gap-1 font-display text-3xl font-extrabold tabular-nums text-text-primary sm:text-4xl">
                <RollingNumber value={5} decimals={1} />
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-xs font-medium text-text-secondary sm:text-sm">
                {t("statRating")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto max-w-xl space-y-4">
            <h3 className="font-display text-2xl font-bold text-text-primary text-balance sm:text-3xl">
              {t("ctaTitle")}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary text-pretty md:text-base">
              {t("ctaSubtitle")}
            </p>
            <div className="pt-4 flex justify-center">
              <Button
                href={buildWaLink("Halo Lumi Beta Works, saya habis membaca halaman tentang tim kalian dan ingin diskusi project.")}
                external
                icon={<WhatsAppIcon className="h-[18px] w-[18px]" />}
                iconPosition="start"
                className="w-full sm:w-auto"
              >
                {t("ctaButton")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
