import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ServiceList from "@/components/admin/services/ServiceList";
import { type AdminService } from "@/lib/admin-data";

export default async function AdminServicesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");

  const items: AdminService[] = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    desc: row.description,
    tags: row.tags ?? [],
    iconPath: row.icon_path,
    iconType: row.icon_type as "path" | "polylines" | "circle-clock" | "home",
  }));

  return (
    <div className="max-w-5xl mx-auto">
      <ServiceList initialItems={items} />
    </div>
  );
}
