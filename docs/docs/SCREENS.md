# Screens — Lumi Beta Works Website

Checklist screen yang perlu didesain di pen.dev. Urutan & isi tiap section mengikuti [PRD.md](PRD.md) §2. Tiap section didesain di 3 breakpoint: **Mobile (375px)**, **Tablet (768px)**, **Desktop (1440px)**.

Centang tiap kotak kalau breakpoint tersebut sudah selesai didesain di canvas.

## Halaman: Home (`/` — locale `id` default, `/en` untuk versi Inggris)

| # | Section | Mobile | Tablet | Desktop | Catatan |
|---|---|---|---|---|---|
| 1 | Hero | ☐ | ☐ | ☐ | Dual CTA harus tetap keliatan tanpa scroll di mobile |
| 2 | Dipercaya Oleh (Marquee) | ☐ | ☐ | ☐ | Auto-scroll infinite, cek `prefers-reduced-motion` state juga |
| 3 | Tentang Kami | ☐ | ☐ | ☐ | Copy dari [CONTENT.md](CONTENT.md), termasuk CTA WA |
| 4 | Layanan (grid 4) | ☐ | ☐ | ☐ | 1 kolom mobile, 2 kolom tablet, 4 kolom desktop |
| 5 | Our Tech Stack | ☐ | ☐ | ☐ | Grid logo, jumlah kolom menyesuaikan breakpoint |
| 6 | Badge Sertifikasi | ☐ | ☐ | ☐ | Hanya logo, tanpa teks deskriptif |
| 7 | Paket & Harga (teaser, 3 card) | ☐ | ☐ | ☐ | Tier termurah di-highlight visual |
| 8 | Portfolio / Studi Kasus | ☐ | ☐ | ☐ | 18 project, cek layout grid untuk jumlah ganjil/genap |
| 9 | Testimoni (placeholder) | ☐ | ☐ | ☐ | State "Segera Hadir" |
| 10 | CTA Akhir + Footer | ☐ | ☐ | ☐ | |

## Halaman: Pricelist (`/pricelist`, `/en/pricelist`)

| Bagian | Mobile | Tablet | Desktop | Catatan |
|---|---|---|---|---|
| Header/breadcrumb halaman | ☐ | ☐ | ☐ | |
| Breakdown penuh semua tier | ☐ | ☐ | ☐ | Detail fitur per tier — lihat catatan draft di CONTENT.md |
| CTA WA per tier | ☐ | ☐ | ☐ | Template pesan beda per tier (lihat PRD Appendix A) |
| Footer | ☐ | ☐ | ☐ | Reuse komponen Footer dari Home |

## Cross-cutting (cek di semua screen)

- ☐ Language toggle ID/EN kelihatan & konsisten posisinya di semua screen.
- ☐ Navbar sticky, termasuk state scrolled (opsional shadow saat scroll).
- ☐ Mobile menu (hamburger) untuk breakpoint <768px.
- ☐ Semua CTA WA memakai template pesan yang benar sesuai section (PRD Appendix A) — bukan link generik yang sama di semua tempat.
- ☐ Kontras warna teks vs background sudah dicek sesuai [DESIGN_TOKENS.md](DESIGN_TOKENS.md) (jangan pakai `zinc-400` untuk teks).

## Catatan Bahasa

Layout Home & Pricelist **hanya perlu didesain sekali** (versi ID) — versi EN memakai struktur/komponen yang sama, tapi cek dua hal manual setelah copy EN final tersedia:
1. Panjang teks EN vs ID bisa beda signifikan (mis. label tombol EN sering lebih pendek) — pastikan komponen text pakai `fixed-width` + wrapping, bukan lebar hardcode, supaya tidak overflow di salah satu bahasa.
2. Kalau ada perbedaan layout signifikan antar bahasa, catat di sini sebagai temuan, jangan langsung diasumsikan sama.
