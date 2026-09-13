# Design Handoff — pen.dev → Next.js

Referensi buat developer yang meng-convert hasil desain pen.dev (Revan) ke kode Next.js (PRD §4.1). pen.dev di sini **hanya alat preview/desain visual** — output final tetap Next.js + Tailwind, bukan HTML statis.

## 1. Token Mapping

pen.dev pakai variable `$--nama-token`, Next.js pakai CSS variable + Tailwind config. Mapping 1:1, sumber nilai di [DESIGN_TOKENS.md](DESIGN_TOKENS.md):

| pen.dev variable | Tailwind config / CSS var | Contoh class |
|---|---|---|
| `$--background` | `--color-background` | `bg-background` |
| `$--surface` | `--color-surface` | `bg-surface` |
| `$--text-primary` | `--color-text-primary` | `text-text-primary` |
| `$--text-secondary` | `--color-text-secondary` | `text-text-secondary` |
| `$--accent-700` | `--color-accent-700` | `bg-accent-700` |
| `$--cta-solid` | `--color-cta-solid` | `bg-cta-solid` |
| `$--radius-md` | `--radius-md` (16px) | `rounded-md` (custom scale) |
| `$--shadow-card` | `--shadow-card` | `shadow-card` (custom Tailwind shadow) |
| `$--font-display` (Bricolage Grotesque) | `--font-bricolage` | `font-display` |
| `$--font-body` (Plus Jakarta Sans) | `--font-jakarta` | `font-sans` |

Developer perlu extend `tailwind.config` dengan token-token ini (bukan warna Tailwind default) supaya class di kode 1:1 dengan desain — jangan translate manual ke hex Tailwind bawaan (mis. jangan pakai `bg-emerald-700` langsung, pakai `bg-accent-700` yang sudah di-map ke token proyek).

## 2. Component Mapping

Tiap komponen di [COMPONENTS.md](COMPONENTS.md) map ke satu file komponen React:

| Komponen pen.dev | File React (`src/components/`) |
|---|---|
| `Navbar` | `Navbar.tsx` |
| `Button/Primary`, `Button/Secondary`, `Button/Ghost-Icon` | `Button.tsx` (satu komponen, prop `variant`) |
| `Language Toggle` | `LanguageToggle.tsx` |
| `Section Header` | `SectionHeader.tsx` |
| `Marquee Track` + `Marquee Item` | `LogoMarquee.tsx` (terima array logo sebagai prop, bukan hardcode per instance) |
| `Service Card` | `ServiceCard.tsx` |
| `Tech Stack Item` | `TechStackItem.tsx` |
| `Certification Badge` | `CertificationBadge.tsx` |
| `Pricing Card` + `Pricing Feature Item` | `PricingCard.tsx` (prop `variant: "highlighted" | "standard"`) |
| `Portfolio Card` | `PortfolioCard.tsx` |
| `Testimonial Placeholder Card` / `Testimonial Card` | `TestimonialCard.tsx` (prop `state: "placeholder" | "filled"`) |
| `Footer` | `Footer.tsx` |

**Sebelum bikin komponen baru, cek dulu apakah komponennya sudah ada di codebase** (per aturan pen.dev sendiri di `code.md`) — update yang sudah ada, jangan duplikat.

## 3. Icon

pen.dev diatur pakai library **`lucide`** secara konsisten (lihat COMPONENTS.md) — di Next.js pakai package `lucide-react`, nama icon 1:1 sama (mis. `home`, `settings`, `search`). Kalau desainer pakai Material Symbols di beberapa tempat, developer perlu cari padanan `lucide` yang setara sebelum implementasi, supaya konsisten satu icon set di seluruh situs.

## 4. Gambar

- Semua image fill di pen.dev (logo, portfolio cover) → `next/image` di kode.
- Portfolio card: pen.dev bisa render cover apa adanya, tapi di kode **wajib** dibungkus container `aspect-video` + `object-cover` (lihat PRD §4.1 & ASSETS.md soal variasi dimensi asli 18 file cover) — jangan render native size.
- Client logo: `height` seragam (`h-8`/`h-10` Tailwind), `width: auto` — logo sudah dinormalisasi landscape, tidak perlu processing tambahan.

## 5. Konten & Copy

**Jangan retype copy dari desain pen.dev secara manual ke JSX.** Sumber teks final ada di [CONTENT.md](CONTENT.md), yang lalu dipindah ke:
- `messages/id.json` + `messages/en.json` (next-intl) untuk teks statis.
- `/data/*.ts` untuk data terstruktur (portfolio, tech stack, pricing tier, client logos) — lihat PRD §4.2.

Kalau ada perbedaan antara teks di desain pen.dev vs CONTENT.md (mis. desainer edit copy langsung di canvas), **CONTENT.md yang jadi source of truth** setelah direview tim — update CONTENT.md dulu, baru sinkronkan ke kode.

## 6. Responsive

Breakpoint desain pen.dev (375 / 768 / 1440, lihat SCREENS.md) → Tailwind breakpoint:

| pen.dev frame | Tailwind |
|---|---|
| 375px (mobile) | default (no prefix) |
| 768px (tablet) | `md:` |
| 1440px (desktop) | `lg:` / `xl:` (max content width 1200px, center) |

## 7. Item yang Masih `[TBD]` Saat Handoff

Cek [CONTENT.md](CONTENT.md) untuk placeholder yang belum final sebelum coding section terkait:
- Detail fitur/scope tiap tier pricing (§7 & §11 CONTENT.md).
- Email kontak resmi Lumi Beta Works (footer).
- Mapping kategori portfolio "web machine learning" → kategori Layanan resmi.

Jangan hardcode nilai placeholder ini sebagai final di kode — tandai dengan komentar `// TODO: confirm with Lumi team` di data file terkait.
