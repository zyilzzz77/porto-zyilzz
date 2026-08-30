import type { Metadata } from "next";
import { CertificateGallery } from "@/components/certificates/certificate-gallery";
import { certificates } from "@/data/portfolio";
import { Typewriter } from "@/components/ui/typewriter";

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
  return (
    <section className="section-pad pt-36 sm:pt-44">
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
