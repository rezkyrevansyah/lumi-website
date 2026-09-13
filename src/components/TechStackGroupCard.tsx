interface TechStackGroupCardProps {
  title: string;
  items: string[];
}

export function TechStackGroupCard({ title, items }: TechStackGroupCardProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-zinc-100 bg-background-subtle p-6 shadow-[0_2px_12px_rgba(24,24,27,0.03)]">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-500" />
        <h3 className="font-display text-base font-bold text-text-primary">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
