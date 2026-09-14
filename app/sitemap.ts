import type { MetadataRoute } from "next";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { getSiteUrl } from "@/lib/site-url";

export const revalidate = 86400;

const routes = [
  { path: "/", priority: 1, changeFrequency: "daily" as const },
  {
    path: "/experience/smkn-69-jakarta",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/experience", priority: 0.8, changeFrequency: "monthly" as const },
  {
    path: "/certificates",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = getContentUpdatedAt();

  return routes.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.path === "/experience/smkn-69-jakarta"
      ? {
          images: [
            new URL(
              "/school/smkn-69-jakarta-campus.webp",
              siteUrl,
            ).toString(),
          ],
        }
      : {}),
  }));
}
