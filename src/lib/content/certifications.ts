import "server-only";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { certifications } from "@/db/schema";

export const getCertifications = unstable_cache(
  async () => {
    const rows = await db.select().from(certifications).orderBy(asc(certifications.sortOrder));
    return rows.map((r) => ({
      id: r.id,
      key: r.key,
      name: r.name,
      logo: r.imagePath,
      alt: r.altText,
    }));
  },
  ["certifications-all"],
  { tags: ["certifications"] }
);
