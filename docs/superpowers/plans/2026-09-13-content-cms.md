# Content CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every hardcoded string in the Lumi Beta Works site (`messages/id.json`/`en.json` + `src/data/*.ts`) with database-backed, bilingual (ID/EN) content editable through a password-protected `/admin` panel — with zero changes required to any of the ~15 section components that already call `useTranslations()`/`getTranslations()`.

**Architecture:** One Postgres schema (`translations` generic key/value table + six structured-content tables, each with `_id`/`_en` column pairs for translatable fields). `src/i18n/request.ts` swaps its static JSON import for a DB query that returns the identical nested shape. Section components get their structured lists (portfolio, pricing, etc.) from new `src/lib/content/*.ts` fetchers instead of `src/data/*.ts` imports. Admin auth reuses the site's pre-reset pattern: single shared password + `iron-session` cookie, enforced in `src/proxy.ts` before the existing next-intl routing branch. Every admin write calls `updateTag` so the public site updates immediately, no redeploy.

**Tech Stack:** Next.js 16 App Router, Drizzle ORM (`drizzle-orm` + `drizzle-kit`, already installed) against the existing Supabase Postgres, `iron-session` (already installed), `radix-ui` Dialog (already installed, already used elsewhere in this codebase), `zod` (already installed) for server action input validation, `next-intl` (unchanged version, only its message-loading source changes).

**Spec:** `docs/superpowers/specs/2026-09-13-content-cms-design.md`

## Global Constraints

- Images stay hardcoded: every `imagePath`/`altText` field is a plain, manually-typed text column — no upload UI, no image field editors beyond a text input.
- Testimonial `quote` is a single column (not `_id`/`_en` split) — client quotes are shown verbatim in whatever language the client actually wrote, never machine-translated.
- URL routes (`/portfolio`, `/services`, `/pricelist`, `/about`) stay hardcoded in code. Only their nav *label* text is CMS-editable (via the generic `translations` table, namespace `Nav`).
- Admin UI chrome (buttons, headings inside `/admin/**`) is Indonesian-only — bilingual editing applies to site *content*, not the admin tool's own labels.
- Reorder in every admin list is a simple up/down swap of `sortOrder` with the adjacent row — no drag-and-drop library.
- Every DB schema change is applied by running `npm run db:push` directly in the terminal (per this repo's `CLAUDE.md`/`AGENTS.md` — DB changes are run by the assistant, not deferred to the user).
- After every task that changes files, run `npm run build` and `npm run lint` before committing; both must be clean.

---

## Task 1: Full Drizzle Schema + Push

**Files:**
- Modify: `src/db/schema.ts` (currently just `export {};`)

**Interfaces:**
- Produces: every table/enum below, importable as named exports from `@/db/schema` — every later task's fetchers/actions import from here.

- [ ] **Step 1: Write the full schema**

```ts
// src/db/schema.ts
import {
  pgTable,
  pgEnum,
  serial,
  text,
  varchar,
  boolean,
  integer,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const serviceCategoryEnum = pgEnum("service_category", [
  "web-app",
  "uiux",
  "qa",
]);

export const pricingTierKeyEnum = pgEnum("pricing_tier_key", [
  "landing",
  "custom",
  "enterprise",
]);

// ─── Generic static UI strings (replaces messages/id.json + en.json) ────────
export const translations = pgTable(
  "translations",
  {
    id: serial("id").primaryKey(),
    namespace: varchar("namespace", { length: 50 }).notNull(),
    key: varchar("key", { length: 100 }).notNull(),
    valueId: text("value_id").notNull(),
    valueEn: text("value_en").notNull(),
  },
  (table) => [uniqueIndex("translations_namespace_key_idx").on(table.namespace, table.key)]
);

// ─── Portfolio ────────────────────────────────────────────────────────────────
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  titleId: text("title_id").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionId: text("description_id").notNull(),
  descriptionEn: text("description_en").notNull(),
  category: serviceCategoryEnum("category").notNull(),
  imagePath: text("image_path").notNull(),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Pricing ──────────────────────────────────────────────────────────────────
export const pricingTiers = pgTable("pricing_tiers", {
  id: serial("id").primaryKey(),
  key: pricingTierKeyEnum("key").notNull().unique(),
  nameId: text("name_id").notNull(),
  nameEn: text("name_en").notNull(),
  labelId: text("label_id").notNull(),
  labelEn: text("label_en").notNull(),
  taglineId: text("tagline_id").notNull(),
  taglineEn: text("tagline_en").notNull(),
  pricePrefixId: text("price_prefix_id").notNull(),
  pricePrefixEn: text("price_prefix_en").notNull(),
  priceId: text("price_id").notNull(),
  priceEn: text("price_en").notNull(),
  ctaLabelId: text("cta_label_id").notNull(),
  ctaLabelEn: text("cta_label_en").notNull(),
  badgeId: text("badge_id"),
  badgeEn: text("badge_en"),
  highlighted: boolean("highlighted").notNull().default(false),
  ctaVariant: varchar("cta_variant", { length: 20 }).notNull().default("primary"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const pricingFeatures = pgTable("pricing_features", {
  id: serial("id").primaryKey(),
  tierId: integer("tier_id")
    .notNull()
    .references(() => pricingTiers.id, { onDelete: "cascade" }),
  textId: text("text_id").notNull(),
  textEn: text("text_en").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Tech Stack ───────────────────────────────────────────────────────────────
export const techStackCategories = pgTable("tech_stack_categories", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 50 }).notNull().unique(),
  labelId: text("label_id").notNull(),
  labelEn: text("label_en").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const techStackItems = pgTable("tech_stack_items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => techStackCategories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Certifications ───────────────────────────────────────────────────────────
// Note: certifications are NOT translated — `name` and `altText` are provider
// names/descriptions (proper nouns), not UI copy. Only one column pair needed.
export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 50 }).notNull().unique(),
  name: text("name").notNull(),
  imagePath: text("image_path").notNull(),
  altText: text("alt_text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Client Logos ─────────────────────────────────────────────────────────────
export const clientLogos = pgTable("client_logos", {
  id: serial("id").primaryKey(),
  imagePath: text("image_path").notNull(),
  altText: text("alt_text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  roleId: text("role_id").notNull(),
  roleEn: text("role_en").notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull().default(5),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});
```

- [ ] **Step 2: Push schema to the database**

Run: `npm run db:push`
Expected: drizzle-kit reports 8 new tables created (`translations`, `portfolio_items`, `pricing_tiers`, `pricing_features`, `tech_stack_categories`, `tech_stack_items`, `certifications`, `client_logos`, `testimonials` — 9 actually) with no errors. If prompted interactively about enum/table creation, this is a fresh set of tables so accept the "create" option for each.

- [ ] **Step 3: Verify tables exist**

Run: `npm run db:studio` briefly is optional; faster check:
```bash
node -e "require('dotenv').config({path:'.env.local'}); const postgres=require('postgres'); const sql=postgres(process.env.DATABASE_URL,{prepare:false}); sql\`select table_name from information_schema.tables where table_schema='public' order by 1\`.then(r=>{console.log(r.map(x=>x.table_name)); process.exit(0)})"
```
Expected: array includes all 9 table names above.

- [ ] **Step 4: Commit**

```bash
git add src/db/schema.ts
git commit -m "feat(cms): add bilingual content schema (translations + 6 structured tables)"
```

---

## Task 2: Session Infrastructure + Login/Logout Actions

**Files:**
- Create: `src/lib/session.ts`
- Create: `src/lib/admin-auth.ts`
- Create: `src/actions/admin/auth.ts`
- Create: `src/app/admin/login/page.tsx`

**Interfaces:**
- Consumes: `process.env.ADMIN_PASSWORD`, `process.env.SESSION_SECRET` (both already set in `.env.local`).
- Produces: `SessionData` type, `sessionOptions` (used by Task 3's proxy branch), `requireAdminSession()` (used by every admin action in Tasks 6, 8–13), `login(password: string)` / `logout()` server actions.

- [ ] **Step 1: Session config**

```ts
// src/lib/session.ts
import type { SessionOptions } from "iron-session";

export interface SessionData {
  isAdmin: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "lumi_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
```

- [ ] **Step 2: Server-side session guard for actions**

```ts
// src/lib/admin-auth.ts
import "server-only";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function requireAdminSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isAdmin) {
    throw new Error("Unauthorized: admin session required");
  }
  return session;
}
```

- [ ] **Step 3: Login/logout actions**

```ts
// src/actions/admin/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { timingSafeEqual } from "crypto";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function login(_prevState: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "Server belum dikonfigurasi (ADMIN_PASSWORD kosong)." };
  }

  const stored = Buffer.from(adminPassword);
  const input = Buffer.from(password);
  const match = stored.length === input.length && timingSafeEqual(stored, input);

  if (!match) {
    return { error: "Password salah. Coba lagi." };
  }

  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.isAdmin = true;
  await session.save();
  redirect("/admin");
}

export async function logout() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.destroy();
  redirect("/admin/login");
}
```

- [ ] **Step 4: Login page**

```tsx
// src/app/admin/login/page.tsx
"use client";

import { useActionState } from "react";
import { login } from "@/actions/admin/auth";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <form action={formAction} className="w-full max-w-sm space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-zinc-900">Lumi Admin</h1>
        <p className="text-sm text-zinc-500">Masuk untuk mengelola konten situs.</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoFocus
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
        />
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {pending ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build && npm run lint`
Expected: both clean (login page is unauthenticated at this point since Task 3 hasn't wired the proxy check yet — that's expected, this task only proves the form/action compile and the session helpers type-check).

- [ ] **Step 6: Commit**

```bash
git add src/lib/session.ts src/lib/admin-auth.ts src/actions/admin/auth.ts src/app/admin/login
git commit -m "feat(cms): add admin session, login/logout actions, login page"
```

---

## Task 3: Proxy Auth Branch + Admin Shell/Dashboard

**Files:**
- Modify: `src/proxy.ts`
- Create: `src/components/admin/AdminShell.tsx`
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`

**Interfaces:**
- Consumes: `sessionOptions`, `SessionData` from Task 2's `src/lib/session.ts`; `logout` action from Task 2.
- Produces: working `/admin` route tree with auth enforced. Every later admin page (Tasks 6, 8–13) renders inside this layout automatically (Next.js layout nesting) — they don't need to re-check auth for rendering (though their Server Actions still call `requireAdminSession()` as defense in depth per Task 2).

- [ ] **Step 1: Update the proxy to branch on `/admin`**

```ts
// src/proxy.ts
import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { sessionOptions, type SessionData } from "./lib/session";

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(request, response, sessionOptions);
    if (!session.isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return response;
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 2: Admin shell (sidebar + logout)**

```tsx
// src/components/admin/AdminShell.tsx
import Link from "next/link";
import { logout } from "@/actions/admin/auth";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/translations", label: "Teks Statis" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/pricing", label: "Paket & Harga" },
  { href: "/admin/tech-stack", label: "Tech Stack" },
  { href: "/admin/certifications", label: "Sertifikasi" },
  { href: "/admin/client-logos", label: "Client Logo" },
  { href: "/admin/testimonials", label: "Testimoni" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="w-60 shrink-0 border-r border-zinc-200 bg-white p-5">
        <div className="mb-6 text-lg font-bold text-zinc-900">Lumi Admin</div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-6">
          <button type="submit" className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
            Keluar
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

- [ ] **Step 3: Admin layout + dashboard**

```tsx
// src/app/admin/layout.tsx
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin | Lumi Beta Works",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
```

```tsx
// src/app/admin/page.tsx
export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Pilih menu di kiri untuk mengelola teks statis atau konten halaman.
      </p>
    </div>
  );
}
```

**Note:** the login page (`src/app/admin/login/page.tsx`, Task 2) is NOT under this layout's auth check (proxy explicitly skips it), but it IS still nested under `src/app/admin/` in the file tree, which means it would inherit `src/app/admin/layout.tsx` too. To keep the login page free of the sidebar shell, move it into a route group: rename the folder path so login lives at `src/app/admin/(auth)/login/page.tsx` and this task's `layout.tsx`/`page.tsx` effectively apply to a second group `src/app/admin/(dashboard)/...` — OR simpler for this scope: give `src/app/admin/login/page.tsx` its own layout override by adding `src/app/admin/login/layout.tsx` that just renders `{children}` with no shell, which takes precedence over the parent shell for that segment only.

- [ ] **Step 3b: Prevent the login page from getting the sidebar shell**

```tsx
// src/app/admin/login/layout.tsx
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

Next.js layouts nest by default (parent `AdminLayout` would normally wrap this too) — to fully opt the login route out of the sidebar shell, restructure so `AdminShell` is applied only to a route group. Move step 3's `layout.tsx`/`page.tsx` under a route group:

- Create `src/app/admin/(dashboard)/layout.tsx` with the `AdminShell` content from Step 3 (delete the plain `src/app/admin/layout.tsx` file).
- Move `src/app/admin/page.tsx` to `src/app/admin/(dashboard)/page.tsx`.
- Login stays at `src/app/admin/login/page.tsx` (outside the `(dashboard)` group, so it never gets the shell) — delete the `src/app/admin/login/layout.tsx` stub from earlier in this step, it's unnecessary once the group split is in place.
- All later tasks' admin pages (Tasks 6, 8–13) go under `src/app/admin/(dashboard)/<entity>/page.tsx` accordingly — this plan's later file paths already assume this; wherever a later task says `src/app/admin/<x>/page.tsx`, read it as `src/app/admin/(dashboard)/<x>/page.tsx`.

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, then in a browser:
1. Visit `http://localhost:3000/admin` → should redirect to `/admin/login`.
2. Enter the `ADMIN_PASSWORD` value from `.env.local` → should redirect to `/admin` and show the sidebar shell + dashboard text.
3. Visit `/admin/login` directly while already logged in → should NOT show the sidebar (route group keeps it shell-free).
4. Click "Keluar" → should redirect back to `/admin/login`, and visiting `/admin` again should redirect to login (session cleared).

Expected: all four behaviors match. Stop the dev server after (`taskkill`/`kill` the process) per this repo's convention of not leaving dev servers running.

- [ ] **Step 5: Build, lint, commit**

```bash
npm run build && npm run lint
git add src/proxy.ts src/components/admin/AdminShell.tsx "src/app/admin/(dashboard)" src/app/admin/login src/app/admin/page.tsx src/app/admin/layout.tsx
git commit -m "feat(cms): protect /admin via proxy session check, add admin shell + dashboard"
```
(If `src/app/admin/page.tsx` / `layout.tsx` no longer exist at the root after the route-group move, only add the paths that actually exist.)

---

## Task 4: Seed Script for `translations` + Run It

**Files:**
- Create: `scripts/seed-translations.ts`
- Read (source data, not modified yet): `messages/id.json`, `messages/en.json`

**Interfaces:**
- Produces: every row of the `translations` table populated from the current, live JSON content — Task 5's DB-backed loader depends on this data existing.

- [ ] **Step 1: Write the seed script**

```ts
// scripts/seed-translations.ts
import "dotenv/config";
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
  await db.insert(translations).values(rows);
  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Add a script entry**

Modify `package.json` scripts block:
```json
"db:seed-translations": "tsx scripts/seed-translations.ts"
```
(if `tsx` isn't already a devDependency, run `npm install -D tsx` first — check `package.json` for it before installing.)

- [ ] **Step 3: Run the seed**

Run: `npm run db:seed-translations`
Expected: console prints the row count (should match the total number of leaf keys across every namespace in `messages/id.json` — roughly 140 rows) and "Done." with no errors.

- [ ] **Step 4: Verify a sample row**

```bash
node -e "require('dotenv').config({path:'.env.local'}); const postgres=require('postgres'); const sql=postgres(process.env.DATABASE_URL,{prepare:false}); sql\`select * from translations where namespace='Hero' and key='title'\`.then(r=>{console.log(r); process.exit(0)})"
```
Expected: one row with `value_id` = "Website dan aplikasi yang dibangun serius, dari ide sampai rilis." and `value_en` = "Websites and apps built with intent, from idea to launch."

- [ ] **Step 5: Commit**

```bash
git add scripts/seed-translations.ts package.json package-lock.json
git commit -m "feat(cms): seed translations table from current messages JSON"
```

---

## Task 5: DB-Backed Messages Loader + Rewire `i18n/request.ts`

**Files:**
- Create: `src/lib/content/translations.ts`
- Modify: `src/i18n/request.ts`

**Interfaces:**
- Produces: `getMessagesFromDb(locale: "id" | "en"): Promise<Record<string, Record<string, string>>>` — used only by `i18n/request.ts`.
- Consumes: `translations` table from Task 1 (seeded in Task 4).

- [ ] **Step 1: Write the cached loader**

```ts
// src/lib/content/translations.ts
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
```

- [ ] **Step 2: Rewire `i18n/request.ts`**

```ts
// src/i18n/request.ts
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { getMessagesFromDb } from "@/lib/content/translations";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: await getMessagesFromDb(locale),
  };
});
```

- [ ] **Step 3: Verify the site still renders identically**

Run: `npm run build` (must succeed), then `npm run dev` and open `http://localhost:3000/id` and `http://localhost:3000/en` in a browser. Compare against the live production site's current text (or your memory of it from the last session) — every heading/label/button on the homepage should read exactly the same as before, now sourced from Postgres instead of the JSON files. Stop the dev server after checking.

