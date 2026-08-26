import type { Service } from "@/lib/data";
import Services from "./Services";
import { getServices } from "@/actions/services";

export default async function ServicesSection() {
  const data = await getServices();

  if (!data || data.length === 0) return null;

  const services: Service[] = data.map((row) => ({
    title: row.title,
    desc: row.shortDesc,
    tags: row.tags ?? [],
    iconPath: row.iconPath ?? "",
    iconType: (row.iconType ?? "path") as Service["iconType"],
  }));

  return <Services services={services} />;
}
