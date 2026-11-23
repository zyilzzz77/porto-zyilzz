import type { Metadata } from "next";
import { ExperienceCard } from "@/components/cards/experience-card";
import { JsonLd } from "@/components/seo/json-ld";
import { experiences } from "@/data/portfolio";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Perjalanan & Pendidikan",
  description:
    "Perjalanan pendidikan Haqqi AnnaZili sebagai siswa SIJA di SMKN 69 Jakarta, serta jalur belajar mandiri di pengembangan web dan AI.",
  alternates: {
    canonical: "/experience",
  },
  keywords: [
    "pengalaman Haqqi AnnaZili",
    "pendidikan Haqqi AnnaZili",
    "jalur belajar mandiri",
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
  const pageUrl = new URL("/experience", siteUrl).toString();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Perjalanan belajar Haqqi AnnaZili",
    description:
      "Tahapan pendidikan formal dan jalur belajar mandiri Haqqi AnnaZili di SMKN 69 Jakarta.",
    inLanguage: "id-ID",
    dateModified: getContentUpdatedAt().toISOString(),
    isPartOf: {
      "@id": new URL("/#website", siteUrl).toString(),
    },
    about: {
      "@id": new URL("/#person", siteUrl).toString(),
    },
    mainEntity: {
      "@type": "ItemList",
      "@id": `${pageUrl}#itemlist`,
      name: "Tahapan belajar Haqqi AnnaZili",
      numberOfItems: experiences.length,
      itemListElement: experiences.map((experience, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${experience.title} — ${experience.organization}`,
        description: experience.description,
        ...(experience.href
          ? { url: new URL(experience.href, siteUrl).toString() }
          : {}),
      })),
    },
  };

  return (
    <section className="experience-page section-pad pt-28 sm:pt-36">
      <JsonLd data={[breadcrumbJsonLd, collectionJsonLd]} />
      <div className="content-wrap">
        <div className="experience-page-hero" data-scroll-reveal>
          <div>
            <p className="eyebrow">Perjalanan / Belajar sambil membangun</p>
            <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
              Perjalanan belajar yang masih berlangsung.
            </h1>
          </div>

          <div className="experience-summary">
            <p className="text-lg leading-8 text-[var(--muted)]">
              Beberapa tahap ini yang paling membentuk cara saya bekerja:
              sekolah kejuruan, proyek mandiri, jalur belajar AI, dan praktik
              jaringan. Tidak ada yang benar-benar selesai, tetapi semuanya
              dapat ditunjukkan.
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

        <h2 className="mt-14 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Pendidikan dan jalur belajar
        </h2>
        <div className="experience-timeline mt-2">
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
