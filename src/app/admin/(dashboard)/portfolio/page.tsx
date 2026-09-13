import { asc } from "drizzle-orm";
import { db } from "@/db";
import { portfolioItems } from "@/db/schema";
import { PortfolioList } from "@/components/admin/portfolio/PortfolioList";

export default async function AdminPortfolioPage() {
  const rows = await db.select().from(portfolioItems).orderBy(asc(portfolioItems.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Portfolio</h1>
      <PortfolioList items={rows} />
    </div>
  );
}
