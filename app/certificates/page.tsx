import type { Metadata } from "next";
import Link from "next/link";
import { CertificateGallery } from "@/components/certificates/certificate-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { certificates } from "@/data/portfolio";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Sertifikat AI, Cloud & Pemrograman",
  description:
    "Kumpulan sertifikat pelatihan Haqqi AnnaZili di bidang AI, data, cloud, dan pemrograman, dari Dicoding, Microsoft Elevate, dan lembaga lainnya.",
  alternates: {
    canonical: "/certificates",
  },
  openGraph: pageOpenGraph({
    title: "Sertifikat Haqqi AnnaZili",
    description:
      "Koleksi sertifikat pelatihan Haqqi AnnaZili di bidang AI, data, cloud, dan pemrograman.",
    url: "/certificates",
  }),
  twitter: pageTwitter({
    title: "Sertifikat Haqqi AnnaZili",
    description:
      "Koleksi sertifikat pelatihan Haqqi AnnaZili di bidang AI, data, cloud, dan pemrograman.",
  }),
};

export default function CertificatesPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL("/certificates", siteUrl).toString();
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
        name: "Sertifikat",
        item: pageUrl,
      },
    ],
  };
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Sertifikat Haqqi AnnaZili",
    description:
      "Kumpulan sertifikat pelatihan Haqqi AnnaZili di bidang AI, data, cloud, dan pemrograman.",
    inLanguage: "id-ID",
    dateModified: getContentUpdatedAt().toISOString(),
    isPartOf: {
      "@id": new URL("/#website", siteUrl).toString(),
    },
    about: {
      "@id": new URL("/#person", siteUrl).toString(),
    },
    mainEntity: {
      "@type": "ItemList",
      "@id": `${pageUrl}#itemlist`,
      numberOfItems: certificates.length,
      itemListElement: certificates.map((certificate, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "EducationalOccupationalCredential",
          "@id": `${pageUrl}#${certificate.slug}`,
          name: certificate.title,
          description: `${certificate.title} dari ${certificate.issuer}, diterbitkan ${certificate.issuedAt}.`,
          ...(certificate.credential
            ? {
                identifier: {
                  "@type": "PropertyValue",
                  propertyID: "Credential ID",
                  value: certificate.credential,
                },
              }
            : {}),
          ...(certificate.verifyUrl ? { url: certificate.verifyUrl } : {}),
          recognizedBy: {
            "@type": "Organization",
            name: certificate.issuer,
          },
        },
      })),
    },
  };

  return (
    <section className="section-pad pt-36 sm:pt-44">
      <JsonLd data={[breadcrumbJsonLd, collectionJsonLd]} />
      <div className="content-wrap">
        <div data-scroll-reveal>
          <p className="eyebrow">
            Kredensial / {certificates.length} sertifikat
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            Sertifikat dan pelatihan yang telah saya selesaikan.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            {certificates.length} kredensial dari Dicoding, Microsoft Elevate,
            dan lembaga lainnya. Tautan verifikasi hanya dicantumkan apabila
            penerbit menyediakannya secara resmi.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Penerapan materi pelatihan dapat dilihat pada{" "}
            <Link
              href="/projects"
              className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
            >
              halaman proyek
            </Link>
            , sedangkan konteks pembelajaran tersedia di{" "}
            <Link
              href="/experience/smkn-69-jakarta"
              className="font-semibold text-[var(--soft)] hover:text-[var(--text)]"
            >
              profil SMKN 69 Jakarta
            </Link>
            .
          </p>
          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Semua sertifikat
          </h2>
        </div>
        <CertificateGallery certificates={certificates} />
      </div>
    </section>
  );
}
