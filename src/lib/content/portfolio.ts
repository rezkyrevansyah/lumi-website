import "server-only";
import { unstable_cache } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { portfolioItems } from "@/db/schema";

export const getPortfolioItems = unstable_cache(
  async (locale: "id" | "en") => {
    const rows = await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.isPublished, true))
      .orderBy(asc(portfolioItems.sortOrder));
    return rows.map((r) => ({
      slug: String(r.id),
      title: locale === "en" ? r.titleEn : r.titleId,
      description: locale === "en" ? r.descriptionEn : r.descriptionId,
      category: r.category,
      image: r.imagePath,
      featured: r.featured,
    }));
  },
  ["portfolio-items-all"],
  { tags: ["portfolio"] }
);
