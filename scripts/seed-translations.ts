import { db } from "../src/db";
import { translations } from "../src/db/schema";
import idMessages from "../messages/id.json";
import enMessages from "../messages/en.json";

type MessageTree = Record<string, Record<string, string>>;

async function main() {
  const id = idMessages as MessageTree;
  const en = enMessages as MessageTree;

  const rows: (typeof translations.$inferInsert)[] = [];

  for (const namespace of Object.keys(id)) {
    const idKeys = id[namespace];
    const enKeys = en[namespace] ?? {};
    for (const key of Object.keys(idKeys)) {
      rows.push({
        namespace,
        key,
        valueId: idKeys[key],
        valueEn: enKeys[key] ?? idKeys[key],
      });
    }
  }

  console.log(`Seeding ${rows.length} translation rows...`);

  // Batch inserts to avoid pgbouncer transaction pooling limits
  const BATCH_SIZE = 25;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    await db.insert(translations).values(batch);
    console.log(`Inserted batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} rows)`);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
