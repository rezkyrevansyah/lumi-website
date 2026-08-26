import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import ContactCTA from "@/components/sections/ContactCTA";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Jasa Buat Website Perusahaan & Instansi Terpercaya | Vendor IT Lumi",
  description:
    "Jasa pembuatan website perusahaan, corporate profile, dan portal instansi pemerintah. Desain modern, ultra cepat (<1s), aman, SEO friendly score 95+, dan bergaransi.",
  alternates: { canonical: "https://lumibetaworks.id/layanan/website" },
  keywords: [
    "jasa buat website perusahaan",
    "jasa pembuatan website corporate",
    "vendor website instansi pemerintah",
    "vendor it website jakarta",
    "web developer b2b indonesia",
    "jasa website custom nextjs",
  ],
  openGraph: {
    title: "Jasa Buat Website Perusahaan & Instansi | Lumi Beta Works",
    description:
      "Website corporate & instansi dengan performa tinggi, SEO optimal, dan desain eksklusif yang meningkatkan reputasi bisnis Anda.",
    url: "https://lumibetaworks.id/layanan/website",
  },
};

const WEB_TYPES = [
  {
    icon: "🏢",
    title: "Corporate Website & Company Profile",
    desc: "Membangun citra profesional perusahaan dengan desain elegan, copywriting berbobot, dan struktur halaman yang meyakinkan calon klien B2B serta investor.",
  },
  {
    icon: "🏛️",
    title: "Portal Publik & Website Instansi",
    desc: "Sistem portal web berstandar kepatuhan tinggi, navigasi ramah publik, transparansi informasi, dan ketahanan terhadap beban trafik tinggi.",
  },
  {
    icon: "🛍️",
    title: "E-Commerce & Digital Catalog",
    desc: "Platform katalog produk interaktif terintegrasi payment gateway otomatis, kalkulator ongkir, dan sistem manajemen pesanan yang mudah dioperasikan.",
  },
  {
    icon: "⚡",
    title: "Custom Web Application & Dashboard",
    desc: "Aplikasi web internal custom untuk operasional bisnis, manajemen data karyawan, sistem absensi, hingga dashboard analitik real-time.",
  },
];

const WEB_FRAMEWORKS = [
  {
    name: "PHP & Laravel",
    role: "Backend & Full-Stack",
    desc: "Ekosistem matang, arsitektur MVC teruji, keamanan terpercaya, sangat ideal untuk website corporate, portal instansi, & aplikasi bisnis.",
    badge: "Enterprise Standard",
  },
  {
    name: ".NET (C# / ASP.NET Core)",
    role: "Enterprise Corporate",
    desc: "Performa tinggi, strong typing, arsitektur enterprise tangguh, dan integrasi mulus dengan ekosistem infrastruktur Microsoft.",
    badge: "High Performance",
  },
  {
    name: "React.js & Next.js",
    role: "Modern SSR & Speed",
    desc: "Server-Side Rendering kilat (<1s load time), optimasi SEO kelas dunia, dan antarmuka interaktif yang dinamis.",
    badge: "Speed & SEO",
  },
  {
    name: "Angular & TypeScript",
    role: "Large-Scale SPA",
    desc: "Framework modular dari Google dengan dependency injection yang kokoh untuk portal dan sistem internal berskala enterprise.",
    badge: "Modular & Robust",
  },
  {
    name: "Vue.js & Nuxt",
    role: "Reactive Frontend",
    desc: "Pengembangan antarmuka reaktif yang ramping, fleksibel, dan sangat cepat untuk aplikasi web interaktif & dashboard.",
    badge: "Lightweight",
  },
  {
    name: "Node.js & Python",
    role: "API & Microservices",
    desc: "Pembangunan REST/GraphQL API berkecepatan tinggi (NestJS/Express) hingga pengolahan data dan integrasi AI (FastAPI/Django).",
    badge: "Scalable API",
  },
];

const WEB_STANDARDS = [
  {
    title: "Ultra Fast Performance (<1s Load Time)",
    desc: "Dibangun dengan Next.js App Router dan Server-Side Rendering (SSR) untuk kecepatan muat kilat tanpa jeda.",
  },
  {
    title: "SEO Ready (Score 95+)",
    desc: "Struktur semantik HTML5, Open Graph, meta tags dinamis, sitemap otomatis, dan schema JSON-LD untuk ranking Google maksimal.",
  },
  {
    title: "100% Mobile Responsive",
    desc: "Tampilan beradaptasi mulus di semua ukuran layar: smartphone, tablet, laptop, hingga monitor ultrawide.",
  },
  {
    title: "Keamanan Tingkat Tinggi (SSL & Anti-XSS)",
    desc: "Perlindungan data terenkripsi, sanitasi input ketat, proteksi serangan brute force, dan backup berkala.",
  },
  {
    title: "CMS / Admin Panel yang Mudah Digunakan",
    desc: "Kelola konten, berita, layanan, dan portofolio Anda secara mandiri tanpa perlu menyentuh baris kode.",
  },
  {
    title: "Garansi & Pendampingan Pasca Serah Terima",
    desc: "Garansi perbaikan bug dan sesi pelatihan gratis untuk tim internal Anda.",
  },
];

