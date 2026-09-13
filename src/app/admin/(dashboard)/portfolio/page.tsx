import { asc } from "drizzle-orm";
import { db } from "@/db";
import { portfolioItems } from "@/db/schema";
import { PortfolioList } from "@/components/admin/portfolio/PortfolioList";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const rows = await db.select().from(portfolioItems).orderBy(asc(portfolioItems.sortOrder));
  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          Portofolio Proyek
        </h1>
        <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
          Kelola galeri hasil karya rekayasa web, aplikasi, desain UI/UX, dan pengujian QA.
        </p>
      </div>
      <PortfolioList items={rows} />
    </div>
  );
}
