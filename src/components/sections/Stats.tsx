import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Stats() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: stats } = await supabase.from("stats").select("*").order("sort_order");
  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-gray-500 text-xs md:text-sm"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
