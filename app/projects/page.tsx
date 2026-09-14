import type { Metadata } from "next";
import { ProjectCard } from "@/components/cards/project-card";
import { JsonLd } from "@/components/seo/json-ld";
import { projects } from "@/data/portfolio";
import { Typewriter } from "@/components/ui/typewriter";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Proyek web Haqqi AnnaZili: exisel.web.id, mailtemps.space, archivejkt48.app, bikinqrisdinamis.app, dan inversave.space.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: pageOpenGraph({
    title: "Projects Haqqi AnnaZili",
    description:
      "Platform ekstrakurikuler sekolah, layanan temp mail, arsip media JKT48, implementasi payment gateway QRIS dinamis, dan utility pengunduh video karya Haqqi AnnaZili.",
    url: "/projects",
  }),
  twitter: pageTwitter({
    title: "Projects Haqqi AnnaZili",
    description:
      "Lima produk web karya Haqqi AnnaZili: exisel.web.id, mailtemps.space, archivejkt48.app, bikinqrisdinamis.app, dan inversave.space.",
  }),
};

export default function ProjectsPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL("/projects", siteUrl).toString();
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
        name: "Projects",
        item: pageUrl,
      },
    ],
  };
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Proyek web Haqqi AnnaZili",
    description:
      "Kumpulan proyek web yang dibangun Haqqi AnnaZili, termasuk platform ekstrakurikuler, layanan temp mail, arsip media, dan integrasi pembayaran.",
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
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        description: project.description,
        ...(project.href ? { url: project.href } : {}),
      })),
    },
  };

  return (
    <section className="section-pad pt-36 sm:pt-44">
      <JsonLd data={[breadcrumbJsonLd, collectionJsonLd]} />
      <div className="content-wrap">
        <div data-scroll-reveal>
          <p className="eyebrow">
            Archive / {String(projects.length).padStart(2, "0")} projects
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            Projects
            <span className="text-[var(--muted)]">
              {" "}
              &{" "}
              <Typewriter
                words={["experiments.", "production.", "learning.", "shipped."]}
                className="text-[var(--text)]"
                startWithFirstWord
              />
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Lima produk web yang saya bangun untuk kebutuhan sekolah, email
            sekali pakai, pengarsipan media, integrasi pembayaran, dan
            pemrosesan konten digital.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            exisel.web.id dan mailtemps.space dapat dicoba langsung. Beberapa
            demo proyek lainnya sedang offline sementara karena masa layanan
            server belum diperpanjang.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
