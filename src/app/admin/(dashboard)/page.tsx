import Link from "next/link";
import Image from "next/image";
import { asc, desc, eq } from "drizzle-orm";
import {
  FolderKanban,
  CreditCard,
  MessageSquareQuote,
  Building2,
  Boxes,
  Languages,
  ArrowRight,
  Plus,
  Star,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { db } from "@/db";
import {
  portfolioItems,
  testimonials,
  pricingTiers,
  pricingFeatures,
  clientLogos,
  certifications,
  techStackItems,
  techStackCategories,
  translations,
} from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Fetch real-time metrics in parallel
  const [
    portfolioRows,
    testimonialRows,
    pricingTierRows,
    pricingFeatureRows,
    clientLogoRows,
    certRows,
    techItemRows,
    techCategoryRows,
    translationRows,
  ] = await Promise.all([
    db.select().from(portfolioItems).orderBy(asc(portfolioItems.sortOrder)),
    db.select().from(testimonials).orderBy(asc(testimonials.sortOrder)),
    db.select().from(pricingTiers).orderBy(asc(pricingTiers.sortOrder)),
    db.select().from(pricingFeatures).orderBy(asc(pricingFeatures.sortOrder)),
    db.select().from(clientLogos).orderBy(asc(clientLogos.sortOrder)),
    db.select().from(certifications).orderBy(asc(certifications.sortOrder)),
    db.select().from(techStackItems).orderBy(asc(techStackItems.sortOrder)),
    db.select().from(techStackCategories).orderBy(asc(techStackCategories.sortOrder)),
    db.select().from(translations),
  ]);

  // Derived metrics
  const totalPortfolio = portfolioRows.length;
  const publishedPortfolio = portfolioRows.filter((p) => p.isPublished).length;
  const featuredPortfolio = portfolioRows.filter((p) => p.featured).length;

  const totalTestimonials = testimonialRows.length;
  const avgRating =
    totalTestimonials > 0
      ? (
          testimonialRows.reduce((acc, curr) => acc + (curr.rating || 5), 0) /
          totalTestimonials
        ).toFixed(1)
      : "5.0";

  const totalPricingTiers = pricingTierRows.length;
  const totalPricingFeatures = pricingFeatureRows.length;

  const totalClientLogos = clientLogoRows.length;
  const totalCertifications = certRows.length;

  const totalTechItems = techItemRows.length;
  const totalTechCategories = techCategoryRows.length;

  const totalTranslations = translationRows.length;
  const uniqueNamespaces = Array.from(
    new Set(translationRows.map((t) => t.namespace))
  ).length;

  // Recent content
  const recentPortfolio = portfolioRows.slice(0, 4);
  const recentTestimonials = testimonialRows.slice(0, 3);

  const METRICS = [
    {
      title: "Portofolio Proyek",
      value: totalPortfolio,
      subtext: `${publishedPortfolio} publik, ${featuredPortfolio} unggulan`,
      icon: FolderKanban,
      href: "/admin/portfolio",
      color: "emerald",
    },
    {
      title: "Ulasan & Rating",
      value: avgRating,
      subtext: `${totalTestimonials} testimoni terverifikasi`,
      icon: MessageSquareQuote,
      href: "/admin/testimonials",
      color: "amber",
      isRating: true,
    },
    {
      title: "Paket & Harga",
      value: totalPricingTiers,
      subtext: `${totalPricingFeatures} poin fitur aktif`,
      icon: CreditCard,
      href: "/admin/pricing",
      color: "blue",
    },
    {
      title: "Mitra & Kredibilitas",
      value: totalClientLogos,
      subtext: `${totalCertifications} sertifikasi keahlian`,
      icon: Building2,
      href: "/admin/client-logos",
      color: "purple",
    },
    {
      title: "Tumpukan Teknologi",
      value: totalTechItems,
      subtext: `Terbagi di ${totalTechCategories} kategori`,
      icon: Boxes,
      href: "/admin/tech-stack",
      color: "indigo",
    },
    {
      title: "Lokalisasi & Teks",
      value: totalTranslations,
      subtext: `${uniqueNamespaces} namespace aktif (ID & EN)`,
      icon: Languages,
      href: "/admin/translations",
      color: "teal",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-8">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-50/50 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Lumi Beta Works
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              Selamat Datang di Panel Manajemen
            </h1>
            <p className="max-w-2xl text-xs text-zinc-600 sm:text-sm">
              Kelola seluruh konten, portofolio rekayasa digital, penawaran harga, dan teks dwibahasa secara terpusat untuk klien UMKM hingga enterprise.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-2 sm:pt-0">
            <Link
              href="/admin/portfolio"
              className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-zinc-800 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Proyek</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 active:scale-[0.98]"
            >
              <span>Pratinjau Situs</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-600" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <Link
              key={metric.title}
              href={metric.href}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-5 transition-all duration-150 hover:border-zinc-300 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-500">
                  {metric.title}
                </span>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-2 text-zinc-600 transition-colors group-hover:bg-zinc-100 group-hover:text-zinc-900">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-zinc-900">
                  {metric.value}
                </span>
                {metric.isRating && (
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                )}
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-zinc-600">{metric.subtext}</span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-600" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Portfolio & Recent Testimonials */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Recent Portfolio List */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs lg:col-span-7">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-sm font-bold text-zinc-900">
                Portofolio Terkini
              </h2>
              <p className="text-xs text-zinc-600">
                Koleksi proyek rekayasa yang siap dipublikasikan
              </p>
            </div>
            <Link
              href="/admin/portfolio"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <span>Kelola Semua</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-zinc-100">
            {recentPortfolio.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-600">
                Belum ada item portofolio.
              </div>
            ) : (
              recentPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 transition-colors hover:bg-zinc-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
                      <Image
                        src={item.imagePath}
                        alt={item.titleId}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900">
                          {item.titleId}
                        </span>
                        {item.featured && (
                          <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                            Unggulan
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-zinc-600">
                        <span className="capitalize">{item.category}</span>
                        <span>•</span>
                        <span>
                          {item.isPublished ? "Dipublikasikan" : "Draf"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/admin/portfolio"
                    className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Testimonials */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs lg:col-span-5">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-sm font-bold text-zinc-900">
                Testimoni Klien
              </h2>
              <p className="text-xs text-zinc-600">
                Feedback kepuasan dari mitra dan UMKM
              </p>
            </div>
            <Link
              href="/admin/testimonials"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {recentTestimonials.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-600">
                Belum ada testimoni.
              </div>
            ) : (
              recentTestimonials.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-3.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900">
                      {t.name}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-3 w-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] font-medium text-zinc-600">
                    {t.roleId}
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs italic text-zinc-600">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* System Status & Quick Links Grid */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold text-zinc-900">
          Infrastruktur & Status Sistem
        </h2>
        <p className="text-xs text-zinc-600">
          Parameter operasional situs dan koneksi basis data
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3.5">
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">
                PostgreSQL Supabase
              </div>
              <div className="text-[11px] text-zinc-600">
                Koneksi pooler aktif dan normal
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3.5">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
              <Languages className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">
                Dwibahasa (ID & EN)
              </div>
              <div className="text-[11px] text-zinc-600">
                next-intl sinkron dengan basis data
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3.5">
            <div className="rounded-lg bg-purple-100 p-2 text-purple-700">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">
                Sesi Terenkripsi
              </div>
              <div className="text-[11px] text-zinc-600">
                iron-session berbasis cookie aman
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
