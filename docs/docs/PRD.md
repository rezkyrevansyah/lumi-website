# PRD: Lumi Beta Works Website

**Versi:** 1.0 Draft
**Tanggal:** 2026-09-12
**Sumber:** [LUMI_BRIEF.md](LUMI_BRIEF.md)
**Status keputusan (dari sesi klarifikasi):**

| Keputusan | Pilihan |
|---|---|
| Tech stack | Next.js Latest (App Router) + React |
| Manajemen konten | Hardcoded di kode (config file per section) |
| Metrik sukses utama | Jumlah klik CTA WhatsApp/konsultasi |
| Timeline | Fleksibel, prioritas kualitas |
| i18n | URL-based routing (`/id`, `/en`) |
| Analytics | Google Analytics 4 |
| Hosting | Vercel |
| Brand asset (logo, warna, font) | Lengkap — logo, palet warna, dan font sudah ditentukan (lihat §4.1) |
| Nomor WhatsApp resmi | 081283950403 (`+62 812-8395-0403`) |

---

## 1. Executive Summary

**Problem Statement:** Lumi Beta Works belum punya kehadiran digital resmi yang bisa membangun kredibilitas, menampilkan kapabilitas teknis tim (tech stack, sertifikasi, portofolio), dan mengonversi calon klien — mulai dari UMKM yang butuh landing page murah sampai perusahaan yang butuh custom development — menjadi leads lewat WhatsApp.

**Proposed Solution:** Website marketing satu halaman (single-page, section-based) berbahasa Indonesia (default) dengan toggle ke Bahasa Inggris, plus satu halaman terpisah khusus pricelist. Dibangun dengan Next.js agar cepat, SEO-friendly, dan mudah dikembangkan lebih lanjut oleh tim sendiri.

**Success Criteria (KPI awal — baseline belum ada karena situs baru, target ini jadi acuan yang direvisit setelah 4–6 minggu data GA4):**

- CTR ke WhatsApp/CTA konsultasi ≥ 3% dari unique visitor (event `wa_click` di GA4, per section asal klik).
- Lighthouse Performance ≥ 90 dan Accessibility ≥ 90 (mobile, halaman Home & Pricelist).
- LCP < 2.5s dan INP < 200ms pada koneksi 4G tersimulasi (Vercel Analytics / Lighthouse CI).
- Bounce rate halaman `/pricelist` < 50% dalam 30 hari pertama setelah traffic terindeks.
- 0 broken link/CTA (WA, email, sosial) — diverifikasi lewat E2E smoke test sebelum tiap deploy production.

---

## 2. User Experience & Functionality

### User Personas

1. **Pemilik UMKM/startup kecil ("Budi")** — butuh landing page murah dan cepat jadi, sensitif harga, entry point ke paket Rp 300.000.
2. **Decision maker perusahaan menengah ("Rani, Product Manager")** — mengevaluasi vendor dev untuk proyek custom, peduli pada tech stack yang dikuasai, sertifikasi tim, dan bukti portofolio nyata sebelum menghubungi.
3. **Calon klien yang datang dari referral** — langsung ingin cek portofolio dan pricelist sebelum chat WA, sering dari mobile.

### User Stories & Acceptance Criteria

**1. Hero**
- *As a visitor*, saya ingin langsung paham apa yang ditawarkan Lumi Beta Works dan bisa langsung bertindak, tanpa harus scroll dulu.
- AC:
  - Tagline + subhead singkat tampil above the fold di viewport 375px–1920px.
  - Dua CTA: "Konsultasi Gratis" (buka WA dengan pre-filled message) dan "Lihat Paket" (scroll/link ke section Paket & Harga).
  - Kedua CTA trigger event GA4 (`wa_click` / `view_pricing_click`) dengan label `hero`.

**2. Dipercaya Oleh (Client Logos)**
- *As a visitor*, saya ingin melihat kredibilitas lewat klien yang sudah pernah bekerja sama.
- AC:
  - Marquee logo auto-scroll infinite tanpa interaksi manual (tidak ada tombol next/prev).
  - **Hanya logo, tanpa nama klien** (dikonfirmasi) — data yang perlu disiapkan cuma file logo (SVG/PNG transparan), tidak perlu izin publikasi nama perusahaan.
  - Animasi berhenti/pause saat `prefers-reduced-motion: reduce` terdeteksi (accessibility).
  - Loop mulus tanpa jeda/flicker di titik sambungan (dicapai dengan duplikasi list logo, bukan JS re-render tiap frame).

