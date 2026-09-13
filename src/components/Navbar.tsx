"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/Button";
import { buildWaLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { key: "portfolio", href: "/portfolio" },
  { key: "services", href: "/services" },
  { key: "pricelist", href: "/pricelist" },
  { key: "about", href: "/about" },
] as const;

const HERO_WA_MESSAGE =
  "Halo Lumi Beta Works, saya tertarik konsultasi gratis soal pembuatan website/app. Boleh dibantu?";

export function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile navigation drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open]);

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

        <nav aria-label="Main Navigation" className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] ${
                  isActive
                    ? "bg-accent-50/90 text-accent-800 font-semibold shadow-2xs"
                    : "font-medium text-text-secondary hover:bg-background-subtle hover:text-text-primary"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <div className="hidden sm:block">
            <Button
              href={buildWaLink(HERO_WA_MESSAGE)}
              external
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
            aria-controls="mobile-nav-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-background-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] xl:hidden"
          >
            <div className="relative h-6 w-6">
              <Menu
                className={`absolute inset-0 h-6 w-6 transition-all duration-200 ${
                  open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
                aria-hidden="true"
              />
              <X
                className={`absolute inset-0 h-6 w-6 transition-all duration-200 ${
                  open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                }`}
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav-menu"
          className="border-t border-border bg-background px-6 py-6 xl:hidden"
        >
          <nav className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-xl px-3.5 py-2.5 text-base transition-colors ${
                    isActive
                      ? "bg-accent-50/90 text-accent-800 font-semibold"
                      : "font-medium text-text-secondary hover:bg-background-subtle hover:text-text-primary"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-zinc-100 pt-4">
            <LanguageToggle />
            <Button
              href={buildWaLink(HERO_WA_MESSAGE)}
              external
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
