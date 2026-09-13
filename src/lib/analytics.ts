"use client";

import { sendGAEvent } from "@next/third-parties/google";

export type WaClickSection =
  | "hero"
  | "about"
  | "pricing_entry"
  | "pricing_custom"
  | "pricelist"
  | "final_cta";

export function trackWaClick(section: WaClickSection) {
  sendGAEvent("event", "wa_click", { section });
}

export function trackViewPricingClick(section: "hero") {
  sendGAEvent("event", "view_pricing_click", { section });
}
