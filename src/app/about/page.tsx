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
import { getAboutPrinciples, getAchievements, getFounder, getAboutStory } from "@/actions/about";
import { getCertifications, getSetting } from "@/actions/settings";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Tentang Kami | Studio Teknologi & Software House Terpercaya",
  description:
    "Kenali Lumi Beta Works, studio teknologi yang berakar dari pengalaman praktis di Fastwork menjadi partner digital pilihan untuk website corporate, aplikasi mobile, dan QA testing.",
  alternates: { canonical: "https://lumibetaworks.id/about" },
  openGraph: {
    title: "Tentang Kami | Lumi Beta Works",
    description:
      "Perjalanan, visi, dan komitmen Lumi Beta Works dalam menghadirkan solusi teknologi yang fungsional, transparan, dan tepat guna.",
    url: "https://lumibetaworks.id/about",
  },
};

export default async function AboutPage() {
  const [workPrinciples, achievements, founder, story, certifications, contactSetting] = await Promise.all([
    getAboutPrinciples("work_principles"),
    getAchievements(),
    getFounder(),
    getAboutStory(),
    getCertifications(),
    getSetting("contact"),
  ]);

  const contact = contactSetting as { whatsapp?: string } | null;
  const whatsapp = contact?.whatsapp ?? "62882015884006";

  return (
    <>
      <BackgroundBlobs />
      <Navbar />
      <main className="overflow-hidden">
        <AboutHeroV2 metrics={achievements} />
        <OurStory story={story as any} />
        <MeetFounder founder={founder as any} />
        <WorkPrinciples principles={workPrinciples} />
        <CertificationsSection certifications={certifications} />
        <AboutCTA />
      </main>
      <Footer />
      <FloatingWA whatsapp={whatsapp} />
    </>
  );
}
