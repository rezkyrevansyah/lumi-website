import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Service } from "@/lib/data";
import Services from "./Services";

export default async function ServicesSection() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("services").select("*").order("sort_order");

  if (!data || data.length === 0) return null;

  const services: Service[] = data.map((row) => ({
    title: row.title,
    desc: row.description,
    tags: row.tags ?? [],
    iconPath: row.icon_path,
    iconType: row.icon_type as Service["iconType"],
  }));

  return <Services services={services} />;
}
