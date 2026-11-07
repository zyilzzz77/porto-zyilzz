import { technologies } from "@/data/portfolio";

type SkillIconProps = {
  className?: string;
};

function CameraIcon({ className }: SkillIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7l1.4-2h5.2L16 7" />
      <circle cx="12" cy="13.5" r="3.2" />
    </svg>
  );
}

function VideoIcon({ className }: SkillIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="7" width="12.5" height="10" rx="2" />
      <path d="M15 11l5.5-2.8v7.6L15 13" />
    </svg>
  );
}

function CanvaIcon({ className }: SkillIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00C4CC"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M16.4 8.8a5.2 5.2 0 1 0 0 6.4" />
    </svg>
  );
}

function CapCutIcon({ className }: SkillIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8.5h18v10.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19V8.5Z" />
      <path d="M3 8.5l1.8-3.5h4.3L7.3 8.5M10.7 8.5l1.8-3.5h4.3l-1.8 3.5" />
    </svg>
  );
}

const creativeSkills = [
  { name: "Fotografi", icon: CameraIcon },
  { name: "Videografi", icon: VideoIcon },
  { name: "Canva", icon: CanvaIcon },
  { name: "CapCut", icon: CapCutIcon },
];

export function TechStack() {
  return (
    <div className="mt-8">
      <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--muted)]">
        Keahlian saya
      </p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <a
            key={technology.name}
            href={technology.href}
            target="_blank"
            rel="noreferrer"
            className="tech-tile"
            data-scroll-reveal
            aria-label={`${technology.name}: buka situs resmi`}
          >
            <span
              className={`tech-icon ${
                "monochrome" in technology && technology.monochrome
                  ? "tech-icon-monochrome"
                  : ""
              }`}
            >
              {/* External Devicon assets are displayed directly for runtime stability. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={technology.icon}
                alt=""
                width={28}
                height={28}
                loading="lazy"
              />
            </span>
            <span>{technology.name}</span>
          </a>
        ))}

        {creativeSkills.map((skill) => {
          const Icon = skill.icon;

          return (
            <span
              key={skill.name}
              className="tech-tile tech-tile-static"
              data-scroll-reveal
            >
              <span className="tech-icon">
                <Icon className="tech-skill-icon" />
              </span>
              <span>{skill.name}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
