import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

const statusClass = {
  Live: "bg-emerald-400",
  Building: "bg-amber-300",
  Exploration: "bg-sky-300",
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <article className="card group">
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
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-[-0.025em]">
            {project.title}
          </h3>
          <span className="flex shrink-0 items-center gap-2 text-xs text-[var(--muted)]">
            <span className={`h-1.5 w-1.5 rounded-full ${statusClass[project.status]}`} />
            {project.status}
          </span>
        </div>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span className="skill-chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
