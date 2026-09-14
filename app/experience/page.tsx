import type { Metadata } from "next";
import { ExperienceCard } from "@/components/cards/experience-card";
import { JsonLd } from "@/components/seo/json-ld";
import { experiences } from "@/data/portfolio";
import { Typewriter } from "@/components/ui/typewriter";
import { ogImage } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Journey & Pendidikan",
  description:
    "Perjalanan pendidikan Haqqi AnnaZili sebagai siswa SIJA di SMKN 69 Jakarta serta pengalaman belajar full-stack development dan AI.",
  alternates: {
    canonical: "/experience",
  },
  keywords: [
    "pengalaman Haqqi AnnaZili",
    "pendidikan Haqqi AnnaZili",
    "SMKN 69 Jakarta",
    "SIJA SMKN 69 Jakarta",
  ],
  openGraph: {
    title: "Journey & Pendidikan Haqqi AnnaZili",
    description:
      "Perjalanan Haqqi AnnaZili di SMKN 69 Jakarta, full-stack development, dan pembelajaran AI.",
    type: "website",
    url: "/experience",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journey & Pendidikan Haqqi AnnaZili",
    description:
      "Perjalanan Haqqi AnnaZili sebagai siswa SIJA di SMKN 69 Jakarta, full-stack development, dan pembelajaran AI.",
    images: [ogImage.url],
  },
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
        name: "Home",
        item: siteUrl.toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journey",
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
            <p className="eyebrow">Journey / Learning in public</p>
            <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
              Perjalanan yang
              <span className="text-[var(--muted)]">
                {" "}
                <Typewriter
                  words={[
                    "terus bertumbuh.",
                    "tak pernah final.",
                    "bisa dilalui.",
                    "penuh rasa ingin tahu.",
                  ]}
                  className="text-[var(--text)]"
                />
              </span>
            </h1>
          </div>

          <div className="experience-summary">
            <p className="text-lg leading-8 text-[var(--muted)]">
              Saya percaya kemampuan terbaik tumbuh dari rasa ingin tahu,
              latihan konsisten, dan keberanian untuk merilis sesuatu.
            </p>
            <div className="experience-stats">
              <div>
                <strong>{String(experiences.length).padStart(2, "0")}</strong>
                <span>Milestones</span>
              </div>
              <div>
                <strong>2025—Now</strong>
                <span>Active journey</span>
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
