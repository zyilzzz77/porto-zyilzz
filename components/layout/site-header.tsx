"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

type Theme = "dark" | "light";

const themeStorageKey = "haqqi-portfolio-theme";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Journey" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    const desktopQuery = window.matchMedia("(min-width: 640px)");
    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, [menuOpen]);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)");

    function readSavedTheme(): Theme | null {
      try {
        const savedTheme = window.localStorage.getItem(themeStorageKey);
        return savedTheme === "dark" || savedTheme === "light"
          ? savedTheme
          : null;
      } catch {
        return null;
      }
    }

    function applySystemTheme(event: MediaQueryListEvent) {
      if (!readSavedTheme()) {
        document.documentElement.dataset.theme = event.matches
          ? "light"
          : "dark";
      }
    }

    function syncThemeAcrossTabs(event: StorageEvent) {
      if (event.key !== themeStorageKey) {
        return;
      }

      const syncedTheme =
        event.newValue === "dark" || event.newValue === "light"
          ? event.newValue
          : systemTheme.matches
            ? "light"
            : "dark";

      document.documentElement.dataset.theme = syncedTheme;
    }

    systemTheme.addEventListener("change", applySystemTheme);
    window.addEventListener("storage", syncThemeAcrossTabs);

    return () => {
      systemTheme.removeEventListener("change", applySystemTheme);
      window.removeEventListener("storage", syncThemeAcrossTabs);
    };
  }, []);

  function toggleTheme() {
    const currentTheme =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // The theme still changes for this visit when storage is unavailable.
    }
  }

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <>
      <header className="absolute inset-x-0 top-4 z-[70] px-4 sm:top-5">
        <div className="mx-auto w-full max-w-[640px] rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-1 shadow-lg shadow-black/10 backdrop-blur-xl sm:w-fit sm:max-w-[calc(100%_-_2rem)]">
          <div className="flex items-center justify-between sm:justify-center sm:gap-1">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--text)] font-mono text-[0.68rem] font-black tracking-[-0.08em] text-[var(--background)] sm:hidden"
              aria-label="Haqqi AnnaZili - Home"
            >
              HA
            </Link>

            <nav
              className="hidden items-center gap-1 sm:flex"
              aria-label="Navigasi utama"
            >
              {navigation.slice(0, -1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-[0.8rem] transition ${
                    isActive(item.href)
                      ? "bg-[var(--surface-strong)] text-[var(--text)]"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <Link
                href="/contact"
                className="hidden rounded-full bg-[var(--text)] px-3.5 py-1.5 text-[0.8rem] font-semibold text-[var(--background)] sm:block"
              >
                Contact
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Ganti tema terang atau gelap"
                title="Ganti tema"
              >
                <svg
                  className="theme-toggle-icon theme-toggle-sun"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="3.25" />
                  <path d="M12 2.25v2M12 19.75v2M2.25 12h2M19.75 12h2M5.1 5.1l1.4 1.4M17.5 17.5l1.4 1.4M18.9 5.1l-1.4 1.4M6.5 17.5l-1.4 1.4" />
                </svg>
                <svg
                  className="theme-toggle-icon theme-toggle-moon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.1 15.25A8.55 8.55 0 0 1 8.75 3.9a8.6 8.6 0 1 0 11.35 11.35Z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-sm sm:hidden"
                aria-label={
                  menuOpen ? "Tutup navigasi" : "Buka navigasi"
                }
                aria-controls="mobile-navigation"
                aria-expanded={menuOpen}
              >
                {menuOpen ? "×" : "≡"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu-backdrop sm:hidden ${
          menuOpen ? "is-open" : ""
        }`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      <aside
        id="mobile-navigation"
        className={`mobile-menu-panel sm:hidden ${
          menuOpen ? "is-open" : ""
        }`}
        aria-hidden={!menuOpen}
        aria-label="Navigasi mobile"
        aria-modal={menuOpen ? true : undefined}
        role="dialog"
      >
        <div className="mobile-menu-heading">
          <div>
            <p className="eyebrow">Navigate</p>
            <p>Haqqi AnnaZili</p>
          </div>
          <span>{String(navigation.length).padStart(2, "0")} pages</span>
        </div>

        <nav className="mobile-menu-links" aria-label="Navigasi mobile utama">
          {navigation.map((item, index) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                className={active ? "is-active" : ""}
                aria-current={active ? "page" : undefined}
              >
                <span className="mobile-menu-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
                <span className="mobile-menu-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mobile-menu-footer">
          <a
            href={profile.instagram.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={menuOpen ? 0 : -1}
          >
            Instagram {profile.instagram.handle}
            <span aria-hidden="true">↗</span>
          </a>
          <span>{profile.location}</span>
        </div>
      </aside>
    </>
  );
}
