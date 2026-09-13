import { db } from "../src/db";
import { certifications } from "../src/db/schema";

// Snapshot of the formerly-hardcoded `certifications` export from
// src/data/techStack.ts, inlined here (not imported) so this seed script has
// no dependency on that file — this task deletes it once migrated.
const existing = [
  {
    key: "google",
    name: "Google",
    logo: "/certificate/4-optimized.png",
    alt: "Google",
  },
  {
    key: "bangkit",
    name: "Bangkit Academy",
    logo: "/certificate/2-optimized.png",
    alt: "Bangkit Academy (Google, GoTo, Traveloka)",
  },
  {
    key: "laskar-ai",
    name: "Laskar AI",
    logo: "/certificate/3-light-bg.png",
    alt: "Laskar AI (Indosat, Lintasarta, NVIDIA, Dicoding)",
  },
  {
    key: "dicoding",
    name: "Dicoding Indonesia",
    logo: "/certificate/1-optimized.png",
    alt: "Dicoding Indonesia",
  },
];

async function main() {
  const rows = existing.map((cert, index) => ({
    key: cert.key,
    name: cert.name,
    imagePath: cert.logo,
    altText: cert.alt,
    sortOrder: index,
  }));
  await db.insert(certifications).values(rows);
  console.log(`Seeded ${rows.length} certifications.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
