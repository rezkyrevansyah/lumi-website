import { Check } from "lucide-react";
import { Button } from "@/components/Button";
import type { WaClickSection } from "@/lib/analytics";

interface PricingCardProps {
  highlighted?: boolean;
  badge?: string;
  label: string;
  name: string;
  pricePrefix: string;
  price: string;
  tagline: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant?: "primary" | "secondary" | "outline";
  trackSection?: WaClickSection;
}

export function PricingCard({
  highlighted = false,
  badge,
  label,
  name,
  pricePrefix,
  price,
  tagline,
  features,
  ctaLabel,
  ctaHref,
  ctaVariant = "primary",
  trackSection,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex h-full flex-col justify-between rounded-3xl p-8 transition-all hover:-translate-y-1 ${
        highlighted
          ? "border-2 border-accent-500 bg-white shadow-[0_12px_40px_rgba(16,185,129,0.12)]"
          : "border border-zinc-200 bg-white shadow-card hover:shadow-card-hover"
      }`}
    >
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-500 px-4 py-1 text-xs font-bold tracking-wide text-white shadow-sm">
          {badge}
        </div>
      )}
      <div className="space-y-6 pt-2">
        <div className="space-y-1">
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              highlighted ? "text-accent-800" : "text-text-secondary"
            }`}
          >
            {label}
          </span>
          <h3 className="font-display text-2xl font-bold text-text-primary">{name}</h3>
          <p className="text-xs text-text-secondary">{tagline}</p>
        </div>
        <div className="border-y border-zinc-100 py-3">
          <span className="text-xs text-text-secondary">{pricePrefix}</span>
          <div className="mt-0.5 flex items-baseline gap-1">
            <span className="font-display text-3xl font-extrabold text-text-primary sm:text-4xl">
              {price}
            </span>
          </div>
        </div>
        <ul className="space-y-3 text-sm text-zinc-700">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-8">
        <Button
          href={ctaHref}
          external
          variant={ctaVariant}
          track={trackSection ? { event: "wa_click", section: trackSection } : undefined}
          className="w-full"
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
