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
  title: "Layanan Vendor IT & Rekayasa Perangkat Lunak Terpercaya — Lumi Beta Works",
  description:
    "Solusi lengkap pembuatan website perusahaan, aplikasi mobile iOS & Android, QA testing enterprise, dan konsultasi IT profesional. Kualitas tinggi, tepat waktu, & bergaransi.",
  alternates: { canonical: "https://lumibetaworks.id/layanan" },
  keywords: [
    "vendor it perusahaan",
    "jasa buat website perusahaan",
    "vendor pembuatan aplikasi mobile",
    "jasa qa testing software",
    "konsultan it indonesia",
    "software house jakarta",
    "software house b2b",
  ],
  openGraph: {
    title: "Layanan Vendor IT & Rekayasa Perangkat Lunak — Lumi Beta Works",
    description:
      "Jasa pembuatan website corporate, aplikasi mobile custom, QA testing berstandar industri, dan konsultasi arsitektur IT.",
    url: "https://lumibetaworks.id/layanan",
  },
};

const SERVICES_LIST = [
  {
    id: "website",
    title: "Jasa Pembuatan Website Corporate & Instansi",
    badge: "Most Popular",
    badgeColor: "#2DD9A4",
    summary:
      "Website modern berkecepatan tinggi (<1s load time), SEO-ready, dan aman untuk meningkatkan kredibilitas dan konversi bisnis Anda.",
    deliverables: [
      "Company Profile & Portal Publik Instansi",
      "Landing Page Konversi Tinggi & E-Catalog",
      "Integrasi CMS & Dashboard Admin Custom",
      "Optimasi SEO Score 95+ & Mobile Responsive",
    ],
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase"],
    sla: "10–20 Hari Kerja",
    href: "/layanan/website",
    waMessage: "Halo Lumi Beta Works, saya ingin konsultasi pembuatan Website Perusahaan.",
  },
  {
    id: "aplikasi",
    title: "Vendor Pembuatan Aplikasi Mobile (Android & iOS)",
    badge: "Cross-Platform",
    badgeColor: "#6C63FF",
    summary:
      "Aplikasi mobile native & Flutter dengan arsitektur scalable, UI/UX intuitif, sinkronisasi offline, dan integrasi API yang lancar.",
    deliverables: [
      "Aplikasi Bisnis & Operasional Internal",
      "E-Commerce, Booking, & On-Demand Service",
      "Push Notification & Realtime Data Sync",
      "Bantuan Publikasi Google Play & Apple App Store",
    ],
    tech: ["Flutter", "Dart", "REST API", "Firebase / Supabase"],
    sla: "25–45 Hari Kerja",
    href: "/layanan/aplikasi",
    waMessage: "Halo Lumi Beta Works, saya ingin konsultasi pembuatan Aplikasi Mobile.",
  },
  {
    id: "qa-testing",
    title: "Software QA Testing & Audit Kualitas Enterprise",
    badge: "Zero-Bug Guarantee",
    badgeColor: "#3BB5C5",
    summary:
      "Pengujian manual dan otomatis menyeluruh untuk memastikan software Anda bebas dari bug kritis, aman dari celah, dan stabil saat trafik tinggi.",
    deliverables: [
      "Functional & Regression Testing Menyeluruh",
      "Automation E2E Testing (Playwright / Cypress)",
      "API Performance & Stress Load Testing",
      "Laporan Defect Rinci & Rekomendasi Perbaikan",
    ],
    tech: ["Playwright", "Postman", "Jira", "K6 Load Test"],
    sla: "5–15 Hari Kerja",
    href: "/layanan/qa-testing",
    waMessage: "Halo Lumi Beta Works, saya ingin konsultasi layanan QA Testing & Security Audit.",
  },
  {
    id: "konsultasi",
    title: "IT Consulting & Modernisasi Sistem Legacy",
    badge: "Strategic Advisory",
    badgeColor: "#F59E0B",
    summary:
      "Bimbingan teknikal mendalam untuk arsitektur cloud, refactoring sistem lama, audit keamanan, dan optimasi performa database.",
    deliverables: [
      "Audit Arsitektur Kode & Infrastruktur Cloud",
      "Perencanaan Migrasi Database & Cloud Modern",
      "Optimasi Kecepatan & Efisiensi Server",
      "Technical Roadmapping & Tech Stack Advisory",
    ],
    tech: ["System Design", "PostgreSQL", "Cloud Arch", "Docker"],
    sla: "Fleksibel / Sesuai Scope",
    href: "/layanan/konsultasi",
    waMessage: "Halo Lumi Beta Works, saya ingin konsultasi arsitektur IT dan modernisasi sistem.",
  },
];

const WORKFLOW = [
  {
    step: "01",
    title: "Discovery & Konsultasi Gratis",
    desc: "Kami mendiskusikan kebutuhan bisnis, flow sistem, target timeline, dan memberikan estimasi transparan tanpa komitmen.",
  },
  {
    step: "02",
    title: "Prototype UI/UX & Arsitektur",
    desc: "Merancang wireframe interaktif dan skema database agar Anda memiliki visualisasi nyata sebelum coding dimulai.",
  },
  {
    step: "03",
    title: "Development & Pengujian QA Ketat",
    desc: "Penulisan kode berstandar clean architecture disertai pengujian berkala untuk menjamin software bebas dari kendala.",
  },
  {
    step: "04",
    title: "Deployment, Serah Terima & Garansi",
    desc: "Peluncuran ke server produksi, dokumentasi lengkap, panduan tim internal, dan garansi perbaikan pasca rilis.",
  },
];

