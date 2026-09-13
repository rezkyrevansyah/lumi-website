"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { trackWaClick, trackViewPricingClick, type WaClickSection } from "@/lib/analytics";

type TrackConfig =
  | { event: "wa_click"; section: WaClickSection }
  | { event: "view_pricing_click"; section: "hero" };

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  external?: boolean;
  className?: string;
  track?: TrackConfig;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-cta-solid text-white hover:bg-cta-solid-hover shadow-[0_4px_20px_rgba(24,24,27,0.15)] hover:shadow-lg",
  secondary:
    "bg-accent-700 text-white hover:bg-accent-800 shadow-sm",
  outline:
    "border border-border bg-white text-text-primary hover:bg-background-subtle shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
};

const BASE_CLASSES =
  "inline-flex h-11 min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]";

export function Button({
  href,
  children,
  variant = "primary",
  icon,
  iconPosition = "end",
  external = false,
  className = "",
  track,
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;
  const content = (
    <>
      {icon && iconPosition === "start" && icon}
      <span>{children}</span>
      {icon && iconPosition === "end" && icon}
    </>
  );

  const handleClick = track
    ? () => {
        if (track.event === "wa_click") {
          trackWaClick(track.section);
        } else {
          trackViewPricingClick(track.section);
        }
      }
    : undefined;

  const isExternal = external || href.startsWith("http") || href.startsWith("#");

  if (isExternal) {
    return (
      <a
        href={href}
        onClick={handleClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={classes}>
      {content}
    </Link>
  );
}
