import { asc } from "drizzle-orm";
import { db } from "@/db";
import { clientLogos } from "@/db/schema";
import { ClientLogoList } from "@/components/admin/client-logos/ClientLogoList";

export const dynamic = "force-dynamic";

export default async function AdminClientLogosPage() {
  const rows = await db.select().from(clientLogos).orderBy(asc(clientLogos.sortOrder));
  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          Logo Klien & Mitra Bisnis
        </h1>
        <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
          Kelola aset logo mitra korporat dan pelaku UMKM yang ditampilkan di carousel beranda.
        </p>
      </div>
      <ClientLogoList items={rows} />
    </div>
  );
}
