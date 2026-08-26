import Link from "next/link";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import type { PortfolioItem } from "@/lib/data";
import { getPortfolioItems } from "@/actions/portfolio";

export default async function Portfolio() {
  const dbItems = await getPortfolioItems();

  const projects: (PortfolioItem & { imageUrl?: string; demoUrl?: string })[] = dbItems
    .filter((p) => p.isPublished)
    .slice(0, 6)
    .map((row) => ({
      title: row.title,
      client: row.client,
      category: row.category,
      description: row.description,
      tags: (row.tags ?? []) as string[],
      platforms: (row.platforms ?? []) as ("web" | "android" | "ios")[],
      color: row.accentColor ?? "#2DD9A4",
      bg: row.bgColor ?? "#0F1923",
      imageUrl: row.imageUrl ?? undefined,
      demoUrl: row.demoUrl ?? undefined,
    }));

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-tag mb-3">Hasil Kerja Kami</p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D3E4A] mb-5"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            <span className="gradient-text">Proyek B2B &amp; Instansi</span> yang Kami Banggakan
          </h2>
          <p
            className="text-gray-500 text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            Portofolio karya nyata kami dalam melayani lembaga pemerintah, perusahaan retail, telekomunikasi, &amp; bisnis modern di Indonesia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {projects.map((proj, i) => (
            <PortfolioCard key={proj.title} proj={proj} index={i} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold border-2 border-[#2DD9A4] text-[#0E8B62] hover:bg-[#2DD9A4] hover:text-white transition-all duration-200 group"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Lihat Semua Proyek
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
