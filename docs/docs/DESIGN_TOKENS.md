# Design Tokens — Lumi Beta Works Website

Sumber keputusan: [PRD.md](PRD.md) §4.1. Pakai nilai di file ini sebagai variable (`$--nama-token`) saat kerja di pen.dev — jangan hardcode hex/px baru di tengah desain, supaya kalau ada revisi token cukup ubah di satu tempat.

## 1. Warna

| Token | Hex | Peran |
|---|---|---|
| `$--background` | `#FFFFFF` | Background utama halaman |
| `$--background-subtle` | `#FAFAFA` | Background section selang-seling (zebra section) |
| `$--surface` | `#FFFFFF` | Card/surface — dibedakan dari background lewat **shadow**, bukan border keras |
| `$--border` | `#E4E4E7` | Divider dekoratif tipis (kontras rendah, jangan andalkan buat batas komponen penting) |
| `$--border-input` | `#D4D4D8` | Border resting state input form — wajib dipasangkan focus ring |
| `$--text-primary` | `#18181B` | Heading |
| `$--text-secondary` | `#52525B` | Body copy |
| `$--text-muted` | `#71717A` | Caption/meta text (dipakai secukupnya) |
| `$--accent-50` | `#ECFDF5` | Background badge/tag ringan |
| `$--accent-500` | `#10B981` | Ikon, ilustrasi, aksen dekoratif |
| `$--accent-700` | `#047857` | Solid fill sekunder (teks putih di atasnya) |
| `$--accent-800` | `#065F46` | Teks link/accent di atas putih |
| `$--cta-solid` | `#18181B` | **CTA primer** — solid gelap, teks putih |
| `$--cta-solid-hover` | `#27272A` | Hover state CTA primer |
| `$--gradient-violet` | `#7C3AED` | Dekoratif hero glow saja (lihat §4 Gradient) |
| `$--gradient-blue` | `#2563EB` | Dekoratif hero glow saja |
| `$--gradient-emerald` | `#10B981` | Dekoratif hero glow saja (sama dengan `$--accent-500`) |
| `$--focus-ring` | `#059669` (emerald-600) | **Focus ring** — wajib dipakai di SEMUA kontrol interaktif (Button, Language Toggle, Nav Link, Social Icon Link, Ghost-Icon). 2px solid, offset 2px, style `:focus-visible` bukan `:focus` bare. Kontras terukur: 3.77:1 vs `$--background` putih (lolos ambang non-text UI component 3:1) dan tetap kebaca di atas `$--cta-solid` (zinc-900) karena ring punya offset 2px yang jatuh di background putih, bukan langsung di atas warna tombol. |

⚠️ **Jangan pernah pakai `zinc-400 (#A1A1AA)` untuk teks** — kontras cuma 2.56:1 di atas putih, gagal AA bahkan untuk teks besar. Kalau butuh warna lebih terang dari `$--text-muted`, itu tandanya elemen tersebut harus dekoratif/disabled, bukan teks yang perlu dibaca.

**Pembagian peran (one color, one meaning):** `$--cta-solid` (zinc-900) = "ini bisa diklik, aksi utama" — dipakai konsisten di semua CTA primer (Hero, Paket, CTA Akhir). `$--accent-*` (emerald) = identitas brand — badge highlight, ikon section, link teks, indikator nav aktif. Jangan tukar peran keduanya.

## 2. Tipografi

Font: **Bricolage Grotesque** (heading/display) + **Plus Jakarta Sans** (body/UI), variable weight 200–800.

| Token | Font | Size / Line-height (desktop) | Size / Line-height (mobile) | Weight | Dipakai untuk |
|---|---|---|---|---|---|
| `$--font-display` | Bricolage Grotesque | 56 / 60 | 36 / 44 | 700 | Hero tagline (H1) |
| `$--font-h2` | Bricolage Grotesque | 40 / 48 | 28 / 36 | 700 | Judul section |
| `$--font-h3` | Bricolage Grotesque | 28 / 40 | 22 / 32 | 600 | Judul card/sub-section |
| `$--font-h4` | Bricolage Grotesque | 20 / 28 | 18 / 26 | 600 | Judul kecil (nama tier, judul portfolio) |
| `$--font-body-lg` | Plus Jakarta Sans | 18 / 28 | 16 / 26 | 400 | Subhead hero, lead paragraph |
| `$--font-body` | Plus Jakarta Sans | 16 / 24 | 15 / 24 | 400 | Body copy standar |
| `$--font-small` | Plus Jakarta Sans | 14 / 20 | 14 / 20 | 400 | Caption, label form |
| `$--font-button` | Plus Jakarta Sans | 16 / 20 | 15 / 20 | 600 | Label tombol |
| `$--font-tiny` | Plus Jakarta Sans | 12 / 16 | 12 / 16 | 500 | Meta text, copyright footer |

