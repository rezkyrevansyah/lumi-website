export type ServiceCategory = "web-app" | "uiux" | "qa";

export interface PortfolioItem {
  slug: string;
  title: string;
  category: ServiceCategory;
  image: string;
  description: {
    id: string;
    en: string;
  };
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "athro-barbershop",
    title: "Athro Barbershop",
    category: "web-app",
    image: "/portfolio/athro-barbershop.png",
    description: {
      id: "Website profil dan sistem reservasi jadwal barbershop dengan tampilan responsif.",
      en: "Responsive barbershop profile website with integrated appointment booking.",
    },
  },
  {
    slug: "bali-pass-website",
    title: "Bali Pass Website",
    category: "web-app",
    image: "/portfolio/bali-pass-website.png",
    description: {
      id: "Platform informasi wisata dan pemesanan tiket destinasi Bali untuk wisatawan.",
      en: "Tourism portal and destination pass booking platform for visitors in Bali.",
    },
  },
  {
    slug: "baznas-website",
    title: "BAZNAS Website",
    category: "qa",
    image: "/portfolio/baznas-website.png",
    description: {
      id: "Pengujian fungsional dan verifikasi alur transaksi sistem donasi nasional BAZNAS.",
      en: "Functional testing and transaction verification for BAZNAS donation portal.",
    },
  },
  {
    slug: "cinta-zakat-baznas",
    title: "Cinta Zakat BAZNAS",
    category: "qa",
    image: "/portfolio/cinta-zakat-baznas.png",
    description: {
      id: "Quality assurance untuk kehandalan platform penghimpunan zakat digital BAZNAS.",
      en: "Quality assurance and test verification for the BAZNAS digital zakat app.",
    },
  },
  {
    slug: "dapur-nusantara",
    title: "Dapur Nusantara",
    category: "web-app",
    image: "/portfolio/dapur-nusantara.png",
    description: {
      id: "Website profil restoran kuliner nusantara dengan integrasi pemesanan langsung.",
      en: "Culinary restaurant profile website featuring direct ordering integrations.",
    },
  },
  {
    slug: "e-water",
    title: "E-Water",
    category: "web-app",
    image: "/portfolio/e-water.png",
    description: {
      id: "Web aplikasi monitoring konsumsi dan distribusi air bersih berbasis dashboard.",
      en: "Clean water monitoring web application featuring interactive dashboards.",
    },
  },
  {
    slug: "ekraf-hub",
    title: "EKRAF HUB",
    category: "qa",
    image: "/portfolio/ekraf-hub.png",
    description: {
      id: "Pengujian sistem manajemen inkubasi dan kolaborasi pelaku ekonomi kreatif.",
      en: "Comprehensive testing for the creative economy incubation management platform.",
    },
  },
  {
    slug: "erafone-website",
    title: "Erafone Website",
    category: "qa",
    image: "/portfolio/erafone-website.png",
    description: {
      id: "Quality assurance dan testing alur belanja e-commerce gadget resmi Erafone.",
      en: "Quality assurance and checkout flow testing for the official Erafone store.",
    },
  },
  {
    slug: "masjid-al-arqam-website",
    title: "Masjid Al-Arqam Website",
    category: "web-app",
    image: "/portfolio/masjid-al-arqam-website.png",
    description: {
      id: "Website profil masjid, jadwal kajian, dan transparansi laporan kas donasi.",
      en: "Community mosque website with prayer schedules and transparent financial logs.",
    },
  },
  {
    slug: "monis-rent",
    title: "Monis Rent",
    category: "web-app",
    image: "/portfolio/monis-rent.png",
    description: {
      id: "Katalog rental mobil dan motor dengan fitur reservasi instan via WhatsApp.",
      en: "Vehicle rental catalog website with direct WhatsApp reservation flow.",
    },
  },
  {
    slug: "next-swimming-school",
    title: "Next Swimming School",
    category: "web-app",
    image: "/portfolio/next-swimming-school.png",
    description: {
      id: "Website kursus renang profesional dengan pendaftaran kelas dan profil pelatih.",
      en: "Swimming academy website with online course registration and coach profiles.",
    },
  },
  {
    slug: "portal-intranet-ekraf",
    title: "Portal Intranet EKRAF",
    category: "qa",
    image: "/portfolio/portal-intranet-ekraf.png",
    description: {
      id: "Audit stabilitas dan pengujian integrasi portal kerja internal pegawai EKRAF.",
      en: "Stability audit and integration testing for the internal ministry intranet.",
    },
  },
  {
    slug: "primaya-app-revamp",
    title: "Primaya App Revamp",
    category: "uiux",
    image: "/portfolio/primaya-app-revamp.png",
    description: {
      id: "Redesain antarmuka aplikasi mobile layanan rumah sakit dan reservasi dokter.",
      en: "Mobile UI/UX redesign for hospital healthcare services and doctor bookings.",
    },
  },
  {
    slug: "robux-indo-store",
    title: "Robux Indo Store",
    category: "web-app",
    image: "/portfolio/robux-indo-store.png",
    description: {
      id: "Platform e-commerce top-up voucher game otomatis dengan proses instan.",
      en: "Automated game voucher top-up platform with instant checkout workflows.",
    },
  },
  {
    slug: "safty",
    title: "SAFTY",
    category: "uiux",
    image: "/portfolio/safty.png",
    description: {
      id: "Desain UI/UX aplikasi manajemen keselamatan kerja dan pelaporan insiden.",
      en: "UI/UX design for occupational health and safety incident reporting app.",
    },
  },
  {
    slug: "tbig-mobile",
    title: "TBIG Mobile",
    category: "qa",
    image: "/portfolio/tbig-mobile.png",
    description: {
      id: "Testing otomasi dan regresi untuk aplikasi operasional tower TBIG.",
      en: "Automation and regression testing for TBIG telecommunication tower operations.",
    },
  },
  {
    slug: "terra-scan",
    title: "Terra Scan",
    category: "uiux",
    image: "/portfolio/terra-scan.png",
    description: {
      id: "Desain antarmuka sistem monitoring geospasial dan analisis pemetaan lahan.",
      en: "Interface design for geospatial monitoring systems and land survey analysis.",
    },
  },
  {
    slug: "yoonjae-space-studio",
    title: "Yoonjae Space Studio",
    category: "web-app",
    image: "/portfolio/yoonjae-space-studio.png",
    description: {
      id: "Website portofolio studio arsitektur dan desain interior dengan galeri visual.",
      en: "Architecture and interior design studio portfolio featuring visual galleries.",
    },
  },
];
