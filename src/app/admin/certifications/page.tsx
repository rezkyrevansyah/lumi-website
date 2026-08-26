export const dynamic = "force-dynamic";

import { getCertifications } from "@/actions/settings";
import CertificationList from "@/components/admin/certifications/CertificationList";

export default async function AdminCertificationsPage() {
  const items = await getCertifications();
  return (
    <div className="max-w-4xl mx-auto">
      <CertificationList initialItems={items} />
    </div>
  );
}
