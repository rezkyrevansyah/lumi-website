"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { translations } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export async function updateTranslation(id: number, valueId: string, valueEn: string) {
  await requireAdminSession();
  await db
    .update(translations)
    .set({ valueId, valueEn })
    .where(eq(translations.id, id));
  // Next.js 16: revalidateTag(tag) with no profile is deprecated. This is a
  // Server Action doing a read-your-own-writes update (admin edits, then
  // immediately reloads the public site to see the change) — updateTag is
  // the API built for exactly that, and expires the "translations" tag
  // (Task 5's getMessagesFromDb cache) immediately instead of Next's now-default
  // stale-while-revalidate behavior for revalidateTag.
  updateTag("translations");
}
