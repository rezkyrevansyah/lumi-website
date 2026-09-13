import { db } from "@/db";
import { translations } from "@/db/schema";
import {
  TRANSLATION_REGISTRY,
  sortNamespaceNames,
  NamespaceMeta,
} from "@/lib/content/translation-registry";
import { TranslationsDashboardView } from "@/components/admin/translations/TranslationsDashboardView";

export const dynamic = "force-dynamic";

export default async function TranslationsIndexPage() {
  const rows = await db.select({ namespace: translations.namespace }).from(translations);

  // Group by namespace and count
  const countMap: Record<string, number> = {};
  for (const r of rows) {
    countMap[r.namespace] = (countMap[r.namespace] || 0) + 1;
  }

  const rawNamespaces = Object.keys(countMap);
  const sortedNamespaces = sortNamespaceNames(rawNamespaces);

  const items = sortedNamespaces.map((ns) => {
    const defaultMeta: NamespaceMeta = {
      namespace: ns,
      label: ns,
      desc: "Pengaturan teks dan salinan untuk bagian ini.",
      category: "pages",
      categoryLabel: "Bagian Lainnya",
      livePath: "/",
      keysOrder: [],
      keyMeta: {},
    };

    const meta = TRANSLATION_REGISTRY[ns] || defaultMeta;
    return {
      namespace: ns,
      count: countMap[ns] || 0,
      meta,
    };
  });

  return <TranslationsDashboardView items={items} />;
}
