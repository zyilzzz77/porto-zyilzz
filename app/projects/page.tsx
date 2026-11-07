import type { Metadata } from "next";
import { ProjectCard } from "@/components/cards/project-card";
import { JsonLd } from "@/components/seo/json-ld";
import { projects } from "@/data/portfolio";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Proyek Web",
  description:
    "Tujuh proyek web karya Haqqi AnnaZili: payment gateway QRIS, platform ekstrakurikuler, temp mail, media pembelajaran sejarah, arsip media, dan utility web.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: pageOpenGraph({
    title: "Proyek Web Haqqi AnnaZili",
    description:
      "Payment gateway QRIS, platform ekstrakurikuler sekolah, layanan temp mail, media pembelajaran sejarah interaktif, arsip media JKT48, dan utility pengunduh video.",
    url: "/projects",
  }),
  twitter: pageTwitter({
    title: "Proyek Web Haqqi AnnaZili",
    description:
      "Tujuh produk web karya Haqqi AnnaZili, dari payment gateway QRIS sampai media pembelajaran sejarah.",
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
        name: "Beranda",
        item: siteUrl.toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Proyek",
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
      "Kumpulan proyek web yang dibangun Haqqi AnnaZili, termasuk payment gateway QRIS, platform ekstrakurikuler, layanan temp mail, media pembelajaran, arsip media, dan utility web.",
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
            Arsip / {String(projects.length).padStart(2, "0")} proyek
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            Proyek web yang saya bangun sendiri.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Tujuh produk web untuk pembayaran, sekolah, email sekali pakai,
            media pembelajaran, arsip media, dan pemrosesan konten.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            exisel.web.id, mailtemps.space, dan Jejak Bangsa bisa dicoba
            langsung. pay.lydev.id butuh akses pemilik, sementara tiga lainnya
            offline sementara karena masa layanan server belum diperpanjang.
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
