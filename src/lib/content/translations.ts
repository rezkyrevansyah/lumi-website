import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { translations } from "@/db/schema";

async function loadAllTranslations() {
  const rows = await db.select().from(translations);
  const tree: Record<string, Record<string, string>> = {};
  for (const row of rows) {
    if (!tree[row.namespace]) tree[row.namespace] = {};
    tree[row.namespace][row.key] = row.valueId;
  }
  const treeEn: Record<string, Record<string, string>> = {};
  for (const row of rows) {
    if (!treeEn[row.namespace]) treeEn[row.namespace] = {};
    treeEn[row.namespace][row.key] = row.valueEn;
  }
  return { id: tree, en: treeEn };
}

const getCachedTranslations = unstable_cache(loadAllTranslations, ["translations-all"], {
  tags: ["translations"],
});

export async function getMessagesFromDb(locale: "id" | "en") {
  const { id, en } = await getCachedTranslations();
  return locale === "en" ? en : id;
}
