import { asc } from "drizzle-orm";
import { db } from "@/db";
import { techStackCategories, techStackItems } from "@/db/schema";
import { TechStackEditor } from "@/components/admin/tech-stack/TechStackEditor";

export default async function AdminTechStackPage() {
  const categories = await db.select().from(techStackCategories).orderBy(asc(techStackCategories.sortOrder));
  const items = await db.select().from(techStackItems).orderBy(asc(techStackItems.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Teknologi</h1>
      <TechStackEditor categories={categories} items={items} />
    </div>
  );
}
