import type { Metadata } from "next";
import Link from "next/link";
import { CertificateCard } from "@/components/cards/certificate-card";
import { ExperienceCard } from "@/components/cards/experience-card";
import { ProjectCard } from "@/components/cards/project-card";
import { GitHubActivity } from "@/components/github/github-activity";
import { TechStack } from "@/components/tech/tech-stack";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  certificates,
  experiences,
  profile,
  projects,
} from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Portofolio Haqqi AnnaZili - developer, pelajar, dan penjelajah teknologi AI.",
};

export default function Home() {
  return (
    <>
      <section className="hero-section section-pad min-h-[82vh]">
        <div className="content-wrap relative">
          <a
            href={profile.github.url}
            target="_blank"
            rel="noreferrer"
            className="hero-avatar"
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

          <h1 className="hero-title max-w-5xl text-balance font-semibold text-[var(--text)]">
            Hi, I&apos;m Haqqi AnnaZili
            <span className="text-[var(--muted)]">
              {" "}
              — Full Stack Developer / AI Engineer.
            </span>
          </h1>
          <a
            href={profile.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="hero-instagram"
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
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            <span className="font-semibold text-[var(--text)]">aka</span>
            {" "}
            deevee - a developer who brings cool solutions to life
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
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

          <div className="mt-10 flex items-center gap-3 text-sm text-[var(--muted)]">
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
            title="Proyek yang sedang saya bentuk."
            description="Eksperimen dan produk pilihan dari perjalanan saya mempelajari software engineering."
            action={{ href: "/projects", label: "Semua proyek" }}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-wrap grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionHeading
            eyebrow="Journey"
            title="Belajar dengan cara membangun."
            description="Setiap fase memperluas cara saya melihat masalah - dari kode, sistem, hingga dampaknya untuk pengguna."
            action={{ href: "/experience", label: "Lihat perjalanan" }}
          />
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {experiences.slice(0, 3).map((experience) => (
              <ExperienceCard key={experience.title} experience={experience} compact />
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
          <div className="cta-panel">
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
