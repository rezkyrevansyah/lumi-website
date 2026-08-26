# Handoff: Lumi Beta Works CMS — Finalisasi oleh AI Agent

## Status Build Saat Ini

**Build CLEAN** — `npx next build` lulus tanpa TypeScript error. Jangan rusak ini.
Selalu jalankan `npx next build` setelah selesai setiap task untuk verifikasi.

---

## Konteks Proyek

- **Direktori:** `D:\projects\lumi-website`
- **Stack:** Next.js 16 (App Router, Turbopack), TypeScript, Drizzle ORM, Supabase PostgreSQL, shadcn/ui, iron-session v8
- **Tujuan:** Website company profile + full CMS untuk Lumi Beta Works (software house)

---

## Arsitektur yang Sudah Berjalan (JANGAN UBAH)

- **Auth:** iron-session, `ADMIN_PASSWORD` dari `.env.local`, middleware di `middleware.ts` protect `/admin/*`
- **DB:** Drizzle ORM + Supabase PostgreSQL. Schema di `src/db/schema.ts`
- **Pattern:** Next.js Server Actions (`"use server"`) untuk mutations, Server Components untuk reads
- **Upload gambar:** `POST /api/upload` dengan `FormData` field `file` + `folder` → Supabase Storage bucket `media`
- **UI:** shadcn/ui (`Table`, `Dialog`, `Button`, `Input`, `Textarea`, `Label`, `Separator`)
- **Shared admin components:** `src/components/admin/shared/` → `TagInput`, `TagBadge`, `ConfirmDialog`, `EmptyState`, `PageHeader`

### Pola Standar Admin Page — TIRUKAN PERSIS

```
page.tsx (Server Component)
  └── fetch data via action
  └── pass ke List component sebagai initialItems

XxxList.tsx (Client — "use client")
  └── useState untuk local list
  └── useTransition untuk pending (BUKAN useState loading)
  └── panggil server action langsung
  └── Dialog form untuk add/edit
  └── ConfirmDialog untuk delete
```

File referensi terbaik:
- List CRUD sederhana → `src/components/admin/faqs/FAQList.tsx` + `FAQFormDialog.tsx`
- Form dengan image upload → `src/components/admin/certifications/CertificationList.tsx`
- Form JSON/key-value → `src/components/admin/settings/HeroContentEditor.tsx`
- TagInput (array of strings) → `src/components/admin/shared/TagInput.tsx`

### useTransition Pattern (WAJIB)
```tsx
const [isPending, startTransition] = useTransition()
function handleSave(data) {
  startTransition(async () => {
    const result = await serverAction(data)
    setItems(prev => [...prev, result]) // update local state
  })
}
```

### Image Upload Pattern
```ts
const fd = new FormData()
fd.append("file", file)
fd.append("folder", "about") // atau "certifications", "partners"
const res = await fetch("/api/upload", { method: "POST", body: fd })
const { url } = await res.json() // public URL Supabase Storage
```

### Copywriting Rules (WAJIB — langgar ini = salah)
1. NO AI TONE — harus terdengar manusiawi, langsung
2. NO double dash `--`
3. NO fluff/basa-basi — to the point

---

## TASK LIST (Kerjakan Berurutan)

---

### TASK 1 — `src/app/admin/about/page.tsx` + Components

**Actions tersedia di `src/actions/about.ts`:**
```ts
// About Principles — tabel aboutPrinciples
getAboutPrinciples(section?: string)
createAboutPrinciple({ section, icon, title, description, accentColor?, bgColor?, sortOrder? })
updateAboutPrinciple(id, Partial<{ section, icon, title, description, accentColor, bgColor, sortOrder }>)
deleteAboutPrinciple(id)

// Achievements — tabel achievements
getAchievements()
createAchievement({ value, label, description?, accentColor?, bgColor?, sortOrder? })
updateAchievement(id, Partial<{ value, label, description, accentColor, bgColor, sortOrder }>)
deleteAchievement(id)

// Founder — disimpan di site_settings key "founder"
getFounder()   // returns { name, title, bio, photo_url, credentials: string[], quote, fastworkUrl? }
updateFounder({ name, title, bio, photoUrl, credentials: string[], quote, fastworkUrl? })

// Story — disimpan di site_settings key "about_story"
getAboutStory()   // returns { paragraph1, paragraph2, paragraph3? }
updateAboutStory({ paragraph1, paragraph2, paragraph3? })
```

**Halaman `admin/about` — 5 tab:**

