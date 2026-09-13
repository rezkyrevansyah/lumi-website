import { asc } from "drizzle-orm";
import { db } from "@/db";
import { pricingTiers, pricingFeatures } from "@/db/schema";
import { PricingTierList } from "@/components/admin/pricing/PricingTierList";

export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  const tiers = await db.select().from(pricingTiers).orderBy(asc(pricingTiers.sortOrder));
  const features = await db.select().from(pricingFeatures).orderBy(asc(pricingFeatures.sortOrder));
  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          Paket Investasi & Harga
        </h1>
        <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
          Konfigurasi harga, cakupan fitur, dan tombol CTA penawaran layanan bagi UMKM hingga skala enterprise.
        </p>
      </div>
      <PricingTierList tiers={tiers} features={features} />
    </div>
  );
}
