import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import ContactCTA from "@/components/sections/ContactCTA";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Jasa Pembuatan Website",
  description:
    "Jasa pembuatan website profesional untuk bisnis, UMKM, restoran, klinik, sekolah, dan toko online. Desain modern, cepat, dan SEO-friendly. Mulai konsultasi gratis!",
  alternates: { canonical: "https://lumibetaworks.id/layanan/website" },
  keywords: [
    "jasa pembuatan website",
    "jasa buat website",
    "jasa website profesional",
    "jasa buat website murah",
    "jasa buat website bisnis",
    "jasa buat website UMKM",
    "jasa buat website restoran",
    "jasa buat website klinik",
    "jasa buat website sekolah",
    "jasa buat website toko online",
    "web developer Jakarta",
    "pembuatan website Indonesia",
  ],
  openGraph: {
    title: "Jasa Pembuatan Website Profesional — Lumi Beta Works",
    description:
      "Website profesional untuk bisnis, UMKM, restoran, klinik, dan sekolah. Desain modern, SEO-friendly, harga terjangkau.",
    url: "https://lumibetaworks.id/layanan/website",
  },
};

const NICHES = [
  { icon: "🏪", label: "Bisnis & UMKM", desc: "Website company profile, landing page, dan toko online untuk usaha kamu." },
  { icon: "🍽️", label: "Restoran & Kafe", desc: "Website menu digital, reservasi online, dan profil restoran yang menarik." },
  { icon: "🏥", label: "Klinik & Kesehatan", desc: "Website klinik dengan fitur jadwal dokter, pendaftaran online, dan info layanan." },
  { icon: "🎓", label: "Sekolah & Kampus", desc: "Website sekolah dengan informasi akademik, berita, dan portal siswa." },
  { icon: "🛒", label: "Toko Online", desc: "E-commerce dengan manajemen produk, pembayaran, dan pengiriman terintegrasi." },
  { icon: "🏢", label: "Perusahaan", desc: "Website korporat yang profesional untuk meningkatkan kepercayaan dan brand." },
];

const FEATURES = [
  "Desain modern & responsif di semua perangkat",
  "SEO-friendly untuk ranking Google lebih baik",
  "Loading cepat (optimasi performa)",
  "CMS sehingga konten bisa diubah sendiri",
  "Keamanan SSL & perlindungan data",
  "Integrasi WhatsApp & media sosial",
  "Dukungan teknis setelah launch",
  "Harga transparan, tanpa biaya tersembunyi",
];

export default async function JasaWebsitePage() {
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
        {/* Hero */}
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
              <span className="gradient-text">Website</span>{" "}
              Profesional
            </h1>
            <p
              className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Kami membangun website yang tidak hanya cantik, tapi juga cepat, aman, dan
              dioptimalkan untuk mesin pencari. Dari landing page sederhana hingga platform
              e-commerce kompleks — kami siap mengerjakan proyekmu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${whatsapp}?text=Halo+Lumi+Beta+Works!+Saya+tertarik+dengan+jasa+pembuatan+website.`}
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
                Lihat Hasil Kerja Kami
              </a>
            </div>
          </div>
        </section>

        {/* Niche segments */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="section-tag mb-3">Untuk Siapa?</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3D3E4A]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Website untuk <span className="gradient-text">Semua Jenis Bisnis</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {NICHES.map((n) => (
                <div key={n.label} className="bg-[#F8F9FB] rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="text-3xl mb-3">{n.icon}</div>
                  <h3 className="font-bold text-[#3D3E4A] text-lg mb-2" style={{ fontFamily: "var(--font-rubik)" }}>
                    {n.label}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "var(--font-opensans)" }}>
                    {n.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-[#F8F9FB]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="section-tag mb-3">Yang Kamu Dapatkan</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3D3E4A]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Standar Kualitas <span className="gradient-text">Kami</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-3 bg-white rounded-xl p-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2DD9A4" strokeWidth="2.5" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-opensans)" }}>{f}</p>
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
