# Components — Lumi Beta Works Website

Inventori komponen reusable yang perlu dibangun sekali di pen.dev (component + instance), sesuai pola `components`/`design-system` di pen.dev skill. Bangun tiap komponen di baris ini dulu sebelum menyusun screen, supaya semua instance ke-update otomatis kalau ada revisi.

Semua token warna/font/radius/spacing di bawah merujuk [DESIGN_TOKENS.md](DESIGN_TOKENS.md).

## Navigasi

| Komponen | Variant | Slot / Props | Dipakai di |
|---|---|---|---|
| `Navbar` | Default | Logo (landscape), Nav Links slot, Language Toggle, CTA Button slot, Menu Trigger (mobile) | Semua halaman, sticky on scroll |
| `Nav Link` | Default / Active | label text | Di dalam Navbar |
| `Language Toggle` | ID active / EN active | **Dua `<a href>` asli** ke rute locale (`/id`, `/en`) — bukan `<div>`/toggle custom, supaya dapat keyboard nav + Cmd/Ctrl/middle-click gratis dari native link | Navbar (desktop + mobile menu) |
| `Menu Trigger` | Closed (hamburger icon) / Open (close icon) | icon button, min hit-area sesuai DESIGN_TOKENS.md §4b | Navbar breakpoint <768px — pemicu buka/tutup `Mobile Menu` |
| `Mobile Menu` | Closed / Open | Nav Links slot, CTA Button slot | Navbar di breakpoint <768px |

## Button

| Komponen | Variant | Props | Dipakai di |
|---|---|---|---|
| `Button/Primary` | Default / Hover / Focus | label, icon (optional) | Hero CTA1, CTA Akhir, Pricing tier CTA, WA CTA manapun (`$--cta-solid`) |
| `Button/Secondary` | Outline / Ghost / Focus | label, icon (optional) | Hero CTA2 ("Lihat Paket"), aksi sekunder |
| `Button/Ghost-Icon` | Default / Focus | label + icon (mis. panah/external-link) | "Lihat Live" di Portfolio Card, link "Lihat Semua Paket" |

**Semua variant Button di atas wajib punya state Focus** — pakai `$--focus-ring` (DESIGN_TOKENS.md §1) via `:focus-visible`, dan hit-area minimum sesuai DESIGN_TOKENS.md §4b.

## Konten Umum

| Komponen | Slot / Props | Dipakai di |
|---|---|---|
| `Section Header` | eyebrow (optional), title, subtitle | Header tiap section (Layanan, Tech Stack, Paket, Portfolio, dll) |
| `Badge/Tag` | label text, warna (`accent-50` bg) | Highlight tier termurah ("Mulai dari"), kategori portfolio |

## Dipercaya Oleh (Marquee)

| Komponen | Slot / Props | Dipakai di |
|---|---|---|
| `Marquee Track` | Content slot (isi dengan Marquee Item, diduplikasi 2x untuk loop mulus) | Section "Dipercaya Oleh" |
| `Marquee Item` | logo image (SVG dari `client-logo/`), height seragam (lihat ASSETS.md), **alt text = nama klien asli** (lihat ASSETS.md) meski nama tidak dirender sebagai teks visual | Di dalam Marquee Track |

## Layanan & Tech Stack

| Komponen | Slot / Props | Dipakai di |
|---|---|---|
| `Service Card` | icon, title, description | Grid Layanan (4 instance: Website & App Dev, UI/UX Design, QA & Testing, Consulting) |
| `Tech Stack Item` | logo image (alt text = nama tech, mis. "Next.js"), label text | Grid Tech Stack (per item di daftar brief) |
| `Certification Badge` | logo image saja, tanpa teks visual — **tapi alt text tetap wajib diisi** nama sertifikasi/penyedia (logo tanpa alt = informasi hilang total buat screen reader, beda sama keputusan "tanpa teks visual") | Grid Badge Sertifikasi |

## Paket & Harga

| Komponen | Variant | Props | Dipakai di |
|---|---|---|---|
| `Pricing Card` | Highlighted (entry tier) / Standard | tier name, price/tagline, feature list slot, CTA button slot | Homepage teaser (3 card) + halaman Pricelist (breakdown penuh) |
| `Pricing Feature Item` | Default | check icon + text | Di dalam feature list slot Pricing Card |

## Portfolio

| Komponen | Props | Dipakai di |
|---|---|---|
| `Portfolio Card` | cover image (aspect-video, object-cover, outline `$--image-outline`, alt text = judul proyek), category badge, title, optional "Lihat Live" Button/Ghost-Icon | Grid Portfolio/Studi Kasus |

## Testimoni

| Komponen | Props | Dipakai di |
|---|---|---|
| `Testimonial Placeholder Card` | icon + teks "Segera Hadir" | Section Testimoni (state sementara sebelum ada data asli) |
| `Testimonial Card` | avatar, nama, role/perusahaan, quote | Disiapkan strukturnya sekarang, dipakai nanti begitu testimoni asli masuk (v1.1) |

## Footer

| Komponen | Slot / Props | Dipakai di |
|---|---|---|
| `Footer` | Logo, contact block slot, nav link columns slot, social icon row slot, copyright text | Semua halaman |
| `Social Icon Link` | icon (lucide), url | Di dalam social icon row |

## Catatan Implementasi di pen.dev

- Gunakan `slot` di setiap komponen yang butuh konten berbeda-beda per instance (lihat pola di `design-system.md` pen.dev) — mis. `Pricing Card` punya slot untuk feature list dan CTA button, bukan hardcode di komponen dasar.
- Icon pakai library **`lucide`** secara konsisten (bukan campur Material Symbols/Feather) — supaya 1:1 dengan `lucide-react` yang dipakai di kode Next.js nanti (lihat [DESIGN_HANDOFF.md](DESIGN_HANDOFF.md)).
- Stroke-width icon disesuaikan sama berat teks di sebelahnya: **1.5px** kalau berdampingan dengan teks regular (weight 400, mis. body/nav link), **2px** kalau berdampingan dengan teks semibold (weight 600, mis. judul card/button label).
- Semua komponen ditaruh di baris paling atas `document` (sesuai instruksi pen.dev), screen/halaman ditaruh di bawahnya.
- Setiap komponen final di canvas wajib diverifikasi state **Focus** (`$--focus-ring` kelihatan & kontras) dan **hit-area minimum** (DESIGN_TOKENS.md §4b) sebelum lanjut ke komponen berikutnya — jangan tunggu sampai semua screen selesai baru dicek sekaligus.
