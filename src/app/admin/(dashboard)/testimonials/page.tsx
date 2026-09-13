import { asc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { TestimonialList } from "@/components/admin/testimonials/TestimonialList";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const rows = await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          Ulasan & Testimoni Klien
        </h1>
        <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
          Kelola bukti kepuasan nyata dari klien dan mitra UMKM untuk membangun kepercayaan publik.
        </p>
      </div>
      <TestimonialList items={rows} />
    </div>
  );
}
