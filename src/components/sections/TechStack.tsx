import { useTranslations } from "next-intl";
import { CodeXml, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { TechStackGroupCard } from "@/components/TechStackGroupCard";
import { CertificationBadge } from "@/components/CertificationBadge";
import { techStackGroups, certifications } from "@/data/techStack";

export function TechStack() {
  const t = useTranslations("TechStack");
  const tCert = useTranslations("Certifications");

  const groupLabels: Record<string, string> = {
    frontend: t("groupFrontend"),
    backend: t("groupBackend"),
    mobileDb: t("groupMobileDb"),
    cloudDevops: t("groupCloudDevops"),
  };

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
          {techStackGroups.map((group) => (
            <TechStackGroupCard key={group.key} title={groupLabels[group.key]} items={group.items} />
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-zinc-200/80 bg-background-subtle p-8 md:flex-row">
          <div className="max-w-sm space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-800">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>{tCert("eyebrow")}</span>
            </div>
            <h3 className="font-display text-xl font-bold text-text-primary">{tCert("title")}</h3>
            <p className="text-xs text-text-secondary">{tCert("body")}</p>
          </div>
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-5 md:w-auto">
            {certifications.map((cert, index) => (
              <div
                key={cert.key}
                className={index === certifications.length - 1 ? "col-span-2 sm:col-span-1" : undefined}
              >
                <CertificationBadge icon={cert.icon} label={cert.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
