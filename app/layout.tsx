import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "haqqiannazili.dev";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const siteUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: siteUrl,
    title: {
      default: "Haqqi AnnaZili - Developer & AI Explorer",
      template: "%s - Haqqi AnnaZili",
    },
    description:
      "Portofolio Haqqi AnnaZili: developer muda yang membangun produk web, otomasi, dan solusi berbasis AI.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Haqqi AnnaZili - Developer & AI Explorer",
      description:
        "Membangun pengalaman digital yang cepat, berguna, dan terasa manusiawi.",
      type: "website",
      locale: "id_ID",
      images: [
        {
          url: new URL("/og.png", siteUrl),
          width: 1728,
          height: 909,
          alt: "Haqqi AnnaZili - Developer & AI Explorer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Haqqi AnnaZili - Developer & AI Explorer",
      description:
        "Membangun pengalaman digital yang cepat, berguna, dan terasa manusiawi.",
      images: [new URL("/og.png", siteUrl)],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
