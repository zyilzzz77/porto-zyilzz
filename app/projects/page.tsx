import type { Metadata } from "next";
import { ProjectCard } from "@/components/cards/project-card";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Proyek web Haqqi AnnaZili: archivejkt48.app, bikinqrisdinamis.app, dan inversave.space.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects Haqqi AnnaZili",
    description:
      "Archive media JKT48, implementasi payment gateway QRIS dinamis, dan utility pengunduh video sosial media karya Haqqi AnnaZili.",
    type: "website",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <section className="section-pad pt-36 sm:pt-44">
      <div className="content-wrap">
        <div data-scroll-reveal>
          <p className="eyebrow">
            Archive / {String(projects.length).padStart(2, "0")} projects
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            Projects <span className="text-[var(--muted)]">& experiments.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Tiga produk web yang saya bangun untuk mengeksplorasi pengarsipan
            media, integrasi pembayaran, dan pemrosesan konten digital.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Seluruh demo sedang offline sementara karena masa layanan server
            belum diperpanjang. Dokumentasi proyek tetap tersedia sebagai
            bagian dari perjalanan pengembangan saya.
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