**3. Tentang Kami**
- *As a visitor*, saya ingin kenal tim di balik Lumi dengan cara yang terasa manusiawi, bukan seperti copy generik.
- AC:
  - Copy final direview manual (bukan auto-publish AI-generated tanpa edit) — mengikuti requirement brief soal "human vibes" dan larangan wording `--`.
  - Ada CTA sekunder ke WA di section ini.

**4. Layanan**
- AC: Grid 4 item (Website & App Dev, UI/UX Design, QA & Testing, Consulting), masing-masing dengan ikon + deskripsi singkat, responsive ke 2 kolom (tablet) dan 1 kolom (mobile).

**5. Our Tech Stack**
- AC: Grid logo + nama tech (Next.js, React, Laravel, PHP, Python, Angular, .NET, Go, PostgreSQL, Flutter, WordPress, dll), data-driven dari satu file config (bukan hardcode berulang di JSX) supaya gampang ditambah/dikurangi.

**6. Badge Sertifikasi**
- AC: Grid logo penyedia sertifikasi saja (tanpa teks deskriptif tambahan sesuai brief), link opsional ke halaman verifikasi resmi tiap penyedia (buka tab baru, `rel="noopener noreferrer"`).

**7. Paket & Harga**
- AC:
  - Minimal 3 tier card di homepage: entry point landing page Rp 300.000 ditonjolkan visual (badge "Mulai dari" / highlight border), tier lain custom/enterprise dengan CTA "Hubungi Kami" bukan harga fix.
  - Tombol "Lihat Semua Paket" navigasi ke halaman `/pricelist` (locale-aware: `/id/pricelist`, `/en/pricelist`).

**8. Portfolio / Studi Kasus**
- AC:
  - Bentuk **showcase card ringkas** (dikonfirmasi) — bukan modal, bukan halaman detail terpisah. Tidak ada klik-through ke halaman `/portfolio/[slug]` di MVP.
  - Tiap card: cover image 1920x1080, judul proyek, 1–2 baris tagline/kategori (mis. "Website & App Dev"). Opsional: badge/ikon link "Lihat Live" yang langsung buka demo di tab baru kalau URL demo tersedia — tanpa halaman detail internal.
  - Cover image di-serve lewat `next/image` (otomatis resize/format AVIF-WebP, lazy-load kecuali kartu pertama).

**9. Testimoni**
- AC: Jika belum ada data, tampilkan state "Segera Hadir" yang tetap estetis (bukan section kosong/blank), reserved layout supaya gampang diisi nanti tanpa redesign.

**10. CTA Akhir + Footer**
- AC: Kontak WA + email, ikon link sosial (buka tab baru), tahun copyright dinamis (`new Date().getFullYear()`), link internal ke halaman Pricelist.

**11. Halaman Pricelist**
- AC: Halaman terpisah dari homepage, breakdown detail semua tier, tetap punya CTA WA per tier, locale-aware (ID/EN), bisa diakses langsung via URL (bukan cuma dari homepage).

**Cross-cutting**
- Toggle ID/EN tersedia di semua halaman (header, persist antar navigasi lewat URL prefix, bukan cuma state lokal).
- Semua section responsive mobile (breakpoint minimal: 375px, 768px, 1024px, 1440px).
- Tidak ada wording `--` di seluruh copy (hard requirement dari brief).

### Non-Goals (v1)

- Tidak ada sistem login/dashboard klien.
- Tidak ada CMS/back-office admin — update konten lewat edit file + redeploy (lihat §4).
- Tidak ada payment gateway/transaksi online — pricelist bersifat informatif, closing tetap manual via WA.
- Tidak ada live chat widget selain link WhatsApp langsung.
- Tidak ada blog/artikel di v1 (masuk roadmap v2.0, lihat §5).

---

## 3. AI System Requirements

Tidak berlaku — website ini adalah marketing/company profile site tanpa fitur AI-powered (tidak ada search berbasis LLM, chatbot AI, atau rekomendasi otomatis di scope v1).

---

## 4. Technical Specifications

### 4.1 Stack & Arsitektur

