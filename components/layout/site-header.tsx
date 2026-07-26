"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/data/portfolio";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Journey" },
  { href: "/certificates", label: "Certificates" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }

  return (
    <header className="absolute inset-x-0 top-4 z-50 px-4 sm:top-5">
      <div className="mx-auto w-full max-w-[640px] rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-1 shadow-lg shadow-black/10 backdrop-blur-xl sm:w-fit sm:max-w-[calc(100%_-_2rem)]">
        <div className="flex items-center justify-between sm:justify-center sm:gap-1">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--text)] font-mono text-[0.68rem] font-black tracking-[-0.08em] text-[var(--background)] sm:hidden"
            aria-label="Haqqi AnnaZili - Home"
          >
            HA
          </Link>

          <nav className="hidden items-center gap-1 sm:flex" aria-label="Navigasi utama">
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-[0.8rem] transition ${
                    active
                      ? "bg-[var(--surface-strong)] text-[var(--text)]"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
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
              aria-label={`Gunakan mode ${theme === "dark" ? "terang" : "gelap"}`}
            >
              {theme === "dark" ? "☼" : "◐"}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-xs sm:hidden"
              aria-label="Buka navigasi"
              aria-expanded={menuOpen}
            >
              {menuOpen ? "×" : "≡"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mt-2 grid gap-1 border-t border-[var(--line)] px-2 pb-2 pt-3 sm:hidden">
            <a
              href={profile.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-3 py-3 font-mono text-sm text-[var(--accent)]"
            >
              Instagram {profile.instagram.handle} ↗
            </a>
            {[...navigation, { href: "/contact", label: "Contact" }].map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm text-[var(--soft)] hover:bg-[var(--surface-strong)]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
