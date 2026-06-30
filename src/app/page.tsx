import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Lumi Beta Works — Jasa Pembuatan Website & Aplikasi Terpercaya",
  description:
    "Jasa pembuatan website dan aplikasi profesional untuk UMKM, bisnis, restoran, klinik, dan sekolah. Harga terjangkau, hasil berkualitas, tepat waktu. Konsultasi gratis!",
  alternates: { canonical: "https://lumibetaworks.id" },
  openGraph: {
    url: "https://lumibetaworks.id",
    title: "Lumi Beta Works — Jasa Pembuatan Website & Aplikasi Terpercaya",
    description:
      "Jasa pembuatan website dan aplikasi profesional untuk UMKM, bisnis, restoran, klinik, dan sekolah. Harga terjangkau, hasil berkualitas, tepat waktu.",
  },
};
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import ServicesSection from "@/components/sections/ServicesSection";
import Portfolio from "@/components/sections/Portfolio";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import { type AdminBrand } from "@/lib/admin-data";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [brandsResult, settingsResult] = await Promise.all([
    supabase.from("trusted_brands").select("*").order("sort_order"),
    supabase.from("site_settings").select("key, value"),
  ]);

  const brands: AdminBrand[] = (brandsResult.data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    logoUrl: row.logo_url ?? undefined,
  }));

  const settingsMap: Record<string, unknown> = {};
  for (const row of settingsResult.data ?? []) {
    settingsMap[row.key] = row.value;
  }

  const contact = settingsMap["contact"] as { email?: string; whatsapp?: string } | null;
  const whatsapp = contact?.whatsapp ?? "";

  const heroBadgesRaw = settingsMap["hero_badges"] as Array<{ icon: string; label: string }> | undefined;
  const badges = heroBadgesRaw ?? [];

  const activeProjectsRaw = settingsMap["active_projects"] as Array<{
    name: string; type: string; progress: number; color: string;
  }> | undefined;
  const activeProjects = activeProjectsRaw ?? [];

  return (
    <>
      <BackgroundBlobs />
      <Navbar />
      <main>
        <Hero badges={badges} activeProjects={activeProjects} />
        <TrustedBy brands={brands} />
        <ServicesSection />
        <Portfolio />
        <Stats />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWA whatsapp={whatsapp} />
    </>
  );
}
