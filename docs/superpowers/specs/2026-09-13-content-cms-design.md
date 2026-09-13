# Content CMS — Design Spec

**Status:** Approved by user in chat 2026-09-13. Ready for implementation planning.

## 1. Context & Goal

Lumi Beta Works' landing page (built earlier this session) has every piece of wording hardcoded: static UI copy lives in `messages/id.json` / `messages/en.json` (consumed via `next-intl`), and structured repeatable content (portfolio items, pricing tiers, tech stack, certifications, client logos, testimonials) lives in typed arrays under `src/data/*.ts`.

The user wants a **complete, working CMS** so every word on every page — both Indonesian and English — can be edited without touching code or redeploying. Images are explicitly **out of scope for this pass**: existing image files stay where they are in `public/`, and CMS forms reference them by a plain text path field rather than an upload widget.

## 2. Non-Goals (this pass)

- Image upload/management UI (path is a manually-typed text field).
- Multi-user roles/permissions (single shared admin password, same as the site's pre-reset CMS).
- Content versioning/audit log/undo history.
- Machine-translating testimonial quotes (see §4.6 — quotes stay single-language, verbatim).
- Changing which URL routes exist (`/portfolio`, `/services`, `/pricelist`, `/about` stay hardcoded in code; only their **label text** is CMS-editable).

## 3. Why not reuse the pre-reset CMS as-is

A full CMS existed before the 2026-09-13 fresh reset (see tag `pre-fresh-reset-backup`), with iron-session auth, Server Actions, and an admin shell (`AdminSidebar`/`AdminHeader`/list+dialog pattern per entity). **That schema was single-language only** (e.g. `services.title: text`, no `_id`/`_en` split) — it cannot be reused as-is for a bilingual requirement. This design reuses its **proven patterns** (auth approach, admin shell/list/dialog UI shape, Server Actions for mutations) but designs a new, bilingual-aware schema from scratch.

## 4. Database Schema (Drizzle ORM, Postgres via existing Supabase connection)

All translatable text fields are split into `_id` (Indonesian, default locale) and `_en` (English) columns — plain columns, not JSONB — for simplicity and Drizzle type-safety with only two languages.

### 4.1 `translations` — generic static UI strings

Replaces the entire content of `messages/id.json` + `messages/en.json`.

| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| namespace | varchar(50) | e.g. `"Hero"`, `"Nav"`, `"Footer"` — matches current top-level JSON keys |
| key | varchar(100) | e.g. `"title"`, `"ctaPrimary"` — matches current nested key |
| valueId | text | Indonesian value |
| valueEn | text | English value |

Unique index on `(namespace, key)`.

### 4.2 `portfolio_items`

id, titleId, titleEn, category (`pgEnum`: `web-dev | uiux | qa | consulting` — category **label** text still comes from `translations` under namespace `Portfolio`, e.g. `Portfolio.categoryWebDev`, so labels aren't duplicated per item), imagePath (text, manual), sortOrder, isPublished, createdAt.

### 4.3 `pricing_tiers` + `pricing_features` (child table)

`pricing_tiers`: id, key (`pgEnum`: `landing | custom | enterprise`, unique), nameId/En, taglineId/En, pricePrefixId/En, priceId/En, ctaLabelId/En, badgeId/En (nullable — only the highlighted tier has one), highlighted (bool), ctaVariant (varchar, matches existing `Button` variant prop: `primary|secondary|outline`), sortOrder.

`pricing_features`: id, tierId (FK → pricing_tiers, cascade delete), textId, textEn, sortOrder. Lets admin add/remove feature bullets per tier — currently 4-5 fixed bullets per tier, becomes fully dynamic.

### 4.4 `tech_stack_categories` + `tech_stack_items`

`tech_stack_categories`: id, key (varchar, unique — e.g. `"frontend"`), labelId/En, sortOrder.
`tech_stack_items`: id, categoryId (FK, cascade), name (text — tech names like "Next.js" are proper nouns, not translated), sortOrder.

### 4.5 `certifications`

id, name (text — provider name, not translated), programId/En, issuerId/En, tagId/En, imagePath (text, manual), altText (text), sortOrder.

### 4.6 `testimonials`

id, name (text, not translated), roleId/En (role phrasing CAN be localized, e.g. "Pemilik Bisnis" vs "Business Owner"), **quote (single `text` column, not split)**, rating (int, default 5), featured (bool), sortOrder.

**Explicit decision (confirmed with user):** testimonial quotes are the client's real words — several were originally written in English, most in Indonesian. Machine- or admin-translating them into the "other" language would misrepresent what the client actually said, so `quote` stays one authentic-language field regardless of site locale. Everything else about a testimonial (role/rating/order) is still fully CMS-editable.

### 4.7 `client_logos`

id, imagePath (text, manual), altText (text — the only "wording" here), sortOrder.

## 5. Content Loading (integration with existing code — no component changes)

`src/i18n/request.ts` currently does:
```ts
messages: (await import(`../../messages/${locale}.json`)).default
```
This becomes a function that queries **all** rows from `translations`, groups them into `{ [namespace]: { [key]: value } }` (picking `valueId` or `valueEn` per the resolved `locale`), and returns that object in the exact same shape. **Every existing `useTranslations()`/`getTranslations()` call in every section component keeps working unchanged** — this is the key property that keeps the blast radius small; per Context7-verified next-intl docs, `getRequestConfig` messages can come "from anywhere," including a DB.

Structured content (`portfolioItems`, `pricingTiers`, etc.) moves from static array imports to fetcher functions in `src/lib/content/*.ts` (e.g. `getPortfolioItems(locale)`), called directly from each section Server Component in place of the old `import { portfolioItems } from "@/data/portfolio"`. Each fetcher resolves the `_id`/`_en` columns into the shape the component already expects (e.g. `{ title, category, image }`), so component internals (`PortfolioCard`, `PricingCard`, etc.) don't change either.

**Caching:** the project does not use Next.js 16's opt-in Cache Components (`cacheComponents` flag is off), so this uses the standard "previous model": every fetcher is wrapped in `unstable_cache(fn, [cacheKey], { tags: ["<entity>"] })`. Every admin Server Action calls `revalidateTag("<entity>")` (and `revalidateTag("translations")` for static strings) right after a successful write, so content changes appear on the live site immediately without a redeploy — no manual cache-clearing step for the admin.

**Trade-off, stated plainly:** pages that read DB content can no longer be pure build-time static output the way fully-hardcoded pages were — they're cached-and-revalidated instead. For this site's traffic level this is the expected, standard cost of moving from hardcoded to CMS-backed content, same as any headless-CMS Next.js site.

## 6. Admin Panel

**Auth:** reuse the pre-reset pattern — single shared password (`ADMIN_PASSWORD` env var, already set), `iron-session` cookie (`SESSION_SECRET` env var, already set), timing-safe password comparison. `src/proxy.ts` gains an early branch: if `pathname.startsWith("/admin")` and isn't `/admin/login`, check the iron-session cookie and redirect to `/admin/login` if absent — this runs *before* the next-intl locale-routing branch, and `/admin/*` is never locale-prefixed (it lives at `src/app/admin/**`, a sibling of `src/app/[locale]/`, not nested inside it). The admin UI itself is Indonesian-only chrome (labels, buttons) — only the *content it edits* is bilingual.

**Routes:**
- `/admin/login` — password form
- `/admin` — dashboard (quick links to each editor + a content-count summary)
- `/admin/translations` — list of namespaces → drill into `/admin/translations/[namespace]` for a table of key / value (ID) / value (EN), inline-editable
- `/admin/portfolio`, `/admin/pricing`, `/admin/tech-stack`, `/admin/certifications`, `/admin/client-logos`, `/admin/testimonials` — one page per entity, list + add/edit dialog (ID/EN fields side by side per the approved UX) + delete + drag-to-reorder (updates `sortOrder`)

**Mutations:** Server Actions (`"use server"`) per entity in `src/actions/admin/*.ts`, mirroring the pre-reset pattern (no separate REST/API layer needed) — each action validates the admin session, writes via Drizzle, then calls the relevant `revalidateTag`.

## 7. Migration / Seeding

A one-time seed script (`scripts/seed-content.ts`) inserts the **current, real, already-live content** into the new tables/rows: every key in today's `messages/id.json` + `en.json` → `translations` rows; every entry in today's `src/data/portfolio.ts`, `pricing.ts`, `techStack.ts`, `clientLogos.ts`, `testimonials.ts` → their respective tables. The CMS launches already populated with today's real copy — not empty, no regression. `src/data/*.ts` files are removed once their content is confirmed migrated and fetchers are wired up (their `interface`/`type` exports may be kept or moved into `src/lib/content/` if still needed for typing).

## 8. Open items explicitly deferred (not blockers)

- Image upload — future pass.
- Multi-admin accounts/roles — future pass, only if the team grows beyond one editor.