const FAQS = [
  {
    q: "Berapa estimasi biaya pembuatan website atau aplikasi di Lumi Beta Works?",
    a: "Biaya disesuaikan secara transparan berdasarkan kompleksitas fitur, jumlah halaman/layar, dan integrasi yang dibutuhkan. Kami selalu memberikan rincian scope of work di awal tanpa biaya tersembunyi.",
  },
  {
    q: "Apakah source code dan hak cipta sepenuhnya menjadi milik klien?",
    a: "Ya, 100%. Seluruh source code, aset desain, akses repositori, dan lisensi menjadi milik penuh Anda setelah proyek selesai dan serah terima dilakukan.",
  },
  {
    q: "Bagaimana sistem garansi dan maintenance setelah serah terima?",
    a: "Kami memberikan garansi perbaikan bug gratis pasca peluncuran serta menyediakan paket maintenance berkala untuk pembaruan fitur, optimasi server, dan backup rutin.",
  },
  {
    q: "Bisakah Lumi Beta Works menandatangani Non-Disclosure Agreement (NDA)?",
    a: "Tentu saja. Kami sangat menghormati privasi, kerahasiaan data, dan hak kekayaan intelektual (IP) bisnis serta instansi klien kami.",
  },
];

export default async function LayananPage() {
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
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
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
            <span className="section-tag mb-4 inline-block">Layanan Digital &amp; Vendor IT</span>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#101828] leading-[1.18] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Solusi Rekayasa Perangkat Lunak yang{" "}
              <span className="gradient-text">Terukur &amp; Berkelas</span>
            </h1>
            <p
              className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Dari website corporate berkecepatan tinggi, aplikasi mobile custom, hingga audit QA berstandar enterprise — kami membantu bisnis dan instansi Anda melangkah lebih cepat dengan teknologi yang handal.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-gray-600">
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
                <span className="text-[#2DD9A4]">✓</span> Garansi Bebas Bug
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
                <span className="text-[#2DD9A4]">✓</span> 100% On-Time SLA
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
                <span className="text-[#2DD9A4]">✓</span> Hak Cipta Kode Milik Anda
              </span>
            </div>
          </div>
        </section>

        {/* Services Cards Grid */}
        <section className="py-20 md:py-28 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Cakupan Keahlian</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Pilih Solusi yang Sesuai dengan <span className="gradient-text">Kebutuhan Bisnis Anda</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {SERVICES_LIST.map((srv) => (
                <div
                  key={srv.id}
                  className="rounded-3xl border border-gray-200/90 bg-[#F8F9FB] p-7 sm:p-9 hover:bg-white hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: srv.badgeColor }}
                      >
                        {srv.badge}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                        ⏱️ SLA: {srv.sla}
                      </span>
                    </div>

                    <h3
                      className="text-xl sm:text-2xl font-bold text-[#101828] mb-3 group-hover:text-[#0E8B62] transition-colors"
                      style={{ fontFamily: "var(--font-rubik)" }}
                    >
                      {srv.title}
                    </h3>
                    <p
                      className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6"
                      style={{ fontFamily: "var(--font-opensans)" }}
                    >
                      {srv.summary}
                    </p>

                    {/* Deliverables */}
                    <div className="space-y-2.5 mb-6 bg-white p-4 sm:p-5 rounded-2xl border border-gray-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Yang Anda Dapatkan (Deliverables):
                      </p>
                      {srv.deliverables.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                          <span className="text-[#2DD9A4] font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                      <span className="text-xs font-semibold text-gray-400 mr-1">Stack:</span>
                      {srv.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 border border-gray-200/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-200/80">
                    <Link
                      href={srv.href}
                      className="btn-outline w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white"
                    >
                      Pelajari Rincian
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <a
                      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(srv.waMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                    >
                      Konsultasi Gratis
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-20 md:py-28 bg-[#F8F9FB] border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">SLA &amp; Alur Eksekusi</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Bagaimana Kami Mengeksekusi <span className="gradient-text">Proyek Anda</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-3">
                Proses terstruktur dan transparan memastikan pengerjaan selesai tepat waktu dengan kualitas tertinggi.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WORKFLOW.map((wf) => (
                <div
                  key={wf.step}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <span className="text-4xl font-extrabold text-[#2DD9A4]/30 block mb-3" style={{ fontFamily: "var(--font-rubik)" }}>
                      {wf.step}
                    </span>
                    <h3
                      className="font-bold text-[#101828] text-base mb-2"
                      style={{ fontFamily: "var(--font-rubik)" }}
                    >
                      {wf.title}
                    </h3>
                    <p
                      className="text-gray-500 text-xs sm:text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-opensans)" }}
                    >
                      {wf.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="section-tag mb-3 inline-block">FAQ Layanan</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Pertanyaan yang <span className="gradient-text">Sering Diajukan</span>
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#F8F9FB] border border-gray-100">
                  <h3
                    className="font-bold text-base sm:text-lg text-[#101828] mb-2"
                    style={{ fontFamily: "var(--font-rubik)" }}
                  >
                    {faq.q}
                  </h3>
                  <p
                    className="text-gray-600 text-sm sm:text-base leading-relaxed"
                    style={{ fontFamily: "var(--font-opensans)" }}
                  >
                    {faq.a}
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
