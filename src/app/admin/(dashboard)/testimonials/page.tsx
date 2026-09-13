import { asc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { TestimonialList } from "@/components/admin/testimonials/TestimonialList";

export default async function AdminTestimonialsPage() {
  const rows = await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Testimoni</h1>
      <TestimonialList items={rows} />
    </div>
  );
}
