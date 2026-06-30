import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import ContactCTA from "@/components/sections/ContactCTA";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Jasa Pembuatan Aplikasi Mobile",
  description:
    "Jasa pembuatan aplikasi mobile Android dan iOS profesional. Dari aplikasi bisnis, fintech, marketplace, hingga aplikasi kesehatan. Konsultasi gratis, harga terjangkau.",
  alternates: { canonical: "https://lumibetaworks.id/layanan/aplikasi" },
  keywords: [
    "jasa pembuatan aplikasi",
    "jasa buat aplikasi android",
    "jasa buat aplikasi ios",
    "jasa pembuatan aplikasi mobile",
    "jasa buat aplikasi bisnis",
    "app developer Indonesia",
    "pembuatan aplikasi flutter",
    "jasa buat aplikasi murah",
  ],
  openGraph: {
    title: "Jasa Pembuatan Aplikasi Mobile Android & iOS — Lumi Beta Works",
    description:
      "Aplikasi mobile Android dan iOS untuk bisnis, fintech, marketplace, dan kesehatan. Harga terjangkau, kualitas enterprise.",
    url: "https://lumibetaworks.id/layanan/aplikasi",
  },
};

const TYPES = [
  { icon: "📱", label: "Aplikasi Bisnis", desc: "CRM, sistem manajemen, absensi, dan tools operasional untuk efisiensi bisnis." },
  { icon: "💳", label: "Fintech & Dompet Digital", desc: "Aplikasi pembayaran, transfer, pinjaman, dan manajemen keuangan personal." },
  { icon: "🛒", label: "Marketplace & E-Commerce", desc: "Platform jual-beli multi-vendor dengan fitur lengkap dan pembayaran terintegrasi." },
  { icon: "🏥", label: "Kesehatan & Telemedicine", desc: "Aplikasi konsultasi dokter, rekam medis, dan manajemen klinik digital." },
  { icon: "📚", label: "Edukasi & E-Learning", desc: "Platform belajar online dengan video, kuis, sertifikat, dan progress tracking." },
  { icon: "🚚", label: "Logistik & Pengiriman", desc: "Aplikasi tracking pengiriman, manajemen armada, dan optimasi rute." },
];

export default async function JasaAplikasiPage() {
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
              Jasa Pembuatan{" "}
              <span className="gradient-text">Aplikasi Mobile</span>
            </h1>
            <p
              className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Kami membangun aplikasi Android dan iOS yang intuitif, cepat, dan skalabel.
              Menggunakan Flutter untuk efisiensi pengembangan lintas platform tanpa mengorbankan
              performa dan kualitas tampilan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${whatsapp}?text=Halo+Lumi+Beta+Works!+Saya+tertarik+dengan+jasa+pembuatan+aplikasi+mobile.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base"
              >
                Konsultasi Gratis via WhatsApp
              </a>
              <a
                href="/portfolio"
                className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base"
              >
                Lihat Portfolio Aplikasi
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="section-tag mb-3">Jenis Aplikasi</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3D3E4A]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Aplikasi untuk <span className="gradient-text">Berbagai Industri</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TYPES.map((t) => (
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
