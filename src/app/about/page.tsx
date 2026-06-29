import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import AboutHero from "@/components/about/AboutHero";
import EngineeringFramework from "@/components/about/EngineeringFramework";
import QuoteBanner from "@/components/about/QuoteBanner";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import AchievementsUnlocked from "@/components/about/AchievementsUnlocked";
import HappyClients from "@/components/about/HappyClients";
import PositiveVibes from "@/components/about/PositiveVibes";
import AboutCTA from "@/components/about/AboutCTA";
import CompanyProfile from "@/components/about/CompanyProfile";

export const metadata = {
  title: "About — Lumi Beta Works",
  description:
    "We bring long-lasting impacts into reality. Learn about Lumi Beta Works — our engineering framework, values, and the clients we've served.",
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
