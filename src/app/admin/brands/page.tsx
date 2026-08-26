import { getTrustedBrands } from "@/actions/settings";
import BrandManager from "@/components/admin/brands/BrandManager";
import PageHeader from "@/components/admin/shared/PageHeader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Client Logos & Trusted Brands | Admin Lumi",
};

export default async function AdminBrandsPage() {
  const brands = await getTrustedBrands();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="Client & Partner Logos"
        description="Kelola logo instansi, perusahaan, dan brand ternama yang ditampilkan di running marquee homepage."
      />
      <BrandManager initialBrands={brands} />
    </div>
  );
}
