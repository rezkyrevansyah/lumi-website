import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import ContactCTA from "@/components/sections/ContactCTA";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Jasa pembuatan website, aplikasi mobile, QA testing, dan tech consulting profesional di Indonesia. Harga terjangkau, kualitas enterprise. Konsultasi gratis!",
  alternates: { canonical: "https://lumibetaworks.id/layanan" },
  keywords: [
    "jasa digital Indonesia",
    "jasa pembuatan website",
    "jasa pembuatan aplikasi",
    "QA testing Indonesia",
    "tech consulting Indonesia",
    "layanan IT Indonesia",
  ],
  openGraph: {
    title: "Layanan Digital Profesional — Lumi Beta Works",
    description:
      "Website, aplikasi mobile, QA testing, dan tech consulting. Harga terjangkau, kualitas enterprise.",
    url: "https://lumibetaworks.id/layanan",
  },
};

type LayananItem = { icon: string; label: string; description: string; tags: string[]; color: string; href: string };

export default async function LayananPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [settingsRes, servicesRes] = await Promise.all([
    supabase.from("site_settings").select("value").eq("key", "contact").single(),
    supabase.from("service_page_items").select("icon, label, description, tags, color, href").eq("page_key", "layanan_index").order("sort_order"),
  ]);

  const contact = settingsRes.data?.value as { whatsapp?: string } | null;
  const whatsapp = contact?.whatsapp ?? "";
  const services: LayananItem[] = servicesRes.data ?? [];

  return (
    <>
      <BackgroundBlobs />
      <Navbar />
      <main>
        <section className="pt-28 pb-20 bg-[#F8F9FB] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(61,62,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,62,74,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="section-tag mb-4">Apa yang Kami Tawarkan</p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D3E4A] leading-tight mb-6"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Layanan <span className="gradient-text">Digital Lengkap</span>{" "}
              untuk Bisnismu
            </h1>
            <p
              className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Dari pembuatan website hingga konsultasi teknologi — semua yang kamu butuhkan
              untuk membangun dan mengembangkan kehadiran digital bisnismu ada di sini.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group bg-[#F8F9FB] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h2
                    className="text-2xl font-bold text-[#3D3E4A] mb-3 group-hover:text-[#2DD9A4] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-rubik)" }}
                  >
                    {s.label}
                  </h2>
                  <p
                    className="text-gray-500 text-base leading-relaxed mb-5"
                    style={{ fontFamily: "var(--font-opensans)" }}
                  >
                    {s.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(s.tags ?? []).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-white border border-gray-200 text-gray-500"
                        style={{ fontFamily: "var(--font-opensans)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold" style={{ color: s.color ?? "#2DD9A4", fontFamily: "var(--font-rubik)" }}>
                    Pelajari lebih lanjut
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
      <FloatingWA whatsapp={whatsapp} />
    </>
  );
}
