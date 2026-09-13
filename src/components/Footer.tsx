import Image from "next/image";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { buildWaLink } from "@/lib/whatsapp";

const FOOTER_WA_MESSAGE =
  "Halo Lumi Beta Works, saya ingin mulai diskusi soal project saya.";
const CONTACT_EMAIL = "lumibetaworks@gmail.com";

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-subtle">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 px-6 py-16 lg:flex-row lg:items-start lg:gap-16 lg:px-12">
        {/* Brand identity on left */}
        <div className="max-w-md space-y-4">
          <Image
            src="/brand/logo-landscape.png"
            alt="Lumi Beta Works"
            width={140}
            height={44}
            style={{ width: "auto" }}
            className="h-10 object-contain"
          />
          <p className="text-sm leading-relaxed text-text-secondary">
            {t("tagline")}
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping motion-reduce:animate-none rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{t("status")}</span>
          </div>
        </div>

        {/* Navigation & Contact on right */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-16 lg:gap-24">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              {t("navHeading")}
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm text-text-secondary">
              <Link
                href="/portfolio"
                className="w-fit rounded-md transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
              >
                {nav("portfolio")}
              </Link>
              <Link
                href="/services"
                className="w-fit rounded-md transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
              >
                {nav("services")}
              </Link>
              <Link
                href="/pricelist"
                className="w-fit rounded-md transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
              >
                {nav("pricelist")}
              </Link>
              <Link
                href="/about"
                className="w-fit rounded-md transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
              >
                {nav("about")}
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              {t("contactHeading")}
            </h3>
            <div className="flex flex-col gap-2.5 text-sm text-text-secondary">
              <a
                href={buildWaLink(FOOTER_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-md transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                <span className="font-medium">+62 812-8395-0403</span>
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex w-fit items-center gap-2 rounded-md transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
              >
                <Mail className="h-4 w-4 text-accent-500" aria-hidden="true" />
                <span>{CONTACT_EMAIL}</span>
              </a>
              <p className="pt-1 text-xs text-text-muted">
                {t("coverage")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-text-muted sm:flex-row lg:px-12">
          <div className="tabular-nums">{t("copyright", { year })}</div>
          <div>{t("badgeOrigin")}</div>
        </div>
      </div>
    </footer>
  );
}
