import type { Metadata } from "next";
import { ProjectCard } from "@/components/cards/project-card";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: "Proyek pilihan Haqqi AnnaZili di web, otomasi, dan bot.",
};

export default function ProjectsPage() {
  return (
    <section className="section-pad pt-36 sm:pt-44">
      <div className="content-wrap">
        <p className="eyebrow">Archive / 04 projects</p>
        <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
          Projects <span className="text-[var(--muted)]">& experiments.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Kumpulan produk, otomasi, dan eksplorasi yang saya gunakan untuk
          belajar menyelesaikan masalah secara utuh.
        </p>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
