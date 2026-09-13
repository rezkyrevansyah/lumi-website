import Image from "next/image";

interface PortfolioCardProps {
  title: string;
  category: string;
  description?: string;
  image: string;
  priority?: boolean;
}

export function PortfolioCard({
  title,
  category,
  description,
  image,
  priority = false,
}: PortfolioCardProps) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <div>
        <div className="image-outline relative aspect-video w-full overflow-hidden bg-zinc-100">
          <Image
            src={image}
            alt={title}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2 p-5">
          <span className="inline-flex items-center rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-semibold text-accent-700">
            {category}
          </span>
          <h3 className="font-display text-lg font-bold text-text-primary">{title}</h3>
          {description && (
            <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