const CASE_STUDIES = [
  {
    name: "BAZNAS National Portal",
    category: "Portal Publik & Crowdfunding",
    result: "Menangani puluhan ribu donatur aktif dengan uptime 99.9% dan pengujian performa ketat.",
  },
  {
    name: "EKRAF Hub Ecosystem",
    category: "Government Platform (Kemenparekraf)",
    result: "Ekosistem terintegrasi data pelaku ekonomi kreatif Indonesia dengan Single Sign-On (SSO).",
  },
  {
    name: "Website Masjid Al Arqam",
    category: "Community & Donation Platform",
    result: "Platform informasi kegiatan, jadwal, dan transparansi laporan keuangan masjid modern.",
  },
  {
    name: "Yoonjae Space Studio",
    category: "Studio Booking & Finance",
    result: "Peningkatan booking online dan kemudahan manajemen inventaris studio kreatif.",
  },
];

const WEB_FAQS = [
  {
    q: "Berapa lama proses pembuatan website perusahaan di Lumi?",
    a: "Rata-rata memakan waktu 10 hingga 20 hari kerja tergantung jumlah halaman dan integrasi fitur yang dibutuhkan.",
  },
  {
    q: "Apakah website yang dibuat sudah termasuk domain dan hosting?",
    a: "Kami dapat membantu pengadaan domain (.com, .id, .co.id) serta konfigurasi cloud server berkecepatan tinggi, atau menggunakan infrastruktur server milik perusahaan Anda.",
  },
  {
    q: "Apakah kami bisa mengupdate konten website sendiri nanti?",
    a: "Ya! Kami melengkapi website Anda dengan dashboard Admin CMS yang sangat ramah pengguna, lengkap dengan panduan video/manual penggunaan.",
  },
];

export default async function JasaWebsitePage() {
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
    mainEntity: WEB_FAQS.map((f) => ({
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
              <span className="text-[#0E8B62]">Website Perusahaan</span>
            </div>

            <span className="section-tag mb-4 inline-block">Jasa Pembuatan Website Corporate</span>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#101828] leading-[1.18] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Jasa Buat Website Perusahaan &amp; Instansi{" "}
              <span className="gradient-text">Terpercaya</span>
            </h1>
            <p
              className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Kami membangun website corporate yang tidak hanya tampil mewah dan elegan, tetapi juga dioptimasi untuk kecepatan muat kilat, keamanan tingkat enterprise, dan peringkat tinggi di Google.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${whatsapp}?text=Halo+Lumi+Beta+Works,+saya+ingin+konsultasi+pembuatan+Website+Perusahaan.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-emerald-500/20 w-full sm:w-auto"
              >
                Konsultasi Website Gratis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/portfolio"
                className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold bg-white border-gray-200 text-[#3D3E4A] hover:bg-gray-50 w-full sm:w-auto"
              >
                Lihat Contoh Portfolio Website
              </Link>
            </div>
          </div>
        </section>

        {/* Website Types Grid */}
        <section className="py-20 md:py-28 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Kategori Solusi</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Tipe Website yang <span className="gradient-text">Kami Kembangkan</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WEB_TYPES.map((t) => (
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

        {/* Multi-Stack & Frameworks Section */}
        <section className="py-20 md:py-28 bg-[#F0FDF4]/40 border-b border-emerald-100/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Fleksibilitas Framework</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Pilihan Tech Stack &amp; Framework <span className="gradient-text">Sesuai Kebutuhan Anda</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-3" style={{ fontFamily: "var(--font-opensans)" }}>
                Kami menguasai spektrum teknologi web yang luas dari stack enterprise hingga ekosistem modern. Anda bebas menentukan teknologi yang paling cocok untuk tim, server, dan standar internal perusahaan Anda.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WEB_FRAMEWORKS.map((fw) => (
                <div
                  key={fw.name}
                  className="bg-white p-6 sm:p-7 rounded-3xl border border-emerald-100/80 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {fw.badge}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{fw.role}</span>
                    </div>

                    <h3
                      className="font-bold text-[#101828] text-lg mb-2"
                      style={{ fontFamily: "var(--font-rubik)" }}
                    >
                      {fw.name}
                    </h3>
                    <p
                      className="text-gray-500 text-xs sm:text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-opensans)" }}
                    >
                      {fw.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
                Memiliki stack internal spesifik atau ingin konsultasi arsitektur terbaik untuk skala proyek Anda?{" "}
                <a
                  href={`https://wa.me/${whatsapp}?text=Halo%20Lumi%20Beta%20Works,%20saya%20ingin%20konsultasi%20pemilihan%20tech%20stack%20website%20(Laravel/.NET/Next.js/Angular).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E8B62] font-bold underline hover:text-[#2DD9A4]"
                >
                  Konsultasikan gratis dengan Tech Lead kami
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Standards & Features */}
        <section className="py-20 md:py-28 bg-[#F8F9FB] border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Standar Kualitas</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Standar Kualitas Eksekusi <span className="gradient-text">Lumi Beta Works</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WEB_STANDARDS.map((s) => (
                <div key={s.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#2DD9A4] font-bold text-lg">✓</span>
                    <h3 className="font-bold text-[#101828] text-base" style={{ fontFamily: "var(--font-rubik)" }}>
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed pl-6" style={{ fontFamily: "var(--font-opensans)" }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Relevant Case Studies */}
        <section className="py-20 md:py-28 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-tag mb-3 inline-block">Bukti Nyata</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Proyek Website yang <span className="gradient-text">Telah Kami Sukseskan</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CASE_STUDIES.map((c) => (
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
                Jelajahi Semua 17+ Portofolio Kami
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
              <span className="section-tag mb-3 inline-block">FAQ Website</span>
              <h2
                className="text-3xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Pertanyaan Seputar <span className="gradient-text">Jasa Buat Website</span>
              </h2>
            </div>

            <FAQAccordion items={WEB_FAQS} defaultOpenIndex={0} />
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
      <FloatingWA whatsapp={whatsapp} />
    </>
  );
}
