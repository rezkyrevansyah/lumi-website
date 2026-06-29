import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { SERVICES, type Service } from "@/lib/data";
import Services from "./Services";

export default async function ServicesSection() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("services").select("*").order("sort_order");

  const services: Service[] =
    data && data.length > 0
      ? data.map((row) => ({
          title: row.title,
          desc: row.description,
          tags: row.tags ?? [],
          iconPath: row.icon_path,
          iconType: row.icon_type as Service["iconType"],
        }))
      : SERVICES;

  return <Services services={services} />;
}
