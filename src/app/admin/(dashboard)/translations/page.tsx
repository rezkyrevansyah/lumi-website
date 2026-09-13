import Link from "next/link";
import { db } from "@/db";
import { translations } from "@/db/schema";

export default async function TranslationsIndexPage() {
  const rows = await db.select({ namespace: translations.namespace }).from(translations);
  const namespaces = Array.from(new Set(rows.map((r) => r.namespace))).sort();

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Teks Statis</h1>
      <p className="mt-1 text-sm text-zinc-500">Pilih bagian halaman untuk edit teksnya.</p>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {namespaces.map((ns) => (
          <li key={ns}>
            <Link
              href={`/admin/translations/${ns}`}
              className="block rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 hover:border-emerald-600 hover:text-emerald-700"
            >
              {ns}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
