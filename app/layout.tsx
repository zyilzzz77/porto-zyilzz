import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { AmbientSky } from "@/components/ui/ambient-sky";
import { RouteTransition } from "@/components/ui/route-transition";
import { ogImage } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

const themeInitializationScript = `
  (() => {
    const storageKey = "haqqi-portfolio-theme";
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";

    try {
      const savedTheme = window.localStorage.getItem(storageKey);
      document.documentElement.dataset.theme =
        savedTheme === "light" || savedTheme === "dark"
          ? savedTheme
          : systemTheme;
    } catch {
      document.documentElement.dataset.theme = systemTheme;
    }
  })();
`;

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: siteUrl,
    title: {
      default:
        "Haqqi AnnaZili — SIJA Student & Web Developer | SMKN 69 Jakarta",
      template: "%s | Haqqi AnnaZili",
    },
    description:
      "Portfolio Haqqi AnnaZili, siswa SIJA di SMKN 69 Jakarta yang menekuni web development, programming, dan AI melalui proyek dan sertifikat di Jakarta.",
    applicationName: "Haqqi AnnaZili Portfolio",
    authors: [{ name: "Haqqi AnnaZili", url: new URL("/", siteUrl) }],
    creator: "Haqqi AnnaZili",
    publisher: "Haqqi AnnaZili",
    category: "technology",
    keywords: [
      "Haqqi AnnaZili",
      "Haqqi AnnaZili portfolio",
      "Haqqi AnnaZili SMKN 69 Jakarta",
      "Haqqi AnnaZili SIJA",
      "SIJA SMKN 69 Jakarta",
      "Sistem Informasi Jaringan dan Aplikasi",
      "SMKN 69 Jakarta",
      "SMK Negeri 69 Jakarta",
      "web developer Jakarta",
      "portfolio developer Indonesia",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION
        ? { google: process.env.GOOGLE_SITE_VERIFICATION }
        : {}),
      ...(process.env.BING_SITE_VERIFICATION
        ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
        : {}),
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Haqqi AnnaZili — SIJA Student & Web Developer | SMKN 69 Jakarta",
      description:
        "Portfolio Haqqi AnnaZili, siswa SIJA di SMKN 69 Jakarta yang menekuni web development, programming, dan AI melalui proyek dan sertifikat.",
      type: "website",
      locale: "id_ID",
      url: siteUrl,
      siteName: "Haqqi AnnaZili Portfolio",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "Haqqi AnnaZili — SIJA Student & Web Developer | SMKN 69 Jakarta",
      description:
        "Portfolio Haqqi AnnaZili, siswa SIJA di SMKN 69 Jakarta yang menekuni web development, programming, dan AI.",
      images: [ogImage.url],
    },
    other: {
      "geo.region": "ID-JK",
      "geo.placename": "Jakarta",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();
  const personId = new URL("/#person", siteUrl).toString();
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": new URL("/#website", siteUrl).toString(),
    url: siteUrl.toString(),
    name: "Haqqi AnnaZili Portfolio",
    alternateName: ["Portfolio Haqqi AnnaZili", "Haqqi AnnaZili"],
    description:
      "Portfolio pribadi Haqqi AnnaZili tentang pengembangan web, AI, proyek, sertifikat, dan perjalanan di SMKN 69 Jakarta.",
    inLanguage: ["id-ID", "en"],
    copyrightHolder: { "@id": personId },
    publisher: { "@id": personId },
    about: { "@id": personId },
  };

  return (
    <html
      lang="id"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-initialization" strategy="beforeInteractive">
          {themeInitializationScript}
        </Script>
        <JsonLd data={websiteJsonLd} />
        <AmbientSky />
        <div className="site-shell">
          <SiteHeader />
          <RouteTransition>
            <main>{children}</main>
            <SiteFooter />
          </RouteTransition>
        </div>
      </body>
    </html>
  );
}
