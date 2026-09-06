import type { Metadata } from "next";
import { CertificateGallery } from "@/components/certificates/certificate-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { certificates } from "@/data/portfolio";
import { Typewriter } from "@/components/ui/typewriter";
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
  },
};

export default function CertificatesPage() {
  const siteUrl = getSiteUrl();
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
        item: new URL("/certificates", siteUrl).toString(),
      },
    ],
  };

  return (
    <section className="section-pad pt-36 sm:pt-44">
      <JsonLd data={breadcrumbJsonLd} />
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
