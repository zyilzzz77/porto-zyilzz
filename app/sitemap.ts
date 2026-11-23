import type { MetadataRoute } from "next";
import { creativeWorks } from "@/data/creative";
import { certificates, projects } from "@/data/portfolio";
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
  { path: "/creative", priority: 0.8, changeFrequency: "monthly" as const },
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
  const creativeImages = [
    "/creative/creative-banner.jpg",
    ...creativeWorks.flatMap((work) => work.images.map((image) => image.src)),
  ].map((image) => new URL(image, siteUrl).toString());
  const projectImages = projects
    .flatMap((project) => (project.image ? [project.image] : []))
    .map((image) => new URL(image, siteUrl).toString());
  const certificateImages = certificates.map((certificate) =>
    new URL(certificate.image, siteUrl).toString(),
  );

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
    ...(route.path === "/creative" ? { images: creativeImages } : {}),
    ...(route.path === "/projects" ? { images: projectImages } : {}),
    ...(route.path === "/certificates" ? { images: certificateImages } : {}),
  }));
}
