import type { AdminBrand } from "@/lib/admin-data";
import Image from "next/image";

type BrandEntry = string | AdminBrand;

function BrandItem({ brand }: { brand: BrandEntry }) {
  const name = typeof brand === "string" ? brand : brand.name;
  const logoUrl = typeof brand === "object" ? brand.logoUrl : undefined;

  return (
    <div className="flex items-center mx-8 gap-4 group cursor-default">
      <span className="w-2 h-2 rounded-full bg-[#2DD9A4] opacity-50 shrink-0" />
      {logoUrl ? (
        <div className="flex items-center gap-3 bg-[#F8F9FB] px-4 py-2 rounded-xl border border-gray-100 group-hover:border-emerald-300 transition-all duration-300">
          <div className="relative h-9 w-28 sm:h-10 sm:w-36">
            <Image
              src={logoUrl}
              alt={name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <span
            className="text-sm font-bold text-[#101828] group-hover:text-[#0E8B62] transition-colors"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            {name}
          </span>
        </div>
      ) : (
        <span
          className="text-lg font-bold tracking-wide text-gray-400 group-hover:text-[#2DD9A4] transition-colors duration-300"
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
  const items: BrandEntry[] = brands ?? [];
  const doubled = [...items, ...items];

  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 text-center">
        <p
          className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          Dipercaya oleh Perusahaan, Instansi Pemerintah, &amp; Brand Ternama di Indonesia
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
