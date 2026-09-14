"use client";

import { useEffect, useReducer, useRef } from "react";

type TypewriterProps = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdDuration?: number;
  className?: string;
  startWithFirstWord?: boolean;
};

type State = {
  text: string;
  wordIndex: number;
  isDeleting: boolean;
  hasStarted: boolean;
};

type Action =
  | { type: "start" }
  | { type: "tick"; next: string }
  | { type: "word_complete" }
  | { type: "word_cleared" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start":
      return { ...state, hasStarted: true };
    case "tick":
      return { ...state, text: action.next };
    case "word_complete":
      return { ...state, isDeleting: true };
    case "word_cleared":
      return {
        ...state,
        isDeleting: false,
        wordIndex: state.wordIndex + 1,
        text: "",
      };
    default:
      return state;
  }
}

function createInitialState(
  words: string[],
  startWithFirstWord: boolean,
): State {
  return {
    text: startWithFirstWord ? (words[0] ?? "") : "",
    wordIndex: 0,
    isDeleting: false,
    hasStarted: false,
  };
}

export function Typewriter({
  words,
  typeSpeed = 75,
  deleteSpeed = 40,
  holdDuration = 1500,
  className,
  startWithFirstWord = false,
}: TypewriterProps) {
  const [state, dispatch] = useReducer(
    reducer,
    { words, startWithFirstWord },
    (init) => createInitialState(init.words, init.startWithFirstWord),
  );
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (state.hasStarted) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      dispatch({ type: "start" });
      return;
    }

    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) {
      dispatch({ type: "start" });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch({ type: "start" });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, [state.hasStarted]);

  useEffect(() => {
    if (!state.hasStarted || words.length === 0) return;

    const currentWord = words[state.wordIndex % words.length] ?? "";

    if (!state.isDeleting && state.text === currentWord) {
      const timeout = window.setTimeout(
        () => dispatch({ type: "word_complete" }),
        holdDuration,
      );
      return () => window.clearTimeout(timeout);
    }

    if (state.isDeleting && state.text === "") {
      dispatch({ type: "word_cleared" });
      return;
    }

    const delay = state.isDeleting ? deleteSpeed : typeSpeed;
    const next = state.isDeleting
      ? currentWord.slice(0, Math.max(0, state.text.length - 1))
      : currentWord.slice(0, state.text.length + 1);

    const timeout = window.setTimeout(() => {
      dispatch({ type: "tick", next });
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    state.hasStarted,
    state.text,
    state.isDeleting,
    state.wordIndex,
    words,
    typeSpeed,
    deleteSpeed,
    holdDuration,
  ]);

  return (
    <span
      ref={containerRef}
      className={className}
      aria-live="polite"
      aria-label={words.join(", ")}
    >
      <span aria-hidden="true">{state.text}</span>
      {state.hasStarted && (
        <span className="typewriter-caret" aria-hidden="true" />
      )}
    </span>
  );
}
