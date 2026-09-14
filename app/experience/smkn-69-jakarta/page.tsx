import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { profile } from "@/data/portfolio";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "SMKN 69 Jakarta: Profil, Lokasi & SIJA",
  description:
    "Mengenal SMKN 69 Jakarta: profil sekolah, lokasi di Cakung, Jakarta Timur, jurusan SIJA, serta perjalanan Haqqi AnnaZili sebagai siswa.",
  alternates: {
    canonical: "/experience/smkn-69-jakarta",
  },
  keywords: [
    "SMKN 69 Jakarta",
    "SMK Negeri 69 Jakarta",
    "lokasi SMKN 69 Jakarta",
    "jurusan SMKN 69 Jakarta",
    "SIJA SMKN 69 Jakarta",
    "Haqqi AnnaZili SMKN 69 Jakarta",
  ],
  openGraph: pageOpenGraph({
    title: "SMKN 69 Jakarta: Profil, Lokasi & SIJA",
    description:
      "Profil SMK Negeri 69 Jakarta, lokasi, konsentrasi SIJA, dan perjalanan Haqqi AnnaZili sebagai siswa.",
    type: "article",
    url: "/experience/smkn-69-jakarta",
    images: [
      {
        url: "/school/smkn-69-jakarta-campus.webp",
        width: 1600,
        height: 2130,
        alt: "Gedung dan area SMK Negeri 69 Jakarta",
      },
    ],
  }),
  twitter: pageTwitter({
    title: "SMKN 69 Jakarta: Profil, Lokasi & SIJA",
    description:
      "Profil SMK Negeri 69 Jakarta, lokasi, konsentrasi SIJA, dan perjalanan Haqqi AnnaZili sebagai siswa.",
    images: ["/school/smkn-69-jakarta-campus.webp"],
  }),
};

const officialWebsite = "https://www.smkn69jkt.sch.id/";
const governmentProfile =
  "https://referensi.data.kemendikdasmen.go.id/tabs.php?npsn=69992321";
const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=-6.2065161,106.9260421";
const schoolAddress =
  "Jl. KRT. Radjiman Widyodiningrat No. 32, Jatinegara, Cakung, Jakarta Timur 13930";
const schoolFaqs = [
  {
    question: "Apa itu SMKN 69 Jakarta?",
    answer:
      "SMKN 69 Jakarta adalah sekolah menengah kejuruan negeri di bawah Pemerintah Provinsi DKI Jakarta. Sekolah ini berdiri pada 2019, memiliki NPSN 69992321, dan berakreditasi A.",
  },
  {
    question: "Di mana lokasi SMKN 69 Jakarta?",
    answer: `SMKN 69 Jakarta berlokasi di ${schoolAddress}.`,
  },
  {
    question: "Apa itu jurusan SIJA di SMKN 69 Jakarta?",
    answer:
      "SIJA adalah Sistem Informasi Jaringan dan Aplikasi, program pendidikan empat tahun yang mempelajari teknologi komputer, jaringan, sistem informasi, serta pengembangan aplikasi.",
  },
  {
    question: "Apa hubungan Haqqi AnnaZili dengan SMKN 69 Jakarta?",
    answer:
      "Haqqi AnnaZili adalah siswa konsentrasi keahlian SIJA di SMKN 69 Jakarta sejak 2025 dan membangun fondasi pemrograman, jaringan, sistem, serta pengembangan aplikasi di sekolah ini.",
  },
];

