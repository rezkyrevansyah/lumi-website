import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core"

// ─── Portfolio Items ──────────────────────────────────────────────────────────
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  client: text("client").notNull(),
  category: varchar("category", { length: 50 }).notNull().default("web"),
  description: text("description").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  platforms: jsonb("platforms").$type<string[]>().default([]),
  accentColor: varchar("accent_color", { length: 20 }).default("#2DD9A4"),
  bgColor: varchar("bg_color", { length: 20 }).default("#F0FDF9"),
  imageUrl: text("image_url"),
  demoUrl: text("demo_url"),
  isUmkmCaseStudy: boolean("is_umkm_case_study").default(false),
  sortOrder: integer("sort_order").default(0),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
})

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role").notNull(),
  rating: integer("rating").default(5),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
})

// ─── Services ─────────────────────────────────────────────────────────────────
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  shortDesc: text("short_desc").notNull(),
  summary: text("summary"),
  badgeLabel: varchar("badge_label", { length: 100 }),
  badgeColor: varchar("badge_color", { length: 20 }),
  deliverables: jsonb("deliverables").$type<string[]>().default([]),
  techStack: jsonb("tech_stack").$type<string[]>().default([]),
  slaLabel: varchar("sla_label", { length: 100 }),
  iconPath: text("icon_path"),
  iconType: varchar("icon_type", { length: 20 }).default("image"),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  waMessage: text("wa_message"),
  tags: jsonb("tags").$type<string[]>().default([]),
  sortOrder: integer("sort_order").default(0),
})

// ─── FAQs ─────────────────────────────────────────────────────────────────────
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  page: varchar("page", { length: 20 }).notNull().default("global"),
  sortOrder: integer("sort_order").default(0),
})

// ─── Certifications ───────────────────────────────────────────────────────────
export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text").notNull(),
  isDark: boolean("is_dark").default(false),
  sortOrder: integer("sort_order").default(0),
})

// ─── Workflow Steps (layanan page) ────────────────────────────────────────────
export const workflowSteps = pgTable("workflow_steps", {
  id: serial("id").primaryKey(),
  stepNumber: integer("step_number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").default(0),
})

// ─── Tech Categories (layanan page) ──────────────────────────────────────────
export const techCategories = pgTable("tech_categories", {
  id: serial("id").primaryKey(),
  categoryName: text("category_name").notNull(),
  description: text("description").notNull(),
  stacks: jsonb("stacks").$type<string[]>().default([]),
  sortOrder: integer("sort_order").default(0),
})

// ─── Stats ────────────────────────────────────────────────────────────────────
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 20 }).notNull(),
  label: text("label").notNull(),
  sortOrder: integer("sort_order").default(0),
})

// ─── Trusted Brands ───────────────────────────────────────────────────────────
export const trustedBrands = pgTable("trusted_brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  sortOrder: integer("sort_order").default(0),
})

// ─── Site Settings (key-value JSONB) ─────────────────────────────────────────
export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: jsonb("value").notNull(),
})

// ─── About: Principles ────────────────────────────────────────────────────────
export const aboutPrinciples = pgTable("about_principles", {
  id: serial("id").primaryKey(),
  section: varchar("section", { length: 50 }).notNull(),
  icon: text("icon").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  accentColor: varchar("accent_color", { length: 20 }),
  bgColor: varchar("bg_color", { length: 20 }),
  sortOrder: integer("sort_order").default(0),
})

// ─── About: Achievements ──────────────────────────────────────────────────────
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 20 }).notNull(),
  label: text("label").notNull(),
  description: text("description"),
  accentColor: varchar("accent_color", { length: 20 }),
  bgColor: varchar("bg_color", { length: 20 }),
  sortOrder: integer("sort_order").default(0),
})

// ─── UMKM: Use Cases ──────────────────────────────────────────────────────────
export const umkmUseCases = pgTable("umkm_use_cases", {
  id: serial("id").primaryKey(),
  iconName: text("icon_name").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  isHighlighted: boolean("is_highlighted").default(false),
  sortOrder: integer("sort_order").default(0),
})

// ─── UMKM: Process Steps ──────────────────────────────────────────────────────
export const umkmProcessSteps = pgTable("umkm_process_steps", {
  id: serial("id").primaryKey(),
  stepNumber: integer("step_number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").default(0),
})

// ─── UMKM: Market Stats ───────────────────────────────────────────────────────
export const umkmMarketStats = pgTable("umkm_market_stats", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 30 }).notNull(),
  label: text("label").notNull(),
  sortOrder: integer("sort_order").default(0),
})
