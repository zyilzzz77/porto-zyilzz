import type { Metadata } from "next";
import { ExperienceCard } from "@/components/cards/experience-card";
import { experiences } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Journey",
  description: "Perjalanan belajar dan membangun Haqqi AnnaZili.",
};

export default function ExperiencePage() {
  return (
    <section className="section-pad pt-36 sm:pt-44">
      <div className="content-wrap">
        <p className="eyebrow">Journey / Learning in public</p>
        <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
          Perjalanan yang
          <span className="text-[var(--muted)]"> terus bertumbuh.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Saya percaya kemampuan terbaik tumbuh dari rasa ingin tahu, latihan
          konsisten, dan keberanian untuk merilis sesuatu.
        </p>

        <div className="mt-14 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.title} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}
