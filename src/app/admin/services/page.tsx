import ServiceList from "@/components/admin/services/ServiceList";
import { ADMIN_SERVICES } from "@/lib/admin-data";

export default function AdminServicesPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <ServiceList initialItems={ADMIN_SERVICES} />
    </div>
  );
}
