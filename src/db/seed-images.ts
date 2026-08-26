import fs from "fs";
import path from "path";
import { config } from "dotenv";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const dbUrl = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL || "";

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing Supabase environment variables.");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const sql = postgres(dbUrl, { max: 1 });

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

async function ensureBucket(): Promise<boolean> {
  const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
  if (listError) {
    console.error("Failed to list buckets:", listError.message);
    return false;
  }

  const mediaBucket = buckets?.find((b) => b.name === "media" || b.id === "media");
  if (!mediaBucket) {
    console.log("Bucket 'media' not found. Creating public bucket 'media'...");
    const { error: createError } = await supabaseAdmin.storage.createBucket("media", {
      public: true,
      fileSizeLimit: 10485760, // 10MB
    });
    if (createError) {
      console.error("Failed to create bucket 'media':", createError.message);
      return false;
    }
    console.log("Bucket 'media' created successfully.");
  }
  return true;
}

async function uploadFile(localRelativePath: string, storageFolder: string): Promise<string | null> {
  const fullPath = path.join(process.cwd(), "public", localRelativePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return null;
  }

  const filename = path.basename(fullPath);
  const storagePath = `${storageFolder}/${filename}`;
  const fileBuffer = fs.readFileSync(fullPath);
  const contentType = getContentType(fullPath);

  console.log(`Uploading ${localRelativePath} -> media/${storagePath}...`);

  const { error } = await supabaseAdmin.storage.from("media").upload(storagePath, fileBuffer, {
    contentType,
    upsert: true,
  });

  if (error) {
    console.error(`Failed to upload ${storagePath}:`, error.message);
    return null;
  }

  const { data } = supabaseAdmin.storage.from("media").getPublicUrl(storagePath);
  return data.publicUrl;
}

async function seedImages() {
  console.log("Starting Image Migration to Supabase Storage...");

  const bucketReady = await ensureBucket();
  if (!bucketReady) {
    console.error("Storage bucket is not ready. Aborting image migration.");
    console.log("Note: Website will continue to use local /public/ assets as fallback.");
    await sql.end();
    return;
  }

  // 1. Portfolio Images
  const projectDir = path.join(process.cwd(), "public", "images", "projects");
  if (fs.existsSync(projectDir)) {
    const projectFiles = fs.readdirSync(projectDir);
    for (const file of projectFiles) {
      const localPath = `images/projects/${file}`;
      const publicUrl = await uploadFile(localPath, "projects");
      if (publicUrl) {
        // Update matching portfolio items in DB
        await sql`
          UPDATE portfolio_items
          SET image_url = ${publicUrl}
          WHERE image_url = ${`/${localPath}`} OR image_url = ${localPath}
        `;
      }
    }
  }

  // 2. Certifications
  const certDir = path.join(process.cwd(), "public", "certificate");
  if (fs.existsSync(certDir)) {
    const certFiles = fs.readdirSync(certDir);
    for (const file of certFiles) {
      const localPath = `certificate/${file}`;
      const publicUrl = await uploadFile(localPath, "certifications");
      if (publicUrl) {
        await sql`
          UPDATE certifications
          SET image_url = ${publicUrl}
          WHERE image_url = ${`/${localPath}`} OR image_url = ${localPath}
        `;
      }
    }
  }

  // 3. Partner Logos
  const partnerDir = path.join(process.cwd(), "public", "logo_partner");
  if (fs.existsSync(partnerDir)) {
    const partnerFiles = fs.readdirSync(partnerDir);
    for (const file of partnerFiles) {
      const localPath = `logo_partner/${file}`;
      const publicUrl = await uploadFile(localPath, "partners");
      if (publicUrl) {
        await sql`
          UPDATE trusted_brands
          SET logo_url = ${publicUrl}
          WHERE logo_url = ${`/${localPath}`} OR logo_url = ${localPath}
        `;
      }
    }
  }

  // 4. Founder Photo
  const founderPhotoPath = "profile_founder/revan_photo1.png";
  const founderUrl = await uploadFile(founderPhotoPath, "about");
  if (founderUrl) {
    const [row] = await sql`SELECT value FROM site_settings WHERE key = 'founder'`;
    if (row && row.value) {
      const currentFounder = typeof row.value === "string" ? JSON.parse(row.value) : row.value;
      currentFounder.photo_url = founderUrl;
      currentFounder.photoUrl = founderUrl;
      await sql`
        UPDATE site_settings
        SET value = ${sql.json(currentFounder)}
        WHERE key = 'founder'
      `;
      console.log("Updated founder photo URL in site_settings.");
    }
  }

  console.log("\nImage Migration Complete!");
  await sql.end();
}

seedImages().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
