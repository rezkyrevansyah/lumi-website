import postgres from "postgres"
import { config } from "dotenv"

config({ path: ".env.local" })

const url = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL || ""
const sql = postgres(url, { max: 1 })

async function seed() {
  console.log("Seeding database...")

  // ─── Portfolio Items ──────────────────────────────────────────────────────
  console.log("Seeding portfolio items...")
  await sql`DELETE FROM portfolio_items`

  const UMKM_TITLES = ["BaliPass", "Next Swimming School", "Robux Indo Store", "YoonjaeSpace Studio", "Athro Barbershop"]

  const portfolio = [
    {
      title: "TerraScan",
      client: "LASKAR AI 2025",
      category: "AI Engineering • Agriculture",
      description: "Pengembangan platform analisis kualitas tanah berbasis AI & Machine Learning. Merancang sistem ML lengkap dari visualisasi data hingga deployment model.",
      tags: ["AI/ML", "Python", "Streamlit", "Computer Vision"],
      platforms: ["web"],
      accent_color: "#2DD9A4",
      bg_color: "#0F1923",
      image_url: "/images/projects/qa-terra-project.png",
      demo_url: "https://terrascan-git.streamlit.app/",
    },
    {
      title: "BAZNAS National Portal",
      client: "BAZNAS RI",
      category: "Government • QA Engineering",
      description: "Pengujian stabilitas & reliabilitas performa tinggi untuk platform koordinasi dan informasi zakat nasional resmi Republik Indonesia.",
      tags: ["National Portal", "Reliability", "Performance", "QA Testing"],
      platforms: ["web"],
      accent_color: "#10B981",
      bg_color: "#051F14",
      image_url: "/images/projects/qa-baznas.png",
      demo_url: "https://baznas.go.id/",
    },
    {
      title: "EKRAF Hub Ecosystem",
      client: "Kemenparekraf RI",
      category: "Government • QA Engineering",
      description: "QA testing untuk portal pusat ekonomi kreatif Kementerian Pariwisata dan Ekonomi Kreatif yang menghubungkan 17 subsektor kreatif.",
      tags: ["Government", "Web Ecosystem", "Collaboration", "Kemenparekraf"],
      platforms: ["web"],
      accent_color: "#6C63FF",
      bg_color: "#1A1040",
      image_url: "/images/projects/qa-ekraf-hub.png",
      demo_url: "https://hub.ekraf.go.id/",
    },
    {
      title: "Erafone E-Commerce Platform",
      client: "Erajaya Group",
      category: "Commerce • QA Engineering",
      description: "Pengujian menyeluruh (full-cycle testing) platform retail e-commerce terkemuka, berfokus pada kelancaran aliran checkout & integrasi MyEraspace.",
      tags: ["E-Commerce", "Checkout Flow", "Retail", "Erafone"],
      platforms: ["web", "android"],
      accent_color: "#3BB5C5",
      bg_color: "#0D1F2D",
      image_url: "/images/projects/qa-erafone.png",
      demo_url: "https://erafone.com/",
    },
    {
      title: "TBIG Mobile (Tower Bersama)",
      client: "Tower Bersama Group",
      category: "Telecommunication • Mobile App",
      description: "Pengujian aplikasi mobile untuk pelacakan operasional dan pemantauan infrastruktur menara telekomunikasi nasional.",
      tags: ["Mobile App", "Logistics", "Operations", "QA Testing"],
      platforms: ["android", "ios"],
      accent_color: "#F59E0B",
      bg_color: "#1F1505",
      image_url: "/images/projects/qa-tbig.png",
      demo_url: "https://play.google.com/store/apps/details?id=com.tbig.mobile",
    },
    {
      title: "Cinta Zakat Crowdfunding",
      client: "BAZNAS RI",
      category: "Government • QA Engineering",
      description: "Quality assurance untuk gateway donasi digital BAZNAS RI, memastikan keamanan dan kenyamanan transaksi donasi publik.",
      tags: ["Crowdfunding", "Security", "Donation", "BAZNAS"],
      platforms: ["web"],
      accent_color: "#EC4899",
      bg_color: "#200D18",
      image_url: "/images/projects/qa-cinta-zakat.png",
      demo_url: "https://cintazakat.baznas.go.id/",
    },
    {
      title: "IDP EKRAF SSO Gateway",
      client: "Kemenparekraf RI",
      category: "Government • Security & QA",
      description: "Pengujian keamanan dan integrasi sistem Identity Provider (SSO) terpusat yang digunakan oleh berbagai modul E-KRAF Kemenparekraf.",
      tags: ["Identity Provider", "SSO", "Security", "Kemenparekraf"],
      platforms: ["web"],
      accent_color: "#8B5CF6",
      bg_color: "#180D2D",
      image_url: "/images/projects/qa-ekraf-idp.png",
      demo_url: "https://idp.ekraf.go.id/",
    },
    {
      title: "SiMBA UPZ Management System",
      client: "BAZNAS RI",
      category: "Government • Enterprise ERP",
      description: "Pengujian sistem manajemen kompleks untuk 30.000+ UPZ nasional, mencakup perencanaan RKAT dan pelaporan keuangan akuntansi PSAK 109.",
      tags: ["Management System", "Finance", "ERP System", "BAZNAS"],
      platforms: ["web"],
      accent_color: "#2DD9A4",
      bg_color: "#0F1923",
      image_url: "/images/projects/qa-simba-upz.png",
      demo_url: "https://upz.baznas.go.id/",
    },
    {
      title: "Website Masjid Al Arqam",
      client: "DKM Al Arqam Bekasi",
      category: "Public Portal • Web Development",
      description: "Website profil & portal resmi Masjid Al Arqam Bekasi Utara untuk publikasi kegiatan jamaah dan transparansi laporan informasi.",
      tags: ["Profile", "Community", "Information", "Website Masjid"],
      platforms: ["web"],
      accent_color: "#6C63FF",
      bg_color: "#1A1040",
      image_url: "/images/projects/vibe-masjidalarqam.png",
      demo_url: "https://www.alarqambekasiutara.com/",
    },
    {
      title: "Dapur Nusantara",
      client: "Bangkit Capstone Top 50",
      category: "Mobile Development • Culinary",
      description: "Aplikasi Android Pemenang Top 50 Bangkit Academy 2024. Fitur scan otomatis makanan tradisional Indonesia, analisis gizi, resep, & sejarah kuliner.",
      tags: ["Android", "Bangkit Academy", "Computer Vision", "Food Tech"],
      platforms: ["android"],
      accent_color: "#F59E0B",
      bg_color: "#1F1505",
      image_url: "/images/projects/mobile-dapur-nusantara.png",
      demo_url: null,
    },
    {
      title: "E-Water",
      client: "Bangkit Social Impact",
      category: "Mobile Development • Social Impact",
      description: "Aplikasi mobile Android untuk pemetaan titik-titik air bersih dan pemantauan ketersediaan air secara real-time di daerah 3T.",
      tags: ["Android", "Social Impact", "Mapping", "3T Region"],
      platforms: ["android"],
      accent_color: "#3BB5C5",
      bg_color: "#0D1F2D",
      image_url: "/images/projects/mobile-ewater.png",
      demo_url: null,
    },
    {
      title: "Safty",
      client: "Road Safety App",
      category: "Mobile Development • Navigation",
      description: "Aplikasi navigasi mobile pintar dengan fitur peringatan berkendara aman dan analisis kecepatan maksimum otomatis di jalan yang dilalui.",
      tags: ["Android", "Navigation", "Road Safety", "Mobile App"],
      platforms: ["android"],
      accent_color: "#EC4899",
      bg_color: "#200D18",
      image_url: "/images/projects/mobile-safty.png",
      demo_url: null,
    },
    {
      title: "BaliPass",
      client: "Bali Travel & Tourism",
      category: "Web Development • Tourism",
      description: "Platform discovery & booking acara terbaik di Bali, mulai dari yoga & cultural immersion hingga party & spiritual journey dengan event terkurasi.",
      tags: ["Events", "Booking", "Tourism", "Bali"],
      platforms: ["web"],
      accent_color: "#2DD9A4",
      bg_color: "#0F1923",
      image_url: "/images/projects/vibe-balipass.png",
      demo_url: "https://balipass.id/",
    },
    {
      title: "Next Swimming School",
      client: "Next Swimming School",
      category: "Web Development • Education OS",
      description: "Operating system & platform manajemen operasional terpadu untuk sekolah renang Next Swimming School (penjadwalan & booking).",
      tags: ["Management System", "Education", "Booking", "School OS"],
      platforms: ["web"],
      accent_color: "#6C63FF",
      bg_color: "#1A1040",
      image_url: "/images/projects/vibe-next-swimming-school.png",
      demo_url: "https://nextswimmingschool.vercel.app/",
    },
    {
      title: "Robux Indo Store",
      client: "RBX Indo Store",
      category: "Web Development • E-Commerce",
      description: "Website toko e-commerce platform jual beli Robux Roblox terpercaya dengan sistem transaksi cepat dan aman.",
      tags: ["E-Commerce", "Marketplace", "Gaming", "Roblox"],
      platforms: ["web"],
      accent_color: "#F59E0B",
      bg_color: "#1F1505",
      image_url: "/images/projects/vibe-robuxindostore.png",
      demo_url: "https://rbxindo.com/",
    },
    {
      title: "YoonjaeSpace Studio",
      client: "YoonjaeSpace Studio Depok",
      category: "Web Development • Studio OS",
      description: "Website manajemen booking studio foto terpadu dan sistem pengelolaan finansial operasional studio di Depok, Jawa Barat.",
      tags: ["Booking", "Management System", "Finance", "Studio"],
      platforms: ["web"],
      accent_color: "#10B981",
      bg_color: "#051F14",
      image_url: "/images/projects/vibe-yoonjaespacestudio.png",
      demo_url: "https://yoonjaespacestudio.vercel.app/",
    },
    {
      title: "Athro Barbershop",
      client: "Athro Barbershop",
      category: "Web Development • Booking System",
      description: "Website aplikasi booking antrian & reservasi layanan pangkas rambut modern untuk Athro Barbershop.",
      tags: ["Booking", "Service", "Business", "Barbershop"],
      platforms: ["web"],
      accent_color: "#8B5CF6",
      bg_color: "#180D2D",
      image_url: "/images/projects/vibe-athrobarbershop.png",
      demo_url: "https://athro-booking.vercel.app/",
    },
  ]

  for (let i = 0; i < portfolio.length; i++) {
    const p = portfolio[i]
    await sql`
      INSERT INTO portfolio_items (title, client, category, description, tags, platforms, accent_color, bg_color, image_url, demo_url, is_umkm_case_study, sort_order, is_published)
      VALUES (
        ${p.title}, ${p.client}, ${p.category}, ${p.description},
        ${p.tags}, ${p.platforms},
        ${p.accent_color}, ${p.bg_color}, ${p.image_url ?? null}, ${p.demo_url ?? null},
        ${UMKM_TITLES.includes(p.title)}, ${i}, true
      )
    `
  }
  console.log(`Inserted ${portfolio.length} portfolio items`)

  // ─── Testimonials ─────────────────────────────────────────────────────────
  console.log("Seeding testimonials...")
  await sql`DELETE FROM testimonials`

  const testimonials = [
    {
      quote: "The experience of working with Revan was truly great throughout the entire process. He constructed a full stack web application for our business in London precisely as we needed it. Communication was always clear, he got a quick grasp of our requirements, proposed some practical improvements, and met all the milestones on time. The code was clean, the user interface had a professional appearance, and the backend was both reliable and well-structured. Even after the project was completed, he was willing to make a few adjustments without any trouble. It's not easy to come across someone who has both strong technical abilities and excellent communication skills, but Revan most definitely does. I would be happy to work with him again and can highly recommend him to anybody seeking a reliable full-stack developer.",
      author_name: "Winnie",
      author_role: "Business Owner (London, UK)",
      rating: 5,
      is_featured: true,
    },
    {
      quote: "Nice, he do a full stack web development and can work using english. Outstanding results and give a lot of bonus. Good work",
      author_name: "Ron",
      author_role: "International Client",
      rating: 5,
      is_featured: true,
    },
    {
      quote: "Kerjasama dengan mas Revan sangat professional, saya merekomendasikan untuk pembuatan UI/UX dan website.",
      author_name: "Fahmi",
      author_role: "Client UI/UX & Web",
      rating: 5,
      is_featured: true,
    },
    {
      quote: "Mantap, hasilnya memuaskan, dan ada bonusnya juga, recommended banget buat repeat order ini, terima kasih banyak yaa",
      author_name: "merdekapro",
      author_role: "Repeat Order Client",
      rating: 5,
      is_featured: false,
    },
    {
      quote: "Sip, rekomended untuk UI/UX. Respon bagus dan cepat.",
      author_name: "totocos",
      author_role: "Client UI/UX Design",
      rating: 5,
      is_featured: false,
    },
    {
      quote: "Nicee, bisa dari UI/UX sampe website jadi, gokil banget!",
      author_name: "Verified Client",
      author_role: "Full-Stack Web Client",
      rating: 5,
      is_featured: false,
    },
    {
      quote: "Sudah sering sama mas Revan, mantap dan selalu terpercaya!",
      author_name: "Verified Client",
      author_role: "Repeat Order Client",
      rating: 5,
      is_featured: false,
    },
    {
      quote: "Mantap pengerjaan cepat dan trusted.",
      author_name: "b6iojh2y",
      author_role: "Client Web Development",
      rating: 5,
      is_featured: false,
    },
    {
      quote: "Mantap, rekomended deh pokoknya.",
      author_name: "bimol7",
      author_role: "Client Project",
      rating: 5,
      is_featured: false,
    },
    {
      quote: "Makasih kakk rekomenn banget!",
      author_name: "eca",
      author_role: "Client",
      rating: 5,
      is_featured: false,
    },
    {
      quote: "Mantap, sesuai requestan customer. Terimakasih.",
      author_name: "Verified Client",
      author_role: "Client",
      rating: 5,
      is_featured: false,
    },
    {
      quote: "Sangat memuaskan.",
      author_name: "daa",
      author_role: "Client",
      rating: 5,
      is_featured: false,
    },
    {
      quote: "Luar biasa, deadline 2 hari selesai tepat waktu dan hasilnya memuaskan. Sangat profesional!",
      author_name: "Ninda",
      author_role: "Web Development Client",
      rating: 5,
      is_featured: false,
    },
  ]

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i]
    await sql`
      INSERT INTO testimonials (quote, author_name, author_role, rating, is_featured, sort_order)
      VALUES (${t.quote}, ${t.author_name}, ${t.author_role}, ${t.rating}, ${t.is_featured}, ${i})
    `
  }
  console.log(`Inserted ${testimonials.length} testimonials`)

  // ─── Services ─────────────────────────────────────────────────────────────
  console.log("Seeding services...")
  await sql`DELETE FROM services`

  const services = [
    {
      title: "Jasa Pembuatan Website Corporate & Instansi",
      short_desc: "Pembuatan website corporate, portal instansi, e-catalog, dan landing page berkinerja tinggi. Desain profesional, SEO-friendly, responsif, & aman.",
      summary: "Website corporate berkecepatan tinggi, SEO-ready, dan aman. Kami mendukung berbagai tech stack sesuai kebutuhan & infrastruktur Anda (Next.js, Laravel, .NET, Angular, dsb).",
      badge_label: "Most Popular",
      badge_color: "#2DD9A4",
      deliverables: ["Company Profile & Portal Publik Instansi", "Landing Page Konversi Tinggi & E-Catalog", "Integrasi CMS & Dashboard Admin Custom", "Optimasi SEO Score 95+ & Mobile Responsive"],
      tech_stack: ["Laravel / PHP", ".NET / C#", "React / Next.js", "Angular / Vue", "Node.js"],
      sla_label: "10–20 Hari Kerja",
      slug: "website",
      wa_message: "Halo Lumi Beta Works, saya ingin konsultasi pembuatan Website Perusahaan.",
      tags: ["Next.js", "Corporate Web", "SEO Optimized", "Instansi & Enterprise"],
      icon_path: "polylines",
      icon_type: "polylines",
      sort_order: 0,
    },
    {
      title: "Vendor Pembuatan Aplikasi Mobile (Android & iOS)",
      short_desc: "Pengembangan aplikasi Android & iOS custom untuk perusahaan & instansi. Arsitektur skalabel, performa tinggi, dan antarmuka ramah pengguna.",
      summary: "Aplikasi mobile native & Flutter dengan arsitektur scalable, UI/UX intuitif, sinkronisasi offline, dan integrasi API yang lancar.",
      badge_label: "Cross-Platform",
      badge_color: "#6C63FF",
      deliverables: ["Aplikasi Bisnis & Operasional Internal", "E-Commerce, Booking, & On-Demand Service", "Push Notification & Realtime Data Sync", "Bantuan Publikasi Google Play & Apple App Store"],
      tech_stack: ["Flutter", "Dart", "REST API", "Firebase / Supabase"],
      sla_label: "25–45 Hari Kerja",
      slug: "aplikasi",
      wa_message: "Halo Lumi Beta Works, saya ingin konsultasi pembuatan Aplikasi Mobile.",
      tags: ["Flutter", "iOS & Android", "Enterprise App", "Rest API"],
      icon_path: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z",
      icon_type: "path",
      sort_order: 1,
    },
    {
      title: "Software QA Testing & Audit Kualitas Enterprise",
      short_desc: "Layanan pengujian kualitas software manual & otomatis. Memastikan stabilitas, performa, dan keandalan sistem perusahaan & instansi Anda sebelum dirilis.",
      summary: "Pengujian manual dan otomatis menyeluruh untuk memastikan software Anda bebas dari bug kritis, aman dari celah, dan stabil saat trafik tinggi.",
      badge_label: "Zero-Bug Guarantee",
      badge_color: "#3BB5C5",
      deliverables: ["Functional & Regression Testing Menyeluruh", "Automation E2E Testing (Playwright / Cypress)", "API Performance & Stress Load Testing", "Laporan Defect Rinci & Rekomendasi Perbaikan"],
      tech_stack: ["Playwright", "Postman", "Jira", "K6 Load Test"],
      sla_label: "5–15 Hari Kerja",
      slug: "qa-testing",
      wa_message: "Halo Lumi Beta Works, saya ingin konsultasi layanan QA Testing & Security Audit.",
      tags: ["Manual QA", "Automation QA", "Security Audit", "API Testing"],
      icon_path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      icon_type: "path",
      sort_order: 2,
    },
    {
      title: "IT Consulting & Modernisasi Sistem Legacy",
      short_desc: "Konsultasi arsitektur IT, pemilihan tech stack, dan perencanaan transformasi digital komprehensif untuk perusahaan & lembaga instansi.",
      summary: "Bimbingan teknikal mendalam untuk arsitektur cloud, refactoring sistem lama, audit keamanan, dan optimasi performa database.",
      badge_label: "Strategic Advisory",
      badge_color: "#F59E0B",
      deliverables: ["Audit Arsitektur Kode & Infrastruktur Cloud", "Perencanaan Migrasi Database & Cloud Modern", "Optimasi Kecepatan & Efisiensi Server", "Technical Roadmapping & Tech Stack Advisory"],
      tech_stack: ["System Design", "PostgreSQL", "Cloud Arch", "Docker"],
      sla_label: "Fleksibel / Sesuai Scope",
      slug: "konsultasi",
      wa_message: "Halo Lumi Beta Works, saya ingin konsultasi arsitektur IT dan modernisasi sistem.",
      tags: ["IT Advisory", "Architecture", "Digital Strategy"],
      icon_path: "circle-clock",
      icon_type: "circle-clock",
      sort_order: 3,
    },
    {
      title: "IT Consulting Perusahaan & Instansi",
      short_desc: "Konsultasi arsitektur IT, pemilihan tech stack, dan perencanaan transformasi digital komprehensif untuk perusahaan & lembaga instansi.",
      summary: "Bimbingan teknikal mendalam untuk arsitektur cloud, refactoring sistem lama, audit keamanan, dan optimasi performa database.",
      badge_label: null,
      badge_color: null,
      deliverables: [],
      tech_stack: [],
      sla_label: null,
      slug: "it-consulting",
      wa_message: "Halo Lumi Beta Works, saya ingin konsultasi IT.",
      tags: ["IT Advisory", "Architecture", "Digital Strategy"],
      icon_path: "circle-clock",
      icon_type: "circle-clock",
      sort_order: 4,
    },
  ]

  for (const s of services) {
    await sql`
      INSERT INTO services (title, short_desc, summary, badge_label, badge_color, deliverables, tech_stack, sla_label, slug, wa_message, tags, icon_path, icon_type, sort_order)
      VALUES (
        ${s.title}, ${s.short_desc}, ${s.summary ?? null}, ${s.badge_label ?? null}, ${s.badge_color ?? null},
        ${sql.json(s.deliverables)}, ${sql.json(s.tech_stack)},
        ${s.sla_label ?? null}, ${s.slug}, ${s.wa_message ?? null},
        ${s.tags}, ${s.icon_path ?? null}, ${s.icon_type ?? "path"}, ${s.sort_order}
      )
    `
  }
  console.log(`Inserted ${services.length} services`)

  // ─── FAQs ─────────────────────────────────────────────────────────────────
  console.log("Seeding FAQs...")
  await sql`DELETE FROM faqs`

  const faqsLayanan = [
    {
      question: "Apakah kami bisa meminta pengembangan dengan tech stack khusus (misal: Laravel, .NET, Angular, PHP, dll)?",
      answer: "Tentu saja! Tim rekayasa kami bersifat stack-agnostic. Kami sangat berpengalaman membangun sistem dengan berbagai framework enterprise dan modern (PHP/Laravel, .NET/C#, Angular, React/Next.js, Vue, Node.js, Python, dsb). Kami akan menyesuaikan secara penuh dengan pedoman IT governance, arsitektur yang sudah berjalan, dan server internal perusahaan Anda.",
      page: "layanan",
    },
    {
      question: "Berapa estimasi biaya pembuatan website atau aplikasi di Lumi Beta Works?",
      answer: "Biaya disesuaikan secara transparan berdasarkan kompleksitas fitur, jumlah halaman/layar, dan integrasi yang dibutuhkan. Kami selalu memberikan rincian scope of work di awal tanpa biaya tersembunyi.",
      page: "layanan",
    },
    {
      question: "Apakah source code dan hak cipta sepenuhnya menjadi milik klien?",
      answer: "Ya, 100%. Seluruh source code, aset desain, akses repositori, dan lisensi menjadi milik penuh Anda setelah proyek selesai dan serah terima dilakukan.",
      page: "layanan",
    },
    {
      question: "Bagaimana sistem garansi dan maintenance setelah serah terima?",
      answer: "Kami memberikan garansi perbaikan bug gratis pasca peluncuran serta menyediakan paket maintenance berkala untuk pembaruan fitur, optimasi server, dan backup rutin.",
      page: "layanan",
    },
    {
      question: "Bisakah Lumi Beta Works menandatangani Non-Disclosure Agreement (NDA)?",
      answer: "Tentu saja. Kami sangat menghormati privasi, kerahasiaan data, dan hak kekayaan intelektual (IP) bisnis serta instansi klien kami.",
      page: "layanan",
    },
  ]

  const faqsUmkm = [
    {
      question: "Berapa kira-kira biaya untuk membuatkan sistem bagi UMKM saya?",
      answer: "Biaya disesuaikan dengan skala dan kompleksitas kebutuhan bisnis Anda — bukan disamakan dengan tarif proyek enterprise. Konsultasikan kebutuhan Anda dulu, kami akan berikan estimasi transparan tanpa komitmen.",
      page: "umkm",
    },
    {
      question: "Apakah bisa mengerjakan sistem secara bertahap sesuai anggaran?",
      answer: "Bisa. Kami biasa memulai dari fitur paling mendesak (misalnya kasir & stok) lebih dulu, lalu menambah modul lain (keuangan, CRM, dsb.) secara bertahap ketika bisnis Anda sudah siap.",
      page: "umkm",
    },
    {
      question: "Saya tidak paham teknis, apakah tetap bisa menggunakan sistemnya?",
      answer: "Ya. Setiap sistem yang kami buat dilengkapi antarmuka yang mudah dipakai serta panduan penggunaan untuk tim Anda, tanpa perlu latar belakang teknis.",
      page: "umkm",
    },
    {
      question: "Berapa lama waktu pengerjaan sistem untuk UMKM?",
      answer: "Rata-rata 2 hingga 6 minggu, tergantung jumlah fitur dan kompleksitas sistem. Kami informasikan estimasi waktu yang jelas sejak awal konsultasi.",
      page: "umkm",
    },
    {
      question: "Apakah ada dukungan setelah sistem selesai dan dipakai?",
      answer: "Ada. Kami memberikan garansi perbaikan bug dan pendampingan pemakaian, sehingga Anda tidak ditinggal sendirian setelah serah terima.",
      page: "umkm",
    },
  ]

  const allFaqs = [...faqsLayanan, ...faqsUmkm]
  for (let i = 0; i < allFaqs.length; i++) {
    const f = allFaqs[i]
    await sql`
      INSERT INTO faqs (question, answer, page, sort_order)
      VALUES (${f.question}, ${f.answer}, ${f.page}, ${i})
    `
  }
  console.log(`Inserted ${allFaqs.length} FAQs`)

  // ─── Workflow Steps ────────────────────────────────────────────────────────
  console.log("Seeding workflow steps...")
  await sql`DELETE FROM workflow_steps`

  const workflow = [
    { step_number: 1, title: "Discovery & Konsultasi Gratis", description: "Kami mendiskusikan kebutuhan bisnis, flow sistem, target timeline, dan memberikan estimasi transparan tanpa komitmen." },
    { step_number: 2, title: "Prototype UI/UX & Arsitektur", description: "Merancang wireframe interaktif dan skema database agar Anda memiliki visualisasi nyata sebelum coding dimulai." },
    { step_number: 3, title: "Development & Pengujian QA Ketat", description: "Penulisan kode berstandar clean architecture disertai pengujian berkala untuk menjamin software bebas dari kendala." },
    { step_number: 4, title: "Deployment, Serah Terima & Dukungan", description: "Peluncuran ke server produksi, dokumentasi lengkap, panduan tim internal, dan dukungan pemeliharaan pasca rilis." },
  ]

  for (let i = 0; i < workflow.length; i++) {
    const w = workflow[i]
    await sql`
      INSERT INTO workflow_steps (step_number, title, description, sort_order)
      VALUES (${w.step_number}, ${w.title}, ${w.description}, ${i})
    `
  }
  console.log(`Inserted ${workflow.length} workflow steps`)

  // ─── Tech Categories ───────────────────────────────────────────────────────
  console.log("Seeding tech categories...")
  await sql`DELETE FROM tech_categories`

  const techCategories = [
    {
      category_name: "Backend & Enterprise Systems",
      description: "Arsitektur backend scalable, microservices, dan REST/GraphQL API tangguh.",
      stacks: ["PHP (Laravel, CodeIgniter)", ".NET (C#, ASP.NET Core)", "Node.js (Express, NestJS)", "Python (FastAPI, Django)", "Java (Spring Boot)", "Go (Golang)"],
    },
    {
      category_name: "Frontend & Modern Web Ecosystem",
      description: "Web application interaktif, SSR berkecepatan tinggi, dan SEO-optimized.",
      stacks: ["React.js & Next.js", "Angular", "Vue.js & Nuxt", "TypeScript", "Tailwind CSS", "Bootstrap / Material UI"],
    },
    {
      category_name: "Mobile Application (Cross-Platform & Native)",
      description: "Pengembangan app mobile iOS & Android dengan pengalaman pengguna setara aplikasi global.",
      stacks: ["Flutter (Dart)", "React Native", "Android (Kotlin)", "iOS (Swift)", "Offline-First Sync", "Push Notification"],
    },
    {
      category_name: "Database, Cloud & Quality Engineering",
      description: "Manajemen basis data relasional/NoSQL, deployment cloud aman, dan automated QA.",
      stacks: ["PostgreSQL & MySQL", "Microsoft SQL Server", "Redis Cache", "Supabase & Firebase", "Docker & AWS/GCP", "Playwright & Cypress"],
    },
  ]

  for (let i = 0; i < techCategories.length; i++) {
    const t = techCategories[i]
    await sql`
      INSERT INTO tech_categories (category_name, description, stacks, sort_order)
      VALUES (${t.category_name}, ${t.description}, ${sql.json(t.stacks)}, ${i})
    `
  }
  console.log(`Inserted ${techCategories.length} tech categories`)

  // ─── Stats ────────────────────────────────────────────────────────────────
  console.log("Seeding stats...")
  await sql`DELETE FROM stats`

  const stats = [
    { value: "36+", label: "Pesanan Selesai" },
    { value: "24+", label: "Pelanggan Puas" },
    { value: "13+", label: "Dipekerjakan Ulang" },
    { value: "5.0", label: "Rating Kepuasan" },
  ]

  for (let i = 0; i < stats.length; i++) {
    await sql`INSERT INTO stats (value, label, sort_order) VALUES (${stats[i].value}, ${stats[i].label}, ${i})`
  }
  console.log(`Inserted ${stats.length} stats`)

  // ─── Trusted Brands ───────────────────────────────────────────────────────
  console.log("Seeding trusted brands...")
  await sql`DELETE FROM trusted_brands`

  const brands = [
    { name: "Erafone (Erajaya)", logo_url: "/logo_partner/logo_erafone.svg" },
    { name: "Masjid Al-Arqam", logo_url: "/logo_partner/logo_alarqam.png" },
    { name: "BAZNAS RI", logo_url: null },
    { name: "Kemenparekraf RI", logo_url: null },
    { name: "Tower Bersama Group", logo_url: null },
    { name: "LASKAR AI", logo_url: null },
    { name: "Yoonjae Space", logo_url: null },
    { name: "Monis Rent Bali", logo_url: null },
    { name: "GlowUp Clinic", logo_url: null },
  ]

  for (let i = 0; i < brands.length; i++) {
    await sql`INSERT INTO trusted_brands (name, logo_url, sort_order) VALUES (${brands[i].name}, ${brands[i].logo_url ?? null}, ${i})`
  }
  console.log(`Inserted ${brands.length} trusted brands`)

  // ─── UMKM Use Cases ───────────────────────────────────────────────────────
  console.log("Seeding UMKM use cases...")
  await sql`DELETE FROM umkm_use_cases`

  const useCases = [
    { icon_name: "CreditCard", title: "Sistem Kasir (POS) & QRIS", description: "Kasir ringan berbasis web, catat transaksi, cetak struk, dukung QRIS & pembagian shift kasir.", tags: ["F&B / Cafe", "Toko Retail", "Minimarket"], is_highlighted: true },
    { icon_name: "Boxes", title: "Manajemen Inventaris & Stok", description: "Pantau stok real-time di satu atau banyak cabang, barcode, bahan baku, hingga stock opname.", tags: ["Multi-Cabang", "Barcode", "Stock Opname"], is_highlighted: true },
    { icon_name: "Wallet", title: "Dashboard Keuangan Bisnis", description: "Cashflow, laba-rugi, hutang-piutang, dan omzet tersaji jelas untuk keputusan yang lebih cepat.", tags: ["Cashflow", "Laba-Rugi", "Hutang/Piutang"], is_highlighted: true },
    { icon_name: "Globe", title: "Website & Toko Online", description: "Katalog produk, checkout mandiri, dan custom domain agar pelanggan bisa order tanpa antre chat.", tags: ["Katalog", "Checkout", "Custom Domain"], is_highlighted: false },
    { icon_name: "CalendarCheck", title: "Booking & Reservasi", description: "Jadwal otomatis 24/7 untuk klinik, salon, barbershop, atau rental — bebas dari jadwal bentrok.", tags: ["Klinik", "Salon & Spa", "Barbershop"], is_highlighted: false },
    { icon_name: "Users", title: "CRM & Loyalitas Pelanggan", description: "Kelola data pelanggan, program membership, dan otomatisasi pesan follow-up yang lebih personal.", tags: ["Membership", "Database Pelanggan", "Loyalty"], is_highlighted: false },
    { icon_name: "LayoutDashboard", title: "Dashboard Bisnis & Tim", description: "Omzet, produk terlaris, absensi, dan shift karyawan terpantau dalam satu panel yang rapi.", tags: ["Omzet", "Absensi", "Shift Karyawan"], is_highlighted: false },
    { icon_name: "Puzzle", title: "Sistem Custom & Integrasi Marketplace", description: "Alur bisnis Anda unik? Kami rancang sistem custom, termasuk sinkronisasi stok & order marketplace.", tags: ["Custom Workflow", "Marketplace Sync"], is_highlighted: false },
  ]

  for (let i = 0; i < useCases.length; i++) {
    const u = useCases[i]
    await sql`
      INSERT INTO umkm_use_cases (icon_name, title, description, tags, is_highlighted, sort_order)
      VALUES (${u.icon_name}, ${u.title}, ${u.description}, ${sql.json(u.tags)}, ${u.is_highlighted}, ${i})
    `
  }
  console.log(`Inserted ${useCases.length} UMKM use cases`)

  // ─── UMKM Process Steps ───────────────────────────────────────────────────
  console.log("Seeding UMKM process steps...")
  await sql`DELETE FROM umkm_process_steps`

  const processSteps = [
    { step_number: 1, title: "Konsultasi Gratis", description: "Ceritakan kendala operasional bisnis Anda, kami bantu petakan sistem yang paling dibutuhkan lebih dulu." },
    { step_number: 2, title: "Rancang Sesuai Anggaran", description: "Kami susun fitur dan skema kerja yang realistis dengan anggaran UMKM, tanpa fitur mubazir." },
    { step_number: 3, title: "Development Cepat & Terpantau", description: "Progres transparan dengan update berkala, sehingga Anda tahu persis sistem sudah sejauh mana." },
    { step_number: 4, title: "Serah Terima & Pendampingan", description: "Pelatihan pemakaian untuk tim Anda, plus garansi perbaikan bila ada kendala setelah rilis." },
  ]

  for (let i = 0; i < processSteps.length; i++) {
    const p = processSteps[i]
    await sql`
      INSERT INTO umkm_process_steps (step_number, title, description, sort_order)
      VALUES (${p.step_number}, ${p.title}, ${p.description}, ${i})
    `
  }
  console.log(`Inserted ${processSteps.length} UMKM process steps`)

  // ─── UMKM Market Stats ────────────────────────────────────────────────────
  console.log("Seeding UMKM market stats...")
  await sql`DELETE FROM umkm_market_stats`

  const marketStats = [
    { value: "61%", label: "Kontribusi UMKM terhadap PDB Nasional" },
    { value: "65Jt+", label: "Unit Usaha UMKM di Seluruh Indonesia" },
    { value: "33,6%", label: "UMKM yang Sudah Benar-Benar Go-Digital" },
    { value: "30Jt+", label: "Pelaku UMKM Sudah Bertransaksi via QRIS" },
  ]

  for (let i = 0; i < marketStats.length; i++) {
    const m = marketStats[i]
    await sql`INSERT INTO umkm_market_stats (value, label, sort_order) VALUES (${m.value}, ${m.label}, ${i})`
  }
  console.log(`Inserted ${marketStats.length} UMKM market stats`)

  // ─── Site Settings ────────────────────────────────────────────────────────
  console.log("Seeding site settings...")

  const settings: Array<{ key: string; value: unknown }> = [
    {
      key: "contact",
      value: { whatsapp: "62882015884006", email: "contact@lumibetaworks.id" },
    },
    {
      key: "hero_badges",
      value: [
        { icon: "ShieldCheck", label: "Terverifikasi Vendor IT" },
        { icon: "Sparkles", label: "Garansi Tepat Waktu" },
        { icon: "Code2", label: "Teruji Kualitas QA" },
      ],
    },
    {
      key: "active_projects",
      value: [
        { name: "Portal Instansi BAZNAS", type: "Web & QA", progress: 95, color: "#2DD9A4" },
        { name: "App Mobile Enterprise", type: "Mobile App", progress: 85, color: "#6C63FF" },
        { name: "System Migration Corporate", type: "Rebuild", progress: 70, color: "#F59E0B" },
      ],
    },
    {
      key: "founder",
      value: {
        name: "M. Rezky Revansyah Suprihono",
        title: "Founder & Lead Developer",
        bio: "Seorang pengembang full-stack dan QA engineer dengan pengalaman lebih dari 3 tahun. Memulai karir sebagai freelancer sebelum mendirikan Lumi Beta Works untuk membantu lebih banyak bisnis bertransformasi secara digital.",
        photo_url: null,
        credentials: ["Google Certified Android Developer", "Bangkit Academy Top 50 Graduate"],
        quote: "Teknologi bukan soal keren-kerenan. Ini soal memecahkan masalah nyata untuk orang nyata.",
      },
    },
    {
      key: "about_story",
      value: {
        paragraph1: "Lumi Beta Works lahir dari perjalanan seorang freelancer yang percaya bahwa teknologi yang baik tidak harus mahal atau rumit.",
        paragraph2: "Dimulai dari melayani UMKM dan bisnis lokal, kami tumbuh menjadi vendor IT yang dipercaya perusahaan dan instansi pemerintah nasional.",
        paragraph3: "Hari ini, kami terus berkomitmen: menghadirkan solusi digital yang tepat sasaran, mulai dari startup kecil hingga korporat besar.",
      },
    },
    {
      key: "umkm_why_us",
      value: [
        { icon: "Wallet", title: "Harga Menyesuaikan Skala Bisnis", description: "Paket dan skema kerja kami dirancang untuk kemampuan UMKM, bukan disamakan dengan tarif proyek enterprise.", color: "#2DD9A4", bg: "rgba(45,217,164,0.1)" },
        { icon: "HeartHandshake", title: "Lahir dari Freelancer, Mengerti UMKM", description: "Kami tahu rasanya bisnis kecil yang ingin naik kelas, karena Lumi sendiri mulai dari sana.", color: "#6C63FF", bg: "rgba(108,99,255,0.1)" },
        { icon: "Puzzle", title: "Sistem Custom, Bukan Template Kaku", description: "Dibangun mengikuti alur bisnis Anda yang sebenarnya, bukan dipaksa masuk ke SaaS generik.", color: "#3BB5C5", bg: "rgba(59,181,197,0.1)" },
        { icon: "ShieldCheck", title: "Pendampingan Pasca Rilis", description: "Tidak lepas tangan setelah serah terima — ada garansi perbaikan dan panduan pakai untuk tim Anda.", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
      ],
    },
  ]

  for (const s of settings) {
    await sql`
      INSERT INTO site_settings (key, value)
      VALUES (${s.key}, ${sql.json(s.value as never)})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `
  }
  console.log(`Inserted ${settings.length} site settings`)

  console.log("\nSeed complete!")
  await sql.end()
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
