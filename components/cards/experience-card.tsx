import type { Experience } from "@/types";

type ExperienceCardProps = {
  experience: Experience;
  compact?: boolean;
};

export function ExperienceCard({
  experience,
  compact = false,
}: ExperienceCardProps) {
  return (
    <article className="grid gap-4 py-7 sm:grid-cols-[150px_1fr]">
      <p className="font-mono text-xs leading-6 text-[var(--muted)]">
        {experience.period}
      </p>
      <div>
        <div className="flex items-center gap-3">
          {experience.logo && (
            <span className="experience-logo">
              {/* Use the original school logo without image optimization. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={experience.logo}
                alt={experience.logoAlt ?? experience.organization}
                width={44}
                height={56}
              />
            </span>
          )}
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.025em]">
              {experience.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--soft)]">
              {experience.organization}
            </p>
          </div>
        </div>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          {experience.description}
        </p>
        {!compact && (
          <ul className="mt-5 space-y-2 text-sm text-[var(--soft)]">
            {experience.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="text-[var(--accent)]">↳</span>
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
