"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

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
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
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
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[0.68rem] text-[var(--text)]"
                aria-label={`Gunakan mode ${
                  theme === "dark" ? "terang" : "gelap"
                }`}
              >
                {theme === "dark" ? "☼" : "◐"}
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
