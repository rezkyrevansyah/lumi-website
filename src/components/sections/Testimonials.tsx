import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { TestimonialPlaceholder } from "@/components/TestimonialPlaceholder";

export function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section className="w-full border-b border-border/60 bg-background-subtle py-24 lg:py-32">
      <div className="mx-auto max-w-7xl space-y-14 px-6 lg:px-12">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          icon={<Quote className="h-[15px] w-[15px]" aria-hidden="true" />}
          className="mx-auto max-w-2xl"
        />
        <TestimonialPlaceholder title={t("comingSoonTitle")} body={t("comingSoonBody")} />
      </div>
    </section>
  );
}
