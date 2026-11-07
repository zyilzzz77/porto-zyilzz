import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Haqqi AnnaZili Portfolio",
    short_name: "Haqqi AnnaZili",
    description:
      "Portofolio Haqqi AnnaZili, IT support dan web developer di Jakarta.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "id",
    dir: "ltr",
    background_color: "#0b0b0b",
    theme_color: "#0b0b0b",
    categories: ["portfolio", "developer", "education"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
