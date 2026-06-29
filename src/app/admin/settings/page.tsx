"use client";

import { Separator } from "@/components/ui/separator";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatsEditor from "@/components/admin/settings/StatsEditor";
import ContactEditor from "@/components/admin/settings/ContactEditor";
import HeroContentEditor from "@/components/admin/settings/HeroContentEditor";
import TrustedBrandsEditor from "@/components/admin/settings/TrustedBrandsEditor";
import {
  ADMIN_STATS,
  ADMIN_CONTACT,
  ADMIN_HERO_BADGES,
  ADMIN_ACTIVE_PROJECTS,
  ADMIN_BRANDS,
} from "@/lib/admin-data";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Site Settings"
        description="Manage global content: stats, contact info, hero section, and trusted brands."
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm divide-y divide-border">
        <div className="p-6">
          <StatsEditor initialStats={ADMIN_STATS} />
        </div>
        <div className="p-6">
          <ContactEditor initialContact={ADMIN_CONTACT} />
        </div>
        <div className="p-6">
          <HeroContentEditor
            initialBadges={ADMIN_HERO_BADGES}
            initialProjects={ADMIN_ACTIVE_PROJECTS}
          />
        </div>
        <div className="p-6">
          <TrustedBrandsEditor initialBrands={ADMIN_BRANDS} />
        </div>
      </div>
    </div>
  );
}
