import { useTranslations } from "next-intl";
import { ArrowRight, Wallet } from "lucide-react";
import { Button } from "@/components/Button";
import { buildWaLink } from "@/lib/whatsapp";

const HERO_WA_MESSAGE =
  "Halo Lumi Beta Works, saya tertarik konsultasi gratis soal pembuatan website/app. Boleh dibantu?";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full overflow-hidden border-b border-border/40 bg-background py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 left-1/2 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-500/12 via-[var(--color-gradient-blue)]/8 to-transparent blur-[120px]" />
        <div className="absolute top-1/4 -left-28 h-[340px] w-[340px] rounded-full bg-[var(--color-gradient-violet)]/8 blur-[100px]" />
        <div className="absolute -right-28 bottom-12 h-[380px] w-[380px] rounded-full bg-accent-500/10 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-white px-4 py-1.5 shadow-[0_1px_8px_rgba(16,185,129,0.08)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-500" />
            <span className="text-xs font-semibold tracking-wide text-zinc-700">{t("badge")}</span>
          </div>

          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.15] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <Button
              href={buildWaLink(HERO_WA_MESSAGE)}
              external
              icon={<ArrowRight className="h-[18px] w-[18px]" />}
              track={{ event: "wa_click", section: "hero" }}
              className="w-full sm:w-auto"
            >
              {t("ctaPrimary")}
            </Button>
            <Button
              href="/#pricing"
              variant="outline"
              icon={<Wallet className="h-[18px] w-[18px]" />}
              iconPosition="start"
              track={{ event: "view_pricing_click", section: "hero" }}
              className="w-full sm:w-auto"
            >
              {t("ctaSecondary")}
            </Button>
          </div>

          <div className="mt-16 grid w-full max-w-2xl grid-cols-3 divide-x divide-zinc-200 border-t border-border/80 pt-10">
            <div className="flex flex-col items-center px-4">
              <div className="flex items-baseline gap-0.5">
                <span className="font-display text-3xl font-extrabold text-text-primary sm:text-4xl">15</span>
                <span className="font-display text-2xl font-bold text-accent-500">+</span>
              </div>
              <span className="mt-1 text-xs font-medium text-text-secondary sm:text-sm">
                {t("statClients")}
              </span>
            </div>
            <div className="flex flex-col items-center px-4">
              <div className="flex items-baseline gap-0.5">
                <span className="font-display text-3xl font-extrabold text-text-primary sm:text-4xl">18</span>
                <span className="font-display text-2xl font-bold text-accent-500">+</span>
              </div>
              <span className="mt-1 text-xs font-medium text-text-secondary sm:text-sm">
                {t("statProjects")}
              </span>
            </div>
            <div className="flex flex-col items-center px-4">
              <div className="flex items-baseline gap-0.5">
                <span className="font-display text-3xl font-extrabold text-text-primary sm:text-4xl">99.9</span>
                <span className="font-display text-xl font-bold text-accent-500">%</span>
              </div>
              <span className="mt-1 text-xs font-medium text-text-secondary sm:text-sm">
                {t("statSatisfaction")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
