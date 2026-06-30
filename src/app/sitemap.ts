import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lumibetaworks.id";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/layanan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/layanan/website`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/layanan/aplikasi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/layanan/qa-testing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/layanan/konsultasi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];
}
