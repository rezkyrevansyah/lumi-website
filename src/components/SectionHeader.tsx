import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  icon,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClasses =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClasses} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-3.5 py-1 text-xs font-semibold text-accent-800">
          {icon}
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="measure-paragraph text-base text-text-secondary md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
