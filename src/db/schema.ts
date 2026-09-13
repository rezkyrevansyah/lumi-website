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
