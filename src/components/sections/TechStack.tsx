import { getLocale, getTranslations } from "next-intl/server";
import { CodeXml, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { TechStackGroupCard } from "@/components/TechStackGroupCard";
import { CertificationCard } from "@/components/CertificationBadge";
import { certifications } from "@/data/techStack";
import { getTechStackGroups } from "@/lib/content/tech-stack";

export async function TechStack() {
  const t = await getTranslations("TechStack");
  const tCert = await getTranslations("Certifications");
  const locale = (await getLocale()) as "id" | "en";
  const groups = await getTechStackGroups(locale);

  return (
    <section id="tech-stack" className="w-full border-b border-border/60 bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl space-y-16 px-6 lg:px-12">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          icon={<CodeXml className="h-[15px] w-[15px] text-accent-500" aria-hidden="true" />}
          className="mx-auto max-w-2xl"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <TechStackGroupCard key={group.key} title={group.label} items={group.items} />
          ))}
        </div>

        {/* Prominent Certifications & Industry Standards Showcase */}
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-background-subtle p-8 sm:p-10 lg:p-12 shadow-xs">
          {/* Ambient light glow */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-500/8 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-8 sm:gap-10">
            {/* Header with Title and Trust Badge */}
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-xl space-y-2.5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-800 border border-accent-500/20">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent-700" aria-hidden="true" />
                  <span>{tCert("eyebrow")}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
                  {tCert("title")}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {tCert("body")}
                </p>
              </div>

              {/* Trust indicator */}
              <div className="hidden shrink-0 items-center gap-2 rounded-full border border-border/70 bg-white/90 px-4 py-2 text-xs font-medium text-text-secondary shadow-xs backdrop-blur-xs sm:inline-flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
                </span>
                <span>{tCert("trustPill")}</span>
              </div>
            </div>

            {/* 4 Prominent Certification Cards */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {certifications.map((cert) => (
                <CertificationCard key={cert.key} certification={cert} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
