import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { buildWaLink } from "@/lib/whatsapp";

const FINAL_CTA_WA_MESSAGE = "Halo Lumi Beta Works, saya ingin mulai diskusi soal project saya.";

export function FinalCta() {
  const t = useTranslations("FinalCta");

  return (
    <section className="w-full bg-background py-24 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-base text-text-secondary md:text-lg">{t("subtitle")}</p>
        <div className="mt-8 flex justify-center">
          <Button
            href={buildWaLink(FINAL_CTA_WA_MESSAGE)}
            external
            icon={<ArrowRight className="h-[18px] w-[18px]" />}
            track={{ event: "wa_click", section: "final_cta" }}
          >
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