- [ ] **Step 4: Commit**

```bash
git add src/lib/content/translations.ts src/i18n/request.ts
git commit -m "feat(cms): load next-intl messages from the database instead of static JSON"
```

---

## Task 6: Admin Translations UI

**Files:**
- Create: `src/actions/admin/translations.ts`
- Create: `src/app/admin/(dashboard)/translations/page.tsx`
- Create: `src/app/admin/(dashboard)/translations/[namespace]/page.tsx`
- Create: `src/components/admin/translations/TranslationForm.tsx`

**Interfaces:**
- Consumes: `requireAdminSession()` (Task 2), `translations` table (Task 1), `getMessagesFromDb`'s cache tag `"translations"` (Task 5 — this task's action revalidates that same tag).
- Produces: `updateTranslation(id: number, valueId: string, valueEn: string)` server action.

- [ ] **Step 1: Update action**

```ts
// src/actions/admin/translations.ts
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
  updateTag("translations");
}
```

- [ ] **Step 2: Namespace list page**

```tsx
// src/app/admin/(dashboard)/translations/page.tsx
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
```

- [ ] **Step 3: Namespace edit page**

```tsx
// src/app/admin/(dashboard)/translations/[namespace]/page.tsx
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
```

- [ ] **Step 4: Client form component (one per key, side-by-side ID/EN)**

```tsx
// src/components/admin/translations/TranslationForm.tsx
"use client";

import { useState, useTransition } from "react";
import { updateTranslation } from "@/actions/admin/translations";

interface Row {
  id: number;
  key: string;
  valueId: string;
  valueEn: string;
}

export function TranslationForm({ row }: { row: Row }) {
  const [valueId, setValueId] = useState(row.valueId);
  const [valueEn, setValueEn] = useState(row.valueEn);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await updateTranslation(row.id, valueId, valueEn);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    });
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="mb-2 text-xs font-mono text-zinc-400">{row.key}</div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-500">Indonesia</label>
          <textarea
            value={valueId}
            onChange={(e) => setValueId(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-500">English</label>
          <textarea
            value={valueEn}
            onChange={(e) => setValueEn(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={pending}
        className="mt-3 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : saved ? "Tersimpan ✓" : "Simpan"}
      </button>
    </div>
  );
}
```

- [ ] **Step 5: Manual verification**

Run `npm run dev`, log into `/admin`, go to `/admin/translations`, open the `Hero` namespace, change the `title` field's ID value, click Simpan, then open `http://localhost:3000/id` in another tab — the homepage hero title should show the new text without a rebuild. Revert the change back afterward. Stop the dev server.

- [ ] **Step 6: Build, lint, commit**

```bash
npm run build && npm run lint
git add src/actions/admin/translations.ts "src/app/admin/(dashboard)/translations" src/components/admin/translations
git commit -m "feat(cms): admin UI for editing static UI translations"
```

---

## Task 7: Foundation Checkpoint

This task has no new files — it's a full verification gate before moving on to structured content, since Tasks 8–13 all depend on the foundation being solid.

- [ ] **Step 1: Full build + lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 2: Visual pass, both locales, desktop + mobile**

Using the Playwright MCP browser tool (or manual browser check): start `npm run dev`, visit `/id` and `/en` at 1440px and 375px widths. Every section (Hero, TrustedBy, About, Services, TechStack, Pricing, Portfolio, Testimonials, FinalCta, Footer) must render with the same text as before this plan started — content now comes from the DB, so this confirms the seed + loader round-trip correctly. Stop the dev server after.

- [ ] **Step 3: Admin walkthrough**

