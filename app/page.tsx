import type { Metadata } from "next";
import Link from "next/link";
import { CertificateCard } from "@/components/cards/certificate-card";
import { ExperienceCard } from "@/components/cards/experience-card";
import { ProjectCard } from "@/components/cards/project-card";
import { GitHubActivity } from "@/components/github/github-activity";
import { JsonLd } from "@/components/seo/json-ld";
import { TechStack } from "@/components/tech/tech-stack";
import { SectionHeading } from "@/components/ui/section-heading";
import { HeroHeading } from "@/components/ui/hero-heading";
import {
  certificates,
  experiences,
  profile,
  projects,
} from "@/data/portfolio";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute:
      "Haqqi AnnaZili — SIJA Student & Web Developer | SMKN 69 Jakarta",
  },
  description:
    "Portfolio Haqqi AnnaZili, siswa jurusan SIJA di SMKN 69 Jakarta yang menekuni web development, programming, dan AI melalui proyek dan sertifikat.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Haqqi AnnaZili",
    "Haqqi AnnaZili SIJA",
    "portfolio Haqqi AnnaZili",
    "siswa SIJA SMKN 69 Jakarta",
    "web developer Jakarta",
  ],
  openGraph: pageOpenGraph({
    title: "Haqqi AnnaZili — SIJA Student & Web Developer | SMKN 69 Jakarta",
    description:
      "Haqqi AnnaZili adalah siswa jurusan SIJA di SMKN 69 Jakarta yang menekuni web development, programming, dan AI.",
    url: "/",
  }),
  twitter: pageTwitter({
    title: "Haqqi AnnaZili — SIJA Student & Web Developer | SMKN 69 Jakarta",
    description:
      "Siswa jurusan SIJA di SMKN 69 Jakarta yang menekuni web development, programming, dan AI.",
  }),
};

export default function Home() {
  const siteUrl = getSiteUrl();
  const personId = new URL("/#person", siteUrl).toString();
  const credentials = certificates.filter((certificate) => certificate.verifyUrl);
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: profile.alternateNames,
    url: siteUrl.toString(),
    mainEntityOfPage: siteUrl.toString(),
    image: new URL("/og.jpg", siteUrl).toString(),
    jobTitle: "SIJA Student & Web Developer",
    description:
      "Haqqi AnnaZili adalah siswa jurusan SIJA di SMKN 69 Jakarta yang menekuni web development, programming, dan AI.",
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
    knowsLanguage: ["id", "en"],
    knowsAbout: [
      "Web Development",
      "Programming",
      "Networking",
      "Artificial Intelligence",
      "Next.js",
      "TypeScript",
      "Python",
    ],
    award: certificates[0].title,
    hasCredential: credentials.map((certificate) => ({
      "@type": "EducationalOccupationalCredential",
      name: certificate.title,
      url: certificate.verifyUrl,
      recognizedBy: {
        "@type": "Organization",
        name: certificate.issuer,
      },
    })),
  };
  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": new URL("/#profile-page", siteUrl).toString(),
    url: siteUrl.toString(),
    name: "Portfolio Haqqi AnnaZili",
    description:
      "Profil, proyek, sertifikat, dan perjalanan belajar Haqqi AnnaZili.",
    dateModified: getContentUpdatedAt().toISOString(),
    inLanguage: "id-ID",
    isPartOf: {
      "@id": new URL("/#website", siteUrl).toString(),
    },
    mainEntity: {
      "@id": personId,
    },
  };
  const projectListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": new URL("/#projects", siteUrl).toString(),
    name: "Proyek web Haqqi AnnaZili",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      description: project.description,
      ...(project.href ? { url: project.href } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={[personJsonLd, profilePageJsonLd, projectListJsonLd]} />
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

          <div data-scroll-reveal>
            <HeroHeading />
          </div>
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
          <p
            className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]"
            data-scroll-reveal
          >
            Siswa konsentrasi keahlian SIJA di{" "}
            <Link
              href="/experience/smkn-69-jakarta"
              className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
            >
              SMKN 69 Jakarta
            </Link>
            .
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
              href={profile.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label={`Instagram ${profile.instagram.handle}`}
              title={`Instagram ${profile.instagram.handle}`}
            >
              {/* Public Simple Icons asset is served directly. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.simpleicons.org/instagram/E4405F"
                alt=""
                width={19}
                height={19}
              />
            </a>
            <a
              href={profile.github.url}
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label={`GitHub ${profile.github.handle}`}
              title={`GitHub ${profile.github.handle}`}
            >
              {/* Public Simple Icons asset is served directly. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.simpleicons.org/github/8F8F8A"
                alt=""
                width={19}
                height={19}
              />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="social-icon"
              aria-label={`Kirim email ke ${profile.email}`}
              title={profile.email}
            >
              {/* Public Simple Icons asset is served directly. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.simpleicons.org/gmail/EA4335"
                alt=""
                width={19}
                height={19}
              />
            </a>
          </div>

          <TechStack />
        </div>
      </section>

      <section className="section-pad pt-0" aria-label="Tentang Haqqi AnnaZili">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="About"
            title="Siapa Haqqi AnnaZili?"
            description="Haqqi AnnaZili adalah siswa jurusan SIJA di SMKN 69 Jakarta yang menekuni web development, programming, networking, dan teknologi AI."
          />
          <div
            className="mt-8 grid gap-4 sm:grid-cols-3"
            data-scroll-reveal-stagger
          >
            <div className="card p-6" data-scroll-reveal>
              <h3 className="text-base font-semibold">Pendidikan</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Siswa konsentrasi keahlian SIJA (Sistem Informasi, Jaringan,
                dan Aplikasi) di{" "}
                <Link
                  href="/experience/smkn-69-jakarta"
                  className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
                >
                  SMKN 69 Jakarta
                </Link>
                , Jakarta, Indonesia.
              </p>
            </div>
            <div className="card p-6" data-scroll-reveal>
              <h3 className="text-base font-semibold">Bidang yang ditekuni</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Web development, programming, networking, dan AI — dipraktikkan
                lewat{" "}
                <Link
                  href="/projects"
                  className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
                >
                  proyek web
                </Link>{" "}
                dan{" "}
                <Link
                  href="/certificates"
                  className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
                >
                  sertifikat course
                </Link>
                .
              </p>
            </div>
            <div className="card p-6" data-scroll-reveal>
              <h3 className="text-base font-semibold">Perjalanan belajar</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Mendokumentasikan progres lewat{" "}
                <Link
                  href="/experience"
                  className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
                >
                  halaman journey
                </Link>{" "}
                dan terbuka untuk kolaborasi via{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
                >
                  kontak
                </Link>
                .
              </p>
            </div>
          </div>
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
          <div
            className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            data-scroll-reveal-stagger
          >
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
          <div className="journey-grid" data-scroll-reveal-stagger>
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
          <div
            className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            data-scroll-reveal-stagger
          >
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
