import Image from "next/image";

interface PortfolioCardProps {
  title: string;
  category: string;
  image: string;
  priority?: boolean;
}

export function PortfolioCard({ title, category, image, priority = false }: PortfolioCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="image-outline relative aspect-video w-full overflow-hidden">
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
      <div className="space-y-1 p-5">
        <span className="text-xs font-semibold text-accent-800">{category}</span>
        <h3 className="font-display text-lg font-bold text-text-primary">{title}</h3>
      </div>
    </div>
  );
}
