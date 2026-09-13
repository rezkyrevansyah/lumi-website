export interface PricingTier {
  key: "landing" | "custom" | "enterprise";
  highlighted: boolean;
  priceType: "fixed" | "range" | "custom";
  waSection: "pricing_entry" | "pricing_custom";
}

export const pricingTiers: PricingTier[] = [
  { key: "landing", highlighted: true, priceType: "fixed", waSection: "pricing_entry" },
  { key: "custom", highlighted: false, priceType: "range", waSection: "pricing_custom" },
  { key: "enterprise", highlighted: false, priceType: "custom", waSection: "pricing_custom" },
];
