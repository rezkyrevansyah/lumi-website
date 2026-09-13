import "server-only";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { clientLogos } from "@/db/schema";

export const getClientLogos = unstable_cache(
  async () => {
    const rows = await db.select().from(clientLogos).orderBy(asc(clientLogos.sortOrder));
    return rows.map((r) => ({ src: r.imagePath, alt: r.altText }));
  },
  ["client-logos-all"],
  { tags: ["client-logos"] }
);
