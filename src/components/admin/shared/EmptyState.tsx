import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#F8F9FB] border border-border flex items-center justify-center mb-4">
        <Icon size={24} className="text-muted-foreground" />
      </div>
      <h3
        className="text-base font-semibold text-[#3D3E4A] mb-1"
        style={{ fontFamily: "var(--font-rubik)" }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="text-sm text-muted-foreground max-w-xs"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
