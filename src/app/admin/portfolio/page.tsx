import { getPortfolioItems } from "@/actions/portfolio";
import PortfolioTable from "@/components/admin/portfolio/PortfolioTable";

export default async function AdminPortfolioPage() {
  const items = await getPortfolioItems();
  return (
    <div className="max-w-5xl mx-auto">
      <PortfolioTable initialItems={items} />
    </div>
  );
}
