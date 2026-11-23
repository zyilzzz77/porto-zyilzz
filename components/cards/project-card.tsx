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

const statusLabel = {
  Live: "Aktif",
  Building: "Dalam Pengerjaan",
  Exploration: "Eksplorasi",
  "Temporarily Offline": "Tidak Aktif Sementara",
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <article className="card group flex flex-col" data-scroll-reveal>
      <div className="card-media">
        {project.image ? (
          <img
            src={project.image}
            alt={`Tangkapan layar ${project.title}: ${project.category}`}
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            className="project-preview"
          />
        ) : (
          <div className="project-window" aria-hidden="true">
            <div className="project-line accent" />
            <div className="project-line w-4/5" />
            <div className="project-line w-2/3" />
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-7">
        <div className="flex min-w-0 flex-col">
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <span className="min-w-0 max-w-full break-words font-mono text-xs text-[var(--muted)]">
              0{index + 1} / {project.category}
            </span>
            <span className="ml-auto flex min-w-0 max-w-full items-center gap-2 rounded-full border border-[var(--line)] px-2.5 py-1 text-[0.68rem] text-[var(--muted)]">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusClass[project.status]}`}
              />
              <span className="min-w-0 break-words">
                {statusLabel[project.status]}
              </span>
            </span>
          </div>
          <h3 className="mt-3 w-full break-words text-lg font-semibold tracking-[-0.025em] sm:text-xl">
            {project.title}
          </h3>
        </div>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
          {project.description}
        </p>
        {project.availabilityNote ? (
          <p className="mt-4 border-l border-[var(--line)] pl-3 text-xs leading-5 text-[var(--muted)]">
            {project.availabilityNote}
          </p>
        ) : null}
        <div className="mt-auto pt-6">
          <div className="flex min-w-0 flex-wrap gap-2">
            {project.tags.map((item) => (
              <span className="skill-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="mt-3 flex min-h-11 justify-end">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center text-sm font-semibold text-[var(--soft)] transition hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text)]"
                aria-label={`Kunjungi ${project.title}`}
              >
                Kunjungi <span className="sr-only">{project.title}</span>{" "}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
