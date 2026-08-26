import { FolderKanban, MessageSquareQuote, Wrench, Building2 } from "lucide-react";
import StatCard from "@/components/admin/shared/StatCard";
import { db } from "@/db";
import { portfolioItems, testimonials, services, trustedBrands } from "@/db/schema";
import { sql } from "drizzle-orm";

export default async function QuickStats() {
  const [portfolioCount, testimonialsCount, servicesCount, brandsCount] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(portfolioItems),
    db.select({ count: sql<number>`count(*)::int` }).from(testimonials),
    db.select({ count: sql<number>`count(*)::int` }).from(services),
    db.select({ count: sql<number>`count(*)::int` }).from(trustedBrands),
  ]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Portfolio Items" value={portfolioCount[0]?.count ?? 0} icon={FolderKanban} color="#2DD9A4" />
      <StatCard label="Testimonials" value={testimonialsCount[0]?.count ?? 0} icon={MessageSquareQuote} color="#6C63FF" />
      <StatCard label="Services" value={servicesCount[0]?.count ?? 0} icon={Wrench} color="#3BB5C5" />
      <StatCard label="Trusted Brands" value={brandsCount[0]?.count ?? 0} icon={Building2} color="#F59E0B" />
    </div>
  );
}
