import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  color = "#2DD9A4",
  bgColor,
}: StatCardProps) {
  const bg = bgColor ?? `${color}18`;

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-5 flex items-center justify-between gap-4">
      <div>
        <p
          className="text-xs text-muted-foreground mb-1 uppercase tracking-wide font-semibold"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          {label}
        </p>
        <p
          className="text-2xl font-bold text-[#3D3E4A]"
          style={{ fontFamily: "var(--font-rubik)", color }}
        >
          {value}
        </p>
      </div>
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: bg }}
      >
        <Icon size={20} style={{ color }} />
      </div>
    </div>
  );
}
