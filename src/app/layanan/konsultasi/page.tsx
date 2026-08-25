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
  title: "Konsultan IT & Modernisasi Sistem Perusahaan | Lumi Beta Works",
  description:
    "Layanan konsultasi arsitektur IT, audit kode, modernisasi sistem legacy, dan strategi migrasi cloud untuk efisiensi bisnis perusahaan & instansi.",
  alternates: { canonical: "https://lumibetaworks.id/layanan/konsultasi" },
  keywords: [
    "konsultan it perusahaan",
    "vendor modernisasi sistem legacy",
    "it consulting jakarta",
    "audit arsitektur software",
    "migrasi cloud database perusahaan",
    "tech stack advisory b2b",
  ],
  openGraph: {
    title: "Konsultan IT & Modernisasi Sistem Perusahaan | Lumi Beta Works",
    description:
      "Tingkatkan kecepatan, keamanan, dan skalabilitas infrastruktur software bisnis Anda bersama konsultan IT berpengalaman.",
    url: "https://lumibetaworks.id/layanan/konsultasi",
  },
};

const CONSULTING_SCOPES = [
  {
    icon: "🏗️",
    title: "Audit Arsitektur Software & Kode",
    desc: "Evaluasi mendalam terhadap struktur codebase, dependensi usang, potensi bottleneck performa, dan kerentanan keamanan yang menghambat rilis fitur baru.",
  },
  {
    icon: "☁️",
    title: "Strategi Migrasi Cloud & Database",
    desc: "Perencanaan dan eksekusi pemindahan sistem lama ke infrastruktur cloud modern (AWS, GCP, Supabase/PostgreSQL) dengan zero-downtime.",
  },
  {
    icon: "⚡",
    title: "Refactoring Sistem Legacy",
    desc: "Restrukturisasi kode usang menjadi modular, maintainable, dan sesuai prinsip SOLID tanpa harus membangun ulang seluruh sistem dari nol.",
  },
  {
    icon: "🧭",
    title: "Tech Stack & Roadmap Advisory",
    desc: "Rekomendasi pemilihan framework, database, dan arsitektur server yang paling tepat guna, hemat biaya operasional, dan siap scale-up.",
  },
];

const CONSULTING_BENEFITS = [
  {
    title: "Efisiensi Biaya Server & Operasional",
    desc: "Menghilangkan pemborosan resource cloud dan query database yang tidak optimal.",
  },
  {
    title: "Kecepatan Rilis Fitur (Time-to-Market)",
    desc: "Arsitektur kode yang rapi mempercepat tim developer internal Anda dalam merilis update.",
  },
  {
    title: "Ketahanan & Keamanan Skala Tinggi",
    desc: "Sistem siap menampung lonjakan trafik tanpa mengalami crash atau latency tinggi.",
  },
  {
    title: "Dokumentasi Arsitektur Lengkap",
    desc: "Penyusunan blueprint sistem (diagram arsitektur, ERD, dan flow data) yang jelas untuk onboarding tim masa depan.",
  },
];

const CONSULTING_FAQS = [
  {
    q: "Kapan perusahaan membutuhkan layanan IT Consulting / Modernisasi Sistem?",
    a: "Ketika sistem Anda mulai lambat, sering terjadi bug saat rilis fitur baru, biaya server membengkak, atau kode lama sulit dipahami oleh developer baru.",
  },
  {
    q: "Apakah migrasi sistem akan mengganggu operasional bisnis yang sedang berjalan?",
    a: "Tidak. Kami menerapkan strategi migrasi bertahap (Phased Migration / Staging Switch) sehingga pengguna aktif tetap dapat bertransaksi tanpa gangguan (Zero Downtime).",
  },
  {
    q: "Bagaimana bentuk output dari sesi konsultasi ini?",
    a: "Anda akan menerima Dokumen Audit Komprehensif, Roadmap Rekomendasi Teknis, Diagram Arsitektur Baru, serta estimasi milestone eksekusi.",
  },
];

export default async function JasaKonsultasiPage() {
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
    mainEntity: CONSULTING_FAQS.map((f) => ({
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
              <span className="text-[#0E8B62]">IT Consulting &amp; Modernisasi</span>
            </div>

            <span className="section-tag mb-4 inline-block">IT Consulting &amp; Strategic Advisory</span>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#101828] leading-[1.18] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Konsultan IT &amp; Modernisasi{" "}
              <span className="gradient-text">Sistem Perusahaan</span>
            </h1>
            <p
              className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Optimalkan arsitektur perangkat lunak Anda untuk kinerja maksimal, keamanan data tingkat tinggi, dan efisiensi biaya infrastruktur cloud jangka panjang.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${whatsapp}?text=Halo+Lumi+Beta+Works,+saya+ingin+konsultasi+arsitektur+IT+dan+modernisasi+sistem.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-emerald-500/20 w-full sm:w-auto"
              >
                Jadwalkan Konsultasi IT
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/about"
                className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold bg-white border-gray-200 text-[#3D3E4A] hover:bg-gray-50 w-full sm:w-auto"
              >
                Kenali Standar Engineering Kami
              </Link>
            </div>
          </div>
        </section>

        {/* Consulting Scopes */}
        <section className="py-20 md:py-28 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Fokus Solusi</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Bidang Konsultasi yang <span className="gradient-text">Kami Tangani</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CONSULTING_SCOPES.map((t) => (
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

        {/* Benefits */}
        <section className="py-20 md:py-28 bg-[#F8F9FB] border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Dampak Strategis</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Keuntungan Modernisasi Bersama <span className="gradient-text">Lumi Beta Works</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {CONSULTING_BENEFITS.map((b) => (
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

        {/* FAQ Section */}
        <section className="py-20 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-tag mb-3 inline-block">FAQ Konsultasi</span>
              <h2
                className="text-3xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Pertanyaan Seputar <span className="gradient-text">IT Consulting</span>
              </h2>
            </div>

            <div className="space-y-4">
              {CONSULTING_FAQS.map((f, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#F8F9FB] border border-gray-100 shadow-sm">
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
