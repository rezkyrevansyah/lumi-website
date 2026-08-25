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
  title: "Portofolio Proyek & Klien B2B | Lumi Beta Works",
  description:
    "Portofolio resmi Lumi Beta Works meliputi BAZNAS RI, Kemenparekraf RI, Erafone (Erajaya), Tower Bersama Group, TerraScan AI, Yoonjae Space, Masjid Al-Arqam, dan puluhan proyek lainnya.",
  alternates: { canonical: "https://lumibetaworks.id/portfolio" },
  openGraph: {
    title: "Portofolio Proyek & Klien B2B | Lumi Beta Works",
    description:
      "Daftar portofolio pembuatan website corporate, aplikasi mobile enterprise, & pengujian QA testing Lumi Beta Works.",
    url: "https://lumibetaworks.id/portfolio",
  },
};

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [portfolioResult, contactResult] = await Promise.all([
    supabase.from("portfolio_items").select("*").order("sort_order"),
    supabase.from("site_settings").select("value").eq("key", "contact").single(),
  ]);

  const dbProjects: (PortfolioItem & { imageUrl?: string; demoUrl?: string })[] = (portfolioResult.data ?? []).map((row) => ({
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
  }));

  const hasMigratedData = dbProjects.some((p) => p.title.includes("BAZNAS") || p.title.includes("EKRAF") || p.title.includes("Erafone"));
  const projects = hasMigratedData ? dbProjects : PORTFOLIO;

  const contact = contactResult.data?.value as { email?: string; whatsapp?: string } | null;
  const whatsapp = contact?.whatsapp ?? "62882015884006";

  return (
    <>
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
