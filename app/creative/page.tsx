import type { Metadata } from "next";
import Link from "next/link";
import { CreativeSections } from "@/components/creative/creative-sections";
import { JsonLd } from "@/components/seo/json-ld";
import { creativeWorks } from "@/data/creative";
import { profile } from "@/data/portfolio";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

const creativeFaqs = [
  {
    question: "Apakah Anda menerima jasa dokumentasi sekolah?",
    answer:
      "Ya. Saya menerima dokumentasi kegiatan sekolah, acara, dan potret siswa di Jakarta, terutama di lingkungan SMKN 69 Jakarta. Kebutuhan bisa didiskusikan lewat halaman kontak.",
  },
  {
    question: "Apa saja yang termasuk dalam layanan editing foto dan video?",
    answer:
      "Editing mencakup seleksi file, perbaikan warna dan pencahayaan untuk foto, serta penyusunan clip, pemotongan timeline, dan perapian hasil akhir untuk video. Hasil dikirim sebagai file atau dipublikasikan lewat Instagram.",
  },
  {
    question: "Di mana biasanya pengambilan foto dilakukan?",
    answer:
      "Sebagian besar di SMKN 69 Jakarta, Cakung, Jakarta Timur. Untuk lokasi lain di Jakarta, jadwal dan kebutuhan teknis dibicarakan lebih dulu.",
  },
  {
    question: "Alat apa yang dipakai untuk memotret dan mengedit?",
    answer:
      "Kamera untuk pengambilan gambar, Lightroom untuk editing foto, dan CapCut untuk editing video. Hasil editing juga saya unggah ke Instagram @zlyzyzz.",
  },
];

export const metadata: Metadata = {
  title: "Fotografi & Editing Jakarta",
  description:
    "Karya fotografi dan editing Haqqi AnnaZili di SMKN 69 Jakarta dan Jakarta: dokumentasi kegiatan sekolah, potret siswa, dan foto jalanan.",
  alternates: {
    canonical: "/creative",
  },
  keywords: [
    "fotografi Haqqi AnnaZili",
    "editor foto Jakarta",
    "jasa dokumentasi sekolah Jakarta",
    "dokumentasi sekolah SMKN 69 Jakarta",
    "fotografer SMKN 69 Jakarta",
    "fotografi acara sekolah Jakarta",
    "photo editing Jakarta",
    "video editing Jakarta",
    "editor video SMKN 69 Jakarta",
  ],
  openGraph: pageOpenGraph({
    title: "Fotografi & Editing Haqqi AnnaZili di Jakarta",
    description:
      "Dokumentasi kegiatan dan keseharian di SMKN 69 Jakarta, plus hasil editing foto dan video yang dipublikasikan di Instagram.",
    url: "/creative",
    images: [
      {
        url: "/creative/creative-banner.jpg",
        width: 2000,
        height: 1122,
        type: "image/jpeg",
        alt: "Tangan mengetik di keyboard laptop dengan lampu latar ungu",
      },
    ],
  }),
  twitter: pageTwitter({
    title: "Fotografi & Editing Haqqi AnnaZili di Jakarta",
    description:
      "Dokumentasi kegiatan SMKN 69 Jakarta dan hasil editing foto serta video Haqqi AnnaZili.",
    images: ["/creative/creative-banner.jpg"],
  }),
};

