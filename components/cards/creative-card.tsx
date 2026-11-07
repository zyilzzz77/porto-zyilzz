import Link from "next/link";
import type { CreativeWork } from "@/types";

const creativeCategoryLabels: Record<CreativeWork["category"], string> = {
  Photography: "Fotografi",
  Editing: "Editing",
};

export function CreativeCard({ work }: { work: CreativeWork }) {
  const image =
    work.images.find((item) => item.src === work.cover) ?? work.images[0];

  if (!image) {
    return null;
  }

  return (
    <figure className="creative-card">
      <Link
        className="creative-media"
        href={`/creative#${work.slug}`}
        aria-label={`Lihat ${work.title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className="creative-photo"
        />
      </Link>
      <figcaption className="creative-caption">
        <p className="creative-caption-title">{work.title}</p>
        <p className="creative-caption-meta">
          {creativeCategoryLabels[work.category]} · {work.year} · {work.location}
        </p>
        <p className="creative-caption-description">{work.description}</p>
      </figcaption>
    </figure>
  );
}
