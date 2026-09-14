import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Haqqi AnnaZili — Portfolio",
    short_name: "Haqqi AnnaZili",
    description:
      "Portfolio Haqqi AnnaZili, siswa SIJA di SMKN 69 Jakarta yang menekuni web development, programming, dan AI.",
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
