import { Plus, Pencil, Trash2, Settings } from "lucide-react";
import { MOCK_ACTIVITY, type ActivityItem } from "@/lib/admin-data";

const ICONS = {
  add: { icon: Plus, color: "#2DD9A4", bg: "#2DD9A418" },
  edit: { icon: Pencil, color: "#6C63FF", bg: "#6C63FF18" },
  delete: { icon: Trash2, color: "#EF4444", bg: "#EF444418" },
  settings: { icon: Settings, color: "#F59E0B", bg: "#F59E0B18" },
};

function ActivityRow({ item }: { item: ActivityItem }) {
  const { icon: Icon, color, bg } = ICONS[item.type];
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
        <Icon size={15} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#3D3E4A] font-medium" style={{ fontFamily: "var(--font-opensans)" }}>
          {item.action}
        </p>
        <p className="text-xs text-muted-foreground truncate" style={{ fontFamily: "var(--font-opensans)" }}>
          {item.item}
        </p>
      </div>
      <p className="text-xs text-muted-foreground shrink-0" style={{ fontFamily: "var(--font-opensans)" }}>
        {item.time}
      </p>
    </div>
  );
}

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
      <h3 className="text-sm font-semibold text-[#3D3E4A] mb-1" style={{ fontFamily: "var(--font-rubik)" }}>
        Recent Activity
      </h3>
      <p className="text-xs text-muted-foreground mb-4" style={{ fontFamily: "var(--font-opensans)" }}>
        Latest changes to site content
      </p>
      <div className="divide-y divide-border">
        {MOCK_ACTIVITY.map((item) => (
          <ActivityRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
