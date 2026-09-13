import "server-only";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { techStackCategories, techStackItems } from "@/db/schema";

export const getTechStackGroups = unstable_cache(
  async (locale: "id" | "en") => {
    const categories = await db
      .select()
      .from(techStackCategories)
      .orderBy(asc(techStackCategories.sortOrder));
    const items = await db.select().from(techStackItems).orderBy(asc(techStackItems.sortOrder));

    return categories.map((cat) => ({
      key: cat.key,
      label: locale === "en" ? cat.labelEn : cat.labelId,
      items: items.filter((i) => i.categoryId === cat.id).map((i) => i.name),
    }));
  },
  ["tech-stack-all"],
  { tags: ["tech-stack"] }
);
