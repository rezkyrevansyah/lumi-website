"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  const pillClass = (active: boolean) =>
    `rounded-full px-3 py-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] ${
      active ? "bg-white text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
    }`;

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border bg-zinc-100 p-1 text-xs font-semibold">
      <Link href={pathname} locale="id" className={pillClass(locale === "id")}>
        ID
      </Link>
      <Link href={pathname} locale="en" className={pillClass(locale === "en")}>
        EN
      </Link>
    </div>
  );
}
