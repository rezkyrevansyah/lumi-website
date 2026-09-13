import type { ComponentType } from "react";

interface ServiceCardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-white p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-800 transition-colors group-hover:bg-cta-solid group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-bold text-text-primary">{title}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}
