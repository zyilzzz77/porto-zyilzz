import type { Certificate } from "@/types";

export function CertificateCard({
  certificate,
}: {
  certificate: Certificate;
}) {
  const destination = certificate.verifyUrl ?? certificate.file ?? certificate.image;

  return (
    <article className="card">
      <a href={destination} target="_blank" rel="noreferrer" className="block">
        {/* Static certificate assets are served directly to avoid Worker image-proxy failures. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={certificate.image}
          alt={`Sertifikat ${certificate.title} milik Haqqi AnnaZili`}
          width={1000}
          height={707}
          className="certificate-image"
        />
      </a>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 text-xs text-[var(--muted)]">
          <span>{certificate.issuer}</span>
          <span>{certificate.issuedAt}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-6 tracking-[-0.02em]">
          {certificate.title}
        </h3>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="skill-chip">{certificate.category}</span>
          <a
            href={destination}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-[var(--soft)] hover:text-[var(--text)]"
          >
            Lihat <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
