import { TRUSTED_BRANDS } from "@/lib/data";
import type { AdminBrand } from "@/lib/admin-data";
import Image from "next/image";

// TrustedBy accepts either static strings (from data.ts) or AdminBrand objects with optional logo
type BrandEntry = string | AdminBrand;

function BrandItem({ brand }: { brand: BrandEntry }) {
  const name = typeof brand === "string" ? brand : brand.name;
  const logoUrl = typeof brand === "object" ? brand.logoUrl : undefined;

  return (
    <div className="flex items-center mx-10 gap-3 group cursor-default">
      <span className="w-2 h-2 rounded-full bg-[#2DD9A4] opacity-40 shrink-0" />
      {logoUrl ? (
        <div className="relative h-10 w-36 opacity-40 group-hover:opacity-80 transition-opacity duration-300 grayscale group-hover:grayscale-0">
          <Image
            src={logoUrl}
            alt={name}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      ) : (
        <span
          className="text-xl font-bold tracking-wide text-gray-300 group-hover:text-[#2DD9A4] transition-colors duration-300"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          {name}
        </span>
      )}
    </div>
  );
}

interface TrustedByProps {
  brands?: BrandEntry[];
}

export default function TrustedBy({ brands }: TrustedByProps) {
  const items: BrandEntry[] = brands ?? TRUSTED_BRANDS;
  const doubled = [...items, ...items];

  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 text-center">
        <p
          className="text-sm text-gray-400 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          Trusted by businesses &amp; institutions across Indonesia
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((brand, i) => (
            <BrandItem key={i} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
