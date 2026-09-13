export type NamespaceCategory = "homepage" | "pages" | "global" | "system";

export interface KeyMeta {
  label: string;
  type: "badge" | "heading" | "subheading" | "paragraph" | "button" | "stat" | "label" | "meta";
  group?: string;
  hint?: string;
}

export interface NamespaceMeta {
  namespace: string;
  label: string;
  desc: string;
  category: NamespaceCategory;
  categoryLabel: string;
  stepNumber?: number;
  positionLabel?: string;
  livePath: string;
  keysOrder: string[];
  keyMeta: Record<string, KeyMeta>;
}

export const NAMESPACE_CATEGORIES: { id: NamespaceCategory; label: string; desc: string }[] = [
  {
    id: "homepage",
    label: "Alur Beranda",
    desc: "10 seksi berurutan dari atas ke bawah sesuai tampilan layar Beranda.",
  },
  {
    id: "pages",
    label: "Halaman Khusus",
    desc: "Halaman tersendiri dengan URL dan rute navigasi mandiri.",
  },
  {
    id: "global",
    label: "Komponen Global",
    desc: "Header navigasi dan footer yang tampil di seluruh halaman situs.",
  },
  {
    id: "system",
    label: "SEO & Sistem",
    desc: "Pengaturan metadata pencarian Google dan tab browser.",
  },
];

