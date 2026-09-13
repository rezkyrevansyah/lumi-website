import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ChevronRight,
  Globe,
  PenTool,
  CheckCheck,
  Cpu,
  Check,
  ArrowRight,
  Layers,
  Workflow,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { SpotlightCard } from "@/components/SpotlightCard";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { buildWaLink } from "@/lib/whatsapp";

type Props = PageProps<"/[locale]/services">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  const services = [
    {
      icon: Globe,
      title: t("service1Title"),
      description: t("service1Desc"),
      deliverables: t("service1Deliverables").split(", "),
      waMessage:
        "Halo Lumi Beta Works, saya ingin konsultasi mengenai layanan Web & App Development.",
    },
    {
      icon: PenTool,
      title: t("service2Title"),
      description: t("service2Desc"),
      deliverables: t("service2Deliverables").split(", "),
      waMessage:
        "Halo Lumi Beta Works, saya ingin konsultasi mengenai layanan UI/UX Design.",
    },
    {
      icon: CheckCheck,
      title: t("service3Title"),
      description: t("service3Desc"),
      deliverables: t("service3Deliverables").split(", "),
      waMessage:
        "Halo Lumi Beta Works, saya ingin konsultasi mengenai layanan QA Engineering & Testing.",
    },
    {
      icon: Cpu,
      title: t("service4Title"),
      description: t("service4Desc"),
      deliverables: t("service4Deliverables").split(", "),
      waMessage:
        "Halo Lumi Beta Works, saya ingin konsultasi mengenai layanan Technical Architecture & Consulting.",
    },
  ];

  const steps = [
    { title: t("step1Title"), desc: t("step1Desc") },
    { title: t("step2Title"), desc: t("step2Desc") },
    { title: t("step3Title"), desc: t("step3Desc") },
    { title: t("step4Title"), desc: t("step4Desc") },
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

        {/* Page Header */}
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          icon={<Layers className="h-[15px] w-[15px]" aria-hidden="true" />}
        />

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service) => (
            <SpotlightCard
              key={service.title}
              className="flex flex-col justify-between p-7 sm:p-8"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-800 transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-500 group-hover:text-white">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-accent-700 bg-accent-50/80 rounded-full px-3 py-1">
                    Lumi Service
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-text-primary transition-colors group-hover:text-accent-800">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-zinc-100 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Deliverables:
                  </span>
                  <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs font-medium text-zinc-700">
                        <Check className="h-3.5 w-3.5 shrink-0 text-accent-600" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  href={buildWaLink(service.waMessage)}
                  external
                  variant="outline"
                  icon={<WhatsAppIcon className="h-4 w-4" />}
                  iconPosition="start"
                  className="w-full text-xs hover:border-zinc-400"
                >
                  {t("ctaWa")}
                </Button>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Workflow Section */}
        <div className="space-y-10 rounded-3xl border border-zinc-200/80 bg-background-subtle p-8 sm:p-12">
          <SectionHeader
            align="center"
            eyebrow={t("workflowEyebrow")}
            title={t("workflowTitle")}
            subtitle={t("workflowSubtitle")}
            icon={<Workflow className="h-[15px] w-[15px]" aria-hidden="true" />}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="relative flex flex-col justify-between rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-xs"
              >
                <div className="space-y-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-50 text-sm font-bold text-accent-800">
                    0{idx + 1}
                  </span>
                  <h4 className="font-display text-base font-bold text-text-primary">
                    {step.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto max-w-xl space-y-4">
            <h3 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
              {t("ctaTitle")}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary md:text-base">
              {t("ctaSubtitle")}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button
                href={buildWaLink("Halo Lumi Beta Works, saya ingin diskusi kebutuhan project teknologi saya.")}
                external
                icon={<WhatsAppIcon className="h-[18px] w-[18px]" />}
                iconPosition="start"
                className="w-full sm:w-auto"
              >
                {t("ctaWa")}
              </Button>
              <Button
                href="/pricelist"
                variant="outline"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="end"
                className="w-full sm:w-auto"
              >
                {t("ctaPricelist")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
