import { asc } from "drizzle-orm";
import { db } from "@/db";
import { pricingTiers, pricingFeatures } from "@/db/schema";
import { PricingTierList } from "@/components/admin/pricing/PricingTierList";

export default async function AdminPricingPage() {
  const tiers = await db.select().from(pricingTiers).orderBy(asc(pricingTiers.sortOrder));
  const features = await db.select().from(pricingFeatures).orderBy(asc(pricingFeatures.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Paket & Harga</h1>
      <PricingTierList tiers={tiers} features={features} />
    </div>
  );
}
