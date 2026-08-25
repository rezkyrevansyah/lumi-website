import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Vendor IT Perusahaan & Jasa Buat Website Terpercaya — Lumi Beta Works",
  description:
    "Vendor IT Perusahaan & Instansi terpercaya. Jasa pembuatan website perusahaan, aplikasi mobile, QA testing, dan konsultasi IT berkualitas & terjangkau. Konsultasi gratis!",
  alternates: { canonical: "https://lumibetaworks.id" },
  openGraph: {
    url: "https://lumibetaworks.id",
    title: "Vendor IT Perusahaan & Jasa Buat Website Professional — Lumi Beta Works",
    description:
      "Mitra Vendor IT & Software House profesional untuk Perusahaan, Instansi, & Bisnis Berkembang di Indonesia.",
  },
};
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import AboutIntro from "@/components/sections/AboutIntro";
import TrustedBy from "@/components/sections/TrustedBy";
import ServicesSection from "@/components/sections/ServicesSection";
import Portfolio from "@/components/sections/Portfolio";
import CertificationsSection from "@/components/sections/CertificationsSection";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import { ADMIN_BRANDS, type AdminBrand } from "@/lib/admin-data";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [brandsResult, settingsResult] = await Promise.all([
    supabase.from("trusted_brands").select("*").order("sort_order"),
    supabase.from("site_settings").select("key, value"),
  ]);

  const dbBrands: AdminBrand[] = (brandsResult.data ?? []).map((row) => {
    const local = ADMIN_BRANDS.find(
      (b) =>
        b.name.toLowerCase() === row.name.toLowerCase() ||
        row.name.toLowerCase().includes(b.name.toLowerCase()) ||
        b.name.toLowerCase().includes(row.name.toLowerCase())
    );
    return {
      id: row.id,
      name: row.name,
      logoUrl: row.logo_url ?? local?.logoUrl ?? undefined,
    };
  });

  // Combine DB brands with local ADMIN_BRANDS (ensuring Erafone & Masjid Al-Arqam are always present)
  const combinedBrands = [...dbBrands];
  for (const adminB of ADMIN_BRANDS) {
    const exists = combinedBrands.some((b) =>
      b.name.toLowerCase().includes(adminB.name.toLowerCase()) ||
      adminB.name.toLowerCase().includes(b.name.toLowerCase())
    );
    if (!exists) {
      combinedBrands.push(adminB);
    }
  }

  const brands = combinedBrands.length > 0 ? combinedBrands : ADMIN_BRANDS;

  const settingsMap: Record<string, unknown> = {};
  for (const row of settingsResult.data ?? []) {
    settingsMap[row.key] = row.value;
  }

  const contact = settingsMap["contact"] as { email?: string; whatsapp?: string } | null;
  const whatsapp = contact?.whatsapp || "62882015884006";

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
        <AboutIntro />
        <TrustedBy brands={brands} />
        <ServicesSection />
        <Portfolio />
        <CertificationsSection />
        <Stats />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWA whatsapp={whatsapp} />
    </>
  );
}
