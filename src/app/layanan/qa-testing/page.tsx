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
  title: "Vendor QA Testing & Software Quality Assurance Enterprise | Lumi Beta Works",
  description:
    "Layanan Vendor QA testing manual & automation profesional untuk website, aplikasi mobile, & API sistem perusahaan. Garansi produk bebas bug sebelum rilis live.",
  alternates: { canonical: "https://lumibetaworks.id/layanan/qa-testing" },
  keywords: [
    "vendor qa testing enterprise",
    "jasa software quality assurance",
    "automation testing indonesia",
    "software testing b2b jakarta",
    "api stress testing indonesia",
    "manual qa tester profesional",
  ],
  openGraph: {
    title: "Vendor QA Testing Website & Aplikasi Enterprise | Lumi Beta Works",
    description:
      "Uji keandalan, keamanan, dan stabilitas performa sistem Anda dengan metodologi QA berstandar enterprise.",
    url: "https://lumibetaworks.id/layanan/qa-testing",
  },
};

const QA_SERVICES = [
  {
    icon: "🔍",
    title: "Manual Functional & Regression Testing",
    desc: "Eksplorasi menyeluruh setiap alur pengguna (user flow), validasi input form, deteksi edge cases tersembunyi, dan verifikasi kelayakan fungsi bisnis.",
  },
  {
    icon: "🤖",
    title: "End-to-End Test Automation",
    desc: "Pembuatan skrip testing otomatis menggunakan Playwright dan Cypress untuk memastikan fitur tidak rusak saat ada pembaruan kode baru.",
  },
  {
    icon: "⚡",
    title: "API Stress & Load Performance Testing",
    desc: "Pengujian simulasi beban ribuan pengguna serentak menggunakan K6 dan Postman untuk mengukur batas throughput, response time, dan ketahanan server.",
  },
  {
    icon: "📱",
    title: "Cross-Browser & Multi-Device Matrix",
    desc: "Verifikasi visual dan fungsional pada ratusan kombinasi resolusi layar, OS (iOS/Android/Windows/macOS), serta browser (Chrome, Safari, Firefox).",
  },
];

const QA_BENEFITS = [
  {
    title: "Mencegah Kerugian Finansial & Reputasi",
    desc: "Satu bug kritis saat peluncuran bisa merusak kepercayaan pelanggan dan merugikan omzet bisnis.",
  },
  {
    title: "Laporan Defect Rinci & Video Reproduksi",
    desc: "Setiap temuan bug dilengkapi langkah reproduksi step-by-step, rekaman video, log console, dan tingkat keparahan (Severity/Priority).",
  },
  {
    title: "Integrasi Tiket Jira / Trello / GitHub",
    desc: "Hasil pengujian langsung dipetakan ke dalam board manajemen tugas tim developer Anda untuk perbaikan cepat.",
  },
  {
    title: "Audit Keamanan & Kepatuhan Validasi",
    desc: "Pemeriksaan celah injeksi data dasar, otorisasi token sesi, dan kebocoran data sensitif pada antarmuka pengguna.",
  },
];

const QA_CASES = [
  {
    name: "Erafone E-Commerce Platform",
    category: "Retail & Multi-Device Testing",
    result: "Pengujian alur checkout keranjang, kalkulasi promo, dan kompatibilitas di puluhan perangkat smartphone.",
  },
  {
    name: "SiMBA UPZ Management (BAZNAS)",
    category: "High-Volume Data System",
    result: "Verifikasi reliabilitas input ribuan data donasi dan pelaporan keuangan tanpa anomali.",
  },
  {
    name: "IDP EKRAF SSO Gateway",
    category: "Security & Authentication QA",
    result: "Audit autentikasi Single Sign-On kementerian untuk mencegah kegagalan sesi pengguna lintas portal.",
  },
  {
    name: "BAZNAS National Portal",
    category: "Peak Traffic Stress Testing",
    result: "Simulasi beban puncak ribuan transaksi donatur serentak selama periode kampanye nasional.",
  },
];

const QA_FAQS = [
  {
    q: "Kapan waktu yang tepat menyewa vendor QA testing?",
    a: "Sangat ideal dilakukan menjelang fase UAT (User Acceptance Testing) sebelum peluncuran resmi ke publik, atau secara berkala pada setiap rilis sprint fitur baru.",
  },
  {
    q: "Apakah kami mendapatkan laporan lengkap setelah testing selesai?",
    a: "Ya. Anda akan menerima Dokumen Test Summary Report (TSR) lengkap dengan grafik defect, skor stabilitas, dan rekomendasi teknikal siap tindak lanjut.",
  },
  {
    q: "Apakah tim QA Lumi bisa bekerja sama dengan developer internal kami?",
    a: "Tentu saja. Kami sangat terbiasa berkolaborasi langsung dengan tim developer Anda via Slack, Jira, GitHub, atau Discord.",
  },
];

export default async function JasaQATestingPage() {
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
    mainEntity: QA_FAQS.map((f) => ({
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
              <span className="text-[#0E8B62]">QA Testing Enterprise</span>
            </div>

            <span className="section-tag mb-4 inline-block">Vendor QA Testing Enterprise</span>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#101828] leading-[1.18] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Vendor Software QA Testing &amp;{" "}
              <span className="gradient-text">Audit Kualitas Sistem</span>
            </h1>
            <p
              className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Jangan biarkan bug dan kendala sistem merusak reputasi produk Anda. Kami menguji setiap alur, performa, dan celah keamanan dengan standar industri sebelum software diluncurkan ke pengguna.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${whatsapp}?text=Halo+Lumi+Beta+Works,+saya+ingin+konsultasi+layanan+QA+Testing.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-emerald-500/20 w-full sm:w-auto"
              >
                Konsultasi QA Testing Gratis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/portfolio"
                className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold bg-white border-gray-200 text-[#3D3E4A] hover:bg-gray-50 w-full sm:w-auto"
              >
                Lihat Rekam Jejak Pengujian Kami
              </Link>
            </div>
          </div>
        </section>

        {/* QA Services Grid */}
        <section className="py-20 md:py-28 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Cakupan Pengujian</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Layanan Pengujian yang <span className="gradient-text">Kami Sediakan</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {QA_SERVICES.map((t) => (
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

        {/* QA Benefits */}
        <section className="py-20 md:py-28 bg-[#F8F9FB] border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Nilai Tambah</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Kenapa Memilih QA Engineer <span className="gradient-text">Lumi Beta Works</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {QA_BENEFITS.map((b) => (
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

        {/* Case Studies */}
        <section className="py-20 md:py-28 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Studi Kasus Nyata</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Sistem yang <span className="gradient-text">Telah Kami Uji</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {QA_CASES.map((c) => (
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
                Lihat Seluruh Portofolio QA &amp; Software
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
              <span className="section-tag mb-3 inline-block">FAQ QA Testing</span>
              <h2
                className="text-3xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Pertanyaan Seputar <span className="gradient-text">Jasa QA Testing</span>
              </h2>
            </div>

            <div className="space-y-4">
              {QA_FAQS.map((f, i) => (
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
