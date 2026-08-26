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
  title: "Solusi Teknologi UMKM & Bisnis Menengah | Lumi Beta Works",
  description:
    "Transformasi digital terjangkau untuk UMKM. Layanan pembuatan website booking (salon/barbershop), sistem POS kasir toko, dan company profile. Cepat, tepat, dan tanpa basa-basi.",
  alternates: { canonical: "https://lumibetaworks.id/umkm" },
  keywords: [
    "jasa buat website umkm",
    "sistem kasir pos custom",
    "website booking barbershop salon",
    "aplikasi umkm murah berkualitas",
    "jasa pembuatan website toko online",
    "software house umkm jakarta",
  ],
  openGraph: {
    title: "Solusi Teknologi UMKM | Lumi Beta Works",
    description: "Website & Sistem Kasir khusus untuk memaksimalkan operasional UMKM Anda.",
    url: "https://lumibetaworks.id/umkm",
  },
};

const UMKM_USECASES = [
  {
    icon: "📅",
    title: "Website Booking & Reservasi",
    desc: "Sistem reservasi otomatis yang siap 24/7. Sangat cocok untuk Barbershop, Salon, Spa, Massage, atau Klinik. Kelola jadwal tanpa repot.",
    tags: ["Barbershop", "Salon & Spa", "Klinik Praktik"],
  },
  {
    icon: "💻",
    title: "Sistem Kasir (POS) & Inventori",
    desc: "Aplikasi kasir ringan, cepat, dan berbasis web. Catat transaksi harian, pantau stok barang real-time, dan cetak struk langsung dari sistem.",
    tags: ["F&B / Cafe", "Toko Retail", "Minimarket"],
  },
  {
    icon: "🌐",
    title: "Website Profil Bisnis & Katalog",
    desc: "Tampil profesional di Google. Beri tahu pelanggan siapa Anda dan apa produk Anda melalui website yang cepat, elegan, dan ramah SEO.",
    tags: ["Company Profile", "Katalog Produk", "Jasa Profesional"],
  },
];

const UMKM_PORTFOLIO = [
  {
    name: "YoonjaeSpace Studio",
    category: "Website Booking Studio",
    desc: "Sistem reservasi studio foto otomatis dengan pemilihan jadwal real-time.",
  },
  {
    name: "Artho",
    category: "Aplikasi Kasir (POS)",
    desc: "Sistem point of sales untuk pencatatan transaksi kasir dan manajemen stok harian.",
  },
  {
    name: "Robux IndoStore",
    category: "Toko Digital (Top-up)",
    desc: "Website e-commerce transaksi cepat untuk pembelian aset digital dengan gateway pembayaran.",
  },
];

export default async function UMKMPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: settings } = await supabase.from("settings").select("key, value");

  const getSetting = (key: string) => settings?.find((s) => s.key === key)?.value || "";
  const whatsapp = getSetting("whatsapp") || "62882015884006";

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white pt-24 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
          <BackgroundBlobs />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="section-tag mb-4 inline-block bg-emerald-50 text-emerald-700 border-emerald-200">
                Solusi Khusus UMKM
              </span>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#101828] leading-tight mb-6"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Transformasi Digital Bisnis Anda. <br className="hidden sm:block" />
                <span className="gradient-text">Tanpa Basa-Basi.</span>
              </h1>
              <p
                className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                Kami lahir dari semangat kemandirian dan memahami tantangan bisnis berkembang. Kami siap membangun sistem kasir, website reservasi, hingga katalog digital yang mempercepat pertumbuhan bisnis Anda dengan harga terjangkau.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${whatsapp}?text=Halo%20Lumi%20Beta%20Works,%20saya%20pemilik%20UMKM%20dan%20butuh%20solusi%20website/aplikasi.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Konsultasi Kebutuhan Bisnis
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-14 max-w-2xl">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#101828] mb-4"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Apa yang Bisa Kami Bangun <span className="text-[#2DD9A4]">Untuk Anda?</span>
              </h2>
              <p className="text-gray-600 text-base" style={{ fontFamily: "var(--font-opensans)" }}>
                Berikan kemudahan bagi pelanggan dan tim operasional Anda melalui sistem otomasi yang tepat guna.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {UMKM_USECASES.map((uc) => (
                <div
                  key={uc.title}
                  className="bg-[#F8F9FB] rounded-2xl p-6 sm:p-8 border border-gray-100 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-4xl mb-4 block">{uc.icon}</span>
                    <h3
                      className="text-xl font-bold text-[#101828] mb-3"
                      style={{ fontFamily: "var(--font-rubik)" }}
                    >
                      {uc.title}
                    </h3>
                    <p
                      className="text-gray-600 text-sm leading-relaxed mb-6"
                      style={{ fontFamily: "var(--font-opensans)" }}
                    >
                      {uc.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200/60">
                    {uc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 bg-[#F0FDF4]/30 border-y border-emerald-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14 max-w-2xl mx-auto">
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

            <div className="grid sm:grid-cols-3 gap-6">
              {UMKM_PORTFOLIO.map((port) => (
                <div
                  key={port.name}
                  className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-[11px] font-bold text-[#0E8B62] uppercase tracking-wider block mb-2">
                    {port.category}
                  </span>
                  <h3
                    className="font-bold text-lg text-[#101828] mb-2"
                    style={{ fontFamily: "var(--font-rubik)" }}
                  >
                    {port.name}
                  </h3>
                  <p
                    className="text-gray-500 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-opensans)" }}
                  >
                    {port.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/portfolio" className="text-[#0E8B62] font-semibold hover:text-[#2DD9A4] transition-colors underline underline-offset-4">
                Lihat Portfolio Lainnya &rarr;
              </Link>
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
