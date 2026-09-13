# Assets — Lumi Beta Works Website

Manifest semua file aset yang sudah tersedia di repo, dan di mana dipakainya. Sumber: [PRD.md](PRD.md) §4.1.

> 📁 File `.md` ada di `docs/`, tapi semua aset (logo, gambar) ada di **root project**, satu level di atas `docs/` — path di tabel bawah ini relatif ke root (`../` dari `docs/`), bukan relatif ke folder `docs/` itu sendiri.

## Logo Lumi

| File | Path (relatif ke root project) | Dipakai untuk |
|---|---|---|
| Logo square | `logo_lumi_square_transparant.png` | Favicon, app icon, konteks rasio 1:1 (avatar sosial media) |
| Logo landscape | `logo_lumi_landscape_transparant.png` | Header/navbar, footer |

## Font

Lihat [DESIGN_TOKENS.md](DESIGN_TOKENS.md) §2 — Plus Jakarta Sans (body) + Bricolage Grotesque (heading), keduanya via Google Fonts / `next/font/google`.

## Palet Warna

Lihat [DESIGN_TOKENS.md](DESIGN_TOKENS.md) §1.

## Client Logo (`client-logo/`) — 15 file, format SVG

Dipakai di section "Dipercaya Oleh" (Marquee). **Hanya logo yang ditampilkan secara visual, nama klien tidak dirender sebagai teks.** Sudah dinormalisasi landscape & rapi — tinggal dipasang dengan `height` seragam (`width: auto`), tidak perlu crop/normalisasi tambahan.

⚠️ **"Tidak dirender sebagai teks" ≠ "tanpa alt text".** Tiap logo tetap wajib punya `alt` attribute berisi nama klien di bawah ini (dibaca screen reader, tidak tampil visual) — kalau di-set `alt=""`, pengguna screen reader jadi tidak tahu klien mana saja yang ditampilkan sama sekali.

1. Amara Reflexology Logo.svg
2. EKRAF Logo.svg
3. Erafone Logo.svg
4. Masjid Al-Arqam Logo.svg
5. Micin.id Logo.svg
6. Monis Logo.svg
7. Next Swimming School Logo.svg
8. PDAM Tirta Semerbak Logo.svg
9. PT Dahana Logo.svg
10. Robux Indo Store Logo.svg
11. Solutechasia Logo.svg
12. TBIG Logo.svg
13. Taman Nasional Lorentz Logo.svg
14. The Textile Map Logo.svg
15. Yoonjae Space Studio Logo.svg

## Portfolio Cover (`portofolio-images/`) — 18 file, format PNG

Dipakai di section "Portfolio / Studi Kasus". Nama file mengikuti pola `{Nama Proyek}_{Kategori}.png` — dipetakan langsung ke field `title` + `category` di data config (lihat PRD §4.2), tidak perlu input ulang manual.

| Project (title) | Kategori (dari nama file) | Dimensi | Catatan |
|---|---|---|---|
| Athro Barbershop | Web Development | 1920×1080 | ✅ standar |
| Bali Pass Website | Web Development | 1920×1080 | ✅ standar |
| BAZNAS Website | Quality Assurance | 1904×936 | ⚠️ sedikit menyimpang, auto-crop `object-cover` (disetujui) |
| Cinta Zakat BAZNAS | Quality Assurance | 1907×935 | ⚠️ sedikit menyimpang, auto-crop `object-cover` (disetujui) |
| Dapur Nusantara | Mobile Development and UIUX | 1920×1080 | ✅ standar |
| E-Water | Mobile Development and UIUX | 1920×1080 | ✅ standar |
| EKRAF HUB | Quality Assurance | 1904×929 | ⚠️ sedikit menyimpang, auto-crop `object-cover` (disetujui) |
| Erafone Website | Quality Assurance | 1916×936 | ⚠️ sedikit menyimpang, auto-crop `object-cover` (disetujui) |
| Masjid Al-Arqam Website | Web Development | 1920×1080 | ✅ standar |
| Monis Rent | Web Development | 1919×861 | ⚠️ lebih lebar dari 16:9, auto-crop `object-cover` (disetujui) |
| Next Swimming School | Web Development | 1920×1080 | ✅ standar |
| Portal Intranet EKRAF | Quality Assurance | 1916×937 | ⚠️ sedikit menyimpang, auto-crop `object-cover` (disetujui) |
| Primaya App Revamp | UIUX Design | 1920×1080 | ✅ standar |
| Robux Indo Store | Web Development | 1920×1080 | ✅ standar |
| SAFTY | Mobile Development and UIUX | 1920×1080 | ✅ standar |
| TBIG Mobile | Quality Assurance | 1080×720 | ⚠️ paling menyimpang (rasio ~1.5:1), auto-crop `object-cover` (disetujui) |
| Terra Scan | web machine learning | 1425×837 | ⚠️ menyimpang, auto-crop `object-cover` (disetujui); kategori "machine learning" perlu dipetakan manual ke salah satu dari 4 kategori Layanan resmi |
| Yoonjae Space Studio | Web Development | 1920×1080 | ✅ standar |

