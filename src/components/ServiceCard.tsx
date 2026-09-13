import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-500/35 hover:shadow-card-hover select-none">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-800 transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-500 group-hover:text-white">
            <Icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-[-4deg]" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-text-muted opacity-0 -translate-x-2 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-accent-50 group-hover:text-accent-800">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-display text-lg font-bold text-text-primary transition-colors group-hover:text-accent-800">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-text-secondary">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
