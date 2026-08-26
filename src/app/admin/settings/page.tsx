export const dynamic = "force-dynamic";

import PageHeader from "@/components/admin/shared/PageHeader";
import StatsEditor from "@/components/admin/settings/StatsEditor";
import ContactEditor from "@/components/admin/settings/ContactEditor";
import HeroContentEditor from "@/components/admin/settings/HeroContentEditor";
import TrustedBrandsEditor from "@/components/admin/settings/TrustedBrandsEditor";
import { getStats, getTrustedBrands, getSetting } from "@/actions/settings";
import { type AdminContact, type AdminHeroBadge, type AdminActiveProject } from "@/lib/admin-data";

export default async function AdminSettingsPage() {
  const [stats, brands, contactRaw, badgesRaw, projectsRaw] = await Promise.all([
    getStats(),
    getTrustedBrands(),
    getSetting("contact"),
    getSetting("hero_badges"),
    getSetting("active_projects"),
  ]);

  const contact: AdminContact = (contactRaw as AdminContact) ?? { email: "", whatsapp: "" };

  const heroBadges: AdminHeroBadge[] = ((badgesRaw as Array<{ icon: string; label: string }>) ?? []).map(
    (b, i) => ({ id: String(i + 1), icon: b.icon, label: b.label })
  );

  const activeProjects: AdminActiveProject[] = (
    (projectsRaw as Array<{ name: string; type: string; progress: number; color: string }>) ?? []
  ).map((p, i) => ({ id: String(i + 1), ...p }));

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Site Settings"
        description="Manage global content: stats, contact info, hero section, and trusted brands."
      />
      <div className="bg-white rounded-2xl border border-border shadow-sm divide-y divide-border">
        <div className="p-6"><StatsEditor initialStats={stats} /></div>
        <div className="p-6"><ContactEditor initialContact={contact} /></div>
        <div className="p-6">
          <HeroContentEditor initialBadges={heroBadges} initialProjects={activeProjects} />
        </div>
        <div className="p-6"><TrustedBrandsEditor initialBrands={brands} /></div>
      </div>
    </div>
  );
}
