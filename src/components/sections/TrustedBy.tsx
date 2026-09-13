import { useTranslations } from "next-intl";
import { LogoMarquee } from "@/components/LogoMarquee";
import { clientLogos } from "@/data/clientLogos";

export function TrustedBy() {
  const t = useTranslations("TrustedBy");

  return (
    <section className="w-full overflow-hidden border-b border-border bg-background-subtle py-14">
      <div className="mx-auto mb-8 max-w-7xl px-6 text-center lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
          {t("heading")}
        </p>
      </div>
      <LogoMarquee logos={clientLogos} />
    </section>
  );
}