⚠️ **`$--font-h3` line-height dinaikkan jadi 1.43 rasio** (dari draft awal 1.29) — dipakai untuk judul yang berpotensi wrap 2-3 baris (judul card/portfolio yang panjang), teks yang wrap butuh line-height ≥1.4 supaya tidak terlalu rapat.

**Measure (lebar maksimum paragraf panjang):** `$--measure-paragraph: 65ch` — dipakai untuk body copy panjang (Tentang Kami, deskripsi Layanan). Section boleh selebar ~1200px, tapi elemen `<p>` di dalamnya dibatasi `max-width: 65ch` supaya baris tidak lebih dari ~65-75 karakter (baris kepanjangan bikin mata susah lompat ke baris berikutnya).

## 3. Spacing

Skala 4px sebagai basis (dipakai untuk `gap` dan `padding`):

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

| Konteks | Nilai |
|---|---|
| Gap antar section (vertical rhythm) | 96 (desktop) / 64 (mobile) |
| Padding section horizontal | 32 (mobile) / 64–96 (desktop, dibatasi max-width konten ~1200px) |
| Gap grid card (Layanan, Tech Stack, Portfolio) | 24 |
| Padding dalam card | 24 |
| Gap tombol CTA berdampingan | 12–16 |

## 4. Radius

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `$--radius-sm` | 8px | Input, small tag |
| `$--radius-md` | 16px | Card (service, tech stack, portfolio) |
| `$--radius-lg` | 24px | Card besar (pricing, hero visual container) |
| `$--radius-pill` | 9999px | Button, badge, language toggle |

## 4b. Minimum Hit Area

Semua kontrol interaktif (Button, Language Toggle, Social Icon Link, Ghost-Icon, Menu Trigger) wajib punya target klik minimum:

| Konteks | Minimum |
|---|---|
| Target sentuh (mobile/touch) | 44×44px |
| Target klik (desktop, mouse) | 40×40px |
| Ambang WCAG 2.5.8 AA (baseline mutlak) | 24×24px |

Kalau elemen visualnya harus tetap kecil (mis. ikon 16px), perbesar hit area lewat padding/pseudo-element transparan di sekelilingnya — jangan perbesar ikonnya sendiri. Hit area antar kontrol tidak boleh saling tumpang tindih.

## 5. Shadow / Elevation

Card **tidak pakai border keras** — dibedakan dari background lewat soft shadow, sesuai gaya referensi (light theme, glassy, clean):

```
$--shadow-card: 0 4px 24px rgba(24, 24, 27, 0.06)
$--shadow-card-hover: 0 8px 32px rgba(24, 24, 27, 0.10)
```

**Image outline:** semua foto (cover Portfolio Card) pakai outline 1px opacity rendah supaya tidak "ngambang" di atas background putih — `$--image-outline: 1px solid oklch(0 0 0 / 0.1)`. Jangan pakai warna netral bertint (zinc/slate) untuk outline ini, harus pure black transparan.

## 6. Gradient Dekoratif (Hero Glow)

Diambil dari 3 warna ikon "Beta Works" di logo (ungu → biru → emerald). **Hanya dipakai sebagai radial-gradient blur beropasitas rendah (8–14%) di belakang Hero/section tertentu** — tidak pernah jadi warna solid teks/tombol.

```
radial-gradient(ellipse at top, $--gradient-emerald @ 12%, transparent 50%),
radial-gradient(ellipse at bottom-left, $--gradient-blue @ 10%, transparent 50%),
radial-gradient(ellipse at bottom-right, $--gradient-violet @ 8%, transparent 50%)
```

## 7. Breakpoints

| Nama | Lebar | Konteks |
|---|---|---|
| Mobile | 375px | Frame desain mobile di pen.dev |
| Tablet | 768px | Frame desain tablet |
| Desktop | 1440px | Frame desain desktop (max content width ~1200px, center-aligned) |
