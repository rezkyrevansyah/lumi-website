import { FolderKanban, MessageSquareQuote, Wrench, Building2 } from "lucide-react";
import StatCard from "@/components/admin/shared/StatCard";
import { ADMIN_PORTFOLIO, ADMIN_TESTIMONIALS, ADMIN_SERVICES, ADMIN_BRANDS } from "@/lib/admin-data";

export default function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Portfolio Items" value={ADMIN_PORTFOLIO.length} icon={FolderKanban} color="#2DD9A4" />
      <StatCard label="Testimonials" value={ADMIN_TESTIMONIALS.length} icon={MessageSquareQuote} color="#6C63FF" />
      <StatCard label="Services" value={ADMIN_SERVICES.length} icon={Wrench} color="#3BB5C5" />
      <StatCard label="Trusted Brands" value={ADMIN_BRANDS.length} icon={Building2} color="#F59E0B" />
    </div>
  );
}
