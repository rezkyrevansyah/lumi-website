import { asc } from "drizzle-orm";
import { db } from "@/db";
import { techStackCategories, techStackItems } from "@/db/schema";
import { TechStackEditor } from "@/components/admin/tech-stack/TechStackEditor";

export const dynamic = "force-dynamic";

export default async function AdminTechStackPage() {
  const categories = await db.select().from(techStackCategories).orderBy(asc(techStackCategories.sortOrder));
  const items = await db.select().from(techStackItems).orderBy(asc(techStackItems.sortOrder));
  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          Tumpukan Teknologi & Perkakas
        </h1>
        <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
          Kelola pustaka, framework, bahasa pemrograman, dan infrastruktur modern yang digunakan tim.
        </p>
      </div>
      <TechStackEditor categories={categories} items={items} />
    </div>
  );
}
