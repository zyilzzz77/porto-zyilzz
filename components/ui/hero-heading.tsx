"use client";

import { useSyncExternalStore } from "react";
import { Typewriter } from "@/components/ui/typewriter";

const FIRST_VISIT_KEY = "haqqi-portfolio-hero-seen";

const FULL_NAME = "Haqqi AnnaZili";
const TAGLINES = [
  "Full Stack Developer",
  "AI Explorer",
  "Product Thinker",
  "Cloud Learner",
];

const subscribe = () => () => {};

type VisitState = "loading" | "first" | "returning";

function getClientSnapshot(): VisitState {
  try {
    if (window.sessionStorage.getItem(FIRST_VISIT_KEY) === null) {
      window.sessionStorage.setItem(FIRST_VISIT_KEY, "1");
      return "first";
    }
    return "returning";
  } catch {
    return "first";
  }
}

function getServerSnapshot(): VisitState {
  return "loading";
}

export function HeroHeading() {
  const visitState = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (visitState === "loading") {
    return (
      <h1 className="hero-title max-w-5xl text-balance font-semibold text-[var(--text)]">
        Hi, I&apos;m Haqqi AnnaZili
        <span className="text-[var(--muted)]">
          {" "}
          — Full Stack Developer / AI Explorer.
        </span>
      </h1>
    );
  }

  if (visitState === "first") {
    return (
      <h1 className="hero-title max-w-5xl text-balance font-semibold text-[var(--text)]">
        <span className="text-[var(--muted)]">Hi, I&apos;m </span>
        <Typewriter
          words={[FULL_NAME, ...TAGLINES.map((t) => `${FULL_NAME} — ${t}`)]}
          typeSpeed={85}
          deleteSpeed={32}
          holdDuration={1600}
        />
        <span className="text-[var(--muted)]">.</span>
      </h1>
    );
  }

  return (
    <h1 className="hero-title max-w-5xl text-balance font-semibold text-[var(--text)]">
      Hi, I&apos;m Haqqi AnnaZili
      <span className="text-[var(--muted)]">
        {" "}
        —{" "}
        <Typewriter
          words={TAGLINES}
          typeSpeed={70}
          deleteSpeed={36}
          holdDuration={1500}
          className="text-[var(--text)]"
        />
        .
      </span>
    </h1>
  );
}
