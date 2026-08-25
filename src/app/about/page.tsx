import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import AboutHeroV2 from "@/components/about/AboutHeroV2";
import OurStory from "@/components/about/OurStory";
import MeetFounder from "@/components/about/MeetFounder";
import WorkPrinciples from "@/components/about/WorkPrinciples";
import CertificationsSection from "@/components/sections/CertificationsSection";
import AboutCTA from "@/components/about/AboutCTA";

import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tentang Kami | Studio Teknologi & Partner Digital Nyaman",
  description:
    "Kenali Lumi Beta Works, studio digital yang berangkat dari reputasi freelancer terpercaya di Fastwork menjadi partner teknologi pilihan untuk website corporate, aplikasi mobile, dan QA testing.",
  alternates: { canonical: "https://lumibetaworks.id/about" },
  openGraph: {
    title: "Tentang Kami | Lumi Beta Works",
    description:
      "Perjalanan, visi, dan komitmen Lumi Beta Works dalam memberikan pengalaman pengerjaan proyek digital yang nyaman, transparan, dan berkelas.",
    url: "https://lumibetaworks.id/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <BackgroundBlobs />
      <Navbar />
      <main className="overflow-hidden">
        <AboutHeroV2 />
        <OurStory />
        <MeetFounder />
        <WorkPrinciples />
        <CertificationsSection />
        <AboutCTA />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
