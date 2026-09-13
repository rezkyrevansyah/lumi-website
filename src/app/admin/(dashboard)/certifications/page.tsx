import { asc } from "drizzle-orm";
import { db } from "@/db";
import { certifications } from "@/db/schema";
import { CertificationList } from "@/components/admin/certifications/CertificationList";

export const dynamic = "force-dynamic";

export default async function AdminCertificationsPage() {
  const rows = await db.select().from(certifications).orderBy(asc(certifications.sortOrder));
  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          Sertifikasi & Kredensial Tim
        </h1>
        <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
          Kelola bukti kompetensi resmi dan akreditasi industri yang ditampilkan pada situs.
        </p>
      </div>
      <CertificationList items={rows} />
    </div>
  );
}
