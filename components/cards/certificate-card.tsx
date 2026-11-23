import type { Certificate } from "@/types";

export function CertificateCard({
  certificate,
}: {
  certificate: Certificate;
}) {
  const destination = certificate.verifyUrl ?? certificate.file ?? certificate.image;

  return (
    <article className="card" data-scroll-reveal>
      <a href={destination} target="_blank" rel="noreferrer" className="block">
        {/* Static certificate assets are served directly to avoid Worker image-proxy failures. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={certificate.image}
          alt={`Sertifikat ${certificate.title} milik Haqqi AnnaZili`}
          width={1000}
          height={707}
          loading="lazy"
          decoding="async"
          className="certificate-image"
        />
      </a>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-[var(--muted)]">
          <span className="min-w-0">{certificate.issuer}</span>
          <span className="shrink-0">{certificate.issuedAt}</span>
        </div>
        <h3 className="mt-4 text-base font-semibold leading-6 tracking-[-0.02em] sm:text-lg">
          {certificate.title}
        </h3>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <span className="skill-chip">
            {certificate.category === "Programming"
              ? "Pemrograman"
              : certificate.category}
          </span>
          <a
            href={destination}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--soft)] hover:text-[var(--text)]"
            aria-label={`Buka sertifikat ${certificate.title}`}
          >
            Lihat <span className="sr-only">sertifikat {certificate.title}</span>{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
