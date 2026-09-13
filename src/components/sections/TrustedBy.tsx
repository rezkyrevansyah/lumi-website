import { getTranslations } from "next-intl/server";
import { LogoMarquee } from "@/components/LogoMarquee";
import { getClientLogos } from "@/lib/content/client-logos";

export async function TrustedBy() {
  const t = await getTranslations("TrustedBy");
  const logos = await getClientLogos();

  return (
    <section className="w-full overflow-hidden border-b border-border bg-background-subtle py-14">
      <div className="mx-auto mb-8 max-w-7xl px-6 text-center lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
          {t("heading")}
        </p>
      </div>
      <LogoMarquee logos={logos} />
    </section>
  );
}
