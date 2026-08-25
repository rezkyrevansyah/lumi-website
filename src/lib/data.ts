export type Service = {
  title: string;
  desc: string;
  tags: string[];
  iconPath: string;
  iconType: "path" | "polylines" | "circle-clock" | "home";
};

export const SERVICES: Service[] = [
  {
    title: "Jasa Buat Website Perusahaan",
    desc: "Pembuatan website corporate, portal instansi, e-catalog, dan landing page berkinerja tinggi. Desain profesional, SEO-friendly, responsif, & aman.",
    tags: ["Next.js", "Corporate Web", "SEO Optimized", "Instansi & Enterprise"],
    iconPath: "polylines",
    iconType: "polylines",
  },
  {
    title: "Vendor Pembuatan Aplikasi Mobile",
    desc: "Pengembangan aplikasi Android & iOS custom untuk perusahaan & instansi. Arsitektur skalabel, performa tinggi, dan antarmuka ramah pengguna.",
    tags: ["Flutter", "iOS & Android", "Enterprise App", "Rest API"],
    iconPath: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z",
    iconType: "path",
  },
  {
    title: "Vendor Software House & Rebuild",
    desc: "Modernisasi sistem & website perusahaan yang sudah usang. Migrasi aman tanpa downtime dengan performa tinggi & keamanan tingkat lanjut.",
    tags: ["Software House", "System Migration", "Cloud Architecture"],
    iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    iconType: "home",
  },
  {
    title: "Software QA Testing Enterprise",
    desc: "Layanan pengujian kualitas software manual & otomatis. Menjamin sistem perusahaan & instansi Anda bebas dari bug sebelum dirilis.",
    tags: ["Manual QA", "Automation QA", "Security Audit", "API Testing"],
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    iconType: "path",
  },
  {
    title: "IT Consulting Perusahaan & Instansi",
    desc: "Konsultasi arsitektur IT, pemilihan tech stack, dan perencanaan transformasi digital komprehensif untuk perusahaan & lembaga instansi.",
    tags: ["IT Advisory", "Architecture", "Digital Strategy"],
    iconPath: "circle-clock",
    iconType: "circle-clock",
  },
];

export const TRUSTED_BRANDS = [
  { id: "1", name: "Erafone (Erajaya)", logoUrl: "/logo_partner/logo_erafone.svg" },
  { id: "2", name: "Masjid Al-Arqam", logoUrl: "/logo_partner/logo_alarqam.png" },
  { id: "3", name: "BAZNAS RI" },
  { id: "4", name: "Kemenparekraf RI" },
  { id: "5", name: "Tower Bersama Group" },
  { id: "6", name: "LASKAR AI" },
  { id: "7", name: "Yoonjae Space" },
  { id: "8", name: "Monis Rent Bali" },
  { id: "9", name: "GlowUp Clinic" },
];

export const HERO_BADGES = [
  { icon: "ShieldCheck", label: "Terverifikasi Vendor IT" },
  { icon: "Sparkles", label: "Garansi Tepat Waktu" },
  { icon: "Code2", label: "Bebas Bug dengan QA" },
];

export const ACTIVE_PROJECTS = [
  { name: "Portal Instansi BAZNAS", type: "Web & QA", progress: 95, color: "#2DD9A4" },
  { name: "App Mobile Enterprise", type: "Mobile App", progress: 85, color: "#6C63FF" },
  { name: "System Migration Corporate", type: "Rebuild", progress: 70, color: "#F59E0B" },
];

