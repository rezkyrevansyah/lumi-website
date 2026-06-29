export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#service" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/#contact" },
  { label: "About", href: "/about" },
];

export const ACTIVE_PROJECTS = [
  { name: "E-Commerce Platform", type: "Web App", progress: 85, color: "#2DD9A4" },
  { name: "Mobile Fintech App", type: "iOS + Android", progress: 62, color: "#6C63FF" },
  { name: "QA Automation Suite", type: "Testing", progress: 94, color: "#3BB5C5" },
];

export const HERO_BADGES = [
  { icon: "🤝", label: "Trustworthy" },
  { icon: "🔋", label: "Max Effort" },
  { icon: "💸", label: "Affordable" },
];

export const TRUSTED_BRANDS = [
  "GovDKI",
  "TechMart",
  "FinFlow",
  "EduBright",
  "RetailX",
  "HealthCo",
  "BuildPro",
  "AgroBase",
  "CloudSync",
  "MediaOne",
];

export type Service = {
  title: string;
  desc: string;
  tags: string[];
  iconPath: string;
  iconType: "path" | "polylines" | "circle-clock" | "home";
};

export const SERVICES: Service[] = [
  {
    title: "UI/UX & Product Design",
    desc: "Research-driven design that converts. From wireframes to high-fidelity prototypes, we craft experiences your users actually enjoy.",
    tags: ["Figma", "User Research", "Prototyping"],
    iconPath: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z",
    iconType: "path",
  },
  {
    title: "Build Web or App",
    desc: "End-to-end development of web platforms and mobile apps. Clean code, scalable architecture, and on-time delivery.",
    tags: ["React", "Next.js", "Flutter", "Node.js"],
    iconPath: "polylines",
    iconType: "polylines",
  },
  {
    title: "Rebuild Web or App",
    desc: "Transform your outdated platform into something modern and performant. Full migration with zero downtime strategies.",
    tags: ["Migration", "Refactoring", "Performance"],
    iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    iconType: "home",
  },
  {
    title: "QA Testing",
    desc: "Manual and automation testing to ensure your product is bug-free before it reaches your users. We test edge cases others miss.",
    tags: ["Manual QA", "Selenium", "Cypress", "Appium"],
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    iconType: "path",
  },
  {
    title: "Tech Consulting",
    desc: "Get expert guidance on architecture, tech stack selection, and digital strategy. We'll help you make the right calls from day one.",
    tags: ["Strategy", "Architecture", "Stack Review"],
    iconPath: "circle-clock",
    iconType: "circle-clock",
  },
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
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    title: "Sistem Kepegawaian Online",
    client: "BKD Pemprov",
    category: "Government • HR",
    description: "Sistem manajemen kepegawaian digital untuk instansi pemerintah, mencakup absensi, mutasi, dan pelaporan terintegrasi.",
    tags: ["Next.js", "PostgreSQL", "Docker"],
    platforms: ["web"],
    color: "#2DD9A4",
    bg: "#0F1923",
  },
  {
    title: "E-Commerce Marketplace",
    client: "TechMart Indonesia",
    category: "Commerce • Retail",
    description: "Platform marketplace multi-vendor dengan fitur pembayaran, manajemen inventori, dan analitik penjualan real-time.",
    tags: ["React", "Node.js", "Flutter", "Midtrans"],
    platforms: ["web", "android", "ios"],
    color: "#6C63FF",
    bg: "#1A1040",
  },
  {
    title: "Fintech Wallet App",
    client: "FinFlow",
    category: "Finance • Lifestyle",
    description: "Aplikasi dompet digital dengan fitur transfer, top-up, split bill, dan laporan keuangan personal.",
    tags: ["Flutter", "Node.js", "Firebase"],
    platforms: ["android", "ios"],
    color: "#3BB5C5",
    bg: "#0D1F2D",
  },
  {
    title: "LMS Platform",
    client: "EduBright",
    category: "Education • Technology",
    description: "Platform pembelajaran online dengan video streaming, kuis interaktif, sertifikasi, dan progress tracking siswa.",
    tags: ["Next.js", "Supabase", "React Native"],
    platforms: ["web", "android"],
    color: "#F59E0B",
    bg: "#1F1505",
  },
  {
    title: "Inventory & POS System",
    client: "RetailX",
    category: "Retail • Operations",
    description: "Sistem kasir dan manajemen stok untuk jaringan toko retail, dengan laporan harian dan notifikasi stok menipis.",
    tags: ["React", "Express", "MySQL"],
    platforms: ["web"],
    color: "#EC4899",
    bg: "#200D18",
  },
  {
    title: "Telemedicine App",
    client: "HealthCo",
    category: "Health • Lifestyle",
    description: "Aplikasi konsultasi dokter online dengan video call, rekam medis digital, dan sistem antrian virtual.",
    tags: ["Flutter", "WebRTC", "Django"],
    platforms: ["android", "ios"],
    color: "#10B981",
    bg: "#051F14",
  },
];

export const STATS = [
  { value: "20+", label: "Projects Completed" },
  { value: "15+", label: "Happy Clients" },
  { value: "100%", label: "On-Time Delivery" },
  { value: "4.9", label: "Average Rating" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Lumi delivered exactly what we needed — on time, on budget, and with quality we didn't expect at this price point.",
    name: "Ahmad Fauzi",
    role: "CTO, FinFlow",
    rating: 5,
  },
  {
    quote: "The QA testing service found critical bugs our own team missed. Highly professional and very thorough.",
    name: "Dewi Santoso",
    role: "Product Manager, EduBright",
    rating: 5,
  },
  {
    quote: "As a small business, I was worried the process would be overwhelming. Lumi guided me every step of the way.",
    name: "Budi Hartono",
    role: "Owner, RetailX Bandung",
    rating: 5,
  },
  {
    quote: "The consulting session alone saved us 3 months of going in the wrong direction. Worth every rupiah.",
    name: "Siti Rahayu",
    role: "Founder, TechMart",
    rating: 5,
  },
  {
    quote: "We've worked with several dev agencies — Lumi is the only one that stayed communicative throughout the whole project.",
    name: "Reza Permana",
    role: "Director, BuildPro Indonesia",
    rating: 5,
  },
  {
    quote: "The waiting list policy shows they care about quality over quantity. Our project got their full attention.",
    name: "Nia Kurniawan",
    role: "Head of IT, Agrobase",
    rating: 5,
  },
];

export const FOOTER_SERVICE_LINKS = [
  "UI/UX Design",
  "Web Development",
  "App Development",
  "QA Testing",
  "Tech Consulting",
];
