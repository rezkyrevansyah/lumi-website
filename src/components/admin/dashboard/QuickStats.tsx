import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { FolderKanban, MessageSquareQuote, Wrench, Building2 } from "lucide-react";
import StatCard from "@/components/admin/shared/StatCard";

export default async function QuickStats() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [portfolioResult, testimonialsResult, servicesResult, brandsResult] = await Promise.all([
    supabase.from("portfolio_items").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("trusted_brands").select("id", { count: "exact", head: true }),
  ]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Portfolio Items" value={portfolioResult.count ?? 0} icon={FolderKanban} color="#2DD9A4" />
      <StatCard label="Testimonials" value={testimonialsResult.count ?? 0} icon={MessageSquareQuote} color="#6C63FF" />
      <StatCard label="Services" value={servicesResult.count ?? 0} icon={Wrench} color="#3BB5C5" />
      <StatCard label="Trusted Brands" value={brandsResult.count ?? 0} icon={Building2} color="#F59E0B" />
    </div>
  );
}
