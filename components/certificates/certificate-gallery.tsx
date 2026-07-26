"use client";

import { useMemo, useState } from "react";
import { CertificateCard } from "@/components/cards/certificate-card";
import type { Certificate } from "@/types";

const filters = ["Semua", "AI & Data", "Cloud", "Programming"] as const;

export function CertificateGallery({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("Semua");

  const visible = useMemo(
    () =>
      activeFilter === "Semua"
        ? certificates
        : certificates.filter(
            (certificate) => certificate.category === activeFilter,
          ),
    [activeFilter, certificates],
  );

  return (
    <>
      <div
        className="mt-10 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter sertifikat"
        data-scroll-reveal
      >
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeFilter === filter
                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((certificate) => (
          <CertificateCard
            key={certificate.slug}
            certificate={certificate}
          />
        ))}
      </div>
    </>
  );
}
