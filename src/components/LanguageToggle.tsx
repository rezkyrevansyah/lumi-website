"use client";

import { useTransition, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const targetScrollYRef = useRef<number | null>(null);

  // Restore scroll position after React commits the new locale DOM
  useEffect(() => {
    if (targetScrollYRef.current !== null) {
      const top = targetScrollYRef.current;
      window.scrollTo({ top, behavior: "instant" });
      targetScrollYRef.current = null;
    }
  }, [locale]);

  const handleSwitch = (nextLocale: "id" | "en") => {
    if (locale === nextLocale || isPending) return;

    if (typeof window !== "undefined") {
      targetScrollYRef.current = window.scrollY;
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  const pillClass = (active: boolean) =>
    `cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] disabled:opacity-50 ${
      active
        ? "bg-white text-text-primary shadow-sm"
        : "text-text-secondary hover:text-text-primary"
    }`;

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="flex items-center gap-0.5 rounded-full border border-border bg-zinc-100 p-1 text-xs font-semibold"
    >
      <button
        type="button"
        onClick={() => handleSwitch("id")}
        disabled={isPending}
        aria-pressed={locale === "id"}
        className={pillClass(locale === "id")}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => handleSwitch("en")}
        disabled={isPending}
        aria-pressed={locale === "en"}
        className={pillClass(locale === "en")}
      >
        EN
      </button>
    </div>
  );
}
