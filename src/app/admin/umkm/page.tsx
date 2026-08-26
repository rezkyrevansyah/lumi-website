import { getUmkmUseCases, getUmkmProcessSteps, getUmkmMarketStats, getUmkmWhyUs } from "@/actions/umkm";
import UmkmEditor from "@/components/admin/umkm/UmkmEditor";
import { type UmkmWhyUsItem } from "@/components/admin/umkm/WhyUsEditor";

export const dynamic = "force-dynamic";

export default async function AdminUmkmPage() {
  const [useCases, processSteps, marketStats, whyUs] = await Promise.all([
    getUmkmUseCases(),
    getUmkmProcessSteps(),
    getUmkmMarketStats(),
    getUmkmWhyUs(),
  ]);

  return (
    <UmkmEditor
      initialUseCases={useCases}
      initialProcessSteps={processSteps}
      initialMarketStats={marketStats}
      initialWhyUs={whyUs as UmkmWhyUsItem[] | null}
    />
  );
}
