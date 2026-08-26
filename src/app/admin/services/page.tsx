import { getServices } from "@/actions/services";
import ServiceList from "@/components/admin/services/ServiceList";

export default async function AdminServicesPage() {
  const items = await getServices();
  return (
    <div className="max-w-5xl mx-auto">
      <ServiceList initialItems={items} />
    </div>
  );
}
