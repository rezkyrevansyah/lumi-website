import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import PortfolioTable from "@/components/admin/portfolio/PortfolioTable";
import { type AdminPortfolioItem } from "@/lib/admin-data";

export default async function AdminPortfolioPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("sort_order");

  const items: AdminPortfolioItem[] = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    client: row.client,
    category: row.category,
    description: row.description,
    tags: row.tags ?? [],
    platforms: row.platforms ?? [],
    color: row.color,
    bg: row.bg,
    imageUrl: row.image_url ?? undefined,
  }));

  return (
    <div className="max-w-5xl mx-auto">
      <PortfolioTable initialItems={items} />
    </div>
  );
}