export type PortfolioItem = {
  title: string;
  client: string;
  category: string;
  description: string;
  tags: string[];
  platforms: ("web" | "android" | "ios")[];
  color: string;
  bg: string;
  imageUrl?: string;
  demoUrl?: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    title: "TerraScan",
    client: "LASKAR AI 2025",
    category: "AI Engineering • Agriculture",
    description: "Pengembangan platform analisis kualitas tanah berbasis AI & Machine Learning. Merancang sistem ML lengkap dari visualisasi data hingga deployment model.",
    tags: ["AI/ML", "Python", "Streamlit", "Computer Vision"],
    platforms: ["web"],
    color: "#2DD9A4",
    bg: "#0F1923",
    imageUrl: "/images/projects/qa-terra-project.png",
    demoUrl: "https://terrascan-git.streamlit.app/",
  },
  {
    title: "BAZNAS National Portal",
    client: "BAZNAS RI",
    category: "Government • QA Engineering",
    description: "Pengujian stabilitas & reliabilitas performa tinggi untuk platform koordinasi dan informasi zakat nasional resmi Republik Indonesia.",
    tags: ["National Portal", "Reliability", "Performance", "QA Testing"],
    platforms: ["web"],
    color: "#10B981",
    bg: "#051F14",
    imageUrl: "/images/projects/qa-baznas.png",
    demoUrl: "https://baznas.go.id/",
  },
  {
    title: "EKRAF Hub Ecosystem",
    client: "Kemenparekraf RI",
    category: "Government • QA Engineering",
    description: "QA testing untuk portal pusat ekonomi kreatif Kementerian Pariwisata dan Ekonomi Kreatif yang menghubungkan 17 subsektor kreatif.",
    tags: ["Government", "Web Ecosystem", "Collaboration", "Kemenparekraf"],
    platforms: ["web"],
    color: "#6C63FF",
    bg: "#1A1040",
    imageUrl: "/images/projects/qa-ekraf-hub.png",
    demoUrl: "https://hub.ekraf.go.id/",
  },
  {
    title: "Erafone E-Commerce Platform",
    client: "Erajaya Group",
    category: "Commerce • QA Engineering",
    description: "Pengujian menyeluruh (full-cycle testing) platform retail e-commerce terkemuka, berfokus pada kelancaran aliran checkout & integrasi MyEraspace.",
    tags: ["E-Commerce", "Checkout Flow", "Retail", "Erafone"],
    platforms: ["web", "android"],
    color: "#3BB5C5",
    bg: "#0D1F2D",
    imageUrl: "/images/projects/qa-erafone.png",
    demoUrl: "https://erafone.com/",
  },
  {
    title: "TBIG Mobile (Tower Bersama)",
    client: "Tower Bersama Group",
    category: "Telecommunication • Mobile App",
    description: "Pengujian aplikasi mobile untuk pelacakan operasional dan pemantauan infrastruktur menara telekomunikasi nasional.",
    tags: ["Mobile App", "Logistics", "Operations", "QA Testing"],
    platforms: ["android", "ios"],
    color: "#F59E0B",
    bg: "#1F1505",
    imageUrl: "/images/projects/qa-tbig.png",
    demoUrl: "https://play.google.com/store/apps/details?id=com.tbig.mobile",
  },
  {
    title: "Cinta Zakat Crowdfunding",
    client: "BAZNAS RI",
    category: "Government • QA Engineering",
    description: "Quality assurance untuk gateway donasi digital BAZNAS RI, memastikan keamanan dan kenyamanan transaksi donasi publik.",
    tags: ["Crowdfunding", "Security", "Donation", "BAZNAS"],
    platforms: ["web"],
    color: "#EC4899",
    bg: "#200D18",
    imageUrl: "/images/projects/qa-cinta-zakat.png",
    demoUrl: "https://cintazakat.baznas.go.id/",
  },
  {
    title: "IDP EKRAF SSO Gateway",
    client: "Kemenparekraf RI",
    category: "Government • Security & QA",
    description: "Pengujian keamanan dan integrasi sistem Identity Provider (SSO) terpusat yang digunakan oleh berbagai modul E-KRAF Kemenparekraf.",
    tags: ["Identity Provider", "SSO", "Security", "Kemenparekraf"],
    platforms: ["web"],
    color: "#8B5CF6",
    bg: "#180D2D",
    imageUrl: "/images/projects/qa-ekraf-idp.png",
    demoUrl: "https://idp.ekraf.go.id/",
  },
  {
    title: "SiMBA UPZ Management System",
    client: "BAZNAS RI",
    category: "Government • Enterprise ERP",
    description: "Pengujian sistem manajemen kompleks untuk 30.000+ UPZ nasional, mencakup perencanaan RKAT dan pelaporan keuangan akuntansi PSAK 109.",
    tags: ["Management System", "Finance", "ERP System", "BAZNAS"],
    platforms: ["web"],
    color: "#2DD9A4",
    bg: "#0F1923",
    imageUrl: "/images/projects/qa-simba-upz.png",
    demoUrl: "https://upz.baznas.go.id/",
  },
  {
    title: "Website Masjid Al Arqam",
    client: "DKM Al Arqam Bekasi",
    category: "Public Portal • Web Development",
    description: "Website profil & portal resmi Masjid Al Arqam Bekasi Utara untuk publikasi kegiatan jamaah dan transparansi laporan informasi.",
    tags: ["Profile", "Community", "Information", "Website Masjid"],
    platforms: ["web"],
    color: "#6C63FF",
    bg: "#1A1040",
    imageUrl: "/images/projects/vibe-masjidalarqam.png",
    demoUrl: "https://www.alarqambekasiutara.com/",
  },
  {
    title: "Dapur Nusantara",
    client: "Bangkit Capstone Top 50",
    category: "Mobile Development • Culinary",
    description: "Aplikasi Android Pemenang Top 50 Bangkit Academy 2024. Fitur scan otomatis makanan tradisional Indonesia, analisis gizi, resep, & sejarah kuliner.",
    tags: ["Android", "Bangkit Academy", "Computer Vision", "Food Tech"],
    platforms: ["android"],
    color: "#F59E0B",
    bg: "#1F1505",
    imageUrl: "/images/projects/mobile-dapur-nusantara.png",
  },
  {
    title: "E-Water",
    client: "Bangkit Social Impact",
    category: "Mobile Development • Social Impact",
    description: "Aplikasi mobile Android untuk pemetaan titik-titik air bersih dan pemantauan ketersediaan air secara real-time di daerah 3T.",
    tags: ["Android", "Social Impact", "Mapping", "3T Region"],
    platforms: ["android"],
    color: "#3BB5C5",
    bg: "#0D1F2D",
    imageUrl: "/images/projects/mobile-ewater.png",
  },
  {
    title: "Safty",
    client: "Road Safety App",
    category: "Mobile Development • Navigation",
    description: "Aplikasi navigasi mobile pintar dengan fitur peringatan berkendara aman dan analisis kecepatan maksimum otomatis di jalan yang dilalui.",
    tags: ["Android", "Navigation", "Road Safety", "Mobile App"],
    platforms: ["android"],
    color: "#EC4899",
    bg: "#200D18",
    imageUrl: "/images/projects/mobile-safty.png",
  },
  {
    title: "BaliPass",
    client: "Bali Travel & Tourism",
    category: "Web Development • Tourism",
    description: "Platform discovery & booking acara terbaik di Bali — dari yoga & cultural immersion hingga party & spiritual journey dengan event terkurasi.",
    tags: ["Events", "Booking", "Tourism", "Bali"],
    platforms: ["web"],
    color: "#2DD9A4",
    bg: "#0F1923",
    imageUrl: "/images/projects/vibe-balipass.png",
    demoUrl: "https://balipass.id/",
  },
  {
    title: "Next Swimming School",
    client: "Next Swimming School",
    category: "Web Development • Education OS",
    description: "Operating system & platform manajemen operasional terpadu untuk sekolah renang Next Swimming School (penjadwalan & booking).",
    tags: ["Management System", "Education", "Booking", "School OS"],
    platforms: ["web"],
    color: "#6C63FF",
    bg: "#1A1040",
    imageUrl: "/images/projects/vibe-next-swimming-school.png",
    demoUrl: "https://nextswimmingschool.vercel.app/",
  },
  {
    title: "Robux Indo Store",
    client: "RBX Indo Store",
    category: "Web Development • E-Commerce",
    description: "Website toko e-commerce platform jual beli Robux Roblox terpercaya dengan sistem transaksi cepat dan aman.",
    tags: ["E-Commerce", "Marketplace", "Gaming", "Roblox"],
    platforms: ["web"],
    color: "#F59E0B",
    bg: "#1F1505",
    imageUrl: "/images/projects/vibe-robuxindostore.png",
    demoUrl: "https://rbxindo.com/",
  },
  {
    title: "YoonjaeSpace Studio",
    client: "YoonjaeSpace Studio Depok",
    category: "Web Development • Studio OS",
    description: "Website manajemen booking studio foto terpadu dan sistem pengelolaan finansial operasional studio di Depok, Jawa Barat.",
    tags: ["Booking", "Management System", "Finance", "Studio"],
    platforms: ["web"],
    color: "#10B981",
    bg: "#051F14",
    imageUrl: "/images/projects/vibe-yoonjaespacestudio.png",
    demoUrl: "https://yoonjaespacestudio.vercel.app/",
  },
  {
    title: "Athro Barbershop",
    client: "Athro Barbershop",
    category: "Web Development • Booking System",
    description: "Website aplikasi booking antrian & reservasi layanan pangkas rambut modern untuk Athro Barbershop.",
    tags: ["Booking", "Service", "Business", "Barbershop"],
    platforms: ["web"],
    color: "#8B5CF6",
    bg: "#180D2D",
    imageUrl: "/images/projects/vibe-athrobarbershop.png",
    demoUrl: "https://athro-booking.vercel.app/",
  },
];