**Semua cover dirender dalam container `aspect-video` (16:9) + `object-cover`** — file yang menyimpang akan ke-crop otomatis, sudah dikonfirmasi cukup (tidak perlu crop manual), konsisten dengan pola portfolio card Lumi sebelumnya.

**Belum ada kategori proyek untuk "Consulting"** di antara 18 portfolio yang ada — bukan blocker, hanya catatan konten kalau nanti ingin representasi merata di 4 kategori Layanan.

## UI References (`ui-references/`) — 9 file

Moodboard referensi desain (bukan brand yang sama, cuma diambil pola visualnya). Path relatif ke root project (`../ui-references/`).

| File | Referensi | Elemen yang relevan buat Lumi |
|---|---|---|
| `1.jpeg` | CustomGPT.ai | Trust bar logo klien di bawah hero, kombinasi CTA solid + outline berdampingan |
| `2.jpg` | Pathio | **Referensi utama** — light theme, floating card dengan soft shadow, CTA solid gelap (sudah jadi basis [DESIGN_TOKENS.md](DESIGN_TOKENS.md)) |
| `3.jpg` | H501 (hosting, dark theme) | Trust bar logo, card pricing sederhana — nada dark, **tidak dipakai** untuk Lumi karena kita commit ke light theme |
| `4.jpg` | Finvesto (fintech) | Hero dengan mockup device + kartu statistik melayang, trust bar logo klien |
| `5.jpg` | Travexa (travel app) | Row ikon fitur di bawah hero, grid artikel/blog card, footer dengan newsletter form |
| `6.jpg` | Optima (data analytics) | Badge kecil di atas headline ("Powered by AI" pill) — pola yang sama bisa dipakai buat eyebrow label di Section Header |
| `7.jpg` | Roftof (interior design studio) | Editorial/warm tone — **tidak dipakai langsung**, di luar arah visual Lumi yang lebih clean-tech |
| `8.jpg` | AALO (consulting) | Card layanan berwarna pastel per kategori (Quality Assurance, Business Analysis, dst) — **konsepnya relevan** buat grid Layanan Lumi, tapi warnanya tidak dipakai (Lumi commit ke neutral zinc + aksen emerald tunggal, bukan pastel per-card, biar konsisten sama palet di DESIGN_TOKENS.md) |
| `9.jpg` | Zuma (WordPress consulting theme) | Language switcher ("ENG ⌄") di pojok kanan atas nav — **referensi langsung** buat posisi `Language Toggle` Lumi; juga ada stat counter ("1.5K+ Klien", "83 Penghargaan") yang bisa jadi opsi tambahan di Hero/Tentang Kami kalau datanya tersedia |

**Catatan arah desain:** dari 9 referensi ini, yang paling dekat sama arah Lumi (light theme, clean, soft shadow) adalah **Pathio (`2.jpg`)** — sudah jadi basis token warna. Elemen dari referensi lain diambil sepotong-sepotong (posisi toggle bahasa dari Zuma, trust bar dari CustomGPT/Finvesto), bukan diikuti utuh satu gaya.
