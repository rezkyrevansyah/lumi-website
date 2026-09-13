import { useTranslations } from "next-intl";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { testimonials } from "@/data/testimonials";

const firstColumn = [
  testimonials[0],
  testimonials[3],
  testimonials[6],
  testimonials[9],
  testimonials[10],
];
const secondColumn = [
  testimonials[1],
  testimonials[4],
  testimonials[7],
  testimonials[10],
  testimonials[3],
];
const thirdColumn = [
  testimonials[5],
  testimonials[2],
  testimonials[8],
  testimonials[11],
  testimonials[4],
];

export function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section className="relative w-full overflow-hidden border-b border-border/60 bg-background-subtle py-20 lg:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[320px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center lg:px-12">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          icon={<Quote className="h-[15px] w-[15px]" aria-hidden="true" />}
          className="mx-auto max-w-2xl"
        />

        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-1.5 shadow-xs backdrop-blur-xs">
          <div className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
            ))}
          </div>
          <span className="text-xs font-semibold text-text-primary">{t("ratingBadge")}</span>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-h-[700px] max-w-7xl justify-center gap-6 overflow-hidden px-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] lg:px-12">
        <TestimonialsColumn testimonials={firstColumn} duration={22} />
        <TestimonialsColumn testimonials={secondColumn} duration={27} className="hidden md:block" />
        <TestimonialsColumn testimonials={thirdColumn} duration={24} className="hidden lg:block" />
      </div>
    </section>
  );
}
