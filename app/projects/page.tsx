import type { Metadata } from "next";
import { ProjectCard } from "@/components/cards/project-card";
import { JsonLd } from "@/components/seo/json-ld";
import { projects } from "@/data/portfolio";
import { Typewriter } from "@/components/ui/typewriter";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Proyek web Haqqi AnnaZili: exisel.web.id, archivejkt48.app, bikinqrisdinamis.app, dan inversave.space.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects Haqqi AnnaZili",
    description:
      "Platform ekstrakurikuler sekolah, arsip media JKT48, implementasi payment gateway QRIS dinamis, dan utility pengunduh video karya Haqqi AnnaZili.",
    type: "website",
    url: "/projects",
  },
};

export default function ProjectsPage() {
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
        name: "Projects",
        item: new URL("/projects", siteUrl).toString(),
      },
    ],
  };

  return (
    <section className="section-pad pt-36 sm:pt-44">
      <JsonLd data={breadcrumbJsonLd} />
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
              />
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Empat produk web yang saya bangun untuk kebutuhan sekolah,
            pengarsipan media, integrasi pembayaran, dan pemrosesan konten
            digital.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            exisel.web.id dapat dicoba langsung. Beberapa demo proyek lainnya
            sedang offline sementara karena masa layanan server belum
            diperpanjang.
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
