import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import ContactCTA from "@/components/sections/ContactCTA";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Jasa Tech Consulting",
  description:
    "Jasa konsultasi teknologi untuk bisnis dan startup Indonesia. Bantu pilih tech stack, arsitektur sistem, strategi digital, dan evaluasi produk existing. Konsultasi gratis.",
  alternates: { canonical: "https://lumibetaworks.id/layanan/konsultasi" },
  keywords: [
    "jasa tech consulting",
    "konsultasi teknologi bisnis",
    "konsultasi digital Indonesia",
    "tech advisor Indonesia",
    "konsultasi pengembangan software",
    "konsultasi startup teknologi",
  ],
  openGraph: {
    title: "Jasa Tech Consulting — Lumi Beta Works",
    description:
      "Konsultasi teknologi untuk bisnis dan startup. Pilih tech stack yang tepat, bangun arsitektur yang skalabel.",
    url: "https://lumibetaworks.id/layanan/konsultasi",
  },
};

const TOPICS = [
  { icon: "🗺️", label: "Strategi Digital", desc: "Roadmap transformasi digital yang realistis sesuai kapasitas dan target bisnis kamu." },
  { icon: "🏗️", label: "Arsitektur Sistem", desc: "Rancang arsitektur yang skalabel, maintainable, dan siap tumbuh bersama bisnis." },
  { icon: "⚙️", label: "Pilihan Tech Stack", desc: "Rekomendasi teknologi yang tepat — bukan yang paling trending, tapi yang paling sesuai." },
  { icon: "🔍", label: "Audit Produk Existing", desc: "Evaluasi mendalam terhadap sistem yang sudah ada dan rekomendasi perbaikan." },
  { icon: "🚀", label: "MVP & Validasi Ide", desc: "Bantu mendefinisikan scope MVP yang efisien untuk validasi pasar dengan cepat." },
  { icon: "👥", label: "Evaluasi Tim Teknis", desc: "Assessment kemampuan tim dan rekomendasi proses engineering yang lebih baik." },
];

export default async function JasaKonsultasiPage() {
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
              Jasa <span className="gradient-text">Tech Consulting</span>
            </h1>
            <p
              className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Keputusan teknologi yang salah bisa sangat mahal. Kami hadir sebagai mitra
              teknis yang membantu bisnis dan startup membuat keputusan yang tepat — mulai
              dari pemilihan stack hingga strategi scaling jangka panjang.
            </p>
            <a
              href={`https://wa.me/${whatsapp}?text=Halo+Lumi+Beta+Works!+Saya+tertarik+dengan+jasa+tech+consulting.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base"
            >
              Mulai Konsultasi Gratis
            </a>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="section-tag mb-3">Topik Konsultasi</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
                Kami Bantu <span className="gradient-text">Berbagai Aspek Teknologi</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOPICS.map((t) => (
                <div key={t.label} className="bg-[#F8F9FB] rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="text-3xl mb-3">{t.icon}</div>
                  <h3 className="font-bold text-[#3D3E4A] text-lg mb-2" style={{ fontFamily: "var(--font-rubik)" }}>
                    {t.label}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "var(--font-opensans)" }}>
                    {t.desc}
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
