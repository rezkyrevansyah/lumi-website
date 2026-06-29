import { TRUSTED_BRANDS } from "@/lib/data";

export default function TrustedBy() {
  const doubled = [...TRUSTED_BRANDS, ...TRUSTED_BRANDS];

  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 text-center">
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
            <div
              key={i}
              className="flex items-center mx-8 gap-2.5 text-gray-300 hover:text-[#2DD9A4] transition-colors"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#2DD9A4] opacity-50"
              />
              <span
                className="text-base font-semibold tracking-wide"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
