import type { AdminBrand } from "@/lib/admin-data";
import Image from "next/image";

type BrandEntry = string | AdminBrand;

const SCALE_PILLS = [
  { label: "UMKM & Bisnis Lokal", dotColor: "#2DD9A4" },
  { label: "Startup & Bisnis Berkembang", dotColor: "#3BB5C5" },
  { label: "Korporasi & Instansi", dotColor: "#6C63FF" },
];

function BrandItem({ brand }: { brand: BrandEntry }) {
  const name = typeof brand === "string" ? brand : brand.name;
  const logoUrl = typeof brand === "object" ? brand.logoUrl : undefined;

  return (
    <div className="mx-2.5 sm:mx-3.5 group cursor-default shrink-0">
      <div className="h-16 sm:h-20 w-44 sm:w-56 px-5 py-3 rounded-2xl bg-white border border-gray-200/70 shadow-2xs hover:shadow-md hover:border-emerald-300/80 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center">
        {logoUrl ? (
          <div className="relative w-full h-full opacity-75 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src={logoUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 160px, 220px"
              className="object-contain"
              unoptimized
            />
          </div>
        ) : (
          <span
            className="text-sm sm:text-base font-bold text-gray-500 group-hover:text-[#101828] transition-colors truncate px-2"
            style={{ fontFamily: "var(--font-rubik)" }}
            title={name}
          >
            {name}
          </span>
        )}
      </div>
    </div>
  );
}

interface TrustedByProps {
  brands?: BrandEntry[];
}

export default function TrustedBy({ brands }: TrustedByProps) {
  const items: BrandEntry[] = brands ?? [];

  if (items.length === 0) return null;

  // Duplicate items enough times so marquee loops seamlessly without gaps
  let marqueeItems = items;
  while (marqueeItems.length < 14) {
    marqueeItems = [...marqueeItems, ...items];
  }
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <section className="py-16 sm:py-20 bg-[#F8F9FB]/60 border-y border-gray-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center mb-10 sm:mb-12">
        <span className="section-tag mb-3 inline-block">Kepercayaan Klien</span>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101828] tracking-tight leading-snug mb-3"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          Dipercaya Pelaku Usaha Kecil hingga{" "}
          <span className="gradient-text">Perusahaan Besar</span>
        </h2>
        <p
          className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          Mulai dari UMKM, bisnis berkembang, hingga instansi dan korporasi. Kami memberikan komitmen kualitas dan pendampingan yang sama untuk setiap skala proyek.
        </p>

        {/* Subtle Scale Micro-Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5">
          {SCALE_PILLS.map((pill) => (
            <div
              key={pill.label}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/80 text-xs font-medium text-gray-600 shadow-2xs"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: pill.dotColor }}
              />
              <span>{pill.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Track with Smooth Left & Right Edge Fades */}
      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex animate-marquee whitespace-nowrap py-2 hover:[animation-play-state:paused]">
          {doubled.map((brand, i) => (
            <BrandItem key={i} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
