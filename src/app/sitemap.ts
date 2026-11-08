import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "monthly"],
    ["/about-freedom", 0.9, "yearly"],
    ["/pricing-and-inquiries", 0.9, "monthly"],
    ["/experience-the-bvi", 0.8, "yearly"],
    ["/trip-resources", 0.6, "yearly"],
    ["/faq", 0.8, "monthly"],
    ["/gallery", 0.7, "weekly"],
    ["/privacy-policy", 0.1, "yearly"],
    ["/terms", 0.1, "yearly"],
  ];
  return pages.map(([p, priority, changeFrequency]) => ({ url: `${SITE.domain}${p}`, lastModified: now, priority, changeFrequency }));
}
