import type { Metadata } from "next";
import Link from "next/link";
import { CertificateCard } from "@/components/cards/certificate-card";
import { CreativeCard } from "@/components/cards/creative-card";
import { ExperienceCard } from "@/components/cards/experience-card";
import { ProjectCard } from "@/components/cards/project-card";
import { GitHubActivity } from "@/components/github/github-activity";
import { JsonLd } from "@/components/seo/json-ld";
import { SkillsSection } from "@/components/skills/skills-section";
import { TechStack } from "@/components/tech/tech-stack";
import { SectionHeading } from "@/components/ui/section-heading";
import { HeroHeading } from "@/components/ui/hero-heading";
import { creativeWorks } from "@/data/creative";
import {
  certificates,
  experiences,
  profile,
  projects,
} from "@/data/portfolio";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { schemaIds } from "@/lib/schema";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute:
      "Haqqi AnnaZili | IT Support & Web Developer di Jakarta",
  },
  description:
    "Portofolio Haqqi AnnaZili, siswa SIJA SMKN 69 Jakarta yang bergerak di IT support dan pengembangan web. Berisi proyek, sertifikat, dan karya fotografi.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Haqqi AnnaZili",
    "Haqqi AnnaZili SIJA",
    "portfolio Haqqi AnnaZili",
    "IT support Jakarta",
    "siswa SIJA SMKN 69 Jakarta",
    "web developer Jakarta",
  ],
  openGraph: pageOpenGraph({
    title: "Haqqi AnnaZili | IT Support & Web Developer di Jakarta",
    description:
      "IT support dengan kemampuan pengembangan web: menangani perangkat, jaringan, dan troubleshooting, serta membangun solusi digital saat dibutuhkan.",
    url: "/",
  }),
  twitter: pageTwitter({
    title: "Haqqi AnnaZili | IT Support & Web Developer di Jakarta",
    description:
      "IT support yang serba bisa, dengan pengalaman membangun produk web dan bereksperimen dengan AI.",
  }),
};

export default function Home() {
  const { siteRoot, personId, profilePageId, websiteId } = schemaIds();
  const featuredProjects = projects.slice(0, 3);
  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "ProfilePage"],
    "@id": profilePageId,
    url: siteRoot,
    name: "Portofolio Haqqi AnnaZili",
    description:
      "Profil, proyek, sertifikat, dan perjalanan belajar Haqqi AnnaZili.",
    dateModified: getContentUpdatedAt().toISOString(),
    inLanguage: "id-ID",
    isPartOf: {
      "@id": websiteId,
    },
    mainEntity: {
      "@id": personId,
    },
  };
  const projectListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteRoot}/#featured-projects`,
    name: "Proyek pilihan Haqqi AnnaZili",
    numberOfItems: featuredProjects.length,
    itemListElement: featuredProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      description: project.description,
      ...(project.href ? { url: project.href } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={[profilePageJsonLd, projectListJsonLd]} />
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
            className="mt-4 max-w-[38rem] text-base leading-[1.55] text-[var(--muted)]"
            data-scroll-reveal
          >
            Haqqi AnnaZili adalah IT support dan web developer di Jakarta,
            Indonesia. Ia siswa konsentrasi keahlian SIJA (Sistem Informasi
            Jaringan dan Aplikasi) di SMK Negeri 69 Jakarta sejak 2025 dan telah
            membangun {projects.length} proyek web, termasuk pay.lydev.id dan
            exisel.web.id. Fokusnya IT support, jaringan komputer, dan
            pengembangan web.
          </p>

          <div className="mt-5 flex flex-wrap gap-3" data-scroll-reveal>
            <Link href="/contact" className="button button-primary">
              Hubungi saya <span aria-hidden="true">↗</span>
            </Link>
            <a
              href={`mailto:${profile.email}?subject=Permintaan Resume / CV`}
              className="button button-secondary"
            >
              Minta CV <span aria-hidden="true">↗</span>
            </a>
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

      <section className="section-pad pt-0">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Proyek pilihan"
            title="Produk yang pernah saya bangun."
            description="Tiga proyek yang paling sering saya kembangkan kembali: media pembelajaran sejarah berbasis permainan, payment gateway QRIS, dan platform ekstrakurikuler sekolah."
            action={{ href: "/projects", label: "Semua proyek" }}
          />
          <div
            className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            data-scroll-reveal-stagger
          >
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-label="Tentang Haqqi AnnaZili">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Tentang"
            title="Menangani masalah, lalu membangun solusinya."
            description="Saya menempuh program empat tahun di konsentrasi SIJA SMKN 69 Jakarta, mulai 2025. Sebagian besar pengetahuan saya tentang perangkat, jaringan, dan sistem berasal dari penanganan masalah nyata, bukan hanya dari buku."
          />
          <div
            className="mt-8 grid gap-4 md:grid-cols-3"
            data-scroll-reveal-stagger
          >
            <div className="card p-6" data-scroll-reveal>
              <h3 className="text-base font-semibold">Pendidikan</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Konsentrasi keahlian SIJA (Sistem Informasi Jaringan dan
                Aplikasi) di{" "}
                <Link
                  href="/experience/smkn-69-jakarta"
                  className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
                >
                  SMKN 69 Jakarta
                </Link>
                . Program empat tahun, saya mulai 2025, dengan porsi praktik
                yang besar.
              </p>
            </div>
            <div className="card p-6" data-scroll-reveal>
              <h3 className="text-base font-semibold">Bidang yang ditekuni</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                IT support, jaringan komputer, pengembangan web, dan AI.
                Diterapkan melalui{" "}
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
                  sertifikat pelatihan
                </Link>
                , bukan sekadar catatan kelas.
              </p>
            </div>
            <div className="card p-6" data-scroll-reveal>
              <h3 className="text-base font-semibold">Perjalanan belajar</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Perkembangan saya terdokumentasi di{" "}
                <Link
                  href="/experience"
                  className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
                >
                  halaman perjalanan
                </Link>
                , termasuk pendidikan dan jalur belajar AI. Untuk kolaborasi,
                silakan menuju{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
                >
                  halaman kontak
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <SkillsSection />

      <section className="section-pad">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Karya visual"
            title="Fotografi & editing."
            description="Dokumentasi kegiatan sekolah, potret siswa, dan fotografi jalanan Jakarta. Beberapa karya menampilkan versi asli dan hasil editingnya."
            action={{ href: "/creative", label: "Lihat karya visual" }}
          />
          <div className="creative-grid mt-10" data-scroll-reveal-stagger>
            {creativeWorks.slice(0, 3).map((work) => (
              <CreativeCard key={work.slug} work={work} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Perjalanan"
            title="Belajar dengan cara membangun."
            description="Setiap tahap mengubah cara saya memandang masalah: dari baris kode, cara sistem bekerja, hingga dampaknya bagi pengguna."
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
            eyebrow="Sertifikat"
            title="Pembelajaran yang tervalidasi."
            description={`${certificates.filter((certificate) => certificate.verifyUrl).length} dari ${certificates.length} sertifikat memiliki tautan verifikasi penerbit, mulai dari pemrograman dan cloud hingga machine learning dan generative AI.`}
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
            <p className="eyebrow">Kolaborasi</p>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
              Punya ide yang layak diwujudkan?
            </h2>
            <p className="mt-5 max-w-xl text-lg text-[var(--muted)]">
              Saya terbuka untuk proyek freelance, kolaborasi, dan diskusi
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
