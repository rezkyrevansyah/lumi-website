import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import TestimonialList from "@/components/admin/testimonials/TestimonialList";
import { type AdminTestimonial } from "@/lib/admin-data";

export default async function AdminTestimonialsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order");

  const items: AdminTestimonial[] = (data ?? []).map((row) => ({
    id: row.id,
    quote: row.quote,
    name: row.name,
    role: row.role,
    rating: row.rating,
  }));

  return (
    <div className="max-w-5xl mx-auto">
      <TestimonialList initialItems={items} />
    </div>
  );
}
