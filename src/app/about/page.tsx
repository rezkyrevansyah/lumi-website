import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import AboutHero from "@/components/about/AboutHero";
import EngineeringFramework from "@/components/about/EngineeringFramework";
import QuoteBanner from "@/components/about/QuoteBanner";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import CertificationsSection from "@/components/sections/CertificationsSection";
import AchievementsUnlocked from "@/components/about/AchievementsUnlocked";
import HappyClients from "@/components/about/HappyClients";
import PositiveVibes from "@/components/about/PositiveVibes";
import AboutCTA from "@/components/about/AboutCTA";
import CompanyProfile from "@/components/about/CompanyProfile";

import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tentang Kami — Vendor IT & Software House Terpercaya",
  description:
    "Kenali Lumi Beta Works — Vendor IT & Software House terpercaya yang membangun website perusahaan, aplikasi mobile, dan pengujian QA berkualitas tinggi.",
  alternates: { canonical: "https://lumibetaworks.id/about" },
  openGraph: {
    title: "Tentang Lumi Beta Works — Vendor IT & Software House",
    description:
      "Vendor IT terpercaya di Indonesia yang melayani Perusahaan, Instansi Pemerintah, & Bisnis Berkembang.",
    url: "https://lumibetaworks.id/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <BackgroundBlobs />
      <Navbar />
      <main>
        <AboutHero />
        <EngineeringFramework />
        <QuoteBanner />
        <WhyChooseUs />
        <CertificationsSection />
        <AchievementsUnlocked />
        <HappyClients />
        <PositiveVibes />
        <CompanyProfile />
        <AboutCTA />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
