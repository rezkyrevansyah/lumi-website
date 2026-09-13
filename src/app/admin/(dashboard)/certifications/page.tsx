import { asc } from "drizzle-orm";
import { db } from "@/db";
import { certifications } from "@/db/schema";
import { CertificationList } from "@/components/admin/certifications/CertificationList";

export default async function AdminCertificationsPage() {
  const rows = await db.select().from(certifications).orderBy(asc(certifications.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Sertifikasi</h1>
      <CertificationList items={rows} />
    </div>
  );
}
