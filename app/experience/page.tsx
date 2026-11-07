import type { Metadata } from "next";
import { ExperienceCard } from "@/components/cards/experience-card";
import { JsonLd } from "@/components/seo/json-ld";
import { experiences } from "@/data/portfolio";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Perjalanan & Pendidikan",
  description:
    "Perjalanan pendidikan Haqqi AnnaZili sebagai siswa SIJA di SMKN 69 Jakarta, plus jalur belajar mandiri di web development dan AI.",
  alternates: {
    canonical: "/experience",
  },
  keywords: [
    "pengalaman Haqqi AnnaZili",
    "pendidikan Haqqi AnnaZili",
    "SMKN 69 Jakarta",
    "SIJA SMKN 69 Jakarta",
  ],
  openGraph: pageOpenGraph({
    title: "Perjalanan & Pendidikan Haqqi AnnaZili",
    description:
      "Perjalanan Haqqi AnnaZili di SMKN 69 Jakarta, proyek mandiri, dan jalur belajar AI.",
    url: "/experience",
  }),
  twitter: pageTwitter({
    title: "Perjalanan & Pendidikan Haqqi AnnaZili",
    description:
      "Perjalanan Haqqi AnnaZili sebagai siswa SIJA di SMKN 69 Jakarta, proyek mandiri, dan jalur belajar AI.",
  }),
};

export default function ExperiencePage() {
  const siteUrl = getSiteUrl();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: siteUrl.toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Perjalanan",
        item: new URL("/experience", siteUrl).toString(),
      },
    ],
  };

  return (
    <section className="experience-page section-pad pt-28 sm:pt-36">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="content-wrap">
        <div className="experience-page-hero" data-scroll-reveal>
          <div>
            <p className="eyebrow">Perjalanan / Belajar sambil membangun</p>
            <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
              Perjalanan belajar yang masih berjalan.
            </h1>
          </div>

          <div className="experience-summary">
            <p className="text-lg leading-8 text-[var(--muted)]">
              Tiga fase ini yang paling mengubah cara saya bekerja: sekolah
              kejuruan, proyek mandiri, dan jalur belajar AI. Tidak ada yang
              selesai, tapi semuanya bisa ditunjukkan.
            </p>
            <div className="experience-stats">
              <div>
                <strong>{String(experiences.length).padStart(2, "0")}</strong>
                <span>Tahap</span>
              </div>
              <div>
                <strong>2025</strong>
                <span>Sampai sekarang</span>
              </div>
            </div>
          </div>
        </div>

        <div className="experience-timeline">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.title}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
