import { asc } from "drizzle-orm";
import { db } from "@/db";
import { clientLogos } from "@/db/schema";
import { ClientLogoList } from "@/components/admin/client-logos/ClientLogoList";

export default async function AdminClientLogosPage() {
  const rows = await db.select().from(clientLogos).orderBy(asc(clientLogos.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Logo Klien</h1>
      <ClientLogoList items={rows} />
    </div>
  );
}
