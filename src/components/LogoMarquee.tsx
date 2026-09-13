import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

interface ClientLogo {
  src: string;
  alt: string;
}

export function LogoMarquee({ logos }: { logos: ClientLogo[] }) {
  // Repeating logos ensures each track spans > 4500px, completely covering any screen resolution up to 4K
  const repeatedLogos = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <InfiniteSlider gap={56} duration={110}>
        {repeatedLogos.map((logo, idx) => (
          <div
            key={`${logo.alt}-${idx}`}
            className="flex h-10 w-28 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105 sm:h-12 sm:w-32"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={128}
              height={48}
              unoptimized
              loading="eager"
              className="max-h-full w-auto max-w-full object-contain pointer-events-none"
            />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}

