import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import type { Metadata } from "next";
import { PORTFOLIO, type PortfolioItem } from "@/lib/data";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Portofolio Proyek & Studi Kasus Rekayasa IT | Lumi Beta Works",
  description:
    "Eksplorasi portofolio rekayasa website corporate, portal instansi pemerintah (BAZNAS, Kemenparekraf), platform e-commerce (Erafone), mobile app, dan QA testing enterprise terpercaya.",
  keywords: [
    "portofolio vendor it",
    "studi kasus software house",
    "jasa buat website perusahaan",
    "vendor aplikasi mobile instansi",
    "portofolio qa testing",
    "vendor web baznas",
    "vendor it erafone",
    "lumi beta works portfolio",
  ],
  alternates: { canonical: "https://lumibetaworks.id/portfolio" },
  openGraph: {
    title: "Portofolio Proyek & Studi Kasus Rekayasa IT | Lumi Beta Works",
    description:
      "Studi kasus nyata rekayasa website korporat, aplikasi mobile enterprise, dan pengujian software QA testing skala nasional oleh Lumi Beta Works.",
    url: "https://lumibetaworks.id/portfolio",
    type: "website",
    images: [
      {
        url: "https://lumibetaworks.id/og-portfolio.png",
        width: 1200,
        height: 630,
        alt: "Portofolio Proyek Lumi Beta Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portofolio Proyek & Studi Kasus Rekayasa IT | Lumi Beta Works",
    description:
      "Rekam jejak pembuatan website corporate, aplikasi mobile skala nasional, dan QA testing enterprise untuk stabilitas sistem optimal.",
  },
};

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [portfolioResult, contactResult] = await Promise.all([
    supabase.from("portfolio_items").select("*").order("sort_order"),
    supabase.from("site_settings").select("value").eq("key", "contact").single(),
  ]);

  const dbProjects: (PortfolioItem & { imageUrl?: string; demoUrl?: string })[] = (portfolioResult.data ?? []).map(
    (row) => ({
      title: row.title,
      client: row.client,
      category: row.category,
      description: row.description,
      tags: row.tags ?? [],
      platforms: row.platforms ?? [],
      color: row.color ?? "#2DD9A4",
      bg: row.bg ?? "#0F1923",
      imageUrl: row.image_url ?? undefined,
      demoUrl: row.demo_url ?? undefined,
    })
  );

  const hasMigratedData = dbProjects.some(
    (p) => p.title.includes("BAZNAS") || p.title.includes("EKRAF") || p.title.includes("Erafone")
  );
  const projects = hasMigratedData ? dbProjects : PORTFOLIO;

  const contact = contactResult.data?.value as { email?: string; whatsapp?: string } | null;
  const whatsapp = contact?.whatsapp ?? "62882015884006";

  // JSON-LD Structured Data for World-Class Technical SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://lumibetaworks.id/portfolio#webpage",
        "url": "https://lumibetaworks.id/portfolio",
        "name": "Portofolio Proyek & Studi Kasus Rekayasa IT | Lumi Beta Works",
        "description":
          "Portofolio rekayasa website corporate, aplikasi mobile skala nasional, dan QA testing enterprise oleh Lumi Beta Works.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://lumibetaworks.id/#website",
          "name": "Lumi Beta Works",
          "url": "https://lumibetaworks.id",
        },
        "breadcrumb": {
          "@id": "https://lumibetaworks.id/portfolio#breadcrumb",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://lumibetaworks.id/portfolio#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://lumibetaworks.id",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Portofolio",
            "item": "https://lumibetaworks.id/portfolio",
          },
        ],
      },
      {
        "@type": "ItemList",
        "name": "Daftar Portofolio Proyek Lumi Beta Works",
        "itemListElement": projects.slice(0, 12).map((item, index) => ({
          "@type": "CreativeWork",
          "position": index + 1,
          "name": item.title,
          "headline": `${item.title} - ${item.client}`,
          "description": item.description,
          "creator": {
            "@type": "Organization",
            "name": "Lumi Beta Works",
          },
          "keywords": item.tags.join(", "),
        })),
      },
    ],
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackgroundBlobs />
      <Navbar />
      <main>
        <PortfolioPage projects={projects} />
      </main>
      <Footer />
      <FloatingWA whatsapp={whatsapp} />
    </>
  );
}
