"use client";

import { useEffect, useRef, useState } from "react";
import type { CreativeWork } from "@/types";

const categoryLabels: Record<CreativeWork["category"], string> = {
  Photography: "Fotografi",
  Editing: "Editing & Desain",
};

type LightboxState = {
  slug: string;
  image: number;
};

export function CreativeSections({ works }: { works: CreativeWork[] }) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const activeWork = lightbox
    ? works.find((work) => work.slug === lightbox.slug) ?? null
    : null;
  const activeImages = activeWork?.images ?? [];
  const activeImage = lightbox ? activeImages[lightbox.image] : undefined;
  const activeAlt = activeImage
    ? activeImage.alt +
      (activeImages.length > 1
        ? ` (${(lightbox?.image ?? 0) + 1} dari ${activeImages.length})`
        : "")
    : "";

  useEffect(() => {
    if (!activeWork || activeImages.length === 0) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const total = activeImages.length;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightbox(null);
      }

      if (event.key === "ArrowRight") {
        setLightbox((current) =>
          current
            ? { ...current, image: (current.image + 1) % total }
            : current,
        );
      }

      if (event.key === "ArrowLeft") {
        setLightbox((current) =>
          current
            ? { ...current, image: (current.image - 1 + total) % total }
            : current,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeWork, activeImages.length]);

  return (
    <>
      <div className="creative-entries">
        {works.map((work, index) => {
          const isPair = work.images.length === 2;
          const hasPortrait = work.images.some(
            (image) => image.height > image.width,
          );
          const hasLandscape = work.images.some(
            (image) => image.width >= image.height,
          );
          const orientationClass =
            hasPortrait && hasLandscape
              ? " is-mixed"
              : hasPortrait
                ? " is-portrait"
                : "";
          const mediaClass = isPair
            ? " is-pair"
            : " is-grid" + orientationClass;
          const placeholderCount = isPair
            ? 0
            : Math.max(0, 4 - work.images.length);

          return (
            <article
              className="creative-entry"
              id={work.slug}
              key={work.slug}
              data-scroll-reveal
            >
              <header className="creative-entry-head">
                <span className="creative-entry-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="eyebrow">
                    {categoryLabels[work.category]} · {work.year}
                  </p>
                  <h3 className="creative-entry-title">{work.title}</h3>
                </div>
                <p className="creative-entry-place">{work.location}</p>
              </header>

              <div className="creative-entry-body is-wide">
                <div className={"creative-entry-media" + mediaClass}>
                  {work.images.map((image, imageIndex) => (
                    <figure className="creative-entry-figure" key={image.src}>
                      <button
                        type="button"
                        className="creative-entry-open"
                        onClick={() =>
                          setLightbox({ slug: work.slug, image: imageIndex })
                        }
                        aria-label={`Buka ${image.label ?? work.title} ukuran penuh`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                      {image.label ? (
                        <figcaption>{image.label}</figcaption>
                      ) : null}
                    </figure>
                  ))}

                  {Array.from({ length: placeholderCount }).map(
                    (_, placeholderIndex) => (
                      <div
                        className="creative-entry-placeholder"
                        key={`${work.slug}-placeholder-${placeholderIndex}`}
                        aria-hidden="true"
                      >
                        <span>Foto menyusul</span>
                      </div>
                    ),
                  )}
                </div>

                <div className="creative-entry-copy">
                  <p>{work.description}</p>
                  <dl className="creative-entry-facts">
                    <div>
                      <dt>Peran</dt>
                      <dd>{work.role}</dd>
                    </div>
                    <div>
                      <dt>Lokasi</dt>
                      <dd>{work.location}</dd>
                    </div>
                    <div>
                      <dt>Tahun</dt>
                      <dd>{work.year}</dd>
                    </div>
                    {work.tools?.length ? (
                      <div>
                        <dt>Alat</dt>
                        <dd>{work.tools.join(", ")}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {work.instagramUrl ? (
                    <a
                      href={work.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="creative-entry-link"
                    >
                      Lihat di Instagram <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {lightbox && activeWork && activeImage ? (
        <div
          className="creative-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeWork.title}
          onClick={() => setLightbox(null)}
        >
          <div
            className="creative-lightbox-inner"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="creative-lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Tutup foto"
            >
              ✕
            </button>

            <figure className="creative-lightbox-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage.src}
                alt={activeAlt}
                width={activeImage.width}
                height={activeImage.height}
                decoding="async"
              />
              <figcaption className="creative-lightbox-caption">
                <div>
                  <p className="eyebrow">
                    {categoryLabels[activeWork.category]}
                    {activeImage.label ? ` · ${activeImage.label}` : ""}
                  </p>
                  <p className="creative-lightbox-title">{activeWork.title}</p>
                  <p className="creative-lightbox-meta">
                    {activeWork.location} · {activeWork.year}
                  </p>
                </div>

                <div className="creative-lightbox-actions">
                  {activeImages.length > 1 ? (
                    <div className="creative-lightbox-nav">
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({
                            ...lightbox,
                            image:
                              (lightbox.image - 1 + activeImages.length) %
                              activeImages.length,
                          })
                        }
                        aria-label="Foto sebelumnya"
                      >
                        ←
                      </button>
                      <span>
                        {lightbox.image + 1} / {activeImages.length}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({
                            ...lightbox,
                            image: (lightbox.image + 1) % activeImages.length,
                          })
                        }
                        aria-label="Foto berikutnya"
                      >
                        →
                      </button>
                    </div>
                  ) : null}

                  {activeWork.instagramUrl ? (
                    <a
                      href={activeWork.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="creative-entry-link"
                    >
                      Instagram <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      ) : null}
    </>
  );
}
