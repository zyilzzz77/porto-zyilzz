import type { Metadata } from "next";
import Link from "next/link";
import { CertificateCard } from "@/components/cards/certificate-card";
import { ExperienceCard } from "@/components/cards/experience-card";
import { ProjectCard } from "@/components/cards/project-card";
import { GitHubActivity } from "@/components/github/github-activity";
import { JsonLd } from "@/components/seo/json-ld";
import { TechStack } from "@/components/tech/tech-stack";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  certificates,
  experiences,
  profile,
  projects,
  technologies,
} from "@/data/portfolio";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute: "Haqqi AnnaZili — Full Stack Developer & AI Explorer",
  },
  description:
    "Portfolio resmi Haqqi AnnaZili, Full Stack Developer dan AI Explorer dari Jakarta serta siswa SIJA di SMKN 69 Jakarta.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Haqqi AnnaZili",
    "Haqqi Annazili",
    "Haqqi Anna Zili",
    "portfolio Haqqi AnnaZili",
    "developer Jakarta",
    "siswa SIJA SMKN 69 Jakarta",
  ],
  openGraph: {
    title: "Haqqi AnnaZili — Full Stack Developer & AI Explorer",
    description:
      "Portfolio resmi Haqqi AnnaZili tentang pengembangan web, AI, proyek, sertifikat, dan perjalanan di SMKN 69 Jakarta.",
    type: "website",
    url: "/",
  },
};

export default function Home() {
  const siteUrl = getSiteUrl();
  const personId = new URL("/#person", siteUrl).toString();
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: ["Haqqi Annazili", "Haqqi Anna Zili", profile.github.handle],
    url: siteUrl.toString(),
    image: new URL("/og.png", siteUrl).toString(),
    jobTitle: "Full Stack Developer & AI Explorer",
    description:
      "Haqqi AnnaZili adalah Full Stack Developer dan AI Explorer dari Jakarta yang mempelajari SIJA di SMKN 69 Jakarta.",
    email: `mailto:${profile.email}`,
    sameAs: [profile.github.url, profile.instagram.url],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    affiliation: {
      "@type": "EducationalOrganization",
      name: "SMK Negeri 69 Jakarta",
      alternateName: "SMKN 69 Jakarta",
      url: "https://www.smkn69jkt.sch.id/",
    },
    knowsAbout: technologies.map((technology) => technology.name),
  };
  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": new URL("/#profile-page", siteUrl).toString(),
    url: siteUrl.toString(),
    name: "Portfolio Haqqi AnnaZili",
    description:
      "Profil, proyek, sertifikat, dan perjalanan belajar Haqqi AnnaZili.",
    dateModified: "2026-07-26",
    mainEntity: {
      "@id": personId,
    },
  };

  return (
    <>
      <JsonLd data={[personJsonLd, profilePageJsonLd]} />
      <section className="hero-section section-pad">
        <div className="content-wrap relative">
          <a
            href={profile.github.url}
            target="_blank"
            rel="noreferrer"
            className="hero-avatar"
            data-scroll-reveal
            aria-label={`GitHub ${profile.github.handle}`}
          >
            {/* Public GitHub avatar is served directly to avoid image proxy issues. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github.com/zyilzzz77.png?size=200"
              alt="Foto profil Haqqi AnnaZili"
              width={120}
              height={120}
            />
          </a>

          <h1
            className="hero-title max-w-5xl text-balance font-semibold text-[var(--text)]"
            data-scroll-reveal
          >
            Hi, I&apos;m Haqqi AnnaZili
            <span className="text-[var(--muted)]">
              {" "}
              — Full Stack Developer / AI Explorer.
            </span>
          </h1>
          <a
            href={profile.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="hero-instagram"
            data-scroll-reveal
            aria-label={`Buka Instagram ${profile.instagram.handle}`}
          >
            {/* Public Simple Icons asset is served directly. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.simpleicons.org/instagram/E4405F"
              alt=""
              width={18}
              height={18}
            />
            {profile.instagram.handle}
            <span aria-hidden="true">↗</span>
          </a>
          <p
            className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl"
            data-scroll-reveal
          >
            I design and build{" "}
            <span className="font-semibold text-[var(--text)]">
              reliable digital products
            </span>{" "}
            through full-stack engineering and applied AI.
          </p>

          <div className="mt-6 flex flex-wrap gap-3" data-scroll-reveal>
            <a
              href={`mailto:${profile.email}?subject=Permintaan Resume / CV`}
              className="button button-secondary"
            >
              Resume / CV <span aria-hidden="true">↗</span>
            </a>
            <Link href="/contact" className="button button-primary">
              Get in touch <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div
            className="mt-6 flex items-center gap-3 text-sm text-[var(--muted)]"
            data-scroll-reveal
          >
            <a
              href={profile.github.url}
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              GH
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="social-icon"
              aria-label="Email"
            >
              ✉
            </a>
          </div>

          <TechStack />
        </div>
      </section>

      <section className="section-pad">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Selected work"
            title="Produk yang pernah saya bangun."
            description="Tiga aplikasi web pilihan yang mengeksplorasi pengarsipan media, integrasi pembayaran, dan pemrosesan konten digital."
            action={{ href: "/projects", label: "Semua proyek" }}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Journey"
            title="Belajar dengan cara membangun."
            description="Setiap fase memperluas cara saya melihat masalah - dari kode, sistem, hingga dampaknya untuk pengguna."
            action={{ href: "/experience", label: "Lihat perjalanan" }}
          />
          <div className="journey-grid">
            {experiences.slice(0, 3).map((experience, index) => (
              <ExperienceCard
                key={experience.title}
                experience={experience}
                compact
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Credentials"
            title="Pembelajaran yang tervalidasi."
            description="Kursus pilihan yang memperkuat fondasi saya di pemrograman, cloud, machine learning, dan generative AI."
            action={{ href: "/certificates", label: "Semua sertifikat" }}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certificates.slice(0, 3).map((certificate) => (
              <CertificateCard
                key={certificate.slug}
                certificate={certificate}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="content-wrap">
          <div className="cta-panel" data-scroll-reveal>
            <p className="eyebrow">Let&apos;s make something useful</p>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
              Punya ide yang layak diwujudkan?
            </h2>
            <p className="mt-5 max-w-xl text-lg text-[var(--muted)]">
              Saya terbuka untuk kolaborasi, proyek belajar, dan percakapan
              seputar teknologi.
            </p>
            <Link href="/contact" className="button button-primary mt-8">
              Mulai percakapan <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <GitHubActivity />
    </>
  );
}
