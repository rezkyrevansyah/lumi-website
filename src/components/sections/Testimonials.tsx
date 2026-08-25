import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { TESTIMONIALS, type Testimonial } from "@/lib/data";
import TestimonialsMarquee from "./TestimonialsMarquee";

export default async function Testimonials() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("testimonials").select("*").order("sort_order");

  const dbItems: Testimonial[] = (data ?? []).map((row) => ({
    quote: row.quote,
    name: row.name,
    role: row.role,
    rating: row.rating,
  }));

  const hasAuthenticData = dbItems.some(
    (t) => t.name.includes("Winnie") || t.quote.includes("Revan") || t.name.includes("merdekapro")
  );
  const items: Testimonial[] = hasAuthenticData ? dbItems : TESTIMONIALS;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="text-center">
          <p className="section-tag mb-3">Kata Klien Kami</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#3D3E4A]"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Kenapa Mereka{" "}
            <span className="gradient-text">Percaya Kami</span>
          </h2>
        </div>
      </div>

      <TestimonialsMarquee items={items} />
    </section>
  );
}
