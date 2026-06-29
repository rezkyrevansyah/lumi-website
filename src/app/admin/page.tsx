import QuickStats from "@/components/admin/dashboard/QuickStats";
import QuickLinks from "@/components/admin/dashboard/QuickLinks";
import ActivityFeed from "@/components/admin/dashboard/ActivityFeed";

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-5 flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #2DD9A4 0%, #6C63FF 100%)" }}
        >
          <span className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-rubik)" }}>L</span>
        </div>
        <div>
          <h2 className="text-base font-bold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
            Welcome back, Admin!
          </h2>
          <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
            Manage your website content from here. Changes are reflected live on the site.
          </p>
        </div>
      </div>

      {/* Stats */}
      <QuickStats />

      {/* Quick links + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickLinks />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
