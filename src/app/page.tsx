import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";

export default function Home() {
  return (
    <>
      <BackgroundBlobs />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Portfolio />
        <Stats />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
