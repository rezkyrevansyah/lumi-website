import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatsEditor from "@/components/admin/settings/StatsEditor";
import ContactEditor from "@/components/admin/settings/ContactEditor";
import HeroContentEditor from "@/components/admin/settings/HeroContentEditor";
import TrustedBrandsEditor from "@/components/admin/settings/TrustedBrandsEditor";
import {
  type AdminStat,
  type AdminContact,
  type AdminHeroBadge,
  type AdminActiveProject,
  type AdminBrand,
  ADMIN_CONTACT,
  ADMIN_HERO_BADGES,
  ADMIN_ACTIVE_PROJECTS,
} from "@/lib/admin-data";

export default async function AdminSettingsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [statsResult, brandsResult, settingsResult] = await Promise.all([
    supabase.from("stats").select("*").order("sort_order"),
    supabase.from("trusted_brands").select("*").order("sort_order"),
    supabase.from("site_settings").select("*"),
  ]);

  const stats: AdminStat[] = (statsResult.data ?? []).map((row) => ({
    id: row.id,
    value: row.value,
    label: row.label,
  }));

  const brands: AdminBrand[] = (brandsResult.data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    logoUrl: row.logo_url ?? undefined,
  }));

  const settingsMap: Record<string, unknown> = {};
  for (const row of settingsResult.data ?? []) {
    settingsMap[row.key] = row.value;
  }

  const contact: AdminContact = (settingsMap["contact"] as AdminContact) ?? ADMIN_CONTACT;

  const heroBadgesRaw = settingsMap["hero_badges"] as Array<{ icon: string; label: string }> | undefined;
  const heroBadges: AdminHeroBadge[] = heroBadgesRaw
    ? heroBadgesRaw.map((b, i) => ({ id: String(i + 1), icon: b.icon, label: b.label }))
    : ADMIN_HERO_BADGES;

  const activeProjectsRaw = settingsMap["active_projects"] as Array<{
    name: string; type: string; progress: number; color: string;
  }> | undefined;
  const activeProjects: AdminActiveProject[] = activeProjectsRaw
    ? activeProjectsRaw.map((p, i) => ({ id: String(i + 1), ...p }))
    : ADMIN_ACTIVE_PROJECTS;

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Site Settings"
        description="Manage global content: stats, contact info, hero section, and trusted brands."
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm divide-y divide-border">
        <div className="p-6">
          <StatsEditor initialStats={stats} />
        </div>
        <div className="p-6">
          <ContactEditor initialContact={contact} />
        </div>
        <div className="p-6">
          <HeroContentEditor
            initialBadges={heroBadges}
            initialProjects={activeProjects}
          />
        </div>
        <div className="p-6">
          <TrustedBrandsEditor initialBrands={brands} />
        </div>
      </div>
    </div>
  );
}
