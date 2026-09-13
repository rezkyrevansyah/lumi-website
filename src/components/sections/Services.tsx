import { useTranslations } from "next-intl";
import { Globe, PenTool, ClipboardCheck, Lightbulb } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";

export function Services() {
  const t = useTranslations("Services");

  const services = [
    { icon: Globe, title: t("webDevTitle"), description: t("webDevBody") },
    { icon: PenTool, title: t("uiuxTitle"), description: t("uiuxBody") },
    { icon: ClipboardCheck, title: t("qaTitle"), description: t("qaBody") },
    { icon: Lightbulb, title: t("consultingTitle"), description: t("consultingBody") },
  ];

  return (
    <section id="services" className="w-full border-b border-border/60 bg-background-subtle py-24 lg:py-32">
      <div className="mx-auto max-w-7xl space-y-14 px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            align="left"
            eyebrow={t("eyebrow")}
            title={t("title")}
            className="max-w-xl"
          />
          <p className="max-w-md text-base text-text-secondary">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
