import { cn } from "@/lib/utils";

interface TagBadgeProps {
  label: string;
  color?: string;
  className?: string;
}

export default function TagBadge({ label, color, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
        className
      )}
      style={
        color
          ? { background: `${color}18`, color, borderColor: `${color}30` }
          : undefined
      }
    >
      {label}
    </span>
  );
}
