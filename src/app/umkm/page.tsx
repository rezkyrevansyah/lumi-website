import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import FloatingWA from "@/components/FloatingWA";
import ContactCTA from "@/components/sections/ContactCTA";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { PORTFOLIO } from "@/lib/data";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import UMKMHero from "@/components/umkm/UMKMHero";
import UMKMStats from "@/components/umkm/UMKMStats";
import UMKMStory from "@/components/umkm/UMKMStory";
import UMKMUseCases from "@/components/umkm/UMKMUseCases";
import UMKMWhyUs from "@/components/umkm/UMKMWhyUs";
import UMKMProcess from "@/components/umkm/UMKMProcess";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Solusi Teknologi UMKM & Bisnis Menengah | Lumi Beta Works",
  description:
    "Jasa pembuatan sistem kasir (POS), inventaris, dashboard keuangan, website booking, dan toko online untuk UMKM. Harga menyesuaikan skala bisnis, dengan pendampingan pasca rilis.",
  alternates: { canonical: "https://lumibetaworks.id/umkm" },
  keywords: [
    "jasa buat website umkm",
    "sistem kasir pos custom",
    "aplikasi inventaris toko",
    "dashboard keuangan umkm",
    "website booking barbershop salon",
    "aplikasi crm pelanggan umkm",
    "jasa pembuatan website toko online",
    "software house umkm jakarta",
  ],
  openGraph: {
    title: "Solusi Teknologi UMKM | Lumi Beta Works",
    description: "Sistem kasir, inventaris, booking, dan toko online yang dirancang sesuai skala UMKM Anda.",
    url: "https://lumibetaworks.id/umkm",
  },
};

const UMKM_FAQS = [
  {
    q: "Berapa kira-kira biaya untuk membuatkan sistem bagi UMKM saya?",
    a: "Biaya disesuaikan dengan skala dan kompleksitas kebutuhan bisnis Anda — bukan disamakan dengan tarif proyek enterprise. Konsultasikan kebutuhan Anda dulu, kami akan berikan estimasi transparan tanpa komitmen.",
  },
  {
    q: "Apakah bisa mengerjakan sistem secara bertahap sesuai anggaran?",
    a: "Bisa. Kami biasa memulai dari fitur paling mendesak (misalnya kasir & stok) lebih dulu, lalu menambah modul lain (keuangan, CRM, dsb.) secara bertahap ketika bisnis Anda sudah siap.",
  },
  {
    q: "Saya tidak paham teknis, apakah tetap bisa menggunakan sistemnya?",
    a: "Ya. Setiap sistem yang kami buat dilengkapi antarmuka yang mudah dipakai serta panduan penggunaan untuk tim Anda, tanpa perlu latar belakang teknis.",
  },
  {
    q: "Berapa lama waktu pengerjaan sistem untuk UMKM?",
    a: "Rata-rata 2 hingga 6 minggu, tergantung jumlah fitur dan kompleksitas sistem. Kami informasikan estimasi waktu yang jelas sejak awal konsultasi.",
  },
  {
    q: "Apakah ada dukungan setelah sistem selesai dan dipakai?",
    a: "Ada. Kami memberikan garansi perbaikan bug dan pendampingan pemakaian, sehingga Anda tidak ditinggal sendirian setelah serah terima.",
  },
];

const UMKM_CASE_STUDY_TITLES = [
  "BaliPass",
  "Next Swimming School",
  "Robux Indo Store",
  "YoonjaeSpace Studio",
  "Athro Barbershop",
];

export default async function UMKMPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: settings } = await supabase.from("settings").select("key, value");

  const getSetting = (key: string) => settings?.find((s) => s.key === key)?.value || "";
  const whatsapp = getSetting("whatsapp") || "62882015884006";

  const caseStudies = UMKM_CASE_STUDY_TITLES.map((title) => PORTFOLIO.find((p) => p.title === title)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: UMKM_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BackgroundBlobs />
      <Navbar />
      <main className="flex-1 bg-white pt-24 min-h-screen">
        <UMKMHero whatsapp={whatsapp} />
        <UMKMStats />
        <UMKMStory />
        <UMKMUseCases />
        <UMKMWhyUs />
        <UMKMProcess />

        {/* Case Studies Section */}
        <section id="studi-kasus" className="py-20 sm:py-24 bg-[#F0FDF4]/30 border-y border-emerald-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <span className="section-tag mb-3 inline-block">Studi Kasus</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828] mb-4"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Mereka yang Telah <span className="text-[#0E8B62]">Percaya Kami</span>
              </h2>
              <p className="text-gray-600 text-base" style={{ fontFamily: "var(--font-opensans)" }}>
                Bukti nyata dari dedikasi kami membantu digitalisasi bisnis kecil dan menengah.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((proj, i) => (
                <PortfolioCard key={proj.title} proj={proj} index={i} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="text-[#0E8B62] font-semibold hover:text-[#2DD9A4] transition-colors underline underline-offset-4"
              >
                Lihat Portfolio Lainnya &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-tag mb-3 inline-block">Pertanyaan Umum</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Masih Ada yang Ingin Ditanyakan?
              </h2>
            </div>
            <FAQAccordion items={UMKM_FAQS} defaultOpenIndex={0} />
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
      <FloatingWA whatsapp={whatsapp} />
    </>
  );
}
