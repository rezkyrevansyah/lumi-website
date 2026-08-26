import postgres from "postgres"
import { config } from "dotenv"

config({ path: ".env.local" })

const url = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL || ""
const sql = postgres(url, { max: 1 })

async function fixSchema() {
  console.log("Fixing schema mismatches...")

  // ─── Testimonials: rename name→author_name, role→author_role ──────────────
  // Check if old columns exist before renaming
  const hasOldName = await sql`
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'name'
  `
  if (hasOldName.length > 0) {
    console.log("Renaming testimonials.name -> author_name")
    await sql`ALTER TABLE testimonials RENAME COLUMN name TO author_name`
  }

  const hasOldRole = await sql`
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'role'
  `
  if (hasOldRole.length > 0) {
    console.log("Renaming testimonials.role -> author_role")
    await sql`ALTER TABLE testimonials RENAME COLUMN role TO author_role`
  }

  // ─── Portfolio Items: convert text[] → jsonb for tags, platforms ───────────
  const portfolioTagsType = await sql`
    SELECT data_type FROM information_schema.columns
    WHERE table_name = 'portfolio_items' AND column_name = 'tags'
  `
  if (portfolioTagsType[0]?.data_type === 'ARRAY') {
    console.log("Converting portfolio_items.tags text[] -> jsonb")
    await sql`ALTER TABLE portfolio_items ALTER COLUMN tags DROP DEFAULT`
    await sql`ALTER TABLE portfolio_items ALTER COLUMN tags TYPE jsonb USING to_jsonb(tags)`
    await sql`ALTER TABLE portfolio_items ALTER COLUMN tags SET DEFAULT '[]'::jsonb`
  }

  const portfolioPlatformsType = await sql`
    SELECT data_type FROM information_schema.columns
    WHERE table_name = 'portfolio_items' AND column_name = 'platforms'
  `
  if (portfolioPlatformsType[0]?.data_type === 'ARRAY') {
    console.log("Converting portfolio_items.platforms text[] -> jsonb")
    await sql`ALTER TABLE portfolio_items ALTER COLUMN platforms DROP DEFAULT`
    await sql`ALTER TABLE portfolio_items ALTER COLUMN platforms TYPE jsonb USING to_jsonb(platforms)`
    await sql`ALTER TABLE portfolio_items ALTER COLUMN platforms SET DEFAULT '[]'::jsonb`
  }

  // ─── Services: convert text[] → jsonb for tags ────────────────────────────
  const servicesTagsType = await sql`
    SELECT data_type FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'tags'
  `
  if (servicesTagsType[0]?.data_type === 'ARRAY') {
    console.log("Converting services.tags text[] -> jsonb")
    await sql`ALTER TABLE services ALTER COLUMN tags DROP DEFAULT`
    await sql`ALTER TABLE services ALTER COLUMN tags TYPE jsonb USING to_jsonb(tags)`
    await sql`ALTER TABLE services ALTER COLUMN tags SET DEFAULT '[]'::jsonb`
  }

  // ─── Remove stale columns from portfolio_items (old schema leftovers) ──────
  // The old schema had 'color' and 'bg' — we replaced with accent_color/bg_color
  const hasOldColor = await sql`
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolio_items' AND column_name = 'color'
  `
  if (hasOldColor.length > 0) {
    console.log("Dropping portfolio_items.color (replaced by accent_color)")
    await sql`ALTER TABLE portfolio_items DROP COLUMN color`
  }

  const hasOldBg = await sql`
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolio_items' AND column_name = 'bg'
  `
  if (hasOldBg.length > 0) {
    console.log("Dropping portfolio_items.bg (replaced by bg_color)")
    await sql`ALTER TABLE portfolio_items DROP COLUMN bg`
  }

  console.log("Schema fix complete!")
  await sql.end()
}

fixSchema().catch((err) => {
  console.error("Fix failed:", err)
  process.exit(1)
})
