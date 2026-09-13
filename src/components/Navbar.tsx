"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/Button";
import { buildWaLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { key: "about", href: "/#about" },
  { key: "services", href: "/#services" },
  { key: "techStack", href: "/#tech-stack" },
  { key: "portfolio", href: "/#portfolio" },
  { key: "pricing", href: "/#pricing" },
  { key: "pricelist", href: "/pricelist" },
] as const;

const HERO_WA_MESSAGE =
  "Halo Lumi Beta Works, saya tertarik konsultasi gratis soal pembuatan website/app. Boleh dibantu?";

export function Navbar() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-12">
        <Link
          href="/"
          className="flex items-center rounded-lg transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
        >
          <Image
            src="/brand/logo-landscape.png"
            alt="Lumi Beta Works"
            width={160}
            height={160}
            priority
            style={{ width: "auto" }}
            className="h-11 object-contain md:h-12"
          />
        </Link>

        <nav aria-label="Main Navigation" className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-background-subtle hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <div className="hidden sm:block">
            <Button
              href={buildWaLink(HERO_WA_MESSAGE)}
              external
              icon={<ArrowRight className="h-[18px] w-[18px]" />}
              track={{ event: "wa_click", section: "hero" }}
            >
              {t("cta")}
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("menuClose") : t("menuOpen")}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-background-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] xl:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 py-6 xl:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-text-secondary transition-colors hover:bg-background-subtle hover:text-text-primary"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-4">
            <LanguageToggle />
            <Button
              href={buildWaLink(HERO_WA_MESSAGE)}
              external
              icon={<ArrowRight className="h-[18px] w-[18px]" />}
              className="flex-1"
              track={{ event: "wa_click", section: "hero" }}
            >
              {t("cta")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
