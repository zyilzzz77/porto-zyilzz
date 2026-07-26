import { technologies } from "@/data/portfolio";

export function TechStack() {
  return (
    <div className="mt-28">
      <div className="flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <a
            key={technology.name}
            href={technology.href}
            target="_blank"
            rel="noreferrer"
            className="tech-tile"
            aria-label={`${technology.name} - buka situs resmi`}
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
      </div>
    </div>
  );
}