export const STATS = [
  { value: "25+", label: "Enterprise & B2B Projects" },
  { value: "15+", label: "Happy B2B Clients" },
  { value: "100%", label: "On-Time Delivery SLA" },
  { value: "4.9", label: "Average Client Rating" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Lumi Beta Works membantu pengujian kualitas portal kami dengan sangat baik. Bebas dari kendala saat trafik tinggi.",
    name: "Pengelola Sistem BAZNAS",
    role: "Tim Teknologi BAZNAS RI",
    rating: 5,
  },
  {
    quote: "Proses pengerjaan website & testing sangat profesional. Komunikasi lancar dan pengerjaan tepat waktu sesuai SLA.",
    name: "Tim Ekraf Hub",
    role: "Kemenparekraf RI",
    rating: 5,
  },
  {
    quote: "Kualitas pengetesan aplikasi mobile & e-commerce dari Lumi sangat detail. Edge cases yang sulit terdeteksi berhasil ditemukan.",
    name: "QA Lead Retail",
    role: "Erafone / Erajaya Group",
    rating: 5,
  },
  {
    quote: "Website studio manajemen kami di Depok tampil modern dan sangat responsif. Pelanggan kami sangat menyukai tampilannya.",
    name: "Manager Yoonjae Space",
    role: "Studio Yoonjae Space Depok",
    rating: 5,
  },
];

export const FOOTER_SERVICE_LINKS = [
  { label: "Jasa Website Perusahaan", href: "/layanan/website" },
  { label: "Vendor Aplikasi Mobile", href: "/layanan/aplikasi" },
  { label: "QA Testing Enterprise", href: "/layanan/qa-testing" },
  { label: "IT Consulting Instansi", href: "/layanan/konsultasi" },
];
