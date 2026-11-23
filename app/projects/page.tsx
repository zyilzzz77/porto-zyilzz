import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/cards/project-card";
import { JsonLd } from "@/components/seo/json-ld";
import { projects } from "@/data/portfolio";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

const projectsDescription = `${projects.length} proyek web dan lab server Haqqi AnnaZili, meliputi media pembelajaran, payment gateway QRIS, layanan email sementara, dan konfigurasi Debian di VirtualBox.`;

export const metadata: Metadata = {
  title: "Proyek Web & Lab Server",
  description: projectsDescription,
  alternates: {
    canonical: "/projects",
  },
  openGraph: pageOpenGraph({
    title: "Proyek Web & Lab Server Haqqi AnnaZili",
    description: projectsDescription,
    url: "/projects",
  }),
  twitter: pageTwitter({
    title: "Proyek Web & Lab Server Haqqi AnnaZili",
    description: projectsDescription,
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
    name: "Proyek web dan lab server Haqqi AnnaZili",
    description: projectsDescription,
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
      name: "Proyek web dan lab server Haqqi AnnaZili",
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
            Proyek web dan lab server yang saya kerjakan.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Kumpulan {projects.length} proyek untuk pembelajaran sejarah,
            pembayaran, sekolah, email sekali pakai, arsip media, pemrosesan
            konten, dan praktik konfigurasi web server Debian di VirtualBox.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Ular Tangga Sejarah, exisel.web.id, mailtemps.space, dan Jejak
            Bangsa dapat dicoba langsung. pay.lydev.id memerlukan akses
            pemilik. Lab Debian menggunakan mesin virtual tanpa tautan demo
            publik, sedangkan tiga proyek berstatus tidak aktif menunggu
            perpanjangan masa aktif server.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Proyek ini menopang pembelajaran di{" "}
            <Link
              href="/experience/smkn-69-jakarta"
              className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
            >
              SMKN 69 Jakarta
            </Link>
            , dan kredensial terkait tersedia di{" "}
            <Link
              href="/certificates"
              className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
            >
              halaman sertifikat
            </Link>
            . Untuk kolaborasi, silakan{" "}
            <Link
              href="/contact"
              className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
            >
              hubungi saya
            </Link>
            .
          </p>
          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Semua proyek
          </h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
