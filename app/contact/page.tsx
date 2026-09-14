import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { profile } from "@/data/portfolio";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hubungi Haqqi AnnaZili melalui email atau WhatsApp untuk kolaborasi, peluang, dan percakapan seputar teknologi.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: pageOpenGraph({
    title: "Hubungi Haqqi AnnaZili",
    description:
      "Kontak resmi Haqqi AnnaZili untuk kolaborasi dan percakapan seputar teknologi.",
    url: "/contact",
  }),
  twitter: pageTwitter({
    title: "Hubungi Haqqi AnnaZili",
    description:
      "Kontak resmi Haqqi AnnaZili untuk kolaborasi dan percakapan seputar teknologi.",
  }),
};

export default function ContactPage() {
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
        name: "Contact",
        item: new URL("/contact", siteUrl).toString(),
      },
    ],
  };
  const whatsappUrl = `${profile.whatsapp.url}?text=${encodeURIComponent(
    "Halo Haqqi, saya melihat portfolio Anda dan ingin berdiskusi.",
  )}`;

  return (
    <section className="section-pad flex min-h-[82vh] items-center pt-36">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="content-wrap">
        <div className="cta-panel" data-scroll-reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            Mari mengubah ide
            <span className="text-[var(--muted)]"> menjadi sesuatu.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Terbuka untuk kolaborasi, proyek belajar, peluang, atau sekadar
            bertukar ide tentang teknologi dan AI.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="button button-primary"
            >
              Kirim email <span aria-hidden="true">↗</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="button button-whatsapp"
              aria-label={`Chat WhatsApp ${profile.whatsapp.display}`}
            >
              {/* Public Simple Icons asset is served directly. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.simpleicons.org/whatsapp/FFFFFF"
                alt=""
                width={19}
                height={19}
              />
              Chat WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="mt-12 grid gap-6 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-[var(--muted)]">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-2 inline-block text-lg font-semibold hover:text-[var(--accent)]"
              >
                {profile.email}
              </a>
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">WhatsApp</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-lg font-semibold hover:text-[#25d366]"
              >
                {profile.whatsapp.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
