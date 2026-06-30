import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import ContactCTA from "@/components/sections/ContactCTA";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Jasa QA Testing",
  description:
    "Jasa QA testing manual dan otomasi untuk website dan aplikasi. Temukan bug sebelum produk live. Testing fungsional, performa, keamanan, dan mobile. Konsultasi gratis.",
  alternates: { canonical: "https://lumibetaworks.id/layanan/qa-testing" },
  keywords: [
    "jasa QA testing",
    "jasa software testing",
    "jasa testing aplikasi",
    "QA engineer Indonesia",
    "automation testing Indonesia",
    "jasa testing website",
    "software quality assurance Indonesia",
  ],
  openGraph: {
    title: "Jasa QA Testing Website & Aplikasi — Lumi Beta Works",
    description:
      "Testing manual dan otomasi untuk website dan aplikasi. Temukan bug sebelum produk live.",
    url: "https://lumibetaworks.id/layanan/qa-testing",
  },
};

const SERVICES = [
  { icon: "🧪", label: "Functional Testing", desc: "Verifikasi semua fitur berjalan sesuai spesifikasi dan kebutuhan bisnis." },
  { icon: "⚡", label: "Performance Testing", desc: "Uji kecepatan, load, dan stress test untuk memastikan performa di traffic tinggi." },
  { icon: "🔒", label: "Security Testing", desc: "Identifikasi celah keamanan sebelum dieksploitasi — OWASP Top 10 coverage." },
  { icon: "📱", label: "Mobile Testing", desc: "Testing di berbagai perangkat Android dan iOS untuk pengalaman pengguna optimal." },
  { icon: "🤖", label: "Automation Testing", desc: "Skrip otomasi dengan Selenium, Cypress, dan Appium untuk regresi yang efisien." },
  { icon: "🔗", label: "API Testing", desc: "Validasi endpoint API untuk keandalan integrasi antar layanan." },
];

export default async function JasaQATestingPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("site_settings").select("value").eq("key", "contact").single();
  const contact = data?.value as { whatsapp?: string } | null;
  const whatsapp = contact?.whatsapp ?? "";

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
            <p className="section-tag mb-4">Layanan Kami</p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D3E4A] leading-tight mb-6"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Jasa <span className="gradient-text">QA Testing</span>{" "}
              Profesional
            </h1>
            <p
              className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Jangan biarkan bug merusak reputasi produkmu. Tim QA kami memastikan
              website dan aplikasimu bebas dari masalah sebelum sampai ke tangan pengguna —
              testing manual maupun otomasi, sesuai kebutuhan proyekmu.
            </p>
            <a
              href={`https://wa.me/${whatsapp}?text=Halo+Lumi+Beta+Works!+Saya+tertarik+dengan+jasa+QA+testing.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base"
            >
              Konsultasi Gratis via WhatsApp
            </a>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="section-tag mb-3">Cakupan Testing</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
                Testing <span className="gradient-text">Menyeluruh</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <div key={s.label} className="bg-[#F8F9FB] rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-bold text-[#3D3E4A] text-lg mb-2" style={{ fontFamily: "var(--font-rubik)" }}>
                    {s.label}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "var(--font-opensans)" }}>
                    {s.desc}
                  </p>
                </div>
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
