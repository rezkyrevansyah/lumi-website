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
  title: "Vendor Pembuatan Aplikasi Mobile Android & iOS — Lumi Beta Works",
  description:
    "Vendor IT pembuatan aplikasi mobile Android & iOS custom menggunakan Flutter. Performa native, UI/UX intuitif, arsitektur scalable, dan publikasi Play Store / App Store.",
  alternates: { canonical: "https://lumibetaworks.id/layanan/aplikasi" },
  keywords: [
    "vendor pembuatan aplikasi mobile",
    "jasa buat aplikasi android ios",
    "app developer perusahaan jakarta",
    "vendor aplikasi flutter enterprise",
    "jasa pembuatan aplikasi custom",
    "software house mobile app indonesia",
  ],
  openGraph: {
    title: "Vendor Pembuatan Aplikasi Mobile Android & iOS — Lumi Beta Works",
    description:
      "Solusi aplikasi mobile handal dengan Flutter. Hemat biaya & waktu pengembangan tanpa kompromi pada kualitas performa.",
    url: "https://lumibetaworks.id/layanan/aplikasi",
  },
};

const APP_TYPES = [
  {
    icon: "📊",
    title: "Aplikasi Operasional & Enterprise Field",
    desc: "Aplikasi mobile untuk absensi berbasis geolokasi, manajemen inventaris gudang, inspeksi lapangan, dan sistem CRM penjualan tim sales.",
  },
  {
    icon: "🛵",
    title: "On-Demand Services & Booking App",
    desc: "Aplikasi reservasi online, tracking pesanan real-time, integrasi peta digital GPS, dan notifikasi push otomatis untuk pelanggan.",
  },
  {
    icon: "💳",
    title: "Mobile Commerce & Loyalty Points",
    desc: "Aplikasi belanja produk eksklusif dengan sistem keanggotaan (loyalty membership), dompet digital, dan voucher diskon.",
  },
  {
    icon: "🎓",
    title: "Education & EdTech Mobile Platform",
    desc: "Aplikasi pembelajaran interaktif, manajemen kursus, kuis real-time, dan modul pemantauan perkembangan siswa.",
  },
];

const FLUTTER_BENEFITS = [
  {
    title: "Satu Codebase untuk Android & iOS",
    desc: "Menghemat biaya dan mempercepat waktu rilis hingga 40% dibandingkan mengembangkan dua platform secara terpisah.",
  },
  {
    title: "Performa Native 60–120 FPS",
    desc: "Animasi mulus dan interaksi responsif yang dirender langsung dengan engine grafis Skia / Impeller tanpa lag.",
  },
  {
    title: "Offline-First & Auto Sync",
    desc: "Pengguna tetap dapat menginput data saat sinyal lemah/offline dan tersinkronisasi otomatis saat internet kembali stabil.",
  },
  {
    title: "Keamanan Data & Enkripsi Lokal",
    desc: "Penyimpanan data lokal terenkripsi (Secure Storage), autentikasi biometrik (Fingerprint / Face ID), dan proteksi SSL Pinning.",
  },
  {
    title: "Dukungan Integrasi Hardware",
    desc: "Dukungan penuh untuk fitur kamera, GPS tracker, Bluetooth printer thermal, NFC, dan sensor perangkat.",
  },
  {
    title: "Bantuan Publikasi App Store & Play Store",
    desc: "Kami mendampingi proses review dan verifikasi hingga aplikasi Anda resmi tayang dan dapat diunduh publik.",
  },
];

const MOBILE_CASES = [
  {
    name: "Dapur Nusantara (Culinary App)",
    category: "Top 50 Bangkit Capstone (Google • GoTo)",
    result: "Aplikasi kuliner nusantara berbasis kecerdasan buatan (AI) & rekomendasi personalisasi.",
  },
  {
    name: "TBIG Mobile (Tower Bersama Group)",
    category: "Telecommunication Enterprise App",
    result: "Aplikasi inspeksi menara telekomunikasi dan koordinasi teknisi lapangan di seluruh Indonesia.",
  },
  {
    name: "E-Water (Social Impact 3T)",
    category: "Clean Water IoT & Monitoring",
    result: "Sistem monitoring distribusi air bersih untuk wilayah 3T dengan sinkronisasi data instan.",
  },
  {
    name: "Safty (Road Safety & Navigation)",
    category: "Smart Navigation & Safety",
    result: "Aplikasi pemantauan kecepatan berkendara dan peringatan bahaya rute berbasis GPS real-time.",
  },
];

