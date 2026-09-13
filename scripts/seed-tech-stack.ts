import { db } from "../src/db";
import { techStackCategories, techStackItems } from "../src/db/schema";

// Snapshot of the formerly-hardcoded `techStackGroups` export from
// src/data/techStack.ts, inlined here (not imported) so this seed script has
// no dependency on that file — Task 12 still reads its `certifications`
// export and will delete the whole file once that's migrated too.
const techStackGroups: { key: string; items: string[] }[] = [
  {
    key: "frontend",
    items: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Angular"],
  },
  {
    key: "backend",
    items: ["Laravel / PHP", "Go (Golang)", "Python", ".NET Core", "Node.js"],
  },
  {
    key: "mobileDb",
    items: ["Flutter", "React Native", "PostgreSQL", "Redis", "MySQL"],
  },
  {
    key: "cloudDevops",
    items: ["Docker", "AWS", "Google Cloud", "CI/CD"],
  },
];

const LABELS: Record<string, { id: string; en: string }> = {
  frontend: { id: "Frontend Layer", en: "Frontend Layer" },
  backend: { id: "Backend Engine", en: "Backend Engine" },
  mobileDb: { id: "Mobile & Database", en: "Mobile & Database" },
  cloudDevops: { id: "Cloud & DevOps", en: "Cloud & DevOps" },
};

async function main() {
  for (const [index, group] of techStackGroups.entries()) {
    const label = LABELS[group.key] ?? { id: group.key, en: group.key };
    const [category] = await db
      .insert(techStackCategories)
      .values({ key: group.key, labelId: label.id, labelEn: label.en, sortOrder: index })
      .returning();
    await db.insert(techStackItems).values(
      group.items.map((name, itemIndex) => ({ categoryId: category.id, name, sortOrder: itemIndex }))
    );
  }
  console.log("Seeded tech stack categories + items.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