export default function CreativePage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL("/creative", siteUrl).toString();
  const personId = new URL("/#person", siteUrl).toString();
  const websiteId = new URL("/#website", siteUrl).toString();
  const imageObjects = creativeWorks.flatMap((work) =>
    work.images.map((image, imageIndex) => {
      const imageUrl = new URL(image.src, siteUrl).toString();

      return {
        "@type": "ImageObject",
        "@id": `${pageUrl}#${work.slug}-${imageIndex + 1}`,
        contentUrl: imageUrl,
        url: imageUrl,
        name: image.label ? `${work.title}: ${image.label}` : work.title,
        description: work.description,
        caption: image.alt,
        width: image.width,
        height: image.height,
        encodingFormat: "image/webp",
        creator: { "@id": personId },
        copyrightHolder: { "@id": personId },
        creditText: "Haqqi AnnaZili",
        locationCreated: {
          "@type": "Place",
          name: work.location,
        },
        keywords: [
          work.category,
          work.location,
          work.year,
          "Haqqi AnnaZili",
        ].join(", "),
      };
    }),
  );

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: siteUrl.toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kreatif",
        item: pageUrl,
      },
    ],
  };
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": pageUrl + "#webpage",
    url: pageUrl,
    name: "Fotografi & editing Haqqi AnnaZili",
    description:
      "Kumpulan karya fotografi dan editing Haqqi AnnaZili di SMKN 69 Jakarta, termasuk dokumentasi kegiatan, potret, dan proses before/after.",
    inLanguage: "id-ID",
    dateModified: getContentUpdatedAt().toISOString(),
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": personId,
    },
    mainEntity: {
      "@type": "ImageGallery",
      "@id": pageUrl + "#gallery",
      name: "Galeri fotografi dan editing Haqqi AnnaZili",
      numberOfItems: imageObjects.length,
      image: imageObjects,
    },
    hasPart: imageObjects.map((image) => ({ "@id": image["@id"] })),
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": pageUrl + "#service",
    name: "Dokumentasi foto dan editing video",
    serviceType: [
      "Fotografi dokumentasi kegiatan",
      "Fotografi potret",
      "Editing foto",
      "Editing video",
    ],
    description:
      "Layanan dokumentasi kegiatan sekolah, potret, serta editing foto dan video di Jakarta oleh Haqqi AnnaZili.",
    provider: { "@id": personId },
    areaServed: {
      "@type": "City",
      name: "Jakarta",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: new URL("/contact", siteUrl).toString(),
    },
    inLanguage: "id-ID",
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": pageUrl + "#faq",
    mainEntity: creativeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd,
          collectionJsonLd,
          serviceJsonLd,
          faqJsonLd,
        ]}
      />

      <section className="creative-hero">
        <div className="creative-hero-media" aria-hidden="true">
          {/* Static banner asset is served directly. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/creative/creative-banner.webp"
            alt=""
            width={2000}
            height={1122}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="creative-hero-content content-wrap">
          <div data-scroll-reveal>
            <p className="eyebrow creative-hero-eyebrow">
              Kreatif / Arsip visual
            </p>
            <h1 className="creative-hero-title mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
              Fotografi dan editing, dari sekolah sampai jalanan.
            </h1>
            <p className="creative-hero-description mt-6 max-w-2xl text-lg leading-8">
              Saya mendokumentasikan kegiatan sekolah, potret siswa, dan
              jalanan Jakarta. Setiap karya di bawah disertai lokasi, tahun,
              dan alat yang dipakai.
            </p>
          </div>

          <div className="creative-hero-bottom">
            <div className="creative-stats" data-scroll-reveal>
              <div>
                <strong>{String(creativeWorks.length).padStart(2, "0")}</strong>
                <span>Karya</span>
              </div>
              <div>
                <strong>SMKN 69</strong>
                <span>Jakarta</span>
              </div>
              <div>
                <strong>2026</strong>
                <span>Berjalan</span>
              </div>
            </div>
            <p className="creative-hero-caption">
              Dokumentasi kegiatan · SMKN 69 Jakarta
            </p>
          </div>
        </div>
      </section>

      <section
        className="section-pad"
        aria-labelledby="creative-gallery-title"
      >
        <div className="content-wrap">
          <div className="creative-section-head" data-scroll-reveal>
            <div>
              <p className="eyebrow">Arsip visual</p>
              <h2
                id="creative-gallery-title"
                className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
              >
                Galeri foto dan hasil editing.
              </h2>
            </div>
            <p className="creative-section-lede">
              Dokumentasi kegiatan sekolah, hasil gladi TKA versi asli dan
              editing, serta foto jalanan Jakarta. Setiap karya mencantumkan
              lokasi, tahun, dan alat.
            </p>
          </div>

          <CreativeSections works={creativeWorks} />
        </div>
      </section>

      <section
        className="section-pad"
        aria-labelledby="creative-about-title"
      >
        <div className="content-wrap">
          <div className="creative-about" data-scroll-reveal>
            <div>
              <p className="eyebrow">Pendekatan</p>
              <h2
                id="creative-about-title"
                className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
              >
                Dari liputan lapangan sampai hasil akhir.
              </h2>
              <p className="creative-about-copy">
                Setiap karya dimulai dari perencanaan singkat: menentukan momen
                yang perlu didokumentasikan, menyiapkan kamera, lalu mengambil
                gambar dari beberapa sudut. Setelah itu saya menyeleksi file,
                merapikan warna dan pencahayaan di Lightroom, dan untuk video
                menyusun timeline di CapCut.
              </p>
              <p className="creative-about-copy">
                Sebagian besar liputan berlangsung di lingkungan{" "}
                <Link href="/experience/smkn-69-jakarta">
                  SMKN 69 Jakarta
                </Link>
                . Konteks sekolah dan jurusan SIJA bisa dibaca di halaman
                perjalanan, sementara proyek web yang saya bangun ada di{" "}
                <Link href="/projects">halaman proyek</Link>.
              </p>
              <div className="creative-tools" aria-label="Alat yang digunakan">
                <span>Kamera</span>
                <span>Lightroom</span>
                <span>CapCut</span>
                <span>Instagram</span>
              </div>
            </div>

            <ol className="creative-process">
              <li>
                <span>01</span>
                <div>
                  <h3>Brief &amp; rencana</h3>
                  <p>
                    Menentukan momen, lokasi, dan sudut pengambilan sebelum
                    acara dimulai.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Pengambilan gambar</h3>
                  <p>
                    Memotret dari beberapa posisi agar pilihan hasil lebih
                    banyak.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Seleksi &amp; editing</h3>
                  <p>
                    Memilih file terbaik, merapikan warna, lalu menyusun
                    timeline video.
                  </p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h3>Publikasi</h3>
                  <p>
                    Mengirim file akhir atau mengunggah hasil editing ke
                    Instagram.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section
        className="section-pad"
        aria-labelledby="creative-faq-title"
      >
        <div className="content-wrap">
          <div className="creative-faq" data-scroll-reveal>
            <div>
              <p className="eyebrow">Pertanyaan umum</p>
              <h2
                id="creative-faq-title"
                className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
              >
                Tentang karya dan layanan creative.
              </h2>
            </div>
            <div className="creative-faq-list">
              {creativeFaqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="creative-cta-title">
        <div className="content-wrap">
          <div className="cta-panel" data-scroll-reveal>
            <p className="eyebrow">Kolaborasi</p>
            <h2
              id="creative-cta-title"
              className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
            >
              Butuh dokumentasi, foto, atau editing video?
            </h2>
            <p className="mt-4 max-w-xl text-lg text-[var(--muted)]">
              Terbuka untuk dokumentasi kegiatan sekolah, potret, serta editing
              foto dan video di Jakarta. Hasil akhir bisa dikirim sebagai file
              atau dipublikasikan lewat Instagram.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="button button-primary">
                Hubungi saya <span aria-hidden="true">↗</span>
              </Link>
              <a
                href={profile.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary"
              >
                Instagram <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
