import { eq } from "drizzle-orm";
import { db } from "@/db";
import { translations } from "@/db/schema";
import { TranslationForm } from "@/components/admin/translations/TranslationForm";

export default async function NamespaceTranslationsPage({
  params,
}: {
  params: Promise<{ namespace: string }>;
}) {
  const { namespace } = await params;
  const rows = await db
    .select()
    .from(translations)
    .where(eq(translations.namespace, namespace))
    .orderBy(translations.key);

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">{namespace}</h1>
      <div className="mt-6 space-y-4">
        {rows.map((row) => (
          <TranslationForm key={row.id} row={row} />
        ))}
      </div>
    </div>
  );
}
