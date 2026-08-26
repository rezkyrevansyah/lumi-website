import postgres from "postgres"
import { config } from "dotenv"

config({ path: ".env.local" })

const url = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL || ""
const sql = postgres(url, { max: 1 })

async function migrate() {
  console.log("Starting migration...")

  await sql`DROP TABLE IF EXISTS users CASCADE`

  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_items (
      id serial PRIMARY KEY,
      title text NOT NULL,
      client text NOT NULL,
      category varchar(50) NOT NULL DEFAULT 'web',
      description text NOT NULL,
      tags jsonb DEFAULT '[]',
      platforms jsonb DEFAULT '[]',
      accent_color varchar(20) DEFAULT '#2DD9A4',
      bg_color varchar(20) DEFAULT '#F0FDF9',
      image_url text,
      demo_url text,
      is_umkm_case_study boolean DEFAULT false,
      sort_order integer DEFAULT 0,
      is_published boolean DEFAULT true,
      created_at timestamp DEFAULT now()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS testimonials (
      id serial PRIMARY KEY,
      quote text NOT NULL,
      author_name text NOT NULL,
      author_role text NOT NULL,
      rating integer DEFAULT 5,
      is_featured boolean DEFAULT false,
      sort_order integer DEFAULT 0,
      created_at timestamp DEFAULT now()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id serial PRIMARY KEY,
      title text NOT NULL,
      short_desc text NOT NULL,
      summary text,
      badge_label varchar(100),
      badge_color varchar(20),
      deliverables jsonb DEFAULT '[]',
      tech_stack jsonb DEFAULT '[]',
      sla_label varchar(100),
      icon_path text,
      icon_type varchar(20) DEFAULT 'image',
      slug varchar(100) NOT NULL UNIQUE,
      wa_message text,
      tags jsonb DEFAULT '[]',
      sort_order integer DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS faqs (
      id serial PRIMARY KEY,
      question text NOT NULL,
      answer text NOT NULL,
      page varchar(20) NOT NULL DEFAULT 'global',
      sort_order integer DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS certifications (
      id serial PRIMARY KEY,
      image_url text NOT NULL,
      alt_text text NOT NULL,
      is_dark boolean DEFAULT false,
      sort_order integer DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS workflow_steps (
      id serial PRIMARY KEY,
      step_number integer NOT NULL,
      title text NOT NULL,
      description text NOT NULL,
      sort_order integer DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS tech_categories (
      id serial PRIMARY KEY,
      category_name text NOT NULL,
      description text NOT NULL,
      stacks jsonb DEFAULT '[]',
      sort_order integer DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS stats (
      id serial PRIMARY KEY,
      value varchar(20) NOT NULL,
      label text NOT NULL,
      sort_order integer DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS trusted_brands (
      id serial PRIMARY KEY,
      name text NOT NULL,
      logo_url text,
      sort_order integer DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      key varchar(100) PRIMARY KEY,
      value jsonb NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS about_principles (
      id serial PRIMARY KEY,
      section varchar(50) NOT NULL,
      icon text NOT NULL,
      title text NOT NULL,
      description text NOT NULL,
      accent_color varchar(20),
      bg_color varchar(20),
      sort_order integer DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS achievements (
      id serial PRIMARY KEY,
      value varchar(20) NOT NULL,
      label text NOT NULL,
      description text,
      accent_color varchar(20),
      bg_color varchar(20),
      sort_order integer DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS umkm_use_cases (
      id serial PRIMARY KEY,
      icon_name text NOT NULL,
      title text NOT NULL,
      description text NOT NULL,
      tags jsonb DEFAULT '[]',
      is_highlighted boolean DEFAULT false,
      sort_order integer DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS umkm_process_steps (
      id serial PRIMARY KEY,
      step_number integer NOT NULL,
      title text NOT NULL,
      description text NOT NULL,
      sort_order integer DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS umkm_market_stats (
      id serial PRIMARY KEY,
      value varchar(30) NOT NULL,
      label text NOT NULL,
      sort_order integer DEFAULT 0
    )
  `

  // Add missing columns to existing tables (safe: IF NOT EXISTS)
  console.log("Adding missing columns...")

  // portfolio_items
  await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '[]'`
  await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS platforms jsonb DEFAULT '[]'`
  await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS accent_color varchar(20) DEFAULT '#2DD9A4'`
  await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS bg_color varchar(20) DEFAULT '#F0FDF9'`
  await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS is_umkm_case_study boolean DEFAULT false`
  await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0`
  await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true`
  await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS created_at timestamp DEFAULT now()`
  await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS demo_url text`

  // testimonials
  await sql`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false`
  await sql`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0`
  await sql`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS created_at timestamp DEFAULT now()`

  // services
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS short_desc text`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS summary text`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS badge_label varchar(100)`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS badge_color varchar(20)`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS deliverables jsonb DEFAULT '[]'`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS tech_stack jsonb DEFAULT '[]'`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS sla_label varchar(100)`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS icon_type varchar(20) DEFAULT 'image'`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS slug varchar(100)`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS wa_message text`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '[]'`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0`

  // stats
  await sql`ALTER TABLE stats ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0`

  // trusted_brands
  await sql`ALTER TABLE trusted_brands ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0`

  console.log("Migration complete!")
  await sql.end()
}

migrate().catch((err) => {
  console.error("Migration failed:", err)
  process.exit(1)
})