const APP_FAQS = [
  {
    q: "Apakah aplikasi yang dibuat bisa langsung dipublikasikan ke Play Store dan App Store?",
    a: "Ya. Kami membantu proses konfigurasi akun developer, pembuatan aset icon & screenshot, hingga pengajuan review sampai aplikasi disetujui (Approved).",
  },
  {
    q: "Mengapa Lumi merekomendasikan teknologi Flutter?",
    a: "Flutter memungkinkan kami membuat aplikasi berkualitas tinggi untuk Android dan iOS secara simultan dengan satu tim dan satu codebase, menghasilkan efisiensi biaya besar dan konsistensi tampilan 100%.",
  },
  {
    q: "Berapa lama estimasi pengerjaan aplikasi mobile?",
    a: "Umumnya berkisar antara 25 hingga 45 hari kerja tergantung kompleksitas alur fitur dan integrasi backend API.",
  },
];

export default async function JasaAplikasiPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: settings } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "contact")
    .single();

  const contact = settings?.value as { whatsapp?: string } | null;
  const whatsapp = contact?.whatsapp || "62882015884006";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: APP_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BackgroundBlobs />
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-36 md:pb-24 bg-[#F8F9FB] border-b border-gray-100 relative">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#2DD9A4]">Beranda</Link>
              <span>/</span>
              <Link href="/layanan" className="hover:text-[#2DD9A4]">Layanan</Link>
              <span>/</span>
              <span className="text-[#0E8B62]">Vendor Aplikasi Mobile</span>
            </div>

            <span className="section-tag mb-4 inline-block">Vendor Pembuatan Aplikasi Mobile</span>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#101828] leading-[1.18] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Vendor Pembuatan Aplikasi Mobile{" "}
              <span className="gradient-text">Android &amp; iOS</span>
            </h1>
            <p
              className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Kembangkan aplikasi mobile berkualitas tinggi dengan performa native, desain interaktif, dan arsitektur backend yang siap diskalakan ke jutaan pengguna.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${whatsapp}?text=Halo+Lumi+Beta+Works,+saya+ingin+konsultasi+pembuatan+Aplikasi+Mobile.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-emerald-500/20 w-full sm:w-auto"
              >
                Konsultasi Aplikasi Gratis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/portfolio"
                className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold bg-white border-gray-200 text-[#3D3E4A] hover:bg-gray-50 w-full sm:w-auto"
              >
                Lihat Portfolio Aplikasi Mobile
              </Link>
            </div>
          </div>
        </section>

        {/* Types Grid */}
        <section className="py-20 md:py-28 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Jenis Solusi Mobile</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Aplikasi Mobile yang <span className="gradient-text">Siap Kami Bangun</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {APP_TYPES.map((t) => (
                <div
                  key={t.title}
                  className="p-6 rounded-2xl border border-gray-100 bg-[#F8F9FB] hover:bg-white hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-2xl mb-4 shadow-sm">
                      {t.icon}
                    </div>
                    <h3
                      className="font-bold text-[#101828] text-lg mb-2"
                      style={{ fontFamily: "var(--font-rubik)" }}
                    >
                      {t.title}
                    </h3>
                    <p
                      className="text-gray-500 text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-opensans)" }}
                    >
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flutter Standards */}
        <section className="py-20 md:py-28 bg-[#F8F9FB] border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Teknologi &amp; Keunggulan</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Keunggulan Pengembangan Bersama <span className="gradient-text">Lumi Beta Works</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FLUTTER_BENEFITS.map((b) => (
                <div key={b.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#2DD9A4] font-bold text-lg">✓</span>
                    <h3 className="font-bold text-[#101828] text-base" style={{ fontFamily: "var(--font-rubik)" }}>
                      {b.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed pl-6" style={{ fontFamily: "var(--font-opensans)" }}>
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Case Studies */}
        <section className="py-20 md:py-28 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Rekam Jejak Aplikasi</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Aplikasi yang <span className="gradient-text">Telah Kami Kembangkan</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOBILE_CASES.map((c) => (
                <div key={c.name} className="p-6 rounded-2xl bg-[#F8F9FB] border border-gray-100 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#0E8B62] uppercase tracking-wider block mb-1">
                      {c.category}
                    </span>
                    <h3 className="font-bold text-lg text-[#101828] mb-2" style={{ fontFamily: "var(--font-rubik)" }}>
                      {c.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "var(--font-opensans)" }}>
                      {c.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/portfolio" className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-white">
                Lihat Seluruh Portofolio Aplikasi
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[#F8F9FB] border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-tag mb-3 inline-block">FAQ Mobile App</span>
              <h2
                className="text-3xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Pertanyaan Seputar <span className="gradient-text">Pembuatan Aplikasi Mobile</span>
              </h2>
            </div>

            <div className="space-y-4">
              {APP_FAQS.map((f, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-base sm:text-lg text-[#101828] mb-2" style={{ fontFamily: "var(--font-rubik)" }}>
                    {f.q}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-opensans)" }}>
                    {f.a}
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
