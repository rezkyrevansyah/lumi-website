import { useTranslations } from "next-intl";
import { Users, Terminal, MessagesSquare, TrendingUp } from "lucide-react";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SpotlightCard } from "@/components/SpotlightCard";
import { buildWaLink } from "@/lib/whatsapp";

const ABOUT_WA_MESSAGE =
  "Halo Lumi Beta Works, saya habis baca tentang tim kalian dan mau ngobrol-ngobrol soal project saya.";

export function About() {
  const t = useTranslations("About");

  const pillars = [
    { icon: Terminal, title: t("pillar1Title"), body: t("pillar1Body") },
    { icon: MessagesSquare, title: t("pillar2Title"), body: t("pillar2Body") },
    { icon: TrendingUp, title: t("pillar3Title"), body: t("pillar3Body") },
  ];

  return (
    <section id="about" className="w-full border-b border-border/50 bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-3.5 py-1 text-xs font-semibold text-accent-800">
              <Users className="h-4 w-4" aria-hidden="true" />
              <span>{t("eyebrow")}</span>
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="measure-paragraph text-base leading-relaxed text-text-secondary md:text-lg">
              {t("body1")}
            </p>
            <p className="measure-paragraph text-base leading-relaxed text-text-secondary">
              {t("body2")}
            </p>
            <div className="pt-2">
              <Button
                href={buildWaLink(ABOUT_WA_MESSAGE)}
                external
                variant="secondary"
                icon={<WhatsAppIcon className="h-[18px] w-[18px]" />}
                iconPosition="start"
                track={{ event: "wa_click", section: "about" }}
              >
                {t("cta")}
              </Button>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-6">
            {pillars.map((pillar) => (
              <SpotlightCard
                key={pillar.title}
                className="p-6 shadow-[0_4px_24px_rgba(24,24,27,0.04)] sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-800 transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-500 group-hover:text-white">
                    <pillar.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-bold text-text-primary transition-colors group-hover:text-accent-800">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{pillar.body}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
