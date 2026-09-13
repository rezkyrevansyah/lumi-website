import { Cloud, CloudCog, RefreshCw, Bug, Database, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  cloud: Cloud,
  "cloud-check": CloudCog,
  "refresh-cw": RefreshCw,
  bug: Bug,
  database: Database,
};

interface CertificationBadgeProps {
  icon: string;
  label: string;
}

export function CertificationBadge({ icon, label }: CertificationBadgeProps) {
  const Icon = ICONS[icon] ?? Cloud;

  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-zinc-200/60 bg-white p-3.5 text-center shadow-sm">
      <Icon className="h-[22px] w-[22px] text-zinc-700" aria-hidden="true" />
      <span className="mt-1 text-xs font-semibold text-text-primary">{label}</span>
    </div>
  );
}