export const TRANSLATION_REGISTRY: Record<string, NamespaceMeta> = {
  // ==========================================
  // ALUR BERANDA (HOMEPAGE FLOW)
  // ==========================================
  Hero: {
    namespace: "Hero",
    label: "Hero Section",
    desc: "Layar pembuka teratas: badge selamat datang, headline utama, deskripsi, tombol aksi, dan statistik.",
    category: "homepage",
    categoryLabel: "Alur Beranda",
    stepNumber: 1,
    positionLabel: "Posisi 01 • Layar Paling Atas",
    livePath: "/#top",
    keysOrder: [
      "badge",
      "title",
      "subtitle",
      "ctaPrimary",
      "ctaSecondary",
      "statOrders",
      "statClients",
      "statRehired",
    ],
    keyMeta: {
      badge: { label: "Badge Tagline Atas", type: "badge", hint: "Pill teks kecil di atas judul utama" },
      title: { label: "Judul Headline Utama", type: "heading", hint: "Teks besar pembuka di halaman depan" },
      subtitle: { label: "Subjudul / Paragraf Pengantar", type: "paragraph", hint: "Penjelasan ringkas fokus studio" },
      ctaPrimary: { label: "Tombol Aksi Utama", type: "button", hint: "Tombol hijau menuju WhatsApp" },
      ctaSecondary: { label: "Tombol Aksi Kedua", type: "button", hint: "Tombol sekunder menuju layanan" },
      statOrders: { label: "Label Statistik: Pesanan Selesai", type: "stat", hint: "Keterangan jumlah pesanan terselesaikan" },
      statClients: { label: "Label Statistik: Klien Terlayani", type: "stat", hint: "Keterangan jumlah total mitra bisnis" },
      statRehired: { label: "Label Statistik: Dipekerjakan Ulang", type: "stat", hint: "Persentase klien yang memesan kembali" },
    },
  },

  TrustedBy: {
    namespace: "TrustedBy",
    label: "Mitra & Klien",
    desc: "Marquee logo klien dan UMKM yang telah mempercayakan proyek teknologinya ke Lumi.",
    category: "homepage",
    categoryLabel: "Alur Beranda",
    stepNumber: 2,
    positionLabel: "Posisi 02 • Di Bawah Hero",
    livePath: "/#trusted-by",
    keysOrder: ["heading"],
    keyMeta: {
      heading: { label: "Judul Pengantar Logo", type: "heading", hint: "Teks kecil di atas deretan logo klien" },
    },
  },

  About: {
    namespace: "About",
    label: "Tentang & Filosofi",
    desc: "Cerita asal mula studio, komitmen kuat terhadap UMKM, dan 3 pilar: Lumi, Beta, Works.",
    category: "homepage",
    categoryLabel: "Alur Beranda",
    stepNumber: 3,
    positionLabel: "Posisi 03 • Setelah Mitra",
    livePath: "/#about",
    keysOrder: [
      "eyebrow",
      "title",
      "body1",
      "body2",
      "pillar1Title",
      "pillar1Body",
      "pillar2Title",
      "pillar2Body",
      "pillar3Title",
      "pillar3Body",
      "cta",
    ],
    keyMeta: {
      eyebrow: { label: "Kicker / Eyebrow", type: "badge", hint: "Label penanda seksi" },
      title: { label: "Judul Seksi", type: "heading", hint: "Headline utama seksi filosofi" },
      body1: { label: "Paragraf 1 (Latar Belakang)", type: "paragraph", hint: "Cerita awal mula dari freelancer" },
      body2: { label: "Paragraf 2 (Komitmen UMKM)", type: "paragraph", hint: "Komitmen terus melayani UMKM" },
      pillar1Title: { label: "Pilar 1: Judul", type: "subheading", group: "Tiga Pilar Brand" },
      pillar1Body: { label: "Pilar 1: Deskripsi", type: "paragraph", group: "Tiga Pilar Brand" },
      pillar2Title: { label: "Pilar 2: Judul", type: "subheading", group: "Tiga Pilar Brand" },
      pillar2Body: { label: "Pilar 2: Deskripsi", type: "paragraph", group: "Tiga Pilar Brand" },
      pillar3Title: { label: "Pilar 3: Judul", type: "subheading", group: "Tiga Pilar Brand" },
      pillar3Body: { label: "Pilar 3: Deskripsi", type: "paragraph", group: "Tiga Pilar Brand" },
      cta: { label: "Teks Tautan Selengkapnya", type: "button", hint: "Tautan menuju halaman profil lengkap" },
    },
  },

  Services: {
    namespace: "Services",
    label: "Layanan Rekayasa",
    desc: "Ikhtisar 4 pilar solusi: Web & App Dev, UI/UX Design, QA Testing, dan Konsultasi Teknis.",
    category: "homepage",
    categoryLabel: "Alur Beranda",
    stepNumber: 4,
    positionLabel: "Posisi 04 • Tengah Layar",
    livePath: "/#services",
    keysOrder: [
      "eyebrow",
      "title",
      "subtitle",
      "webDevTitle",
      "webDevBody",
      "uiuxTitle",
      "uiuxBody",
      "qaTitle",
      "qaBody",
      "consultingTitle",
      "consultingBody",
    ],
    keyMeta: {
      eyebrow: { label: "Kicker / Eyebrow", type: "badge" },
      title: { label: "Judul Seksi", type: "heading" },
      subtitle: { label: "Subjudul Seksi", type: "paragraph" },
      webDevTitle: { label: "Layanan 1: Judul", type: "subheading", group: "Kartu Layanan" },
      webDevBody: { label: "Layanan 1: Deskripsi", type: "paragraph", group: "Kartu Layanan" },
      uiuxTitle: { label: "Layanan 2: Judul", type: "subheading", group: "Kartu Layanan" },
      uiuxBody: { label: "Layanan 2: Deskripsi", type: "paragraph", group: "Kartu Layanan" },
      qaTitle: { label: "Layanan 3: Judul", type: "subheading", group: "Kartu Layanan" },
      qaBody: { label: "Layanan 3: Deskripsi", type: "paragraph", group: "Kartu Layanan" },
      consultingTitle: { label: "Layanan 4: Judul", type: "subheading", group: "Kartu Layanan" },
      consultingBody: { label: "Layanan 4: Deskripsi", type: "paragraph", group: "Kartu Layanan" },
    },
  },

  TechStack: {
    namespace: "TechStack",
    label: "Tech Stack & Keahlian",
    desc: "Kelompok teknologi modern yang digunakan: Frontend, Backend, Mobile & DB, Cloud DevOps.",
    category: "homepage",
    categoryLabel: "Alur Beranda",
    stepNumber: 5,
    positionLabel: "Posisi 05 • Setelah Layanan",
    livePath: "/#tech-stack",
    keysOrder: [
      "eyebrow",
      "title",
      "subtitle",
      "groupFrontend",
      "groupBackend",
      "groupMobileDb",
      "groupCloudDevops",
    ],
    keyMeta: {
      eyebrow: { label: "Kicker / Eyebrow", type: "badge" },
      title: { label: "Judul Seksi", type: "heading" },
      subtitle: { label: "Subjudul Seksi", type: "paragraph" },
      groupFrontend: { label: "Grup 1: Frontend", type: "label", group: "Kategori Stack" },
      groupBackend: { label: "Grup 2: Backend", type: "label", group: "Kategori Stack" },
      groupMobileDb: { label: "Grup 3: Mobile & Database", type: "label", group: "Kategori Stack" },
      groupCloudDevops: { label: "Grup 4: Cloud & DevOps", type: "label", group: "Kategori Stack" },
    },
  },

  Certifications: {
    namespace: "Certifications",
    label: "Sertifikasi Industri",
    desc: "Pill kepercayaan dan kredensial resmi penguasaan teknologi terverifikasi internasional.",
    category: "homepage",
    categoryLabel: "Alur Beranda",
    stepNumber: 6,
    positionLabel: "Posisi 06 • Di Dalam Tech Stack",
    livePath: "/#tech-stack",
    keysOrder: ["eyebrow", "title", "body", "verifiedBadge", "trustPill"],
    keyMeta: {
      eyebrow: { label: "Kicker / Badge", type: "badge" },
      title: { label: "Judul Showcase", type: "heading" },
      body: { label: "Penjelasan Kredensial", type: "paragraph" },
      verifiedBadge: { label: "Label Terverifikasi", type: "label" },
      trustPill: { label: "Pill Standar Kualitas", type: "badge" },
    },
  },

  Pricing: {
    namespace: "Pricing",
    label: "Paket & Investasi",
    desc: "Tiga paket investasi di Beranda: Landing Page, Custom Web App, dan Enterprise.",
    category: "homepage",
    categoryLabel: "Alur Beranda",
    stepNumber: 7,
    positionLabel: "Posisi 07 • Bagian Harga",
    livePath: "/#pricing",
    keysOrder: [
      "eyebrow",
      "title",
      "subtitle",
      "viewAll",
      // Paket Landing Page
      "landingBadge",
      "landingLabel",
      "landingName",
      "landingPricePrefix",
      "landingPrice",
      "landingTagline",
      "landingCta",
      "landingFeature1",
      "landingFeature2",
      "landingFeature3",
      "landingFeature4",
      "landingFeature5",
      // Paket Custom
      "customLabel",
      "customName",
      "customPricePrefix",
      "customPrice",
      "customTagline",
      "customCta",
      "customFeature1",
      "customFeature2",
      "customFeature3",
      "customFeature4",
      "customFeature5",
      // Paket Enterprise
      "enterpriseLabel",
      "enterpriseName",
      "enterprisePricePrefix",
      "enterprisePrice",
      "enterpriseTagline",
      "enterpriseCta",
      "enterpriseFeature1",
      "enterpriseFeature2",
      "enterpriseFeature3",
      "enterpriseFeature4",
    ],
    keyMeta: {
      eyebrow: { label: "Kicker / Eyebrow", type: "badge" },
      title: { label: "Judul Seksi", type: "heading" },
      subtitle: { label: "Subjudul Seksi", type: "paragraph" },
      viewAll: { label: "Tautan ke Rincian Lengkap", type: "button" },
      // Landing
      landingBadge: { label: "Badge Paket", type: "badge", group: "Paket 1: Landing Page" },
      landingLabel: { label: "Kategori Paket", type: "label", group: "Paket 1: Landing Page" },
      landingName: { label: "Nama Paket", type: "subheading", group: "Paket 1: Landing Page" },
      landingPricePrefix: { label: "Awalan Harga (Mulai Dari)", type: "label", group: "Paket 1: Landing Page" },
      landingPrice: { label: "Nominal Harga", type: "label", group: "Paket 1: Landing Page" },
      landingTagline: { label: "Deskripsi Singkat", type: "paragraph", group: "Paket 1: Landing Page" },
      landingCta: { label: "Teks Tombol Aksi", type: "button", group: "Paket 1: Landing Page" },
      landingFeature1: { label: "Fitur 1", type: "label", group: "Paket 1: Landing Page" },
      landingFeature2: { label: "Fitur 2", type: "label", group: "Paket 1: Landing Page" },
      landingFeature3: { label: "Fitur 3", type: "label", group: "Paket 1: Landing Page" },
      landingFeature4: { label: "Fitur 4", type: "label", group: "Paket 1: Landing Page" },
      landingFeature5: { label: "Fitur 5", type: "label", group: "Paket 1: Landing Page" },
      // Custom
      customLabel: { label: "Kategori Paket", type: "label", group: "Paket 2: Custom Web App" },
      customName: { label: "Nama Paket", type: "subheading", group: "Paket 2: Custom Web App" },
      customPricePrefix: { label: "Awalan Harga", type: "label", group: "Paket 2: Custom Web App" },
      customPrice: { label: "Nominal Harga", type: "label", group: "Paket 2: Custom Web App" },
      customTagline: { label: "Deskripsi Singkat", type: "paragraph", group: "Paket 2: Custom Web App" },
      customCta: { label: "Teks Tombol Aksi", type: "button", group: "Paket 2: Custom Web App" },
      customFeature1: { label: "Fitur 1", type: "label", group: "Paket 2: Custom Web App" },
      customFeature2: { label: "Fitur 2", type: "label", group: "Paket 2: Custom Web App" },
      customFeature3: { label: "Fitur 3", type: "label", group: "Paket 2: Custom Web App" },
      customFeature4: { label: "Fitur 4", type: "label", group: "Paket 2: Custom Web App" },
      customFeature5: { label: "Fitur 5", type: "label", group: "Paket 2: Custom Web App" },
      // Enterprise
      enterpriseLabel: { label: "Kategori Paket", type: "label", group: "Paket 3: Enterprise" },
      enterpriseName: { label: "Nama Paket", type: "subheading", group: "Paket 3: Enterprise" },
      enterprisePricePrefix: { label: "Awalan Harga", type: "label", group: "Paket 3: Enterprise" },
      enterprisePrice: { label: "Nominal Harga", type: "label", group: "Paket 3: Enterprise" },
      enterpriseTagline: { label: "Deskripsi Singkat", type: "paragraph", group: "Paket 3: Enterprise" },
      enterpriseCta: { label: "Teks Tombol Aksi", type: "button", group: "Paket 3: Enterprise" },
      enterpriseFeature1: { label: "Fitur 1", type: "label", group: "Paket 3: Enterprise" },
      enterpriseFeature2: { label: "Fitur 2", type: "label", group: "Paket 3: Enterprise" },
      enterpriseFeature3: { label: "Fitur 3", type: "label", group: "Paket 3: Enterprise" },
      enterpriseFeature4: { label: "Fitur 4", type: "label", group: "Paket 3: Enterprise" },
    },
  },

  Portfolio: {
    namespace: "Portfolio",
    label: "Portofolio Unggulan",
    desc: "Header galeri karya pilihan di Beranda, label kategori, dan tombol lihat galeri penuh.",
    category: "homepage",
    categoryLabel: "Alur Beranda",
    stepNumber: 8,
    positionLabel: "Posisi 08 • Karya Pilihan",
    livePath: "/#portfolio",
    keysOrder: [
      "eyebrow",
      "title",
      "subtitle",
      "categoryWebApp",
      "categoryUiux",
      "categoryQa",
      "viewMore",
    ],
    keyMeta: {
      eyebrow: { label: "Kicker / Eyebrow", type: "badge" },
      title: { label: "Judul Seksi", type: "heading" },
      subtitle: { label: "Subjudul Seksi", type: "paragraph" },
      categoryWebApp: { label: "Label Filter Web App", type: "label", group: "Filter Kategori" },
      categoryUiux: { label: "Label Filter UI/UX", type: "label", group: "Filter Kategori" },
      categoryQa: { label: "Label Filter QA", type: "label", group: "Filter Kategori" },
      viewMore: { label: "Tombol Lihat Galeri Penuh", type: "button" },
    },
  },

  Testimonials: {
    namespace: "Testimonials",
    label: "Testimoni Mitra",
    desc: "Header ulasan mitra UMKM dan klien korporasi serta badge penilaian bintang 5.",
    category: "homepage",
    categoryLabel: "Alur Beranda",
    stepNumber: 9,
    positionLabel: "Posisi 09 • Menjelang Bawah",
    livePath: "/#testimonials",
    keysOrder: ["eyebrow", "title", "subtitle", "ratingBadge"],
    keyMeta: {
      eyebrow: { label: "Kicker / Eyebrow", type: "badge" },
      title: { label: "Judul Seksi", type: "heading" },
      subtitle: { label: "Subjudul Seksi", type: "paragraph" },
      ratingBadge: { label: "Badge Rating Bintang", type: "badge" },
    },
  },

  FinalCta: {
    namespace: "FinalCta",
    label: "Ajakan Konsultasi Akhir",
    desc: "Banner penutup pra-footer yang mengajak calon klien segera berdiskusi via WhatsApp.",
    category: "homepage",
    categoryLabel: "Alur Beranda",
    stepNumber: 10,
    positionLabel: "Posisi 10 • Pra-Footer (Bawah)",
    livePath: "/#contact",
    keysOrder: ["title", "subtitle", "cta"],
    keyMeta: {
      title: { label: "Headline Ajakan", type: "heading" },
      subtitle: { label: "Keterangan Respons Cepat", type: "paragraph" },
      cta: { label: "Teks Tombol WhatsApp", type: "button" },
    },
  },

  // ==========================================
  // HALAMAN KHUSUS (DEDICATED FULL PAGES)
  // ==========================================
  ServicesPage: {
    namespace: "ServicesPage",
    label: "Halaman Layanan Lengkap",
    desc: "Katalog layanan mendalam, deliverable siap rilis, 4 tahapan alur kerja, dan ajakan kerja sama.",
    category: "pages",
    categoryLabel: "Halaman Khusus",
    positionLabel: "Rute: /services",
    livePath: "/services",
    keysOrder: [
      "metaTitle",
      "metaDescription",
      "breadcrumbHome",
      "breadcrumbCurrent",
      "eyebrow",
      "title",
      "subtitle",
      // Layanan 1
      "service1Title",
      "service1Desc",
      "service1Deliverables",
      // Layanan 2
      "service2Title",
      "service2Desc",
      "service2Deliverables",
      // Layanan 3
      "service3Title",
      "service3Desc",
      "service3Deliverables",
      // Layanan 4
      "service4Title",
      "service4Desc",
      "service4Deliverables",
      // Workflow
      "workflowEyebrow",
      "workflowTitle",
      "workflowSubtitle",
      "step1Title",
      "step1Desc",
      "step2Title",
      "step2Desc",
      "step3Title",
      "step3Desc",
      "step4Title",
      "step4Desc",
      // CTA
      "ctaTitle",
      "ctaSubtitle",
      "ctaPricelist",
      "ctaWa",
    ],
    keyMeta: {
      metaTitle: { label: "Judul Tab Browser (SEO Title)", type: "meta", group: "Header & Metadata" },
      metaDescription: { label: "Deskripsi Google (SEO Desc)", type: "meta", group: "Header & Metadata" },
      breadcrumbHome: { label: "Breadcrumb Beranda", type: "label", group: "Header & Metadata" },
      breadcrumbCurrent: { label: "Breadcrumb Layanan", type: "label", group: "Header & Metadata" },
      eyebrow: { label: "Kicker / Eyebrow", type: "badge", group: "Header & Metadata" },
      title: { label: "Judul Utama Halaman", type: "heading", group: "Header & Metadata" },
      subtitle: { label: "Subjudul Pengantar", type: "paragraph", group: "Header & Metadata" },

      service1Title: { label: "Solusi 1: Judul", type: "subheading", group: "Detail 4 Layanan" },
      service1Desc: { label: "Solusi 1: Deskripsi", type: "paragraph", group: "Detail 4 Layanan" },
      service1Deliverables: { label: "Solusi 1: Deliverables", type: "label", group: "Detail 4 Layanan" },

      service2Title: { label: "Solusi 2: Judul", type: "subheading", group: "Detail 4 Layanan" },
      service2Desc: { label: "Solusi 2: Deskripsi", type: "paragraph", group: "Detail 4 Layanan" },
      service2Deliverables: { label: "Solusi 2: Deliverables", type: "label", group: "Detail 4 Layanan" },

      service3Title: { label: "Solusi 3: Judul", type: "subheading", group: "Detail 4 Layanan" },
      service3Desc: { label: "Solusi 3: Deskripsi", type: "paragraph", group: "Detail 4 Layanan" },
      service3Deliverables: { label: "Solusi 3: Deliverables", type: "label", group: "Detail 4 Layanan" },

      service4Title: { label: "Solusi 4: Judul", type: "subheading", group: "Detail 4 Layanan" },
      service4Desc: { label: "Solusi 4: Deskripsi", type: "paragraph", group: "Detail 4 Layanan" },
      service4Deliverables: { label: "Solusi 4: Deliverables", type: "label", group: "Detail 4 Layanan" },

      workflowEyebrow: { label: "Kicker Alur Kerja", type: "badge", group: "Tahapan Pengerjaan" },
      workflowTitle: { label: "Judul Alur Kerja", type: "heading", group: "Tahapan Pengerjaan" },
      workflowSubtitle: { label: "Subjudul Alur Kerja", type: "paragraph", group: "Tahapan Pengerjaan" },
      step1Title: { label: "Langkah 1: Judul", type: "subheading", group: "Tahapan Pengerjaan" },
      step1Desc: { label: "Langkah 1: Deskripsi", type: "paragraph", group: "Tahapan Pengerjaan" },
      step2Title: { label: "Langkah 2: Judul", type: "subheading", group: "Tahapan Pengerjaan" },
      step2Desc: { label: "Langkah 2: Deskripsi", type: "paragraph", group: "Tahapan Pengerjaan" },
      step3Title: { label: "Langkah 3: Judul", type: "subheading", group: "Tahapan Pengerjaan" },
      step3Desc: { label: "Langkah 3: Deskripsi", type: "paragraph", group: "Tahapan Pengerjaan" },
      step4Title: { label: "Langkah 4: Judul", type: "subheading", group: "Tahapan Pengerjaan" },
      step4Desc: { label: "Langkah 4: Deskripsi", type: "paragraph", group: "Tahapan Pengerjaan" },

      ctaTitle: { label: "Judul Ajakan Kerja Sama", type: "heading", group: "Penutup Halaman" },
      ctaSubtitle: { label: "Keterangan Konsultasi", type: "paragraph", group: "Penutup Halaman" },
      ctaPricelist: { label: "Tombol Lihat Harga", type: "button", group: "Penutup Halaman" },
      ctaWa: { label: "Tombol WhatsApp", type: "button", group: "Penutup Halaman" },
    },
  },

  PortfolioPage: {
    namespace: "PortfolioPage",
    label: "Halaman Portofolio Lengkap",
    desc: "Galeri seluruh karya proyek, tombol filter kategori komprehensif, dan status kekosongan hasil.",
    category: "pages",
    categoryLabel: "Halaman Khusus",
    positionLabel: "Rute: /portfolio",
    livePath: "/portfolio",
    keysOrder: [
      "metaTitle",
      "metaDescription",
      "breadcrumbHome",
      "breadcrumbCurrent",
      "eyebrow",
      "title",
      "subtitle",
      "filterAll",
      "categoryWebApp",
      "categoryUiux",
      "categoryQa",
      "emptyState",
    ],
    keyMeta: {
      metaTitle: { label: "Judul Tab Browser (SEO Title)", type: "meta", group: "Header & Metadata" },
      metaDescription: { label: "Deskripsi Google (SEO Desc)", type: "meta", group: "Header & Metadata" },
      breadcrumbHome: { label: "Breadcrumb Beranda", type: "label", group: "Header & Metadata" },
      breadcrumbCurrent: { label: "Breadcrumb Portofolio", type: "label", group: "Header & Metadata" },
      eyebrow: { label: "Kicker / Eyebrow", type: "badge", group: "Header & Metadata" },
      title: { label: "Judul Utama Portofolio", type: "heading", group: "Header & Metadata" },
      subtitle: { label: "Subjudul Pengantar", type: "paragraph", group: "Header & Metadata" },
      filterAll: { label: "Filter: Semua Proyek", type: "label", group: "Filter Kategori" },
      categoryWebApp: { label: "Filter: Web Application", type: "label", group: "Filter Kategori" },
      categoryUiux: { label: "Filter: UI/UX Design", type: "label", group: "Filter Kategori" },
      categoryQa: { label: "Filter: QA Engineering", type: "label", group: "Filter Kategori" },
      emptyState: { label: "Teks Ketika Proyek Tidak Ditemukan", type: "paragraph", group: "Status Tampilan" },
    },
  },

  Pricelist: {
    namespace: "Pricelist",
    label: "Halaman Rincian Harga",
    desc: "Halaman daftar harga transparan, rincian item pekerjaan, dan tombol konsultasi kustom.",
    category: "pages",
    categoryLabel: "Halaman Khusus",
    positionLabel: "Rute: /pricelist",
    livePath: "/pricelist",
    keysOrder: [
      "metaTitle",
      "metaDescription",
      "breadcrumbHome",
      "breadcrumbCurrent",
      "eyebrow",
      "title",
      "subtitle",
      "ctaGeneric",
    ],
    keyMeta: {
      metaTitle: { label: "Judul Tab Browser (SEO Title)", type: "meta" },
      metaDescription: { label: "Deskripsi Google (SEO Desc)", type: "meta" },
      breadcrumbHome: { label: "Breadcrumb Beranda", type: "label" },
      breadcrumbCurrent: { label: "Breadcrumb Pricelist", type: "label" },
      eyebrow: { label: "Kicker / Eyebrow", type: "badge" },
      title: { label: "Judul Utama Halaman", type: "heading" },
      subtitle: { label: "Subjudul Transparansi Harga", type: "paragraph" },
      ctaGeneric: { label: "Tombol Konsultasi Paket", type: "button" },
    },
  },

  AboutPage: {
    namespace: "AboutPage",
    label: "Halaman Profil Perusahaan",
    desc: "Profil lengkap studio Lumi: filosofi nama, nilai standar kerja, rekam jejak angka, dan kontak.",
    category: "pages",
    categoryLabel: "Halaman Khusus",
    positionLabel: "Rute: /about",
    livePath: "/about",
    keysOrder: [
      "metaTitle",
      "metaDescription",
      "breadcrumbHome",
      "breadcrumbCurrent",
      "eyebrow",
      "title",
      "subtitle",
      // Cerita & Filosofi
      "storyBadge",
      "storyTitle",
      "storyP1",
      "storyP2",
      "pillarLumiTitle",
      "pillarLumiDesc",
      "pillarBetaTitle",
      "pillarBetaDesc",
      "pillarWorksTitle",
      "pillarWorksDesc",
      // Nilai Kerja
      "valuesEyebrow",
      "valuesTitle",
      "val1Title",
      "val1Desc",
      "val2Title",
      "val2Desc",
      "val3Title",
      "val3Desc",
      // Rekam Jejak
      "statsEyebrow",
      "statsTitle",
      "statOrders",
      "statClients",
      "statRehired",
      "statRating",
      // CTA
      "ctaTitle",
      "ctaSubtitle",
      "ctaButton",
    ],
    keyMeta: {
      metaTitle: { label: "Judul Tab Browser (SEO Title)", type: "meta", group: "Header & Metadata" },
      metaDescription: { label: "Deskripsi Google (SEO Desc)", type: "meta", group: "Header & Metadata" },
      breadcrumbHome: { label: "Breadcrumb Beranda", type: "label", group: "Header & Metadata" },
      breadcrumbCurrent: { label: "Breadcrumb Tentang", type: "label", group: "Header & Metadata" },
      eyebrow: { label: "Kicker / Eyebrow", type: "badge", group: "Header & Metadata" },
      title: { label: "Judul Utama Halaman", type: "heading", group: "Header & Metadata" },
      subtitle: { label: "Subjudul Filosofi", type: "paragraph", group: "Header & Metadata" },

      storyBadge: { label: "Badge Kisah Studio", type: "badge", group: "Cerita & Filosofi" },
      storyTitle: { label: "Judul Cerita", type: "heading", group: "Cerita & Filosofi" },
      storyP1: { label: "Paragraf 1 (Latar Freelance)", type: "paragraph", group: "Cerita & Filosofi" },
      storyP2: { label: "Paragraf 2 (Komitmen UMKM)", type: "paragraph", group: "Cerita & Filosofi" },
      pillarLumiTitle: { label: "Pilar Lumi: Judul", type: "subheading", group: "Cerita & Filosofi" },
      pillarLumiDesc: { label: "Pilar Lumi: Deskripsi", type: "paragraph", group: "Cerita & Filosofi" },
      pillarBetaTitle: { label: "Pilar Beta: Judul", type: "subheading", group: "Cerita & Filosofi" },
      pillarBetaDesc: { label: "Pilar Beta: Deskripsi", type: "paragraph", group: "Cerita & Filosofi" },
      pillarWorksTitle: { label: "Pilar Works: Judul", type: "subheading", group: "Cerita & Filosofi" },
      pillarWorksDesc: { label: "Pilar Works: Deskripsi", type: "paragraph", group: "Cerita & Filosofi" },

      valuesEyebrow: { label: "Kicker Prinsip Kerja", type: "badge", group: "Standar & Nilai Kerja" },
      valuesTitle: { label: "Judul Standar Kerja", type: "heading", group: "Standar & Nilai Kerja" },
      val1Title: { label: "Nilai 1: Judul", type: "subheading", group: "Standar & Nilai Kerja" },
      val1Desc: { label: "Nilai 1: Deskripsi", type: "paragraph", group: "Standar & Nilai Kerja" },
      val2Title: { label: "Nilai 2: Judul", type: "subheading", group: "Standar & Nilai Kerja" },
      val2Desc: { label: "Nilai 2: Deskripsi", type: "paragraph", group: "Standar & Nilai Kerja" },
      val3Title: { label: "Nilai 3: Judul", type: "subheading", group: "Standar & Nilai Kerja" },
      val3Desc: { label: "Nilai 3: Deskripsi", type: "paragraph", group: "Standar & Nilai Kerja" },

      statsEyebrow: { label: "Kicker Rekam Jejak", type: "badge", group: "Statistik Pencapaian" },
      statsTitle: { label: "Judul Rekam Jejak", type: "heading", group: "Statistik Pencapaian" },
      statOrders: { label: "Label: Pesanan Selesai", type: "stat", group: "Statistik Pencapaian" },
      statClients: { label: "Label: Klien Terlayani", type: "stat", group: "Statistik Pencapaian" },
      statRehired: { label: "Label: Dipekerjakan Ulang", type: "stat", group: "Statistik Pencapaian" },
      statRating: { label: "Label: Rating Kepuasan", type: "stat", group: "Statistik Pencapaian" },

      ctaTitle: { label: "Headline Ajakan Diskusi", type: "heading", group: "Penutup Halaman" },
      ctaSubtitle: { label: "Keterangan Tanpa Komitmen", type: "paragraph", group: "Penutup Halaman" },
      ctaButton: { label: "Tombol WhatsApp", type: "button", group: "Penutup Halaman" },
    },
  },

  // ==========================================
  // KOMPONEN GLOBAL (CROSS-PAGE)
  // ==========================================
  Nav: {
    namespace: "Nav",
    label: "Navigasi Header (Navbar)",
    desc: "Menu navigasi utama di bagian atas layar yang menempel (sticky) di semua halaman.",
    category: "global",
    categoryLabel: "Komponen Global",
    positionLabel: "Header Menempel • Semua Halaman",
    livePath: "/#top",
    keysOrder: [
      "about",
      "services",
      "techStack",
      "portfolio",
      "pricing",
      "pricelist",
      "cta",
      "menuOpen",
      "menuClose",
    ],
    keyMeta: {
      about: { label: "Menu: Tentang", type: "button" },
      services: { label: "Menu: Layanan", type: "button" },
      techStack: { label: "Menu: Keahlian / Stack", type: "button" },
      portfolio: { label: "Menu: Portofolio", type: "button" },
      pricing: { label: "Menu: Harga", type: "button" },
      pricelist: { label: "Menu: Rincian Paket", type: "button" },
      cta: { label: "Tombol Konsultasi Header", type: "button" },
      menuOpen: { label: "Aria: Buka Menu Mobile", type: "label" },
      menuClose: { label: "Aria: Tutup Menu Mobile", type: "label" },
    },
  },

  Footer: {
    namespace: "Footer",
    label: "Footer & Navigasi Bawah",
    desc: "Area paling bawah di semua halaman: informasi hak cipta, legalitas, navigasi tautan, dan alamat kontak.",
    category: "global",
    categoryLabel: "Komponen Global",
    positionLabel: "Footer Dasar • Semua Halaman",
    livePath: "/#footer",
    keysOrder: [
      "tagline",
      "status",
      "coverage",
      "navHeading",
      "contactHeading",
      "waLabel",
      "emailLabel",
      "badgeOrigin",
      "copyright",
    ],
    keyMeta: {
      tagline: { label: "Tagline Penutup Studio", type: "paragraph" },
      status: { label: "Status Ketersediaan Proyek", type: "badge" },
      coverage: { label: "Keterangan Cakupan Layanan (Remote & Onsite)", type: "paragraph" },
      navHeading: { label: "Judul Kolom Navigasi", type: "heading" },
      contactHeading: { label: "Judul Kolom Kontak", type: "heading" },
      waLabel: { label: "Label Tautan WhatsApp", type: "label" },
      emailLabel: { label: "Label Alamat Email", type: "label" },
      badgeOrigin: { label: "Badge Asal Studio (Indonesia)", type: "badge" },
      copyright: { label: "Teks Hak Cipta", type: "label" },
    },
  },

  // ==========================================
  // METADATA & SISTEM (SEO)
  // ==========================================
  Metadata: {
    namespace: "Metadata",
    label: "Metadata & SEO Situs",
    desc: "Judul tab peramban dan deskripsi pencarian Google untuk Beranda dan konfigurasi bawaan.",
    category: "system",
    categoryLabel: "SEO & Sistem",
    positionLabel: "Head / SEO Browser Tab",
    livePath: "/",
    keysOrder: ["title", "description"],
    keyMeta: {
      title: { label: "Judul Tab Browser Default (SEO Title)", type: "meta" },
      description: { label: "Deskripsi Mesin Pencari Default (SEO Description)", type: "meta" },
    },
  },
};

