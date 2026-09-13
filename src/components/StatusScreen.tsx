import type { ReactNode } from "react";

interface StatusScreenAction {
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

interface StatusScreenProps {
  eyebrow: string;
  title: string;
  description: string;
  primary: StatusScreenAction;
  secondary?: StatusScreenAction;
  footnote?: ReactNode;
}

function ActionButton({ action, variant }: { action: StatusScreenAction; variant: "primary" | "outline" }) {
  const classes =
    variant === "primary"
      ? "inline-flex h-11 items-center justify-center rounded-full bg-[#18181B] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#27272A]"
      : "inline-flex h-11 items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-6 text-[15px] font-semibold text-[#18181B] transition-colors hover:bg-[#FAFAFA]";

  if (action.onClick) {
    return (
      <button type="button" onClick={action.onClick} className={classes}>
        {action.label}
      </button>
    );
  }

  return (
    <a
      href={action.href ?? "/"}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {action.label}
    </a>
  );
}

export function StatusScreen({ eyebrow, title, description, primary, secondary, footnote }: StatusScreenProps) {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-[#FFFFFF] px-6 py-24">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        {/* Plain anchor on purpose: error/not-found boundaries can render without router context, so this must work as a hard navigation. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="mb-8 inline-flex items-center gap-2">
          <span className="font-display text-2xl font-extrabold tracking-tight text-[#18181B]">lumi</span>
          <span className="h-2 w-2 rounded-full bg-[#10B981]" />
        </a>
        <span className="mb-4 inline-flex items-center rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-semibold text-[#065F46]">
          {eyebrow}
        </span>
        <h1 className="font-display text-3xl font-bold leading-tight text-[#18181B] sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[#52525B]">{description}</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <ActionButton action={primary} variant="primary" />
          {secondary && <ActionButton action={secondary} variant="outline" />}
        </div>
        {footnote && <div className="mt-6 text-xs text-[#71717A]">{footnote}</div>}
      </div>
    </div>
  );
}
