import type { Metadata } from "next";
import { CertificateGallery } from "@/components/certificates/certificate-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { certificates } from "@/data/portfolio";
import { Typewriter } from "@/components/ui/typewriter";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { ogImage } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Sertifikat course Haqqi AnnaZili di AI, data, cloud, dan programming.",
  alternates: {
    canonical: "/certificates",
  },
  openGraph: {
    title: "Sertifikat Haqqi AnnaZili",
    description:
      "Koleksi sertifikat course Haqqi AnnaZili di bidang AI, data, cloud, dan programming.",
    type: "website",
    url: "/certificates",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sertifikat Haqqi AnnaZili",
    description:
      "Koleksi sertifikat course Haqqi AnnaZili di bidang AI, data, cloud, dan programming.",
    images: [ogImage.url],
  },
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
        name: "Home",
        item: siteUrl.toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Certificates",
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
      "Kumpulan sertifikat course Haqqi AnnaZili di bidang AI, data, cloud, dan programming.",
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
            Credentials / {certificates.length} certificates
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            Bukti belajar,
            <span className="text-[var(--muted)]">
              {" "}
              <Typewriter
                words={[
                  "bukan garis akhir.",
                  "tapi pijakan.",
                  "bukan piala.",
                  "tapi jejak.",
                ]}
                className="text-[var(--text)]"
              />
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Setiap sertifikat mewakili fondasi baru yang saya lanjutkan melalui
            eksperimen dan proyek nyata.
          </p>
        </div>
        <CertificateGallery certificates={certificates} />
      </div>
    </section>
  );
}
