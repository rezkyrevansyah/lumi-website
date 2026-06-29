import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
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

  const [brandsResult, contactResult] = await Promise.all([
    supabase.from("trusted_brands").select("*").order("sort_order"),
    supabase.from("site_settings").select("value").eq("key", "contact").single(),
  ]);

  const brands: AdminBrand[] = (brandsResult.data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    logoUrl: row.logo_url ?? undefined,
  }));

  const contact = contactResult.data?.value as { email?: string; whatsapp?: string } | null;
  const whatsapp = contact?.whatsapp ?? "62XXXXXXXXXX";

  return (
    <>
      <BackgroundBlobs />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy brands={brands.length > 0 ? brands : undefined} />
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
