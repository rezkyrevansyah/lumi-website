import "server-only";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";

export interface TestimonialView {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  featured: boolean;
}

const loadTestimonials = unstable_cache(
  async (locale: "id" | "en") => {
    const rows = await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
    return rows.map((r): TestimonialView => ({
      id: r.id,
      name: r.name,
      role: locale === "en" ? r.roleEn : r.roleId,
      quote: r.quote,
      rating: r.rating,
      featured: r.featured,
    }));
  },
  ["testimonials-all"],
  { tags: ["testimonials"] }
);

export async function getTestimonials(locale: "id" | "en") {
  return loadTestimonials(locale);
}
