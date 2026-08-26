import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vendor IT Perusahaan & Jasa Buat Website Terpercaya | Lumi Beta Works",
  description:
    "Vendor IT Perusahaan & Instansi terpercaya. Jasa pembuatan website perusahaan, aplikasi mobile, QA testing, dan konsultasi IT berkualitas & terjangkau. Konsultasi gratis!",
  alternates: { canonical: "https://lumibetaworks.id" },
  openGraph: {
    url: "https://lumibetaworks.id",
    title: "Vendor IT Perusahaan & Jasa Buat Website Professional | Lumi Beta Works",
    description:
      "Mitra Vendor IT & Software House profesional untuk Perusahaan, Instansi, & Bisnis Berkembang di Indonesia.",
  },
};

import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import AboutIntro from "@/components/sections/AboutIntro";
import TrustedBy from "@/components/sections/TrustedBy";
import ServicesSection from "@/components/sections/ServicesSection";
import UMKMPromo from "@/components/sections/UMKMPromo";
import Portfolio from "@/components/sections/Portfolio";
import CertificationsSection from "@/components/sections/CertificationsSection";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import { getTrustedBrands, getSetting } from "@/actions/settings";
import { getTestimonials } from "@/actions/testimonials";
import { getCertifications } from "@/actions/settings";

export default async function Home() {
  const [brands, contactSetting, heroBadgesSetting, activeProjectsSetting, testimonials, certifications] =
    await Promise.all([
      getTrustedBrands(),
      getSetting("contact"),
      getSetting("hero_badges"),
      getSetting("active_projects"),
      getTestimonials(),
      getCertifications(),
    ]);

  const contact = contactSetting as { email?: string; whatsapp?: string } | null;
  const whatsapp = contact?.whatsapp ?? "62882015884006";

  const heroBadgesRaw = heroBadgesSetting as Array<{ icon: string; label: string }> | null;
  const badges = heroBadgesRaw ?? [];

  const activeProjectsRaw = activeProjectsSetting as Array<{
    name: string; type: string; progress: number; color: string;
  }> | null;
  const activeProjects = activeProjectsRaw ?? [];

  return (
    <>
      <BackgroundBlobs />
      <Navbar />
      <main>
        <Hero badges={badges} activeProjects={activeProjects} whatsapp={whatsapp} />
        <AboutIntro />
        <TrustedBy brands={brands} />
        <ServicesSection />
        <UMKMPromo />
        <Portfolio />
        <CertificationsSection certifications={certifications} />
        <Stats />
        <Testimonials testimonials={testimonials} />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWA whatsapp={whatsapp} />
    </>
  );
}