Log into `/admin`, confirm the sidebar shows all 7 links (Dasbor, Teks Statis, Portfolio, Paket & Harga, Teknologi, Sertifikasi, Logo Klien, Testimoni — corrected to Indonesian during Task 3's review) even though only "Teks Statis" has working pages so far — the rest will 404 until Tasks 8–13 land, which is expected at this checkpoint.

- [ ] **Step 4: Commit if anything was fixed**

If Steps 1–3 required fixes, commit them now with an appropriate message before proceeding to Task 8.

---

## Task 8: Testimonials — Fetcher, Section Update, Seed, Admin CRUD

**Files:**
- Create: `src/lib/content/testimonials.ts`
- Modify: `src/components/sections/Testimonials.tsx`
- Create: `src/actions/admin/testimonials.ts`
- Create: `src/app/admin/(dashboard)/testimonials/page.tsx`
- Create: `src/components/admin/testimonials/TestimonialList.tsx`
- Create: `src/components/admin/testimonials/TestimonialFormDialog.tsx`
- Modify: `scripts/seed-translations.ts` → split into a shared seed entry (see Step 5)
- Delete (at end of this task, once confirmed working): `src/data/testimonials.ts`

**Interfaces:**
- Consumes: `testimonials` table (Task 1), `requireAdminSession` (Task 2).
- Produces: `getTestimonials(): Promise<{ name, role, quote, rating, featured }[]>` (locale-aware role), consumed by `TestimonialsColumn` (unchanged, already accepts this exact shape per the existing `src/data/testimonials.ts` `Testimonial` interface it was built against).

- [ ] **Step 1: Cached fetcher**

```ts
// src/lib/content/testimonials.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";

export interface TestimonialView {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  featured: boolean;
}

const loadTestimonials = unstable_cache(
  async (locale: "id" | "en") => {
    const rows = await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
    return rows.map((r): TestimonialView => ({
      id: r.id,
      name: r.name,
      role: locale === "en" ? r.roleEn : r.roleId,
      quote: r.quote,
      rating: r.rating,
      featured: r.featured,
    }));
  },
  ["testimonials-all"],
  { tags: ["testimonials"] }
);

export async function getTestimonials(locale: "id" | "en") {
  return loadTestimonials(locale);
}
```

- [ ] **Step 2: Update the section to call the fetcher**

The current `src/components/sections/Testimonials.tsx` (reproduced here in full so there's no ambiguity about today's exact content) is:

```tsx
import { useTranslations } from "next-intl";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { testimonials } from "@/data/testimonials";

const firstColumn = [testimonials[0], testimonials[3], testimonials[6], testimonials[9], testimonials[10]];
const secondColumn = [testimonials[1], testimonials[4], testimonials[7], testimonials[10], testimonials[3]];
const thirdColumn = [testimonials[5], testimonials[2], testimonials[8], testimonials[11], testimonials[4]];

export function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section className="relative w-full overflow-hidden border-b border-border/60 bg-background-subtle py-20 lg:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[320px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/5 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center lg:px-12">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          icon={<Quote className="h-[15px] w-[15px]" aria-hidden="true" />}
          className="mx-auto max-w-2xl"
        />
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-1.5 shadow-xs backdrop-blur-xs">
          <div className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
            ))}
          </div>
          <span className="text-xs font-semibold text-text-primary">{t("ratingBadge")}</span>
        </div>
      </div>
      <div className="relative mx-auto mt-12 flex max-h-[700px] max-w-7xl justify-center gap-6 overflow-hidden px-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] lg:px-12">
        <TestimonialsColumn testimonials={firstColumn} duration={22} />
        <TestimonialsColumn testimonials={secondColumn} duration={27} className="hidden md:block" />
        <TestimonialsColumn testimonials={thirdColumn} duration={24} className="hidden lg:block" />
      </div>
    </section>
  );
}
```

Replace it with:

```tsx
// src/components/sections/Testimonials.tsx
import { getTranslations, getLocale } from "next-intl/server";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { getTestimonials } from "@/lib/content/testimonials";

export async function Testimonials() {
  const t = await getTranslations("Testimonials");
  const locale = (await getLocale()) as "id" | "en";
  const testimonials = await getTestimonials(locale);

  const firstColumn = [testimonials[0], testimonials[3], testimonials[6], testimonials[9], testimonials[10]].filter(Boolean);
  const secondColumn = [testimonials[1], testimonials[4], testimonials[7], testimonials[10], testimonials[3]].filter(Boolean);
  const thirdColumn = [testimonials[5], testimonials[2], testimonials[8], testimonials[11], testimonials[4]].filter(Boolean);

  return (
    <section className="relative w-full overflow-hidden border-b border-border/60 bg-background-subtle py-20 lg:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[320px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/5 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center lg:px-12">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          icon={<Quote className="h-[15px] w-[15px]" aria-hidden="true" />}
          className="mx-auto max-w-2xl"
        />
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-1.5 shadow-xs backdrop-blur-xs">
          <div className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
            ))}
          </div>
          <span className="text-xs font-semibold text-text-primary">{t("ratingBadge")}</span>
        </div>
      </div>
      <div className="relative mx-auto mt-12 flex max-h-[700px] max-w-7xl justify-center gap-6 overflow-hidden px-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] lg:px-12">
        <TestimonialsColumn testimonials={firstColumn} duration={22} />
        <TestimonialsColumn testimonials={secondColumn} duration={27} className="hidden md:block" />
        <TestimonialsColumn testimonials={thirdColumn} duration={24} className="hidden lg:block" />
      </div>
    </section>
  );
}
```

Only the imports (swap `useTranslations` for `getTranslations`/`getLocale` from `next-intl/server`, swap the static `testimonials` import for `getTestimonials`), the function signature (`export async function`), and the three column arrays (now `.filter(Boolean)`-guarded, computed inside the function from the fetched array instead of at module scope from the static import) change. The JSX is untouched.

- [ ] **Step 2b: Fix `TestimonialsColumn`'s type import**

`src/components/ui/testimonials-columns-1.tsx` currently has `import type { Testimonial } from "@/data/testimonials";` — this breaks once this task deletes that file in Step 6. Since this component only ever reads `name`, `role`, `quote`, `rating` off each item (check its JSX to confirm — it destructures exactly those four fields), replace that import with a local type so this presentational component doesn't depend on the app's data layer at all:

```tsx
// src/components/ui/testimonials-columns-1.tsx — change only this one line
// Before:
import type { Testimonial } from "@/data/testimonials";
// After:
interface TestimonialColumnItem {
  name: string;
  role: string;
  quote: string;
  rating: number;
}
```
And change the prop type `testimonials: Testimonial[]` to `testimonials: TestimonialColumnItem[]`. Everything else in the file (the JSX destructuring `{ quote, name, role, rating }`) stays identical since the field names match exactly.

- [ ] **Step 3: Update action (create/update/delete/reorder)**

```ts
// src/actions/admin/testimonials.ts
"use server";

import { eq, asc } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export interface TestimonialInput {
  name: string;
  roleId: string;
  roleEn: string;
  quote: string;
  rating: number;
  featured: boolean;
}

export async function createTestimonial(input: TestimonialInput) {
  await requireAdminSession();
  const rows = await db.select().from(testimonials);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(testimonials).values({ ...input, sortOrder: maxSort + 1 });
  updateTag("testimonials");
}

export async function updateTestimonial(id: number, input: TestimonialInput) {
  await requireAdminSession();
  await db.update(testimonials).set(input).where(eq(testimonials.id, id));
  updateTag("testimonials");
}

export async function deleteTestimonial(id: number) {
  await requireAdminSession();
  await db.delete(testimonials).where(eq(testimonials.id, id));
  updateTag("testimonials");
}

export async function moveTestimonial(id: number, direction: "up" | "down") {
  await requireAdminSession();
  const rows = await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return;

  const current = rows[index];
  const swap = rows[swapIndex];
  await db.update(testimonials).set({ sortOrder: swap.sortOrder }).where(eq(testimonials.id, current.id));
  await db.update(testimonials).set({ sortOrder: current.sortOrder }).where(eq(testimonials.id, swap.id));
  updateTag("testimonials");
}
```

- [ ] **Step 4: Admin page + list + dialog**

```tsx
// src/app/admin/(dashboard)/testimonials/page.tsx
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { TestimonialList } from "@/components/admin/testimonials/TestimonialList";

export default async function AdminTestimonialsPage() {
  const rows = await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Testimoni</h1>
      <TestimonialList items={rows} />
    </div>
  );
}
```

```tsx
// src/components/admin/testimonials/TestimonialFormDialog.tsx
"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { createTestimonial, updateTestimonial, type TestimonialInput } from "@/actions/admin/testimonials";

interface Props {
  trigger: React.ReactNode;
  initial?: TestimonialInput & { id: number };
}

export function TestimonialFormDialog({ trigger, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<TestimonialInput>(
    initial ?? { name: "", roleId: "", roleEn: "", quote: "", rating: 5, featured: false }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (initial) {
      await updateTestimonial(initial.id, form);
    } else {
      await createTestimonial(form);
    }
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-zinc-900">
            {initial ? "Edit Testimoni" : "Testimoni Baru"}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              placeholder="Nama"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Peran (ID)"
                value={form.roleId}
                onChange={(e) => setForm({ ...form, roleId: e.target.value })}
                required
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
              <input
                placeholder="Peran (EN)"
                value={form.roleEn}
                onChange={(e) => setForm({ ...form, roleEn: e.target.value })}
                required
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <textarea
              placeholder="Kutipan (bahasa asli klien, tidak diterjemahkan)"
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              required
              rows={3}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                Rating (1-5)
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="w-16 rounded-lg border border-zinc-300 px-2 py-1"
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Unggulan (kartu besar)
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm">
                  Batal
                </button>
              </Dialog.Close>
              <button type="submit" className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
                Simpan
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

```tsx
// src/components/admin/testimonials/TestimonialList.tsx
"use client";

import { deleteTestimonial, moveTestimonial } from "@/actions/admin/testimonials";
import { TestimonialFormDialog } from "./TestimonialFormDialog";

interface Row {
  id: number;
  name: string;
  roleId: string;
  roleEn: string;
  quote: string;
  rating: number;
  featured: boolean;
}

export function TestimonialList({ items }: { items: Row[] }) {
  return (
    <div className="mt-6 space-y-3">
      <TestimonialFormDialog
        trigger={
          <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
            + Tambah Testimoni
          </button>
        }
      />
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4">
            <div>
              <div className="font-semibold text-zinc-900">{item.name}</div>
              <div className="text-xs text-zinc-500">{item.roleId}</div>
              <div className="mt-1 max-w-md truncate text-sm text-zinc-600">{item.quote}</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => moveTestimonial(item.id, "up")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↑</button>
              <button onClick={() => moveTestimonial(item.id, "down")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↓</button>
              <TestimonialFormDialog
                initial={item}
                trigger={<button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">Edit</button>}
              />
              <button
                onClick={() => {
                  if (confirm(`Hapus testimoni dari ${item.name}?`)) deleteTestimonial(item.id);
                }}
                className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Seed existing testimonials into the table**

Add to `scripts/seed-translations.ts` a second exported step, or create `scripts/seed-testimonials.ts` following the same shape as Task 4's script, reading from the CURRENT `src/data/testimonials.ts` array (read that file's contents directly — it has `name`, `role`, `quote`, `rating`, `featured` fields already matching this schema almost 1:1; map `role` → both `roleId` and `roleEn` as a starting point since the existing data has no English role split, then rely on the admin UI to refine the English wording afterward) and inserting into the `testimonials` table with incrementing `sortOrder`. Add a corresponding `db:seed-testimonials` script to `package.json` and run it once: `npm run db:seed-testimonials`.

- [ ] **Step 6: Verify + delete the old data file**

Run `npm run build`. Once it's confirmed the section renders the seeded testimonials correctly (repeat the visual check from Task 7, Step 2, but just the Testimonials section, both locales), delete `src/data/testimonials.ts` and confirm `npm run build` still passes (proves nothing else imports it).

- [ ] **Step 7: Build, lint, commit**

```bash
npm run build && npm run lint
git add -A
git commit -m "feat(cms): testimonials fully database-backed with admin CRUD"
```

---

## Task 9: Client Logos — Fetcher, Section Update, Seed, Admin CRUD

**Files:**
- Create: `src/lib/content/client-logos.ts`
- Modify: `src/components/sections/TrustedBy.tsx`
- Create: `src/actions/admin/client-logos.ts`
- Create: `src/app/admin/(dashboard)/client-logos/page.tsx`
- Create: `src/components/admin/client-logos/ClientLogoList.tsx`
- Create: `src/components/admin/client-logos/ClientLogoFormDialog.tsx`
- Create: `scripts/seed-client-logos.ts`
- Delete (once verified): `src/data/clientLogos.ts`

**Interfaces:**
- Consumes: `clientLogos` table (Task 1).
- Produces: `getClientLogos(): Promise<{ src: string; alt: string }[]>` matching `LogoMarquee`'s existing `ClientLogo` prop shape exactly — `LogoMarquee.tsx` itself needs no changes, only `TrustedBy.tsx`'s import.

Follow the exact same pattern as Task 8 (fetcher with `unstable_cache` tagged `"client-logos"`, `create/update/delete/move` actions in `src/actions/admin/client-logos.ts` calling `requireAdminSession()` and `updateTag("client-logos")`, a list+dialog admin UI, a seed script reading today's `src/data/clientLogos.ts`). Concretely:

- [ ] **Step 1: Fetcher**

```ts
// src/lib/content/client-logos.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { clientLogos } from "@/db/schema";

export const getClientLogos = unstable_cache(
  async () => {
    const rows = await db.select().from(clientLogos).orderBy(asc(clientLogos.sortOrder));
    return rows.map((r) => ({ src: r.imagePath, alt: r.altText }));
  },
  ["client-logos-all"],
  { tags: ["client-logos"] }
);
```

- [ ] **Step 2: Update `TrustedBy.tsx`**

Replace `import { clientLogos } from "@/data/clientLogos"` and its usage with:
```tsx
import { getClientLogos } from "@/lib/content/client-logos";
// component becomes async:
export async function TrustedBy() {
  const t = await getTranslations("TrustedBy"); // switch from useTranslations to getTranslations (next-intl/server) since this is now async
  const logos = await getClientLogos();
  // ...pass `logos` to <LogoMarquee logos={logos} /> exactly as before
}
```

- [ ] **Step 3: Actions**

```ts
// src/actions/admin/client-logos.ts
"use server";

import { eq, asc } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { clientLogos } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export interface ClientLogoInput {
  imagePath: string;
  altText: string;
}

export async function createClientLogo(input: ClientLogoInput) {
  await requireAdminSession();
  const rows = await db.select().from(clientLogos);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(clientLogos).values({ ...input, sortOrder: maxSort + 1 });
  updateTag("client-logos");
}

export async function updateClientLogo(id: number, input: ClientLogoInput) {
  await requireAdminSession();
  await db.update(clientLogos).set(input).where(eq(clientLogos.id, id));
  updateTag("client-logos");
}

export async function deleteClientLogo(id: number) {
  await requireAdminSession();
  await db.delete(clientLogos).where(eq(clientLogos.id, id));
  updateTag("client-logos");
}

export async function moveClientLogo(id: number, direction: "up" | "down") {
  await requireAdminSession();
  const rows = await db.select().from(clientLogos).orderBy(asc(clientLogos.sortOrder));
  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return;
  const current = rows[index];
  const swap = rows[swapIndex];
  await db.update(clientLogos).set({ sortOrder: swap.sortOrder }).where(eq(clientLogos.id, current.id));
  await db.update(clientLogos).set({ sortOrder: current.sortOrder }).where(eq(clientLogos.id, swap.id));
  updateTag("client-logos");
}
```

- [ ] **Step 4: Admin page + list + dialog**

```tsx
// src/app/admin/(dashboard)/client-logos/page.tsx
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { clientLogos } from "@/db/schema";
import { ClientLogoList } from "@/components/admin/client-logos/ClientLogoList";

export default async function AdminClientLogosPage() {
  const rows = await db.select().from(clientLogos).orderBy(asc(clientLogos.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Client Logo</h1>
      <ClientLogoList items={rows} />
    </div>
  );
}
```

```tsx
// src/components/admin/client-logos/ClientLogoFormDialog.tsx
"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { createClientLogo, updateClientLogo, type ClientLogoInput } from "@/actions/admin/client-logos";

interface Props {
  trigger: React.ReactNode;
  initial?: ClientLogoInput & { id: number };
}

export function ClientLogoFormDialog({ trigger, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ClientLogoInput>(initial ?? { imagePath: "", altText: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (initial) {
      await updateClientLogo(initial.id, form);
    } else {
      await createClientLogo(form);
    }
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-zinc-900">
            {initial ? "Edit Client Logo" : "Client Logo Baru"}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Path Gambar</label>
              <input
                placeholder="/client-logos/nama-file.svg"
                value={form.imagePath}
                onChange={(e) => setForm({ ...form, imagePath: e.target.value })}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Alt Text (nama klien)</label>
              <input
                value={form.altText}
                onChange={(e) => setForm({ ...form, altText: e.target.value })}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm">
                  Batal
                </button>
              </Dialog.Close>
              <button type="submit" className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
                Simpan
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

```tsx
// src/components/admin/client-logos/ClientLogoList.tsx
"use client";

import { deleteClientLogo, moveClientLogo } from "@/actions/admin/client-logos";
import { ClientLogoFormDialog } from "./ClientLogoFormDialog";

interface Row {
  id: number;
  imagePath: string;
  altText: string;
}

export function ClientLogoList({ items }: { items: Row[] }) {
  return (
    <div className="mt-6 space-y-3">
      <ClientLogoFormDialog
        trigger={
          <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
            + Tambah Client Logo
          </button>
        }
      />
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4">
            <div>
              <div className="font-semibold text-zinc-900">{item.altText}</div>
              <div className="text-xs text-zinc-500">{item.imagePath}</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => moveClientLogo(item.id, "up")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↑</button>
              <button onClick={() => moveClientLogo(item.id, "down")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↓</button>
              <ClientLogoFormDialog
                initial={item}
                trigger={<button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">Edit</button>}
              />
              <button
                onClick={() => {
                  if (confirm(`Hapus logo ${item.altText}?`)) deleteClientLogo(item.id);
                }}
                className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Seed script**

```ts
// scripts/seed-client-logos.ts
import "dotenv/config";
import { db } from "../src/db";
import { clientLogos } from "../src/db/schema";
import { clientLogos as existingLogos } from "../src/data/clientLogos";

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
```
Add `"db:seed-client-logos": "tsx scripts/seed-client-logos.ts"` to `package.json`, run it.

- [ ] **Step 6: Verify, delete old data file, build/lint/commit**

Verify the TrustedBy marquee still shows all 15 logos correctly (both locales — logos aren't translated so this is really just "did the fetch work"), delete `src/data/clientLogos.ts`, run `npm run build && npm run lint`, commit:
```bash
git add -A
git commit -m "feat(cms): client logos fully database-backed with admin CRUD"
```

---

## Task 10: Portfolio — Fetcher, Section Update, Seed, Admin CRUD

The real current site has TWO consumers of portfolio data: the homepage `Portfolio.tsx` (a curated 6-item preview) and a full `src/app/[locale]/portfolio/page.tsx` gallery page (all published items, with client-side category-filter tabs via `PortfolioGallery.tsx`). This task updates all three, plus `PortfolioCard.tsx`'s current `description?: string` prop (already exists, no change needed there).

**Files:**
- Create: `src/lib/content/portfolio.ts`
- Modify: `src/components/sections/Portfolio.tsx` (homepage preview)
- Modify: `src/app/[locale]/portfolio/page.tsx` (full gallery page)
- Modify: `src/components/portfolio/PortfolioGallery.tsx` (drop its `@/data/portfolio` type import)
- Create: `src/actions/admin/portfolio.ts`
- Create: `src/app/admin/(dashboard)/portfolio/page.tsx`
- Create: `src/components/admin/portfolio/PortfolioList.tsx`
- Create: `src/components/admin/portfolio/PortfolioFormDialog.tsx`
- Create: `scripts/seed-portfolio.ts`
- Delete (once verified): `src/data/portfolio.ts`

**Interfaces:**
- Consumes: `portfolioItems` table + `serviceCategoryEnum` (Task 1, values `"web-app" | "uiux" | "qa"` — NOT `"web-dev"`/`"consulting"`, which don't exist in the real current data).
- Produces: `getPortfolioItems(locale): Promise<{ slug: string; title: string; description: string; category: "web-app" | "uiux" | "qa"; image: string; featured: boolean }[]>` (all published items, one function serves both the homepage preview via `.filter(i => i.featured)` and the full gallery page via the full array) — `slug` is synthesized from `id` (`String(id)`) since DB rows use an integer PK, not the old data file's string slugs; both consumers only use `slug` as a React `key`, so this is a compatible substitution.

- [ ] **Step 1: Fetcher**

```ts
// src/lib/content/portfolio.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { portfolioItems } from "@/db/schema";

export const getPortfolioItems = unstable_cache(
  async (locale: "id" | "en") => {
    const rows = await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.isPublished, true))
      .orderBy(asc(portfolioItems.sortOrder));
    return rows.map((r) => ({
      slug: String(r.id),
      title: locale === "en" ? r.titleEn : r.titleId,
      description: locale === "en" ? r.descriptionEn : r.descriptionId,
      category: r.category,
      image: r.imagePath,
      featured: r.featured,
    }));
  },
  ["portfolio-items-all"],
  { tags: ["portfolio"] }
);
```

Note: `unstable_cache` includes function arguments in its cache key automatically, so `locale` being passed in produces separate cache entries per locale — this matches the pattern already used in Task 8's testimonials fetcher.

- [ ] **Step 2: Update `Portfolio.tsx`** (homepage preview — 6 featured items)

The current file is a plain (non-async) function using `useTranslations`/`useLocale` from `next-intl`, hardcoding 6 specific items by array index (`portfolioItems[0]`, `[12]`, `[2]`, `[1]`, `[14]`, `[6]`) with a 3-category label map (`categoryWebApp`/`categoryUiux`/`categoryQa` — no `consulting`). Replace it with:

```tsx
// src/components/sections/Portfolio.tsx
import { getTranslations, getLocale } from "next-intl/server";
import { FolderKanban, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { PortfolioCard } from "@/components/PortfolioCard";
import { Button } from "@/components/Button";
import { getPortfolioItems } from "@/lib/content/portfolio";

export async function Portfolio() {
  const t = await getTranslations("Portfolio");
  const locale = (await getLocale()) as "id" | "en";
  const allItems = await getPortfolioItems(locale);
  const previewItems = allItems.filter((item) => item.featured).slice(0, 6);

  const categoryLabels: Record<"web-app" | "uiux" | "qa", string> = {
    "web-app": t("categoryWebApp"),
    uiux: t("categoryUiux"),
    qa: t("categoryQa"),
  };

  return (
    <section id="portfolio" className="w-full border-b border-border/60 bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl space-y-16 px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            align="left"
            eyebrow={t("eyebrow")}
            title={t("title")}
            icon={<FolderKanban className="h-[15px] w-[15px]" aria-hidden="true" />}
            className="max-w-xl"
          />
          <p className="max-w-md text-base text-text-secondary">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previewItems.map((item, index) => (
            <PortfolioCard
              key={item.slug}
              title={item.title}
              category={categoryLabels[item.category]}
              description={item.description}
              image={item.image}
              priority={index === 0}
            />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Button
            href="/portfolio"
            variant="outline"
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="end"
            className="hover:border-zinc-400"
          >
            {t("viewMore")}
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2b: Fix `PortfolioGallery.tsx`'s type import**

`src/components/portfolio/PortfolioGallery.tsx` currently has `import type { ServiceCategory } from "@/data/portfolio";` — this breaks once this task deletes that file in Step 6. Replace it with a local type (this component's `GalleryItem` interface already spells out every field it needs, so it doesn't need to import anything from the data layer):
```tsx
// Before:
import type { ServiceCategory } from "@/data/portfolio";
// After:
type ServiceCategory = "web-app" | "uiux" | "qa";
```
Nothing else in that file changes — `GalleryItem`, `FilterTab`, and every usage already reference `ServiceCategory` by that same local name.

- [ ] **Step 2c: Update `src/app/[locale]/portfolio/page.tsx`** (full gallery page)

The current file imports the raw `portfolioItems` array and manually resolves `description[locale]` in a `.map()`. Replace the data source:
```tsx
// Before:
import { portfolioItems } from "@/data/portfolio";
// ...
const localizedItems = portfolioItems.map((item) => ({
  slug: item.slug,
  title: item.title,
  category: item.category,
  image: item.image,
  description: item.description[locale as "id" | "en"] ?? item.description.id,
}));

// After:
import { getPortfolioItems } from "@/lib/content/portfolio";
// ...
const localizedItems = await getPortfolioItems(locale);
```
`getPortfolioItems` already returns locale-resolved `title`/`description` in the exact shape `PortfolioGallery`'s `GalleryItem` expects (`slug, title, category, image, description`) — the extra `featured` field on each item is simply unused by this page, which is fine.

- [ ] **Step 3: Actions**

```ts
// src/actions/admin/portfolio.ts
"use server";

import { eq, asc } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { portfolioItems, serviceCategoryEnum } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export interface PortfolioInput {
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  category: (typeof serviceCategoryEnum.enumValues)[number];
  imagePath: string;
  featured: boolean;
  isPublished: boolean;
}

export async function createPortfolioItem(input: PortfolioInput) {
  await requireAdminSession();
  const rows = await db.select().from(portfolioItems);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(portfolioItems).values({ ...input, sortOrder: maxSort + 1 });
  updateTag("portfolio");
}

export async function updatePortfolioItem(id: number, input: PortfolioInput) {
  await requireAdminSession();
  await db.update(portfolioItems).set(input).where(eq(portfolioItems.id, id));
  updateTag("portfolio");
}

export async function deletePortfolioItem(id: number) {
  await requireAdminSession();
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
  updateTag("portfolio");
}

export async function movePortfolioItem(id: number, direction: "up" | "down") {
  await requireAdminSession();
  const rows = await db.select().from(portfolioItems).orderBy(asc(portfolioItems.sortOrder));
  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return;
  const current = rows[index];
  const swap = rows[swapIndex];
  await db.update(portfolioItems).set({ sortOrder: swap.sortOrder }).where(eq(portfolioItems.id, current.id));
  await db.update(portfolioItems).set({ sortOrder: current.sortOrder }).where(eq(portfolioItems.id, swap.id));
  updateTag("portfolio");
}
```

- [ ] **Step 4: Admin page + list + dialog**

```tsx
// src/app/admin/(dashboard)/portfolio/page.tsx
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { portfolioItems } from "@/db/schema";
import { PortfolioList } from "@/components/admin/portfolio/PortfolioList";

export default async function AdminPortfolioPage() {
  const rows = await db.select().from(portfolioItems).orderBy(asc(portfolioItems.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Portfolio</h1>
      <PortfolioList items={rows} />
    </div>
  );
}
```

```tsx
// src/components/admin/portfolio/PortfolioFormDialog.tsx
"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { createPortfolioItem, updatePortfolioItem, type PortfolioInput } from "@/actions/admin/portfolio";

const CATEGORIES = [
  { value: "web-app", label: "Web & App Development" },
  { value: "uiux", label: "UI/UX Design" },
  { value: "qa", label: "QA Engineering" },
] as const;

interface Props {
  trigger: React.ReactNode;
  initial?: PortfolioInput & { id: number };
}

export function PortfolioFormDialog({ trigger, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PortfolioInput>(
    initial ?? {
      titleId: "",
      titleEn: "",
      descriptionId: "",
      descriptionEn: "",
      category: "web-app",
      imagePath: "",
      featured: false,
      isPublished: true,
    }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (initial) {
      await updatePortfolioItem(initial.id, form);
    } else {
      await createPortfolioItem(form);
    }
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-zinc-900">
            {initial ? "Edit Portfolio" : "Portfolio Baru"}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-500">Judul (ID)</label>
                <input
                  value={form.titleId}
                  onChange={(e) => setForm({ ...form, titleId: e.target.value })}
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-500">Title (EN)</label>
                <input
                  value={form.titleEn}
                  onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-500">Deskripsi (ID)</label>
                <textarea
                  value={form.descriptionId}
                  onChange={(e) => setForm({ ...form, descriptionId: e.target.value })}
                  required
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-500">Description (EN)</label>
                <textarea
                  value={form.descriptionEn}
                  onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                  required
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as PortfolioInput["category"] })}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Path Gambar</label>
              <input
                placeholder="/portfolio/nama-file.png"
                value={form.imagePath}
                onChange={(e) => setForm({ ...form, imagePath: e.target.value })}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                />
                Tampilkan di situs
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Unggulan (tampil di preview homepage)
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm">
                  Batal
                </button>
              </Dialog.Close>
              <button type="submit" className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
                Simpan
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

```tsx
// src/components/admin/portfolio/PortfolioList.tsx
"use client";

import { deletePortfolioItem, movePortfolioItem } from "@/actions/admin/portfolio";
import { PortfolioFormDialog } from "./PortfolioFormDialog";

interface Row {
  id: number;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  category: "web-app" | "uiux" | "qa";
  imagePath: string;
  featured: boolean;
  isPublished: boolean;
}

export function PortfolioList({ items }: { items: Row[] }) {
  return (
    <div className="mt-6 space-y-3">
      <PortfolioFormDialog
        trigger={
          <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
            + Tambah Portfolio
          </button>
        }
      />
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4">
            <div>
              <div className="font-semibold text-zinc-900">
                {item.titleId}
                {item.featured && <span className="ml-2 text-xs text-accent-700">★ featured</span>}
                {!item.isPublished && <span className="ml-2 text-xs text-red-500">(disembunyikan)</span>}
              </div>
              <div className="text-xs text-zinc-500">{item.category} — {item.imagePath}</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => movePortfolioItem(item.id, "up")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↑</button>
              <button onClick={() => movePortfolioItem(item.id, "down")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↓</button>
              <PortfolioFormDialog
                initial={item}
                trigger={<button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">Edit</button>}
              />
              <button
                onClick={() => {
                  if (confirm(`Hapus portfolio ${item.titleId}?`)) deletePortfolioItem(item.id);
                }}
                className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Seed script**

The current `src/data/portfolio.ts` has 18 entries with `title`, `category` (`"web-app" | "uiux" | "qa"`), `image`, and a bilingual `description: { id, en }` object already — titles are proper nouns kept identical across both locale columns. Six specific slugs are the ones the current homepage `Portfolio.tsx` hardcodes as its preview (`athro-barbershop`, `bali-pass-website`, `baznas-website`, `ekraf-hub`, `primaya-app-revamp`, `safty`) — these become `featured: true`.

```ts
// scripts/seed-portfolio.ts
import "dotenv/config";
import { db } from "../src/db";
import { portfolioItems } from "../src/db/schema";
import { portfolioItems as existing } from "../src/data/portfolio";

const FEATURED_SLUGS = new Set([
  "athro-barbershop",
  "bali-pass-website",
  "baznas-website",
  "ekraf-hub",
  "primaya-app-revamp",
  "safty",
]);

async function main() {
  const rows = existing.map((item, index) => ({
    titleId: item.title,
    titleEn: item.title,
    descriptionId: item.description.id,
    descriptionEn: item.description.en,
    category: item.category,
    imagePath: item.image,
    featured: FEATURED_SLUGS.has(item.slug),
    isPublished: true,
    sortOrder: index,
  }));
  await db.insert(portfolioItems).values(rows);
  console.log(`Seeded ${rows.length} portfolio items (${FEATURED_SLUGS.size} featured).`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
Add `"db:seed-portfolio": "tsx scripts/seed-portfolio.ts"` to `package.json`, run `npm run db:seed-portfolio`.

- [ ] **Step 6: Verify, delete old data file, build/lint/commit**

Verify: homepage shows exactly 6 featured items (in whatever order `sortOrder` places them — this is a minor, acceptable change from the previous hand-curated preview order, since the underlying goal of mixing categories is still satisfied), and `/portfolio` shows all 18 with working category filter tabs, both locales, desktop+mobile. Delete `src/data/portfolio.ts`. `npm run build && npm run lint` (confirms nothing else imports it, including `PortfolioGallery.tsx` after Step 2b's fix). Commit:
```bash
git add -A
git commit -m "feat(cms): portfolio fully database-backed with admin CRUD (homepage preview + full gallery page)"
```

---

## Task 11: Tech Stack — Fetcher, Section Update, Seed, Admin CRUD

**Files:**
- Create: `src/lib/content/tech-stack.ts`
- Modify: `src/components/sections/TechStack.tsx`
- Create: `src/actions/admin/tech-stack.ts`
- Create: `src/app/admin/(dashboard)/tech-stack/page.tsx`
- Create: `src/components/admin/tech-stack/TechStackEditor.tsx`
- Create: `scripts/seed-tech-stack.ts`
- Delete (once verified): `src/data/techStack.ts` (the `certifications`/`Certification` export in this file is handled separately in Task 12 — only remove the tech-stack-groups portion here, or delete the whole file only once Task 12 has also migrated its half; simplest: leave `src/data/techStack.ts` deletion to Task 12's cleanup step instead, since both tasks currently read from that one file).

**Interfaces:**
- Consumes: `techStackCategories` + `techStackItems` tables (Task 1).
- Produces: `getTechStackGroups(): Promise<{ key: string; labelId: string; labelEn: string; items: string[] }[]>` — note the current `TechStack.tsx` builds its own `groupLabels` record from translation keys like `t("groupFrontend")`; since categories are now dynamic (admin can add a 5th category), labels must travel WITH the category row (`labelId`/`labelEn`) instead of living in the static `translations` table under fixed keys `groupFrontend`/`groupBackend`/etc. This task drops that translation-key indirection for tech stack category labels specifically.

- [ ] **Step 1: Fetcher (combined categories + items in one query)**

```ts
// src/lib/content/tech-stack.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { techStackCategories, techStackItems } from "@/db/schema";

export const getTechStackGroups = unstable_cache(
  async (locale: "id" | "en") => {
    const categories = await db
      .select()
      .from(techStackCategories)
      .orderBy(asc(techStackCategories.sortOrder));
    const items = await db.select().from(techStackItems).orderBy(asc(techStackItems.sortOrder));

    return categories.map((cat) => ({
      key: cat.key,
      label: locale === "en" ? cat.labelEn : cat.labelId,
      items: items.filter((i) => i.categoryId === cat.id).map((i) => i.name),
    }));
  },
  ["tech-stack-all"],
  { tags: ["tech-stack"] }
);
```

- [ ] **Step 2: Update `TechStack.tsx`**

Replace the static `import { techStackGroups } from "@/data/techStack"` and the `groupLabels` record built from `t("groupFrontend")` etc. with:
```tsx
import { getLocale, getTranslations } from "next-intl/server";
import { getTechStackGroups } from "@/lib/content/tech-stack";

export async function TechStack() {
  const t = await getTranslations("TechStack");
  const tCert = await getTranslations("Certifications");
  const locale = (await getLocale()) as "id" | "en";
  const groups = await getTechStackGroups(locale);
  // groups already have { key, label, items } — render directly, no groupLabels lookup needed
  // ...rest of JSX (SectionHeader, TechStackGroupCard mapping, certifications block) stays as-is except swapping `groupLabels[group.key]` for `group.label` and `group.items` directly
}
```
Also remove the now-unused `groupFrontend`/`groupBackend`/`groupMobileDb`/`groupCloudDevops` keys from the `TechStack` namespace in the `translations` table (they migrated into `tech_stack_categories.labelId/labelEn` in Step 4's seed) — delete those 4 rows via a one-off query or just leave them unused (harmless orphan rows); simplest is to leave them, no action required.

- [ ] **Step 3: Actions**

```ts
// src/actions/admin/tech-stack.ts
"use server";

import { eq, asc } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { techStackCategories, techStackItems } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export async function createTechStackCategory(input: { key: string; labelId: string; labelEn: string }) {
  await requireAdminSession();
  const rows = await db.select().from(techStackCategories);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(techStackCategories).values({ ...input, sortOrder: maxSort + 1 });
  updateTag("tech-stack");
}

export async function deleteTechStackCategory(id: number) {
  await requireAdminSession();
  await db.delete(techStackCategories).where(eq(techStackCategories.id, id));
  updateTag("tech-stack");
}

export async function addTechStackItem(categoryId: number, name: string) {
  await requireAdminSession();
  const rows = await db.select().from(techStackItems);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(techStackItems).values({ categoryId, name, sortOrder: maxSort + 1 });
  updateTag("tech-stack");
}

export async function deleteTechStackItem(id: number) {
  await requireAdminSession();
  await db.delete(techStackItems).where(eq(techStackItems.id, id));
  updateTag("tech-stack");
}
```
(Reordering categories/items isn't included as a separate action here — with only 4 categories and 4-5 items each, add/remove is the practical need; if reordering is wanted later it follows the identical up/down `sortOrder`-swap pattern used in every other entity's `move*` action.)

- [ ] **Step 4: Admin page (categories + items combined in one editor)**

```tsx
// src/app/admin/(dashboard)/tech-stack/page.tsx
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { techStackCategories, techStackItems } from "@/db/schema";
import { TechStackEditor } from "@/components/admin/tech-stack/TechStackEditor";

export default async function AdminTechStackPage() {
  const categories = await db.select().from(techStackCategories).orderBy(asc(techStackCategories.sortOrder));
  const items = await db.select().from(techStackItems).orderBy(asc(techStackItems.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Tech Stack</h1>
      <TechStackEditor categories={categories} items={items} />
    </div>
  );
}
```

```tsx
// src/components/admin/tech-stack/TechStackEditor.tsx
"use client";

import { useState } from "react";
import {
  createTechStackCategory,
  deleteTechStackCategory,
  addTechStackItem,
  deleteTechStackItem,
} from "@/actions/admin/tech-stack";

interface Category {
  id: number;
  key: string;
  labelId: string;
  labelEn: string;
}
interface Item {
  id: number;
  categoryId: number;
  name: string;
}

export function TechStackEditor({ categories, items }: { categories: Category[]; items: Item[] }) {
  const [newItemName, setNewItemName] = useState<Record<number, string>>({});
  const [newCategory, setNewCategory] = useState({ key: "", labelId: "", labelEn: "" });

  return (
    <div className="mt-6 space-y-6">
      {categories.map((cat) => (
        <div key={cat.id} className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-zinc-900">{cat.labelId} / {cat.labelEn}</div>
              <div className="text-xs text-zinc-400">{cat.key}</div>
            </div>
            <button
              onClick={() => confirm(`Hapus kategori ${cat.labelId}?`) && deleteTechStackCategory(cat.id)}
              className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600"
            >
              Hapus Kategori
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {items
              .filter((i) => i.categoryId === cat.id)
              .map((i) => (
                <span key={i.id} className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs">
                  {i.name}
                  <button onClick={() => deleteTechStackItem(i.id)} className="text-zinc-400 hover:text-red-600">
                    ×
                  </button>
                </span>
              ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = newItemName[cat.id];
              if (name?.trim()) {
                addTechStackItem(cat.id, name.trim());
                setNewItemName({ ...newItemName, [cat.id]: "" });
              }
            }}
            className="mt-2 flex gap-2"
          >
            <input
              value={newItemName[cat.id] ?? ""}
              onChange={(e) => setNewItemName({ ...newItemName, [cat.id]: e.target.value })}
              placeholder="Nama teknologi baru"
              className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
            />
            <button type="submit" className="rounded-lg bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
              Tambah
            </button>
          </form>
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newCategory.key && newCategory.labelId && newCategory.labelEn) {
            createTechStackCategory(newCategory);
            setNewCategory({ key: "", labelId: "", labelEn: "" });
          }
        }}
        className="rounded-xl border border-dashed border-zinc-300 p-4"
      >
        <div className="mb-2 text-sm font-semibold text-zinc-700">+ Kategori Baru</div>
        <div className="grid grid-cols-3 gap-2">
          <input
            placeholder="key (mis. mobile)"
            value={newCategory.key}
            onChange={(e) => setNewCategory({ ...newCategory, key: e.target.value })}
            className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
          />
          <input
            placeholder="Label (ID)"
            value={newCategory.labelId}
            onChange={(e) => setNewCategory({ ...newCategory, labelId: e.target.value })}
            className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
          />
          <input
            placeholder="Label (EN)"
            value={newCategory.labelEn}
            onChange={(e) => setNewCategory({ ...newCategory, labelEn: e.target.value })}
            className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
          />
        </div>
        <button type="submit" className="mt-2 rounded-lg bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
          Tambah Kategori
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 5: Seed script**

```ts
// scripts/seed-tech-stack.ts
import "dotenv/config";
import { db } from "../src/db";
import { techStackCategories, techStackItems } from "../src/db/schema";
import { techStackGroups } from "../src/data/techStack";

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
```
Add `db:seed-tech-stack` script, run it.

- [ ] **Step 6: Verify, build/lint/commit**

Verify the Tech Stack section renders all 4 categories with correct items, both locales. `npm run build && npm run lint`, commit:
```bash
git add -A
git commit -m "feat(cms): tech stack fully database-backed with admin CRUD"
```
(Do not delete `src/data/techStack.ts` yet — Task 12 still reads its `certifications` export.)

---

## Task 12: Certifications — Fetcher, Section Update, Seed, Admin CRUD

**Files:**
- Create: `src/lib/content/certifications.ts`
- Modify: `src/components/sections/TechStack.tsx` (certifications block within the same file)
- Create: `src/actions/admin/certifications.ts`
- Create: `src/app/admin/(dashboard)/certifications/page.tsx`
- Create: `src/components/admin/certifications/CertificationList.tsx`
- Create: `src/components/admin/certifications/CertificationFormDialog.tsx`
- Create: `scripts/seed-certifications.ts`
- Delete (once verified, and only now since Task 11 also depended on this file): `src/data/techStack.ts`

**Interfaces:**
- Consumes: `certifications` table (Task 1) — note the real current data has NO translated fields (`name`/`altText` are provider names, not UI copy), so unlike every other structured entity this fetcher takes no `locale` parameter.
- Produces: `getCertifications(): Promise<{ id, key, name, imagePath, altText }[]>` — matches `CertificationCard`'s existing `certification: Certification` prop shape (`src/components/CertificationBadge.tsx`, which destructures `{ logo, alt }` — this task's fetcher returns `imagePath`/`altText`, so Step 2 also renames those two fields when passing to `CertificationCard`, since that component itself is not being modified).

- [ ] **Step 1: Fetcher**

```ts
// src/lib/content/certifications.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { certifications } from "@/db/schema";

export const getCertifications = unstable_cache(
  async () => {
    const rows = await db.select().from(certifications).orderBy(asc(certifications.sortOrder));
    return rows.map((r) => ({
      id: r.id,
      key: r.key,
      name: r.name,
      logo: r.imagePath,
      alt: r.altText,
    }));
  },
  ["certifications-all"],
  { tags: ["certifications"] }
);
```
(Field names `logo`/`alt` in the return value match `Certification` in `src/db/schema.ts`-derived shape consumed directly by `CertificationCard`, which expects `{ key, name, logo, alt }` exactly per its current `src/data/techStack.ts`-based type — see Step 2.)

- [ ] **Step 2: Update the certifications block in `TechStack.tsx`**

The current file (already made `async` by Task 11 Step 2) imports `certifications` from `@/data/techStack` and renders `certifications.map((cert) => <CertificationCard key={cert.key} certification={cert} />)`. Replace the import:
```tsx
// Before:
import { techStackGroups, certifications } from "@/data/techStack"; // techStackGroups half already replaced in Task 11
// After (this task's half):
import { getCertifications } from "@/lib/content/certifications";
```
And inside the component body, replace the static `certifications` reference with:
```tsx
const certifications = await getCertifications();
```
placed alongside Task 11's `const groups = await getTechStackGroups(locale);` line. The JSX `certifications.map((cert) => <CertificationCard key={cert.key} certification={cert} />)` stays completely unchanged — the fetcher's return shape (`{ id, key, name, logo, alt }`) already matches what `CertificationCard` expects.

- [ ] **Step 3: Actions**

```ts
// src/actions/admin/certifications.ts
"use server";

import { eq, asc } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { certifications } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export interface CertificationInput {
  key: string;
  name: string;
  imagePath: string;
  altText: string;
}

export async function createCertification(input: CertificationInput) {
  await requireAdminSession();
  const rows = await db.select().from(certifications);
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(certifications).values({ ...input, sortOrder: maxSort + 1 });
  updateTag("certifications");
}

export async function updateCertification(id: number, input: CertificationInput) {
  await requireAdminSession();
  await db.update(certifications).set(input).where(eq(certifications.id, id));
  updateTag("certifications");
}

export async function deleteCertification(id: number) {
  await requireAdminSession();
  await db.delete(certifications).where(eq(certifications.id, id));
  updateTag("certifications");
}

export async function moveCertification(id: number, direction: "up" | "down") {
  await requireAdminSession();
  const rows = await db.select().from(certifications).orderBy(asc(certifications.sortOrder));
  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return;
  const current = rows[index];
  const swap = rows[swapIndex];
  await db.update(certifications).set({ sortOrder: swap.sortOrder }).where(eq(certifications.id, current.id));
  await db.update(certifications).set({ sortOrder: current.sortOrder }).where(eq(certifications.id, swap.id));
  updateTag("certifications");
}
```

- [ ] **Step 4: Admin page + list + dialog**

```tsx
// src/app/admin/(dashboard)/certifications/page.tsx
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { certifications } from "@/db/schema";
import { CertificationList } from "@/components/admin/certifications/CertificationList";

export default async function AdminCertificationsPage() {
  const rows = await db.select().from(certifications).orderBy(asc(certifications.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Sertifikasi</h1>
      <CertificationList items={rows} />
    </div>
  );
}
```

```tsx
// src/components/admin/certifications/CertificationFormDialog.tsx
"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { createCertification, updateCertification, type CertificationInput } from "@/actions/admin/certifications";

interface Props {
  trigger: React.ReactNode;
  initial?: CertificationInput & { id: number };
}

export function CertificationFormDialog({ trigger, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CertificationInput>(
    initial ?? { key: "", name: "", imagePath: "", altText: "" }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (initial) {
      await updateCertification(initial.id, form);
    } else {
      await createCertification(form);
    }
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-zinc-900">
            {initial ? "Edit Sertifikasi" : "Sertifikasi Baru"}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Key (unik, mis. "google")</label>
              <input
                value={form.key}
                onChange={(e) => setForm({ ...form, key: e.target.value })}
                required
                disabled={!!initial}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm disabled:bg-zinc-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Nama Penyedia</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Path Gambar</label>
              <input
                placeholder="/certificate/nama-file.png"
                value={form.imagePath}
                onChange={(e) => setForm({ ...form, imagePath: e.target.value })}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Alt Text</label>
              <input
                value={form.altText}
                onChange={(e) => setForm({ ...form, altText: e.target.value })}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm">
                  Batal
                </button>
              </Dialog.Close>
              <button type="submit" className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
                Simpan
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

```tsx
// src/components/admin/certifications/CertificationList.tsx
"use client";

import { deleteCertification, moveCertification } from "@/actions/admin/certifications";
import { CertificationFormDialog } from "./CertificationFormDialog";

interface Row {
  id: number;
  key: string;
  name: string;
  imagePath: string;
  altText: string;
}

export function CertificationList({ items }: { items: Row[] }) {
  return (
    <div className="mt-6 space-y-3">
      <CertificationFormDialog
        trigger={
          <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
            + Tambah Sertifikasi
          </button>
        }
      />
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4">
            <div>
              <div className="font-semibold text-zinc-900">{item.name}</div>
              <div className="text-xs text-zinc-500">{item.imagePath}</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => moveCertification(item.id, "up")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↑</button>
              <button onClick={() => moveCertification(item.id, "down")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↓</button>
              <CertificationFormDialog
                initial={item}
                trigger={<button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">Edit</button>}
              />
              <button
                onClick={() => {
                  if (confirm(`Hapus sertifikasi ${item.name}?`)) deleteCertification(item.id);
                }}
                className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Seed script**

```ts
// scripts/seed-certifications.ts
import "dotenv/config";
import { db } from "../src/db";
import { certifications } from "../src/db/schema";
import { certifications as existing } from "../src/data/techStack";

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
```
Add `"db:seed-certifications": "tsx scripts/seed-certifications.ts"` to `package.json`, run `npm run db:seed-certifications`. This inserts the 4 real current entries: Google, Bangkit Academy, Laskar AI, Dicoding Indonesia.

- [ ] **Step 6: Verify, delete `src/data/techStack.ts`, build/lint/commit**

Verify all 4 certification logos render correctly (both locales — this content isn't translated, so it's really just confirming the fetch works). Now that both Task 11 and this task no longer read from it, delete `src/data/techStack.ts`. `npm run build && npm run lint` (this proves nothing else imports the deleted file). Commit:
```bash
git add -A
git commit -m "feat(cms): certifications fully database-backed with admin CRUD, remove src/data/techStack.ts"
```

---

## Task 13: Pricing Tiers + Features — Fetcher, Section + Pricelist Update, Seed, Admin CRUD

**Files:**
- Create: `src/lib/content/pricing.ts`
- Modify: `src/components/sections/Pricing.tsx`
- Modify: `src/app/[locale]/pricelist/page.tsx`
- Create: `src/actions/admin/pricing.ts`
- Create: `src/app/admin/(dashboard)/pricing/page.tsx`
- Create: `src/components/admin/pricing/PricingTierList.tsx`
- Create: `src/components/admin/pricing/PricingTierFormDialog.tsx`
- Create: `scripts/seed-pricing.ts`
- Delete (once verified): `src/data/pricing.ts`

**Interfaces:**
- Consumes: `pricingTiers` + `pricingFeatures` tables (Task 1).
- Produces: `getPricingTiers(locale): Promise<{ key, name, tagline, pricePrefix, price, ctaLabel, badge, highlighted, ctaVariant, features: string[] }[]>` — both `Pricing.tsx` (homepage teaser) and `pricelist/page.tsx` (full breakdown) use this same fetcher, since both currently render the same 3 tiers with the same data, just different surrounding copy.

- [ ] **Step 1: Fetcher**

```ts
// src/lib/content/pricing.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { pricingTiers, pricingFeatures } from "@/db/schema";

export const getPricingTiers = unstable_cache(
  async (locale: "id" | "en") => {
    const tiers = await db.select().from(pricingTiers).orderBy(asc(pricingTiers.sortOrder));
    const features = await db.select().from(pricingFeatures).orderBy(asc(pricingFeatures.sortOrder));

    return tiers.map((tier) => ({
      key: tier.key,
      name: locale === "en" ? tier.nameEn : tier.nameId,
      label: locale === "en" ? tier.labelEn : tier.labelId,
      tagline: locale === "en" ? tier.taglineEn : tier.taglineId,
      pricePrefix: locale === "en" ? tier.pricePrefixEn : tier.pricePrefixId,
      price: locale === "en" ? tier.priceEn : tier.priceId,
      ctaLabel: locale === "en" ? tier.ctaLabelEn : tier.ctaLabelId,
      badge: (locale === "en" ? tier.badgeEn : tier.badgeId) ?? undefined,
      highlighted: tier.highlighted,
      ctaVariant: tier.ctaVariant as "primary" | "secondary" | "outline",
      features: features
        .filter((f) => f.tierId === tier.id)
        .map((f) => (locale === "en" ? f.textEn : f.textId)),
    }));
  },
  ["pricing-tiers-all"],
  { tags: ["pricing"] }
);
```

- [ ] **Step 2: Update `Pricing.tsx`**

Read the current file — it builds `landingFeatures`/`customFeatures`/`enterpriseFeatures` arrays from individual `t("landingFeature1")` etc. translation keys, and hardcodes three `<PricingCard>` blocks with per-tier props inline. Replace all of that with:
```tsx
import { getLocale, getTranslations } from "next-intl/server";
import { getPricingTiers } from "@/lib/content/pricing";

export async function Pricing() {
  const t = await getTranslations("Pricing"); // still used for section eyebrow/title/subtitle/viewAll, which stay in the generic translations table
  const locale = (await getLocale()) as "id" | "en";
  const tiers = await getPricingTiers(locale);

  return (
    <section id="pricing" ...>
      {/* SectionHeader unchanged */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.key}
            highlighted={tier.highlighted}
            badge={tier.badge}
            label={tier.label}
            name={tier.name}
            pricePrefix={tier.pricePrefix}
            price={tier.price}
            tagline={tier.tagline}
            features={tier.features}
            ctaLabel={tier.ctaLabel}
            ctaVariant={tier.ctaVariant}
            ctaHref={buildWaLink(/* keep the existing per-tier WA message templates, still hardcoded — these are prefilled chat text, not page wording */ WA_MESSAGES[tier.key])}
            trackSection={tier.key === "landing" ? "pricing_entry" : "pricing_custom"}
          />
        ))}
      </div>
      {/* "Lihat Semua Paket" button unchanged */}
    </section>
  );
}

const WA_MESSAGES: Record<string, string> = {
  landing: "Halo Lumi Beta Works, saya mau tanya-tanya soal paket Landing Page Rp 300.000. Boleh dijelaskan detailnya?",
  custom: "Halo Lumi Beta Works, saya tertarik dengan Paket Bisnis Company Profile & Web App. Bisa berbagi rinciannya?",
  enterprise: "Halo Lumi Beta Works, saya tertarik paket custom/enterprise untuk project saya. Bisa dibantu diskusikan lebih lanjut?",
};
```
Note: `label` (the small uppercase tier badge like "Entry Level"/"Professional Tier"/"Enterprise Tier") comes straight from `pricingTiers.labelId`/`labelEn` (Task 1's schema already includes this column pair) — fully CMS-editable like every other tier field, no hardcoded lookup needed.

- [ ] **Step 3: Update `src/app/[locale]/pricelist/page.tsx`**

Same replacement pattern as Step 2 — this page currently duplicates the same three tiers with `ctaLabel={t("ctaGeneric")}` (a generic "Hubungi Kami" label instead of each tier's specific CTA) and different WA message templates per tier. Keep that distinction (pricelist page uses `t("ctaGeneric")` from the `Pricelist` namespace and its own WA templates tagged `trackSection="pricelist"`), just swap the tier DATA source (`name`, `tagline`, `price`, etc.) from the old hardcoded `tPricing(...)` calls to `getPricingTiers(locale)`.

- [ ] **Step 4: Actions**

```ts
// src/actions/admin/pricing.ts
"use server";

import { eq, asc } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { pricingTiers, pricingFeatures } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export interface PricingTierInput {
  nameId: string;
  nameEn: string;
  labelId: string;
  labelEn: string;
  taglineId: string;
  taglineEn: string;
  pricePrefixId: string;
  pricePrefixEn: string;
  priceId: string;
  priceEn: string;
  ctaLabelId: string;
  ctaLabelEn: string;
  badgeId: string | null;
  badgeEn: string | null;
  highlighted: boolean;
  ctaVariant: string;
}

export async function updatePricingTier(id: number, input: PricingTierInput) {
  await requireAdminSession();
  await db.update(pricingTiers).set(input).where(eq(pricingTiers.id, id));
  updateTag("pricing");
}

export async function addPricingFeature(tierId: number, textId: string, textEn: string) {
  await requireAdminSession();
  const rows = await db.select().from(pricingFeatures).where(eq(pricingFeatures.tierId, tierId));
  const maxSort = rows.reduce((m, r) => Math.max(m, r.sortOrder), 0);
  await db.insert(pricingFeatures).values({ tierId, textId, textEn, sortOrder: maxSort + 1 });
  updateTag("pricing");
}

export async function updatePricingFeature(id: number, textId: string, textEn: string) {
  await requireAdminSession();
  await db.update(pricingFeatures).set({ textId, textEn }).where(eq(pricingFeatures.id, id));
  updateTag("pricing");
}

export async function deletePricingFeature(id: number) {
  await requireAdminSession();
  await db.delete(pricingFeatures).where(eq(pricingFeatures.id, id));
  updateTag("pricing");
}

export async function movePricingFeature(id: number, direction: "up" | "down") {
  await requireAdminSession();
  const feature = (await db.select().from(pricingFeatures).where(eq(pricingFeatures.id, id)))[0];
  if (!feature) return;
  const siblings = await db
    .select()
    .from(pricingFeatures)
    .where(eq(pricingFeatures.tierId, feature.tierId))
    .orderBy(asc(pricingFeatures.sortOrder));
  const index = siblings.findIndex((f) => f.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= siblings.length) return;
  const swap = siblings[swapIndex];
  await db.update(pricingFeatures).set({ sortOrder: swap.sortOrder }).where(eq(pricingFeatures.id, feature.id));
  await db.update(pricingFeatures).set({ sortOrder: feature.sortOrder }).where(eq(pricingFeatures.id, swap.id));
  updateTag("pricing");
}
```
(No create/delete for tiers themselves in this task's scope — the site is designed around exactly 3 fixed tier *slots* referenced by `key` throughout the codebase (`pricing_entry`/`pricing_custom` analytics tracking, WA message templates keyed by `tier.key`); adding a 4th tier would require code changes beyond "editing wording" anyway. Editing existing tiers' text and managing their feature bullets is fully dynamic, which is the CRUD depth that matters here.)

- [ ] **Step 5: Admin page + list + dialog**

```tsx
// src/app/admin/(dashboard)/pricing/page.tsx
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { pricingTiers, pricingFeatures } from "@/db/schema";
import { PricingTierList } from "@/components/admin/pricing/PricingTierList";

export default async function AdminPricingPage() {
  const tiers = await db.select().from(pricingTiers).orderBy(asc(pricingTiers.sortOrder));
  const features = await db.select().from(pricingFeatures).orderBy(asc(pricingFeatures.sortOrder));
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Paket & Harga</h1>
      <PricingTierList tiers={tiers} features={features} />
    </div>
  );
}
```

```tsx
// src/components/admin/pricing/PricingTierFormDialog.tsx
"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { updatePricingTier, type PricingTierInput } from "@/actions/admin/pricing";

interface Props {
  trigger: React.ReactNode;
  tierId: number;
  initial: PricingTierInput;
}

export function PricingTierFormDialog({ trigger, tierId, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PricingTierInput>(initial);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updatePricingTier(tierId, form);
    setOpen(false);
  }

  function field(labelText: string, idKey: keyof PricingTierInput, enKey: keyof PricingTierInput) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-500">{labelText} (ID)</label>
          <input
            value={(form[idKey] as string) ?? ""}
            onChange={(e) => setForm({ ...form, [idKey]: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-500">{labelText} (EN)</label>
          <input
            value={(form[enKey] as string) ?? ""}
            onChange={(e) => setForm({ ...form, [enKey]: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
      </div>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-zinc-900">Edit Tier</Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            {field("Nama Tier", "nameId", "nameEn")}
            {field("Label Badge Kecil", "labelId", "labelEn")}
            {field("Tagline", "taglineId", "taglineEn")}
            {field("Prefix Harga", "pricePrefixId", "pricePrefixEn")}
            {field("Harga", "priceId", "priceEn")}
            {field("Label Tombol CTA", "ctaLabelId", "ctaLabelEn")}
            {field("Badge Populer (kosongkan jika tidak ada)", "badgeId", "badgeEn")}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.highlighted}
                  onChange={(e) => setForm({ ...form, highlighted: e.target.checked })}
                />
                Highlighted
              </label>
              <label className="flex items-center gap-2 text-sm">
                Variant CTA
                <select
                  value={form.ctaVariant}
                  onChange={(e) => setForm({ ...form, ctaVariant: e.target.value })}
                  className="rounded-lg border border-zinc-300 px-2 py-1 text-sm"
                >
                  <option value="primary">primary</option>
                  <option value="secondary">secondary</option>
                  <option value="outline">outline</option>
                </select>
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm">
                  Batal
                </button>
              </Dialog.Close>
              <button type="submit" className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
                Simpan
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

```tsx
// src/components/admin/pricing/PricingTierList.tsx
"use client";

import { useState } from "react";
import {
  addPricingFeature,
  deletePricingFeature,
  movePricingFeature,
  type PricingTierInput,
} from "@/actions/admin/pricing";
import { PricingTierFormDialog } from "./PricingTierFormDialog";

interface Tier extends PricingTierInput {
  id: number;
  key: string;
}
interface Feature {
  id: number;
  tierId: number;
  textId: string;
  textEn: string;
}

export function PricingTierList({ tiers, features }: { tiers: Tier[]; features: Feature[] }) {
  const [newFeature, setNewFeature] = useState<Record<number, { id: string; en: string }>>({});

  return (
    <div className="mt-6 space-y-6">
      {tiers.map((tier) => (
        <div key={tier.id} className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-zinc-900">
                {tier.nameId} <span className="text-xs text-zinc-400">({tier.key})</span>
              </div>
              <div className="text-xs text-zinc-500">{tier.priceId}</div>
            </div>
            <PricingTierFormDialog
              tierId={tier.id}
              initial={tier}
              trigger={<button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">Edit Tier</button>}
            />
          </div>
          <div className="mt-3 space-y-1">
            {features
              .filter((f) => f.tierId === tier.id)
              .map((f) => (
                <div key={f.id} className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-1.5 text-xs">
                  <span>{f.textId}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => movePricingFeature(f.id, "up")} className="rounded border border-zinc-200 px-1.5">↑</button>
                    <button onClick={() => movePricingFeature(f.id, "down")} className="rounded border border-zinc-200 px-1.5">↓</button>
                    <button
                      onClick={() => confirm("Hapus fitur ini?") && deletePricingFeature(f.id)}
                      className="rounded border border-red-200 px-1.5 text-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const value = newFeature[tier.id];
              if (value?.id && value?.en) {
                addPricingFeature(tier.id, value.id, value.en);
                setNewFeature({ ...newFeature, [tier.id]: { id: "", en: "" } });
              }
            }}
            className="mt-2 grid grid-cols-[1fr_1fr_auto] gap-2"
          >
            <input
              placeholder="Fitur baru (ID)"
              value={newFeature[tier.id]?.id ?? ""}
              onChange={(e) => setNewFeature({ ...newFeature, [tier.id]: { ...newFeature[tier.id], id: e.target.value, en: newFeature[tier.id]?.en ?? "" } })}
              className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
            />
            <input
              placeholder="Fitur baru (EN)"
              value={newFeature[tier.id]?.en ?? ""}
              onChange={(e) => setNewFeature({ ...newFeature, [tier.id]: { id: newFeature[tier.id]?.id ?? "", en: e.target.value } })}
              className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
            />
            <button type="submit" className="rounded-lg bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
              + Tambah
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Seed script**

`priceType` and `waSection` from the old `src/data/pricing.ts` don't map to new columns — `waSection` corresponds to the `trackSection` prop already hardcoded in Step 2/3's JSX (`"pricing_entry"`/`"pricing_custom"`), so it's dropped from the DB row, not lost; `priceType` was never rendered anywhere and is simply not migrated.

```ts
// scripts/seed-pricing.ts
import "dotenv/config";
import { db } from "../src/db";
import { pricingTiers, pricingFeatures } from "../src/db/schema";
import id from "../messages/id.json";
import en from "../messages/en.json";

const P_ID = (id as any).Pricing;
const P_EN = (en as any).Pricing;

async function main() {
  const [landing] = await db
    .insert(pricingTiers)
    .values({
      key: "landing",
      nameId: P_ID.landingName,
      nameEn: P_EN.landingName,
      labelId: P_ID.landingLabel,
      labelEn: P_EN.landingLabel,
      taglineId: P_ID.landingTagline,
      taglineEn: P_EN.landingTagline,
      pricePrefixId: P_ID.landingPricePrefix,
      pricePrefixEn: P_EN.landingPricePrefix,
      priceId: P_ID.landingPrice,
      priceEn: P_EN.landingPrice,
      ctaLabelId: P_ID.landingCta,
      ctaLabelEn: P_EN.landingCta,
      badgeId: P_ID.landingBadge,
      badgeEn: P_EN.landingBadge,
      highlighted: true,
      ctaVariant: "secondary",
      sortOrder: 0,
    })
    .returning();

  const [custom] = await db
    .insert(pricingTiers)
    .values({
      key: "custom",
      nameId: P_ID.customName,
      nameEn: P_EN.customName,
      labelId: P_ID.customLabel,
      labelEn: P_EN.customLabel,
      taglineId: P_ID.customTagline,
      taglineEn: P_EN.customTagline,
      pricePrefixId: P_ID.customPricePrefix,
      pricePrefixEn: P_EN.customPricePrefix,
      priceId: P_ID.customPrice,
      priceEn: P_EN.customPrice,
      ctaLabelId: P_ID.customCta,
      ctaLabelEn: P_EN.customCta,
      badgeId: null,
      badgeEn: null,
      highlighted: false,
      ctaVariant: "primary",
      sortOrder: 1,
    })
    .returning();

  const [enterprise] = await db
    .insert(pricingTiers)
    .values({
      key: "enterprise",
      nameId: P_ID.enterpriseName,
      nameEn: P_EN.enterpriseName,
      labelId: P_ID.enterpriseLabel,
      labelEn: P_EN.enterpriseLabel,
      taglineId: P_ID.enterpriseTagline,
      taglineEn: P_EN.enterpriseTagline,
      pricePrefixId: P_ID.enterprisePricePrefix,
      pricePrefixEn: P_EN.enterprisePricePrefix,
      priceId: P_ID.enterprisePrice,
      priceEn: P_EN.enterprisePrice,
      ctaLabelId: P_ID.enterpriseCta,
      ctaLabelEn: P_EN.enterpriseCta,
      badgeId: null,
      badgeEn: null,
      highlighted: false,
      ctaVariant: "outline",
      sortOrder: 2,
    })
    .returning();

  await db.insert(pricingFeatures).values([
    ...[1, 2, 3, 4, 5].map((n, i) => ({
      tierId: landing.id,
      textId: P_ID[`landingFeature${n}`],
      textEn: P_EN[`landingFeature${n}`],
      sortOrder: i,
    })),
    ...[1, 2, 3, 4, 5].map((n, i) => ({
      tierId: custom.id,
      textId: P_ID[`customFeature${n}`],
      textEn: P_EN[`customFeature${n}`],
      sortOrder: i,
    })),
    ...[1, 2, 3, 4].map((n, i) => ({
      tierId: enterprise.id,
      textId: P_ID[`enterpriseFeature${n}`],
      textEn: P_EN[`enterpriseFeature${n}`],
      sortOrder: i,
    })),
  ]);

  console.log("Seeded 3 pricing tiers and 14 pricing features.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

Add `"db:seed-pricing": "tsx scripts/seed-pricing.ts"` to `package.json`, run `npm run db:seed-pricing`. After confirming it worked (Step 7 below), the migrated keys (`landingName`, `landingLabel`, `landingFeature1`...`enterpriseFeature4`, etc.) are left in place as harmless orphan rows in the `Pricing` namespace of `translations` — no cleanup query needed; `eyebrow`, `title`, `subtitle`, and `viewAll` in that same namespace stay in active use for the section header.

- [ ] **Step 7: Verify, delete old data file, build/lint/commit**

Verify both the homepage Pricing section and the `/pricelist` page render all 3 tiers with correct text/features in both locales, WA links still work with the right prefilled messages. Delete `src/data/pricing.ts`. `npm run build && npm run lint`, commit:
```bash
git add -A
git commit -m "feat(cms): pricing tiers and features fully database-backed with admin CRUD"
```

---

## Task 14: Final Cleanup + Full-Site Verification

**Files:**
- Delete: `messages/id.json`, `messages/en.json` (fully superseded by the `translations` table as of Task 5)
- Modify: none expected, but fix anything the full verification pass below surfaces

- [ ] **Step 1: Confirm nothing still imports the JSON files**

```bash
grep -rn "messages/id.json\|messages/en.json" src/ --include="*.ts" --include="*.tsx"
```
Expected: no matches (only `src/i18n/request.ts` ever imported them, and Task 5 already removed that import).

- [ ] **Step 2: Delete the message files**

```bash
git rm messages/id.json messages/en.json
```

- [ ] **Step 3: Confirm `src/data/` is empty or removed**

```bash
ls src/data/ 2>/dev/null
```
Expected: directory doesn't exist or is empty (every file was deleted in Tasks 8–13 once its consumers migrated). Remove the empty directory if it still exists.

- [ ] **Step 4: Full build + lint**

```bash
npm run build && npm run lint
```
Expected: both clean.

- [ ] **Step 5: Full visual + functional pass**

Using the Playwright MCP browser tool: start `npm run dev`. Check, at both 1440px and 375px, both `/id` and `/en`:
- Homepage: every section renders with correct text and correct structured content (portfolio grid, pricing cards, tech stack groups + certifications, testimonials columns, trusted-by marquee).
- `/pricelist` (both locales): correct tier breakdown.
- `/portfolio`, `/services`, `/about` (both locales): still render (these pages' own content, if any comes from `translations`, should be unaffected since Task 5 already covers all namespaces).
- `/admin`: log in, visit every sidebar link (Teks Statis, Portfolio, Paket & Harga, Tech Stack, Sertifikasi, Client Logo, Testimoni) and confirm each renders its list without errors.
- Make one live edit in each of the 7 admin sections and confirm the change appears on the public site within a page reload (proves `updateTag` wiring end-to-end for every entity), then revert each edit back to its original value.

Stop the dev server after.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore(cms): remove superseded messages JSON and empty src/data directory"
```

---

## Post-Plan Note (not a task — informational)

Do **not** push any of this plan's commits to `origin/master` without asking the user first, per this session's established working pattern (git push is confirmed explicitly each time, even though DB changes are pre-authorized per `CLAUDE.md`/`AGENTS.md`).