/**
 * Sorts an array of translation rows based on the visual layout order
 * defined in the registry. Any keys not explicitly defined in the registry
 * are appended at the end alphabetically.
 */
export function sortTranslationRows<T extends { key: string }>(
  namespace: string,
  rows: T[]
): T[] {
  const meta = TRANSLATION_REGISTRY[namespace];
  if (!meta || !meta.keysOrder) {
    return [...rows].sort((a, b) => a.key.localeCompare(b.key));
  }

  const orderMap = new Map<string, number>();
  meta.keysOrder.forEach((k, idx) => {
    orderMap.set(k, idx);
  });

  return [...rows].sort((a, b) => {
    const idxA = orderMap.has(a.key) ? orderMap.get(a.key)! : 9999;
    const idxB = orderMap.has(b.key) ? orderMap.get(b.key)! : 9999;

    if (idxA !== idxB) {
      return idxA - idxB;
    }
    return a.key.localeCompare(b.key);
  });
}

/**
 * Returns an ordered list of namespaces according to their logical flow:
 * 1. Homepage flow (Hero -> Final CTA, strictly ordered 1 to 10)
 * 2. Dedicated pages (ServicesPage, PortfolioPage, Pricelist, AboutPage)
 * 3. Global elements (Nav, Footer)
 * 4. System / SEO (Metadata)
 * Any unmapped namespaces in the DB are appended at the end.
 */
export function sortNamespaceNames(namespaces: string[]): string[] {
  const homepageOrder = [
    "Hero",
    "TrustedBy",
    "About",
    "Services",
    "TechStack",
    "Certifications",
    "Pricing",
    "Portfolio",
    "Testimonials",
    "FinalCta",
  ];
  const pagesOrder = ["ServicesPage", "PortfolioPage", "Pricelist", "AboutPage"];
  const globalOrder = ["Nav", "Footer"];
  const systemOrder = ["Metadata"];

  const predefinedOrder = [
    ...homepageOrder,
    ...pagesOrder,
    ...globalOrder,
    ...systemOrder,
  ];

  const orderMap = new Map<string, number>();
  predefinedOrder.forEach((ns, idx) => {
    orderMap.set(ns, idx);
  });

  return [...namespaces].sort((a, b) => {
    const idxA = orderMap.has(a) ? orderMap.get(a)! : 9999;
    const idxB = orderMap.has(b) ? orderMap.get(b)! : 9999;

    if (idxA !== idxB) {
      return idxA - idxB;
    }
    return a.localeCompare(b);
  });
}
