"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type RouteTransitionProps = {
  children: React.ReactNode;
};

const EXIT_DURATION = 180;

export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navigating = useRef(false);
  const navigationTimer = useRef<number | null>(null);
  const safetyTimer = useRef<number | null>(null);

  useEffect(() => {
    const body = document.body;
    navigating.current = false;
    body.classList.remove("is-route-leaving");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      body.classList.add("is-route-entering");

      const firstFrame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          body.classList.remove("is-route-entering");
        });
      });

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });

      return () => {
        window.cancelAnimationFrame(firstFrame);
        body.classList.remove("is-route-entering");
      };
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observedElements = new Set<HTMLElement>();
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "is-scroll-visible",
            entry.isIntersecting,
          );
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.14,
      },
    );

    function registerRevealElements() {
      const staggerGroups = document.querySelectorAll<HTMLElement>(
        "[data-scroll-reveal-stagger]",
      );

      staggerGroups.forEach((group) => {
        const children = group.querySelectorAll<HTMLElement>(
          "[data-scroll-reveal]",
        );
        children.forEach((child, index) => {
          child.style.setProperty(
            "--scroll-reveal-index",
            String(Math.min(index, 3)),
          );
        });
      });

      const elements = document.querySelectorAll<HTMLElement>(
        "[data-scroll-reveal]",
      );

      elements.forEach((element, index) => {
        if (observedElements.has(element)) {
          return;
        }

        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) {
          element.classList.add("is-scroll-visible");
        }

        if (!element.style.getPropertyValue("--scroll-reveal-delay")) {
          const inStaggerGroup = !!element.closest<HTMLElement>(
            "[data-scroll-reveal-stagger]",
          );
          if (!inStaggerGroup) {
            element.style.setProperty(
              "--scroll-reveal-delay",
              `${Math.min(index % 4, 3) * 45}ms`,
            );
          }
        }
        element.classList.add("scroll-reveal");
        observedElements.add(element);
        revealObserver.observe(element);
      });
    }

    registerRevealElements();

    const mutationObserver = new MutationObserver(registerRevealElements);
    const main = document.querySelector("main");

    if (main) {
      mutationObserver.observe(main, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();

      observedElements.forEach((element) => {
        element.classList.remove("scroll-reveal", "is-scroll-visible");
        element.style.removeProperty("--scroll-reveal-delay");
      });
    };
  }, [pathname]);

  useEffect(() => {
    function handleInternalNavigation(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);

      if (
        destination.origin !== current.origin ||
        destination.pathname === current.pathname ||
        navigating.current
      ) {
        return;
      }

      event.preventDefault();

      const nextRoute = `${destination.pathname}${destination.search}${destination.hash}`;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        router.push(nextRoute);
        return;
      }

      navigating.current = true;
      document.body.classList.add("is-route-leaving");

      navigationTimer.current = window.setTimeout(() => {
        router.push(nextRoute);
      }, EXIT_DURATION);

      safetyTimer.current = window.setTimeout(() => {
        navigating.current = false;
        document.body.classList.remove("is-route-leaving");
      }, 1800);
    }

    document.addEventListener("click", handleInternalNavigation, true);

    return () => {
      document.removeEventListener("click", handleInternalNavigation, true);

      if (navigationTimer.current !== null) {
        window.clearTimeout(navigationTimer.current);
      }

      if (safetyTimer.current !== null) {
        window.clearTimeout(safetyTimer.current);
      }
    };
  }, [router]);

  return <div className="page-stage">{children}</div>;
}
