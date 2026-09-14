import type { Metadata } from "next";

export const siteName = "Haqqi AnnaZili Portfolio";

export const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Haqqi AnnaZili — SIJA Student & Web Developer | SMKN 69 Jakarta",
};

type OpenGraphInput = {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  images?: NonNullable<Metadata["openGraph"]>["images"];
};

type TwitterInput = {
  title: string;
  description: string;
  images?: string[];
};

export function pageOpenGraph({
  title,
  description,
  url,
  type = "website",
  images = [ogImage],
}: OpenGraphInput) {
  return {
    title,
    description,
    url,
    type,
    siteName,
    locale: "id_ID",
    images,
  };
}

export function pageTwitter({
  title,
  description,
  images = [ogImage.url],
}: TwitterInput) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images,
  };
}
