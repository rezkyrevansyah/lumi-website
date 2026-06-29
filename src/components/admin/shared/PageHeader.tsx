interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h2
          className="text-xl font-bold text-[#3D3E4A]"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          {title}
        </h2>
        {description && (
          <p
            className="text-sm text-muted-foreground mt-0.5"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
