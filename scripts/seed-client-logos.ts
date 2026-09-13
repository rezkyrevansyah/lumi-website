import { db } from "../src/db";
import { clientLogos } from "../src/db/schema";

// Snapshot of the formerly-hardcoded src/data/clientLogos.ts content, inlined
// here so this one-time migration script has no dependency on that file
// (which Task 9 deletes once the DB-backed section is verified).
const existingLogos: { src: string; alt: string }[] = [
  { src: "/client-logos/ekraf.webp", alt: "EKRAF" },
  { src: "/client-logos/erafone.webp", alt: "Erafone" },
  { src: "/client-logos/pt-dahana.webp", alt: "PT Dahana" },
  { src: "/client-logos/tbig.webp", alt: "TBIG" },
  { src: "/client-logos/solutechasia.webp", alt: "Solutechasia" },
  { src: "/client-logos/pdam-tirta-semerbak.webp", alt: "PDAM Tirta Semerbak" },
  { src: "/client-logos/monis.webp", alt: "Monis" },
  { src: "/client-logos/taman-nasional-lorentz.webp", alt: "Taman Nasional Lorentz" },
  { src: "/client-logos/amara-reflexology.webp", alt: "Amara Reflexology" },
  { src: "/client-logos/masjid-al-arqam.webp", alt: "Masjid Al-Arqam" },
  { src: "/client-logos/micin-id.webp", alt: "Micin.id" },
  { src: "/client-logos/next-swimming-school.webp", alt: "Next Swimming School" },
  { src: "/client-logos/robux-indo-store.webp", alt: "Robux Indo Store" },
  { src: "/client-logos/the-textile-map.webp", alt: "The Textile Map" },
  { src: "/client-logos/yoonjae-space-studio.webp", alt: "Yoonjae Space Studio" },
];

async function main() {
  const rows = existingLogos.map((logo, index) => ({
    imagePath: logo.src,
    altText: logo.alt,
    sortOrder: index,
  }));
  await db.insert(clientLogos).values(rows);
  console.log(`Seeded ${rows.length} client logos.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
