"use client";

import { useEffect, useRef, useState } from "react";

type WordRotatorProps = {
  words: string[];
  intervalMs?: number;
  fadeMs?: number;
  className?: string;
};

export function WordRotator({
  words,
  intervalMs = 2600,
  fadeMs = 220,
  className,
}: WordRotatorProps) {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (words.length < 2) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, [words]);

  useEffect(() => {
    if (!isActive || words.length < 2) return;

    let swapTimeout: number;

    const holdTimeout = window.setInterval(() => {
      setIsFading(true);
      swapTimeout = window.setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setIsFading(false);
      }, fadeMs);
    }, intervalMs);

    return () => {
      window.clearInterval(holdTimeout);
      window.clearTimeout(swapTimeout);
    };
  }, [isActive, words, intervalMs, fadeMs]);

  return (
    <span
      ref={containerRef}
      className={`word-rotator${isFading ? " is-fading" : ""}${
        className ? ` ${className}` : ""
      }`}
      aria-label={words.join(", ")}
    >
      <span aria-hidden="true">{words[index] ?? ""}</span>
    </span>
  );
}
