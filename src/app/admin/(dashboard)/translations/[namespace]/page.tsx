import { eq } from "drizzle-orm";
import { db } from "@/db";
import { translations } from "@/db/schema";
import {
  TRANSLATION_REGISTRY,
  sortTranslationRows,
  NamespaceMeta,
} from "@/lib/content/translation-registry";
import { TranslationNamespaceList } from "@/components/admin/translations/TranslationNamespaceList";

export const dynamic = "force-dynamic";

export default async function NamespaceTranslationsPage({
  params,
}: {
  params: Promise<{ namespace: string }>;
}) {
  const { namespace } = await params;
  const rawRows = await db
    .select()
    .from(translations)
    .where(eq(translations.namespace, namespace));

  const sortedRows = sortTranslationRows(namespace, rawRows);

  const meta: NamespaceMeta = TRANSLATION_REGISTRY[namespace] || {
    namespace,
    label: namespace,
    desc: "Pengaturan teks untuk bagian ini.",
    category: "pages",
    categoryLabel: "Bagian Lainnya",
    livePath: "/",
    keysOrder: [],
    keyMeta: {},
  };

  return (
    <TranslationNamespaceList
      namespace={namespace}
      rows={sortedRows}
      meta={meta}
    />
  );
}