**Tab 1: Founder**
Fields: `name` (text), `title` (text), `bio` (textarea), `photoUrl` (text input + tombol upload ke folder `"about"`), `credentials` (TagInput — array string), `quote` (textarea), `fastworkUrl` (text, optional)
Satu form, satu tombol Save. Tidak ada list/delete.

**Tab 2: Story**
Fields: `paragraph1` (textarea), `paragraph2` (textarea), `paragraph3` (textarea, optional)
Satu form, satu tombol Save.

**Tab 3: Why Choose Us**
List CRUD dari `aboutPrinciples` dengan `section = "why_choose_us"`
Form fields: `icon` (text — emoji atau nama icon), `title`, `description`, `accentColor` (hex), `bgColor` (hex), `sortOrder` (number)

**Tab 4: Work Principles**
List CRUD dari `aboutPrinciples` dengan `section = "work_principles"`
Form fields sama dengan Tab 3.

**Tab 5: Achievements**
List CRUD dari `achievements`
Form fields: `value` (contoh: "50+"), `label` (contoh: "Proyek Selesai"), `description` (optional), `accentColor`, `bgColor`, `sortOrder`

**File yang dibuat:**
```
src/app/admin/about/page.tsx
src/components/admin/about/AboutEditor.tsx        ← client component utama, render tabs
src/components/admin/about/FounderForm.tsx
src/components/admin/about/StoryForm.tsx
src/components/admin/about/PrincipleList.tsx      ← reusable untuk tab 3 & 4, terima prop section
src/components/admin/about/PrincipleFormDialog.tsx
src/components/admin/about/AchievementList.tsx
src/components/admin/about/AchievementFormDialog.tsx
```

**`page.tsx` pattern:**
```tsx
import { getAboutPrinciples, getAchievements, getFounder, getAboutStory } from "@/actions/about"
import AboutEditor from "@/components/admin/about/AboutEditor"

export default async function Page() {
  const [whyChooseUs, workPrinciples, achievements, founder, story] = await Promise.all([
    getAboutPrinciples("why_choose_us"),
    getAboutPrinciples("work_principles"),
    getAchievements(),
    getFounder(),
    getAboutStory(),
  ])
  return <AboutEditor
    initialWhyChooseUs={whyChooseUs}
    initialWorkPrinciples={workPrinciples}
    initialAchievements={achievements}
    initialFounder={founder}
    initialStory={story}
  />
}
```

---

### TASK 2 — `src/app/admin/umkm/page.tsx` + Components

**Actions tersedia di `src/actions/umkm.ts`:**
```ts
// Use Cases — tabel umkmUseCases
getUmkmUseCases()
createUmkmUseCase({ iconName, title, description, tags?, isHighlighted?, sortOrder? })
updateUmkmUseCase(id, Partial<{ iconName, title, description, tags, isHighlighted, sortOrder }>)
deleteUmkmUseCase(id)

// Process Steps — tabel umkmProcessSteps
getUmkmProcessSteps()
createUmkmProcessStep({ stepNumber, title, description, sortOrder? })
updateUmkmProcessStep(id, Partial<{ stepNumber, title, description, sortOrder }>)
deleteUmkmProcessStep(id)

// Market Stats — tabel umkmMarketStats
getUmkmMarketStats()
createUmkmMarketStat({ value, label, sortOrder? })
updateUmkmMarketStat(id, { value?, label?, sortOrder? })
deleteUmkmMarketStat(id)

// Why Us — disimpan di site_settings key "umkm_why_us"
getUmkmWhyUs()   // returns array JSON
updateUmkmWhyUs(Array<{ icon, title, description, accentColor?, bgColor? }>)
```

**Halaman `admin/umkm` — 4 tab:**

**Tab 1: Use Cases**
List CRUD dari `umkmUseCases`
Form fields: `iconName` (text — nama emoji/lucide icon), `title`, `description`, `tags` (TagInput), `isHighlighted` (checkbox), `sortOrder`

**Tab 2: Process Steps**
List CRUD dari `umkmProcessSteps`
Form fields: `stepNumber` (number), `title`, `description`, `sortOrder`
Tampilkan sebagai ordered list dengan step number di depan

**Tab 3: Market Stats**
List CRUD dari `umkmMarketStats`
Form fields: `value` (contoh: "64 Juta"), `label` (contoh: "UMKM di Indonesia"), `sortOrder`
Mirip StatsEditor di settings

**Tab 4: Why Us**
Bukan CRUD per item — simpan array sekaligus via `updateUmkmWhyUs`
UI: daftar item yang bisa di-add/remove. Setiap item punya: `icon` (text), `title`, `description`, `accentColor`, `bgColor`
Satu tombol "Save All" di bawah