export default function Smkn69JakartaPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(
    "/experience/smkn-69-jakarta",
    siteUrl,
  ).toString();
  const schoolId = `${pageUrl}#school`;
  const schoolJsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": schoolId,
    name: "SMK Negeri 69 Jakarta",
    alternateName: [
      "SMKN 69 Jakarta",
      "SMK N 69 Jakarta",
      "SMK 69 Jakarta",
      "SMKN 69",
    ],
    url: officialWebsite,
    sameAs: [officialWebsite, governmentProfile],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "NPSN",
      value: "69992321",
    },
    foundingDate: "2019",
    image: new URL(
      "/school/smkn-69-jakarta-campus.webp",
      siteUrl,
    ).toString(),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. KRT. Radjiman Widyodiningrat No. 32",
      addressLocality: "Jatinegara",
      addressRegion: "DKI Jakarta",
      postalCode: "13930",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.2065161,
      longitude: 106.9260421,
    },
    hasMap: mapsUrl,
  };
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "SMKN 69 Jakarta: Profil, Lokasi & SIJA",
    description:
      "Profil SMKN 69 Jakarta, lokasi sekolah, program SIJA, dan perjalanan Haqqi AnnaZili sebagai siswa.",
    inLanguage: "id-ID",
    dateModified: getContentUpdatedAt().toISOString(),
    isPartOf: {
      "@id": new URL("/#website", siteUrl).toString(),
    },
    about: {
      "@id": schoolId,
    },
    author: {
      "@type": "Person",
      "@id": new URL("/#person", siteUrl).toString(),
      name: profile.name,
      url: siteUrl.toString(),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl.toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journey",
        item: new URL("/experience", siteUrl).toString(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "SMKN 69 Jakarta",
        item: pageUrl,
      },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: schoolFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="school-page section-pad pt-28 sm:pt-36">
      <JsonLd
        data={[schoolJsonLd, pageJsonLd, breadcrumbJsonLd, faqJsonLd]}
      />
      <div className="content-wrap">
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--text)]"
          data-scroll-reveal
        >
          <span aria-hidden="true">←</span> Kembali ke Journey
        </Link>

        <div className="school-hero">
          <div className="school-hero-copy" data-scroll-reveal>
            <div className="flex items-center gap-4">
              <span className="school-logo-large">
                {/* Static local asset avoids image optimization proxy issues. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/smkn-69-jakarta.png"
                  alt="Logo SMK Negeri 69 Jakarta"
                  width={92}
                  height={116}
                />
              </span>
              <div>
                <p className="eyebrow">Education / Current chapter</p>
                <p className="mt-2 font-mono text-xs text-[var(--muted)]">
                  2025 — Sekarang
                </p>
              </div>
            </div>

            <h1 className="mt-7 text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
              SMK Negeri 69
              <span className="text-[var(--muted)]"> Jakarta.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Tempat saya membangun fondasi di bidang pemrograman, jaringan,
              sistem, dan pengembangan aplikasi melalui konsentrasi keahlian
              SIJA.
            </p>

            <div className="school-tags">
              <span>SMK Negeri</span>
              <span>Akreditasi A</span>
              <span>SIJA · 4 Tahun</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="button button-primary"
              >
                Website sekolah <span aria-hidden="true">↗</span>
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary"
              >
                Buka lokasi <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <figure className="school-photo" data-scroll-reveal>
            {/* User-provided photo compressed locally for faster delivery. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/school/smkn-69-jakarta-campus.webp"
              alt="Area gedung dan lapangan SMK Negeri 69 Jakarta"
              width={1600}
              height={2130}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              Dokumentasi area sekolah · Jakarta Timur, 24 Juli 2026
            </figcaption>
          </figure>
        </div>

        <div className="school-information">
          <article className="school-story" data-scroll-reveal>
            <p className="eyebrow">Tentang sekolah</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Pendidikan kejuruan yang dekat dengan dunia teknologi.
            </h2>
            <div className="mt-6 space-y-5 leading-8 text-[var(--muted)]">
              <p>
                SMK Negeri 69 Jakarta adalah sekolah menengah kejuruan negeri
                yang berada di bawah Pemerintah Provinsi DKI Jakarta. Sekolah
                ini termasuk salah satu dari sepuluh sekolah baru yang dibangun
                oleh Pemerintah DKI Jakarta dan mulai berdiri pada tahun 2019.
              </p>
              <p>
                SIJA atau Sistem Informasi Jaringan dan Aplikasi merupakan
                konsentrasi keahlian empat tahun yang mempelajari teknologi
                komputer, jaringan, sistem informasi, serta proses membuat dan
                mengembangkan aplikasi.
              </p>
            </div>
          </article>

          <aside className="school-facts" data-scroll-reveal>
            <p className="eyebrow">Informasi utama</p>
            <dl>
              <div>
                <dt>Status</dt>
                <dd>Sekolah Negeri</dd>
              </div>
              <div>
                <dt>NPSN</dt>
                <dd>69992321</dd>
              </div>
              <div>
                <dt>Akreditasi</dt>
                <dd>A</dd>
              </div>
              <div>
                <dt>Lokasi</dt>
                <dd>{schoolAddress}</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="school-personal-story" data-scroll-reveal>
          <div>
            <p className="eyebrow">My learning path</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Peran SMKN 69 dalam perjalanan saya.
            </h2>
          </div>
          <div>
            <p className="leading-8 text-[var(--muted)]">
              Sebagai siswa SIJA, saya menggunakan masa belajar ini untuk
              memperkuat dasar pemrograman, memahami cara sistem dan jaringan
              bekerja, serta membangun aplikasi melalui tugas dan proyek.
              Pengalaman ini menjadi fondasi untuk eksplorasi full-stack
              development dan AI yang saya lanjutkan secara mandiri.
            </p>
            <div className="school-focus-grid">
              <span>Programming fundamentals</span>
              <span>Networks & systems</span>
              <span>Application development</span>
            </div>
          </div>
        </div>

        <section className="school-faq" aria-labelledby="school-faq-title">
          <div data-scroll-reveal>
            <p className="eyebrow">Pertanyaan umum</p>
            <h2
              id="school-faq-title"
              className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
            >
              Tentang SMKN 69 Jakarta.
            </h2>
          </div>
          <div className="school-faq-list">
            {schoolFaqs.map((faq) => (
              <details key={faq.question} data-scroll-reveal>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="school-sources" data-scroll-reveal>
          <span>Referensi resmi</span>
          <a href={officialWebsite} target="_blank" rel="noreferrer">
            Website SMKN 69 Jakarta ↗
          </a>
          <a href={governmentProfile} target="_blank" rel="noreferrer">
            Data Kemendikdasmen ↗
          </a>
        </div>
      </div>
    </section>
  );
}
