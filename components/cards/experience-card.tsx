import Link from "next/link";
import type { Experience } from "@/types";

type ExperienceCardProps = {
  experience: Experience;
  compact?: boolean;
  index?: number;
};

function ExperienceIdentity({ experience }: { experience: Experience }) {
  return (
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
  );
}

export function ExperienceCard({
  experience,
  compact = false,
  index = 0,
}: ExperienceCardProps) {
  const number = String(index + 1).padStart(2, "0");

  if (compact) {
    return (
      <article className="journey-card" data-scroll-reveal>
        <div className="flex items-center justify-between gap-4">
          <span className="journey-index" aria-hidden="true">
            {number}
          </span>
          <time className="font-mono text-[0.68rem] text-[var(--muted)]">
            {experience.period}
          </time>
        </div>

        <div className="mt-7">
          <ExperienceIdentity experience={experience} />
        </div>

        <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
          {experience.description}
        </p>

        {experience.href && (
          <Link href={experience.href} className="journey-detail-link">
            Lihat profil sekolah <span aria-hidden="true">↗</span>
          </Link>
        )}
      </article>
    );
  }

  return (
    <article className="experience-timeline-item" data-scroll-reveal>
      <time className="experience-time-desktop">{experience.period}</time>

      <div className="experience-timeline-marker" aria-hidden="true">
        <span>{number}</span>
      </div>

      <div className="experience-detail-card">
        <time className="experience-time-mobile">{experience.period}</time>
        <ExperienceIdentity experience={experience} />

        <p className="mt-5 max-w-2xl leading-7 text-[var(--muted)]">
          {experience.description}
        </p>

        <ul className="experience-highlights">
          {experience.highlights.map((highlight) => (
            <li key={highlight}>
              <span aria-hidden="true">↳</span>
              {highlight}
            </li>
          ))}
        </ul>

        {experience.href && (
          <Link href={experience.href} className="journey-detail-link">
            Lihat profil lengkap SMKN 69 Jakarta{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
    </article>
  );
}