- **Framework:** Next.js (App Router, versi stabil terbaru — direkomendasikan Next.js 15.x/16.x) + React + TypeScript.
- **Styling:** Tailwind CSS (rekomendasi, konsisten dengan ekosistem Next.js modern) + komponen headless (shadcn/ui) untuk konsistensi UI tanpa reinvent wheel.
- **i18n:** [`next-intl`](https://github.com/amannn/next-intl) dengan `localePrefix: 'as-needed'` — locale default (`id`) tanpa prefix di URL (`/`, `/pricelist`), locale `en` pakai prefix (`/en`, `/en/pricelist`). Ini menjaga URL Indonesia tetap bersih sesuai "default bahasa Indonesia" di brief, sambil tetap SEO-friendly untuk versi Inggris.
  - Middleware `next-intl` menangani deteksi & routing locale.
  - `generateMetadata` di tiap route mengisi `alternates.languages` (hreflang `id`, `en`) supaya Google mengindeks kedua versi bahasa dengan benar, bukan dianggap duplicate content.
- **Animasi marquee (Dipercaya Oleh):** direkomendasikan CSS keyframe (`translateX` infinite loop dengan list logo diduplikasi) demi performa, bukan library JS berat. Micro-interaction lain (hover card, fade-in on scroll) opsional pakai Framer Motion bila dibutuhkan, dengan guard `prefers-reduced-motion`.
- **Gambar:** semua image (portfolio 1920x1080, logo) lewat `next/image` untuk optimasi otomatis, termasuk hero image dengan `priority` untuk LCP.
- **Analytics:** `@next/third-parties/google` (`<GoogleAnalytics gaId="G-XXXX" />` di root layout) + `sendGAEvent` custom untuk event `wa_click`, `view_pricing_click`, `portfolio_open` dengan parameter section asal klik.
- **Hosting/Deploy:** Vercel, auto-deploy dari branch utama, preview deployment per PR untuk review sebelum production.
- **Logo asset (sudah tersedia):**
  - `logo_lumi_square_transparant.png` — dipakai untuk favicon, app icon, dan konteks yang butuh rasio 1:1 (mis. avatar sosial media).
  - `logo_lumi_landscape_transparant.png` — dipakai untuk header/navbar dan footer.
- **Palet warna (dikonfirmasi)** — diturunkan dari warna logo (wordmark charcoal + panah teal/emerald + ikon gradasi ungu→biru→teal pada "Beta Works") dan terinspirasi aesthetic referensi (light theme bersih, soft shadow, CTA solid gelap). Neutral ramp pakai skala **Zinc**, karena `zinc-700 (#3F3F46)` cocok persis dengan warna charcoal di wordmark logo. Accent utama pakai skala **Emerald**, mengikuti warna panah/lingkaran terbesar di logo. Semua pasangan teks-di-atas-background di bawah sudah dihitung kontrasnya (formula WCAG relative luminance), bukan tebak-tebakan visual.

  | Token | Hex | Peran | Kontras terukur |
  |---|---|---|---|
  | `--color-bg` | `#FFFFFF` | Background utama halaman | — |
  | `--color-bg-subtle` | `#FAFAFA` (zinc-50) | Background section selang-seling | — |
  | `--color-surface` | `#FFFFFF` | Card/surface, dibedakan dari bg lewat **soft shadow** (bukan border keras) — sesuai gaya referensi | — |
  | `--color-border` | `#E4E4E7` (zinc-200) | Divider dekoratif tipis | 1.27:1 vs putih — **hanya dekoratif**, jangan andalkan sebagai satu-satunya penanda batas komponen penting |
  | `--color-border-input` | `#D4D4D8` (zinc-300) | Border resting state input form | 1.48:1 vs putih — wajib dipasangkan dengan **focus ring** jelas (emerald-600) supaya tetap accessible saat fokus keyboard |
  | `--color-text-primary` | `#18181B` (zinc-900) | Heading | 8.9:1 vs putih (AAA) |
  | `--color-text-secondary` | `#52525B` (zinc-600) | Body copy | 7.75:1 vs putih (AAA) |
  | `--color-text-muted` | `#71717A` (zinc-500) | Caption/meta text | 4.83:1 vs putih (AA — dipakai secukupnya, bukan untuk teks penting) |
  | ⚠️ `zinc-400 (#A1A1AA)` | — | **Jangan dipakai untuk teks apa pun** | 2.56:1 vs putih — gagal AA bahkan untuk teks besar; hanya boleh untuk elemen dekoratif/disabled |
  | `--color-accent-50` | `#ECFDF5` | Background badge/tag ringan | — |
  | `--color-accent-500` | `#10B981` | Ikon, ilustrasi, aksen dekoratif | 3.77:1 vs teks putih — cukup untuk large text/icon, **tidak untuk label tombol teks kecil** |
  | `--color-accent-700` | `#047857` | Solid button fill sekunder (teks putih di atasnya) | 5.48:1 (AA pass) |
  | `--color-accent-800` | `#065F46` | Teks link/accent di atas putih | 7.69:1 (AAA pass) |
  | `--color-cta-solid` | `#18181B` (zinc-900) | **CTA primer** (mis. "Konsultasi Gratis") — solid gelap ala referensi, teks putih | 8.9:1 (AAA pass) |
  | `--color-cta-solid-hover` | `#27272A` (zinc-800) | Hover state CTA primer | — |

  **Pembagian peran warna (one color, one meaning):** `zinc-900` = warna "ini bisa diklik, aksi utama" (dipakai konsisten di semua CTA primer). `emerald` = warna identitas brand (badge highlight tier termurah, ikon section, link teks, indikator nav aktif) — bukan warna tombol utama, supaya tidak ada dua warna yang sama-sama "berteriak" sebagai CTA.

  **Gradient dekoratif (hero glow):** mengambil 3 warna dari ikon "Beta Works" di logo — ungu `#7C3AED`, biru `#2563EB`, emerald `#10B981` — dipakai **hanya** sebagai radial-gradient blur beropasitas rendah (8–14%) di belakang Hero/section tertentu (mirip soft blue glow di referensi), tidak pernah dipakai sebagai warna solid teks/tombol supaya makna emerald sebagai aksen brand utama tidak pudar.
- **Font (dikonfirmasi):**
  - **Plus Jakarta Sans** — body text/UI (variable weight 200–800).
  - **Bricolage Grotesque** — heading/display (variable weight 200–800, optical sizing 12–96).
  - Diimplementasikan lewat `next/font/google` (bukan `<link>`/`@import` manual dari Google Fonts) — Next.js otomatis self-host file font saat build, jadi tidak ada request ke `fonts.googleapis.com` saat runtime, tanpa layout shift, dan lebih cepat. Kedua font didaftarkan sebagai CSS variable (`--font-jakarta`, `--font-bricolage`) di root layout, dipetakan ke `font-family` lewat Tailwind config (`font-sans` untuk body, `font-display` untuk heading).
- **Client logo & portfolio cover (sudah tersedia, sudah diverifikasi):**
  - `client-logo/` — **15 file logo SVG** siap pakai untuk marquee "Dipercaya Oleh" (Amara Reflexology, EKRAF, Erafone, Masjid Al-Arqam, Micin.id, Monis, Next Swimming School, PDAM Tirta Semerbak, PT Dahana, Robux Indo Store, Solutechasia, TBIG, Taman Nasional Lorentz, The Textile Map, Yoonjae Space Studio). Format SVG artinya tajam di resolusi berapa pun tanpa perlu multi-size export — cocok untuk marquee. Sesuai keputusan sebelumnya, **hanya file logo yang ditampilkan, nama klien tidak dirender sebagai teks**.
    - **Sudah dinormalisasi landscape & rapi (dikonfirmasi)** — tidak seperti portfolio cover, file logo ini tidak perlu proses crop/normalisasi tambahan. Implementasi tinggal set `height` seragam per item marquee (mis. `h-8`/`h-10`) dengan `width: auto` supaya proporsi tiap logo tetap terjaga, tanpa perlu penanganan khusus per file.
  - `portofolio-images/` — **18 file cover PNG**, nama file sudah mengikuti pola `{Nama Proyek}_{Kategori}.png` (mis. `Athro Barbershop_Web Development.png`), yang bisa langsung dipetakan ke field `title` + `category` di data config portfolio (§4.2) tanpa perlu input manual ulang.
  - ⚠️ **Temuan saat verifikasi dimensi** — brief menyebut cover "1920x1080", tapi setelah dicek satu per satu, **5 dari 18 file tidak persis 1920x1080**: `BAZNAS Website` (1904x936), `Cinta Zakat BAZNAS` (1907x935), `EKRAF HUB` (1904x929), `Erafone Website` (1916x936), `Portal Intranet EKRAF` (1916x937) — rasio ~2.03:1, sedikit lebih lebar dari 16:9. Dua file lain menyimpang jauh: `Monis Rent` (1919x861, ~2.23:1, lebih lebar) dan `TBIG Mobile` (1080x720, ~1.5:1, lebih sempit — kemungkinan screenshot mobile app, bukan cover landscape). `Terra Scan` juga di luar standar (1425x837).
    - **Mitigasi teknis (dikonfirmasi cukup, tidak perlu crop manual):** semua card portfolio dirender dalam container beraspek rasio tetap (`aspect-video`/16:9) memakai `next/image` dengan `fill` + `object-cover`, supaya grid tetap rapi terlepas dari variasi ukuran asli. File yang rasionya menyimpang (termasuk `TBIG Mobile`) akan ke-crop otomatis oleh browser — ini pola yang sama dengan portfolio card Lumi sebelumnya (auto-crop via `object-cover`), jadi diterima sebagai perilaku normal, bukan blocker.
  - Kategori dari nama file (`Web Development`, `Quality Assurance`, `Mobile Development and UIUX`, `UIUX Design`, `web machine learning`) tidak 1:1 sama dengan 4 kategori Layanan di §2 item 4 (Website & App Dev, UI/UX Design, QA & Testing, Consulting) — perlu mapping manual saat implementasi (mis. "Mobile Development and UIUX" masuk ke Website & App Dev, "web machine learning" bisa masuk Consulting atau jadi tag tambahan). Tidak ada proyek portfolio yang tag kategorinya "Consulting" — dicatat sebagai catatan konten, bukan blocker.

### 4.2 Struktur Konten (Content Management)

Karena diputuskan hardcoded (bukan CMS) untuk MVP:

- Konten teks per-locale disimpan sebagai message files `next-intl` (`messages/id.json`, `messages/en.json`).
- Data terstruktur (daftar tech stack, sertifikasi, tier pricing, portfolio, client logos) disimpan di `/data/*.ts` sebagai array typed (bukan ditulis berulang langsung di JSX), supaya update konten = edit satu file, bukan cari-cari di banyak komponen.
- **Risiko dicatat di §5:** kalau frekuensi update konten (terutama portfolio & pricing) ternyata tinggi, migrasi ke headless CMS masuk sebagai kandidat v1.1.
- **Terjemahan EN (dikonfirmasi):** `messages/en.json` diisi lewat AI-assisted translation dari copy Bahasa Indonesia final. Karena tidak ada reviewer bahasa manusia yang ditugaskan, versi EN wajib melalui **satu pass QA ringan sebelum go-live** (baca ulang tiap string, terutama istilah teknis dan nama section) supaya tidak ada hasil terjemahan yang kaku/ganjil — konsisten dengan requirement "human vibes" di brief yang berlaku untuk kedua bahasa.

### 4.3 Integration Points

- **WhatsApp:** `https://wa.me/<nomor>?text=<prefilled message>`, nomor & template pesan berbeda per section (opsional) untuk tracking konteks di `wa_click` event. Draft template ada di **Appendix A** — nomor WA masih placeholder, wajib diganti nomor resmi sebelum go-live.
- **Email:** `mailto:` link di footer.
- **Google Analytics 4:** measurement ID disuntik lewat environment variable (`NEXT_PUBLIC_GA_ID`), tidak di-hardcode.
- **Sosial media:** link eksternal footer, `target="_blank" rel="noopener noreferrer"`.

### 4.4 Security & Privacy

- Situs statis/marketing, tanpa form yang mengumpulkan PII di MVP (kontak lewat redirect ke WA eksternal) — mengecilkan scope compliance data.
- GA4 mengumpulkan data analytics visitor: perlu **cookie/consent notice sederhana** (banner "situs ini menggunakan cookie analytics") mengingat UU PDP di Indonesia — dicatat sebagai risiko/TODO di §5, bukan blocker MVP tapi harus masuk sebelum go-live publik.
- Environment variable (GA ID, nomor WA jika perlu disembunyikan dari source) dikelola lewat Vercel project settings, bukan hardcoded di repo publik jika repo nantinya open/shared.

---

## 5. Risks & Roadmap

### Risks

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Update konten hardcoded butuh redeploy tiap perubahan | Lambat kalau portfolio/pricing sering berubah | Struktur `/data` yang rapi + dokumentasi singkat cara update, supaya non-dev pun bisa submit PR sederhana; evaluasi CMS di v1.1 kalau frekuensi update tinggi |
| GA4 tanpa consent notice | Isu privasi/compliance ringan (UU PDP) | Tambahkan banner consent minimal sebelum go-live publik |
| Copy "human vibes" untuk Tentang Kami butuh review manual, bukan auto-generate | Bisa memperlambat content-freeze sebelum dev selesai styling | Siapkan copy final di awal fase content, paralel dengan development komponen |
| Portfolio image 1920x1080 berpotensi berat kalau tidak dioptimasi | LCP/performance turun, gagal target Lighthouse ≥90 | Wajib lewat `next/image`, kompresi + format modern (AVIF/WebP), lazy-load semua kecuali above-the-fold |

### Phased Rollout

- **MVP (v1.0):** Seluruh 11 section brief + halaman pricelist, toggle ID/EN, GA4 + event tracking WA, fully responsive, hardcoded content, deploy di Vercel.
- **v1.1:** Testimoni asli (ganti placeholder), cookie consent banner final, evaluasi migrasi ke CMS jika kebutuhan update konten meningkat, refinement portfolio detail page (dari modal jadi halaman penuh bila perlu SEO per-project).
- **v2.0:** Blog/insights untuk SEO content marketing, kemungkinan contact form (dengan backend + privacy policy proper), dark mode (jika diminta), client portal (jika model bisnis butuh).

---

## Open Questions / Perlu Konfirmasi Lanjutan

Semua pertanyaan sudah terjawab dan seluruh aset (logo Lumi, palet warna, font, 15 logo klien, 18 cover portfolio) sudah tersedia di repo (lihat §4.1) — PRD ini siap dipakai sebagai basis wireframe/development. Satu item non-blocking yang masih perlu keputusan tim sebelum implementasi Portfolio:

1. Mapping kategori portfolio (dari nama file) ke 4 kategori Layanan resmi, dan keputusan apakah `TBIG Mobile_Quality Assurance.png` perlu di-crop ulang dulu sebelum dipakai (lihat catatan aspect ratio di §4.1).

---

## Appendix A: Draft CTA Copy & Template Pesan WhatsApp — **Disetujui**

> Nomor WA resmi: **081283950403** (format internasional untuk `wa.me`: `6281283950403`). Wording copy sudah di-acc, tinggal diimplementasi.

| Section | Label CTA | Template pesan WA (pre-filled) |
|---|---|---|
| Hero | "Konsultasi Gratis" | `Halo Lumi Beta Works, saya tertarik konsultasi gratis soal pembuatan website/app. Boleh dibantu?` |
| Tentang Kami | "Chat dengan Kami" | `Halo Lumi Beta Works, saya habis baca tentang tim kalian dan mau ngobrol-ngobrol soal project saya.` |
| Paket & Harga — tier Landing Page (Rp 300.000) | "Ambil Paket Ini" | `Halo Lumi Beta Works, saya mau tanya-tanya soal paket Landing Page Rp 300.000. Boleh dijelaskan detailnya?` |
| Paket & Harga — tier Custom/Enterprise | "Diskusikan Kebutuhan Saya" | `Halo Lumi Beta Works, saya tertarik paket custom/enterprise untuk project saya. Bisa dibantu diskusikan lebih lanjut?` |
| Halaman Pricelist (generik per tier) | "Hubungi Kami" | `Halo Lumi Beta Works, saya lihat halaman pricelist dan tertarik dengan paket {nama_paket}. Boleh dibantu?` |
| Footer / CTA Akhir | "Mulai Project Sekarang" | `Halo Lumi Beta Works, saya ingin mulai diskusi soal project saya.` |

Contoh implementasi link: `https://wa.me/6281283950403?text=${encodeURIComponent(template)}` — pesan di-encode dulu supaya karakter spasi/simbol tidak merusak URL.
