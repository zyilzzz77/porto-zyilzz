import type { Metadata } from "next";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description: "Hubungi Haqqi AnnaZili untuk kolaborasi dan percakapan.",
};

export default function ContactPage() {
  return (
    <section className="section-pad flex min-h-[82vh] items-center pt-36">
      <div className="content-wrap">
        <div className="cta-panel">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            Mari mengubah ide
            <span className="text-[var(--muted)]"> menjadi sesuatu.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Terbuka untuk kolaborasi, proyek belajar, peluang, atau sekadar
            bertukar ide tentang teknologi dan AI.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="button button-primary mt-9"
          >
            Kirim email <span aria-hidden="true">↗</span>
          </a>
          <div className="mt-14 border-t border-[var(--line)] pt-6">
            <p className="text-sm text-[var(--muted)]">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 inline-block text-lg font-semibold hover:text-[var(--accent)]"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
