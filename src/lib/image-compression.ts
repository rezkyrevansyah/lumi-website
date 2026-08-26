/**
 * Client-side image compression and optimization utility.
 * - Resizes images to max bounds (default 1920x1080)
 * - Preserves transparency for PNG/WebP/SVG logos
 * - Converts raster images to high-efficiency WebP with quality 0.88-0.90
 * - Reduces multi-megabyte files to lightweight WebP/PNG while maintaining crisp logo sharpness
 */

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
  previewUrl: string;
}

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export async function compressAndOptimizeImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const { maxWidth = 1920, maxHeight = 1080, quality = 0.88 } = options;

  // SVG images are already scalable vectors, no canvas rasterization needed
  if (file.type === "image/svg+xml") {
    const previewUrl = URL.createObjectURL(file);
    return {
      file,
      originalSize: file.size,
      compressedSize: file.size,
      width: 1920,
      height: 1080,
      previewUrl,
    };
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      // Maintain aspect ratio within bounding box
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d", { willReadFrequently: false });
      if (!ctx) {
        const previewUrl = URL.createObjectURL(file);
        return resolve({
          file,
          originalSize: file.size,
          compressedSize: file.size,
          width,
          height,
          previewUrl,
        });
      }

      // Enable high-quality smoothing for sharp logo edges
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      // Prefer WebP for optimal compression with full alpha channel support
      const outputType = "image/webp";

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            const previewUrl = URL.createObjectURL(file);
            return resolve({
              file,
              originalSize: file.size,
              compressedSize: file.size,
              width,
              height,
              previewUrl,
            });
          }

          const originalBaseName =
            file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
          const cleanBaseName = originalBaseName
            .toLowerCase()
            .replace(/[^a-z0-9_-]/g, "_");
          const newFileName = `${cleanBaseName}.webp`;

          const compressedFile = new File([blob], newFileName, {
            type: outputType,
            lastModified: Date.now(),
          });

          const previewUrl = URL.createObjectURL(compressedFile);

          resolve({
            file: compressedFile,
            originalSize: file.size,
            compressedSize: compressedFile.size,
            width,
            height,
            previewUrl,
          });
        },
        outputType,
        quality
      );
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(objectUrl);
      reject(error);
    };

    img.src = objectUrl;
  });
}

/**
 * Format bytes into human readable string (e.g. 1.2 MB or 145 KB)
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Formats a raw file name into a clean Brand Name.
 * e.g. "pt_telkom_indonesia_logo_1920x1080.png" -> "PT Telkom Indonesia"
 */
export function formatBrandNameFromFilename(filename: string): string {
  let name = filename.substring(0, filename.lastIndexOf(".")) || filename;
  name = name
    .replace(/[_-]/g, " ")
    .replace(/\b(logo|brand|1920x1080|1080p|hd|transparent|vector)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!name) return "New Brand";

  // Capitalize words
  return name
    .split(" ")
    .map((w) => {
      if (["pt", "cv", "tbk", "ri", "ui", "ux", "it", "bumn"].includes(w.toLowerCase())) {
        return w.toUpperCase();
      }
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}
