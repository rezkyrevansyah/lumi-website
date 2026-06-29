import PortfolioTable from "@/components/admin/portfolio/PortfolioTable";
import { ADMIN_PORTFOLIO } from "@/lib/admin-data";

export default function AdminPortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <PortfolioTable initialItems={ADMIN_PORTFOLIO} />
    </div>
  );
}
