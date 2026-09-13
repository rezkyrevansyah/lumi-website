import Image from "next/image";
import type { Certification } from "@/data/techStack";

interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const { logo, alt } = certification;

  return (
    <div className="group relative flex h-28 sm:h-36 w-full items-center justify-center rounded-2xl border border-border/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-card-hover select-none">
      <div className="relative h-14 sm:h-18 w-full max-w-[200px]">
        <Image
          src={logo}
          alt={alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

// Backward compatibility
export const CertificationBadge = CertificationCard;
