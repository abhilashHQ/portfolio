import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";

const BASE = "https://abhilash24.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date() },
    { url: `${BASE}/projects`, lastModified: new Date() },
    { url: `${BASE}/writing`, lastModified: new Date() },
    ...getPosts().map((p) => ({ url: `${BASE}/writing/${p.slug}`, lastModified: p.date })),
  ];
}
