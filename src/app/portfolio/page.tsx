import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import type { Metadata } from "next";
import { type PortfolioItem } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Lihat semua proyek website dan aplikasi yang telah dibangun Lumi Beta Works — dari UMKM, pemerintah, fintech, hingga edukasi di seluruh Indonesia.",
  alternates: { canonical: "https://lumibetaworks.id/portfolio" },
  openGraph: {
    title: "Portfolio — Lumi Beta Works",
    description:
      "Lihat semua proyek website dan aplikasi yang telah dibangun Lumi Beta Works di berbagai industri.",
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

  const projects: (PortfolioItem & { imageUrl?: string })[] = (portfolioResult.data ?? []).map((row) => ({
    title: row.title,
    client: row.client,
    category: row.category,
    description: row.description,
    tags: row.tags ?? [],
    platforms: row.platforms ?? [],
    color: row.color,
    bg: row.bg,
    imageUrl: row.image_url ?? undefined,
  }));

  const contact = contactResult.data?.value as { email?: string; whatsapp?: string } | null;
  const whatsapp = contact?.whatsapp ?? "62XXXXXXXXXX";

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
