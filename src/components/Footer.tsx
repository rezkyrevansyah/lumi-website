import Image from "next/image";
import { MessageCircle, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <Image
            src="/brand/logo-landscape.png"
            alt="Lumi Beta Works"
            width={140}
            height={140}
            style={{ width: "auto" }}
            className="h-11 object-contain"
          />
          <p className="max-w-xs text-sm text-text-secondary">
            Lumi — the light of an idea. Beta — the courage to experiment. Works — turning ideas into something real.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-text-primary">{t("navHeading")}</h3>
          <nav className="flex flex-col gap-2 text-sm text-text-secondary">
            <Link href="/#about" className="transition-colors hover:text-text-primary">
              {nav("about")}
            </Link>
            <Link href="/#services" className="transition-colors hover:text-text-primary">
              {nav("services")}
            </Link>
            <Link href="/#portfolio" className="transition-colors hover:text-text-primary">
              {nav("portfolio")}
            </Link>
            <Link href="/pricelist" className="transition-colors hover:text-text-primary">
              {nav("pricelist")}
            </Link>
          </nav>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-text-primary">{t("contactHeading")}</h3>
          <div className="flex flex-col gap-2 text-sm text-text-secondary">
            <a
              href={buildWaLink(FOOTER_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-text-primary"
            >
              <MessageCircle className="h-4 w-4 text-accent-500" aria-hidden="true" />
              <span>+62 812-8395-0403</span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-text-primary"
            >
              <Mail className="h-4 w-4 text-accent-500" aria-hidden="true" />
              <span>{CONTACT_EMAIL}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-text-muted lg:px-12 lg:text-left">
          {t("copyright", { year })}
        </div>
      </div>
    </footer>
  );
}
