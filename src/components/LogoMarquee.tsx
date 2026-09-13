import Image from "next/image";
import type { ClientLogo } from "@/data/clientLogos";

export function LogoMarquee({ logos }: { logos: ClientLogo[] }) {
  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <div className="animate-marquee gap-10">
        {[0, 1].map((dup) => (
          <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center gap-10 pr-10">
            {logos.map((logo, i) => (
              <div
                key={`${dup}-${logo.alt}-${i}`}
                className="relative h-8 w-28 shrink-0 sm:h-10 sm:w-32"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="128px"
                  className="object-contain opacity-70 grayscale transition-opacity hover:opacity-100"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
