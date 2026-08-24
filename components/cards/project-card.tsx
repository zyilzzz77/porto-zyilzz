import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

const statusClass = {
  Live: "bg-emerald-400",
  Building: "bg-amber-300",
  Exploration: "bg-sky-300",
  "Temporarily Offline": "bg-zinc-400",
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <article className="card group" data-scroll-reveal>
      <div className="card-media">
        <span className="absolute left-5 top-5 z-10 font-mono text-xs text-[var(--muted)]">
          0{index + 1} / {project.category}
        </span>
        <div className="project-window" aria-hidden="true">
          <div className="project-line accent" />
          <div className="project-line w-4/5" />
          <div className="project-line w-2/3" />
        </div>
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="break-words text-xl font-semibold tracking-[-0.025em]">
            {project.title}
          </h3>
          <span className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--line)] px-2.5 py-1 text-[0.68rem] text-[var(--muted)]">
            <span
              className={`h-1.5 w-1.5 rounded-full ${statusClass[project.status]}`}
            />
            {project.status}
          </span>
        </div>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          {project.description}
        </p>
        {project.availabilityNote ? (
          <p className="mt-4 border-l border-[var(--line)] pl-3 text-xs leading-5 text-[var(--muted)]">
            {project.availabilityNote}
          </p>
        ) : null}
        <div className="mt-6 flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((item) => (
              <span className="skill-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 text-sm font-semibold text-[var(--soft)] transition hover:text-[var(--text)]"
              aria-label={`Kunjungi ${project.title}`}
            >
              Kunjungi <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
