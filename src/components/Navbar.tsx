"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Menu,
  X,
  Briefcase,
  Layers,
  Receipt,
  Sparkles,
  Home,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/Button";
import { buildWaLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "portfolio", href: "/portfolio", icon: Briefcase },
  { key: "services", href: "/services", icon: Layers },
  { key: "pricelist", href: "/pricelist", icon: Receipt },
  { key: "about", href: "/about", icon: Sparkles },
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
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md transition-all">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-12">
          {/* Brand Logo (Left) */}
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

          {/* Centered Floating Tubelight Navbar (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center lg:flex"
          >
            <div className="flex items-center gap-1 rounded-full border border-border/80 bg-background/90 p-1.5 shadow-card backdrop-blur-lg">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
                      isActive
                        ? "text-accent-800"
                        : "text-text-secondary hover:bg-background-subtle/80 hover:text-text-primary"
                    )}
                  >
                    <Icon
                      size={16}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className={cn(
                        "transition-colors",
                        isActive ? "text-accent-700" : "text-text-muted"
                      )}
                    />
                    <span>{t(link.key)}</span>

                    {isActive && (
                      <motion.div
                        layoutId="tubelight-lamp-desktop"
                        className="absolute inset-0 -z-10 rounded-full bg-accent-50/90"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        {/* Tubelight Top Beam & Ambient Glow */}
                        <div className="absolute -top-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-accent-500">
                          <div className="absolute -left-2.5 -top-1.5 h-4 w-13 rounded-full bg-accent-500/25 blur-sm" />
                          <div className="absolute -left-1 -top-0.5 h-3 w-10 rounded-full bg-accent-500/35 blur-xs" />
                          <div className="absolute left-1 top-0 h-2 w-6 rounded-full bg-accent-500/40 blur-2xs" />
                        </div>
                      </motion.div>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right: Language Toggle & CTA */}
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
              className="flex h-11 w-11 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-background-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] lg:hidden"
            >
              <div className="relative h-6 w-6">
                <Menu
                  className={cn(
                    "absolute inset-0 h-6 w-6 transition-all duration-200",
                    open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                  )}
                  aria-hidden="true"
                />
                <X
                  className={cn(
                    "absolute inset-0 h-6 w-6 transition-all duration-200",
                    open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                  )}
                  aria-hidden="true"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Top Drawer */}
        {open && (
          <div
            id="mobile-nav-menu"
            className="border-t border-border bg-background px-6 py-6 lg:hidden"
          >
            <nav className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-base transition-colors",
                      isActive
                        ? "bg-accent-50/90 font-semibold text-accent-800"
                        : "font-medium text-text-secondary hover:bg-background-subtle hover:text-text-primary"
                    )}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-accent-700" : "text-text-muted"}
                    />
                    <span>{t(link.key)}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
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

      {/* Floating Tubelight Dock (Mobile / Tablet) */}
      {!open && (
        <div className="pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 lg:hidden">
          <nav
            aria-label="Mobile Navigation Dock"
            className="pointer-events-auto flex max-w-[calc(100vw-2rem)] items-center gap-1 rounded-full border border-border/80 bg-background/90 p-1.5 shadow-card-hover backdrop-blur-xl"
          >
            <Link
              href="/"
              className={cn(
                "relative flex flex-col items-center justify-center rounded-full p-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
                pathname === "/" || pathname === ""
                  ? "text-accent-800"
                  : "text-text-secondary hover:text-text-primary"
              )}
              aria-label="Home"
            >
              <Home
                size={18}
                strokeWidth={pathname === "/" || pathname === "" ? 2.3 : 1.8}
                className={
                  pathname === "/" || pathname === ""
                    ? "text-accent-700"
                    : "text-text-muted"
                }
              />
              {(pathname === "/" || pathname === "") && (
                <motion.div
                  layoutId="tubelight-lamp-mobile"
                  className="absolute inset-0 -z-10 rounded-full bg-accent-50/90"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-t-full bg-accent-500">
                    <div className="absolute -left-1.5 -top-1 h-3 w-8 rounded-full bg-accent-500/25 blur-xs" />
                  </div>
                </motion.div>
              )}
            </Link>

            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.key}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-full px-3 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
                    isActive
                      ? "font-semibold text-accent-800"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                  aria-label={t(link.key)}
                >
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.3 : 1.8}
                    className={isActive ? "text-accent-700" : "text-text-muted"}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="tubelight-lamp-mobile"
                      className="absolute inset-0 -z-10 rounded-full bg-accent-50/90"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-t-full bg-accent-500">
                        <div className="absolute -left-1.5 -top-1 h-3 w-9 rounded-full bg-accent-500/25 blur-xs" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
