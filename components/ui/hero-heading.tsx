import { WordRotator } from "@/components/ui/word-rotator";

const TAGLINES = [
  "Full Stack Developer",
  "AI Explorer",
  "Product Thinker",
  "Cloud Learner",
];

export function HeroHeading() {
  return (
    <h1 className="hero-title max-w-5xl text-balance font-semibold text-[var(--text)]">
      Hi, I&apos;m Haqqi AnnaZili
      <span className="text-[var(--muted)]">
        {" "}
        —{" "}
        <WordRotator words={TAGLINES} className="text-[var(--text)]" />
        .
      </span>
    </h1>
  );
}