**File yang dibuat:**
```
src/app/admin/umkm/page.tsx
src/components/admin/umkm/UmkmEditor.tsx          ← client component utama, render tabs
src/components/admin/umkm/UseCaseList.tsx
src/components/admin/umkm/UseCaseFormDialog.tsx
src/components/admin/umkm/ProcessStepList.tsx
src/components/admin/umkm/ProcessStepFormDialog.tsx
src/components/admin/umkm/MarketStatList.tsx
src/components/admin/umkm/WhyUsEditor.tsx         ← form array, simpan sekaligus
```

**`page.tsx` pattern:**
```tsx
import { getUmkmUseCases, getUmkmProcessSteps, getUmkmMarketStats, getUmkmWhyUs } from "@/actions/umkm"
import UmkmEditor from "@/components/admin/umkm/UmkmEditor"

export default async function Page() {
  const [useCases, processSteps, marketStats, whyUs] = await Promise.all([
    getUmkmUseCases(),
    getUmkmProcessSteps(),
    getUmkmMarketStats(),
    getUmkmWhyUs(),
  ])
  return <UmkmEditor
    initialUseCases={useCases}
    initialProcessSteps={processSteps}
    initialMarketStats={marketStats}
    initialWhyUs={whyUs as Array<{ icon: string; title: string; description: string; accentColor?: string; bgColor?: string }> | null}
  />
}
```

**Catatan sidebar:** Link `/admin/about` dan `/admin/umkm` sudah ada di `src/components/admin/layout/AdminSidebar.tsx` — tidak perlu diubah.

---

### TASK 3 — Fase 7: Seed Data

**Tujuan:** Mengisi DB dengan konten awal dari data hardcoded yang ada di codebase.

**Langkah:**

1. Pastikan schema sudah ter-push ke DB:
```bash
npx drizzle-kit push
```
Kalau stuck lebih dari 2 menit, Ctrl+C dan coba lagi. Kalau tetap gagal, jalankan dengan flag:
```bash
npx drizzle-kit push --force
```

2. Jalankan seed:
```bash
npx tsx src/db/seed.ts
```

3. Verifikasi berhasil — output harus ada baris seperti:
```
Seeding portfolio items...
Seeding testimonials...
...
Seed complete!
```

4. Cek di admin dashboard (`/admin`) — stats card harus menunjukkan angka > 0 (portfolio count, testimonial count, dst.)

**Catatan penting:** `src/db/seed.ts` menggunakan `DELETE FROM` sebelum insert, jadi aman dijalankan berulang kali tanpa duplikasi.

---

### TASK 4 — Fase 8: Image Migration (Opsional, tapi dianjurkan)

**Tujuan:** Upload gambar dari `/public/` ke Supabase Storage bucket `media` supaya URL gambar di DB mengarah ke CDN Supabase, bukan file statis lokal.

**Gambar yang perlu dimigrasi:**

| Folder lokal | Folder Supabase | Keterangan |
|---|---|---|
| `public/images/projects/*.png` | `media/projects/` | 20+ gambar portfolio |
| `public/certificate/*.png` | `media/certifications/` | 4 gambar sertifikasi |
| `public/logo_partner/*` | `media/partners/` | 2 logo partner (alarqam, erafone) |
| `public/profile_founder/revan_photo1.png` | `media/about/` | Foto founder |

**Cara:** Buat script `src/db/seed-images.ts` yang:
1. Baca file dari `/public/` pakai `fs.readFile`
2. Upload ke Supabase Storage via `supabaseAdmin.storage.from("media").upload(path, buffer)`
3. Update URL di tabel DB (`portfolio_items.image_url`, `certifications.image_url`, dst.) ke public URL Supabase

Client Supabase admin tersedia di `src/lib/supabase-admin.ts`.

Jalankan:
```bash
npx tsx src/db/seed-images.ts
```

**Kalau skip task ini:** Gambar tetap terbaca dari `/public/` — website tetap jalan normal. Hanya saja URL di DB masih path lokal (`/images/projects/xxx.png`) bukan Supabase CDN URL. Bisa di-skip untuk sekarang, upload manual via `/admin/portfolio` (edit tiap item, upload ulang gambar).

---

## Verifikasi Akhir (Wajib Setelah Semua Task)

```bash
npx next build
```

Harus lulus tanpa TypeScript error. Semua halaman harus compile.

Lalu test manual:
- `/admin/about` — bisa lihat, edit, add, delete semua section
- `/admin/umkm` — sama
- `/admin` dashboard — stats menunjukkan angka dari DB
- Homepage (`/`) — konten terbaca dari DB, bukan hardcoded
