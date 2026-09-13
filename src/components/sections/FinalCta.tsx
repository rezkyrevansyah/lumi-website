import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { buildWaLink } from "@/lib/whatsapp";

const FINAL_CTA_WA_MESSAGE = "Halo Lumi Beta Works, saya ingin mulai diskusi soal project saya.";

export function FinalCta() {
  const t = useTranslations("FinalCta");

  return (
    <section className="w-full bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-white via-background-subtle to-accent-50/20 p-10 text-center shadow-card sm:p-14 lg:p-16">
          {/* Subtle ambient light glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-2xl space-y-4">
            <h2 className="font-display text-3xl font-bold text-text-primary text-balance sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-xl text-base text-text-secondary text-pretty leading-relaxed md:text-lg">
              {t("subtitle")}
            </p>
            <div className="pt-4 flex justify-center">
              <Button
                href={buildWaLink(FINAL_CTA_WA_MESSAGE)}
                external
                icon={<WhatsAppIcon className="h-[18px] w-[18px]" />}
                iconPosition="start"
                track={{ event: "wa_click", section: "final_cta" }}
                className="w-full sm:w-auto"
              >
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
