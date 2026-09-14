import Link from "next/link";
import { profile } from "@/data/portfolio";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] py-8">
      <div className="content-wrap flex flex-col gap-4 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} Haqqi AnnaZili. Built with intention.</p>
        <div className="flex gap-5">
          <a
            href={profile.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--text)]"
          >
            Instagram
          </a>
          <a
            href={profile.github.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--text)]"
          >
            GitHub
          </a>
          <Link href="/projects" className="hover:text-[var(--text)]">
            Projects
          </Link>
          <Link href="/certificates" className="hover:text-[var(--text)]">
            Certificates
          </Link>
          <Link href="/contact" className="hover:text-[var(--text)]">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
