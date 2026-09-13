import { MessageCircle } from "lucide-react";

interface TestimonialPlaceholderProps {
  title: string;
  body: string;
}

export function TestimonialPlaceholder({ title, body }: TestimonialPlaceholderProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-background-subtle p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-800">
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl font-bold text-text-primary">{title}</h3>
      <p className="measure-paragraph text-sm text-text-secondary">{body}</p>
    </div>
  );
}
