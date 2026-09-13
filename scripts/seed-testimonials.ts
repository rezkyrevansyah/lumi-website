import { db } from "../src/db";
import { testimonials } from "../src/db/schema";

// Snapshot of the formerly-hardcoded src/data/testimonials.ts content, inlined
// here so this one-time migration script has no dependency on that file
// (which Task 8 deletes once the DB-backed section is verified).
const sourceTestimonials: { name: string; role: string; quote: string; rating: number }[] = [
  {
    name: "Winnie",
    role: "Pemilik Bisnis, London",
    rating: 5,
    quote:
      "The experience of working with Revan was truly great throughout the entire process. He constructed a full stack web application for our business in London precisely as we needed it. Communication was always clear, he got a quick grasp of our requirements, proposed some practical improvements, and met all the milestones on time. The code was clean, the user interface had a professional appearance, and the backend was both reliable and well-structured.",
  },
  {
    name: "Ron",
    role: "Klien Internasional",
    rating: 5,
    quote:
      "Nice, he do a full stack web development and can work using english. Outstanding results and give a lot of bonus. Good work",
  },
  {
    name: "Eca",
    role: "Mitra UMKM",
    rating: 5,
    quote: "Makasih kakk rekomenn",
  },
  {
    name: "Daa",
    role: "Klien",
    rating: 5,
    quote: "Sangat memuaskan",
  },
  {
    name: "Totocos",
    role: "Klien UI/UX",
    rating: 5,
    quote: "Sip, rekomended. Untuk UI/UX. Respon bagus",
  },
  {
    name: "Fahmi",
    role: "Creative Director",
    rating: 5,
    quote:
      "Kerjasama dengan mas Revan sangat professional, saya merekomendasikan untuk pembuatan UI/UX.",
  },
  {
    name: "Bimol7",
    role: "Mitra UMKM",
    rating: 5,
    quote: "Mantap, rekomended deh pokoknya",
  },
  {
    name: "Ninda",
    role: "Klien",
    rating: 5,
    quote: "Luar biasa, diberi deadline 2 hari selesai dalam 1 hari, worth it!",
  },
  {
    name: "Hafiz",
    role: "Klien UI/UX & Web",
    rating: 5,
    quote: "Nicee, pengerjaan lengkap dari UI/UX sampai website jadi, gokil banget hasilnya.",
  },
  {
    name: "Rian",
    role: "Mitra Bisnis",
    rating: 5,
    quote: "Sudah sering sama mas Revan, hasilnya selalu mantap, cepat, dan rapih!",
  },
  {
    name: "Fazli",
    role: "Klien",
    rating: 5,
    quote: "Diskusi enak dan solutif. Pengerjaan teknisnya rapih dan sesuai ekspektasi.",
  },
  {
    name: "Haechel",
    role: "Klien Berkala",
    rating: 5,
    quote: "Sudah repeat order berkali-kali untuk kebutuhan sistem dan web, selalu puas sama hasilnya.",
  },
];

async function main() {
  const rows: (typeof testimonials.$inferInsert)[] = sourceTestimonials.map((t, i) => ({
    name: t.name,
    roleId: t.role,
    roleEn: t.role,
    quote: t.quote,
    rating: t.rating,
    sortOrder: i + 1,
  }));

  console.log(`Seeding ${rows.length} testimonial rows...`);

  await db.insert(testimonials).values(rows);

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
