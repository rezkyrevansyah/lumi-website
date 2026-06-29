import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import PortfolioPage from "@/components/portfolio/PortfolioPage";

export const metadata = {
  title: "Portfolio — Lumi Beta Works",
  description:
    "Browse all projects built by Lumi Beta Works — web, mobile, QA, and consulting across industries.",
};

export default function Page() {
  return (
    <>
      <BackgroundBlobs />
      <Navbar />
      <main>
        <PortfolioPage />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
