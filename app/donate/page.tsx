import type { Metadata } from "next";
import { desc, eq, sql } from "drizzle-orm";
import { DonateForm } from "@/components/donate/donate-form";
import { JsonLd } from "@/components/seo/json-ld";
import { WordRotator } from "@/components/ui/word-rotator";
import { getDb } from "@/db/postgres";
import { donations } from "@/db/schema";
import { getContentUpdatedAt } from "@/lib/content-meta";
import {
  MAX_DONATION_AMOUNT,
  MAX_DONATION_MESSAGE_LENGTH,
  MAX_DONOR_NAME_LENGTH,
  MIN_DONATION_AMOUNT,
} from "@/lib/lypay";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Dukung pengembangan website dan proyek belajar Haqqi AnnaZili lewat donasi QRIS, plus lihat leaderboard donatur.",
  alternates: {
    canonical: "/donate",
  },
  openGraph: pageOpenGraph({
    title: "Donate untuk Haqqi AnnaZili",
    description:
      "Donasi QRIS untuk mendukung development website, server, dan biaya belajar Haqqi AnnaZili.",
    url: "/donate",
  }),
  twitter: pageTwitter({
    title: "Donate untuk Haqqi AnnaZili",
    description:
      "Donasi QRIS untuk mendukung development website, server, dan biaya belajar Haqqi AnnaZili.",
  }),
};

const donationPurposes = [
  {
    title: "Server & domain",
    description:
      "Biaya hosting dan domain supaya project yang saya buat tetap bisa diakses.",
  },
  {
    title: "API & AI tools",
    description:
      "Kredit API dan tools AI untuk eksperimen machine learning dan generative AI.",
  },
  {
    title: "Alat belajar",
    description:
      "Kursus, sertifikat, dan resource untuk skill yang sedang saya bangun.",
  },
];

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

async function loadDonationData() {
  try {
    const db = getDb();

    const [leaderboard, recent] = await Promise.all([
      db
        .select({
          name: sql<string>`lower(trim(${donations.donorName}))`,
          displayName: sql<string>`max(${donations.donorName})`,
          total: sql<number>`sum(${donations.amount})::int`,
          count: sql<number>`count(*)::int`,
        })
        .from(donations)
        .where(eq(donations.status, "PAID"))
        .groupBy(sql`lower(trim(${donations.donorName}))`)
        .orderBy(desc(sql`sum(${donations.amount})`))
        .limit(10),
      db
        .select({
          name: donations.donorName,
          amount: donations.amount,
          paidAt: donations.paidAt,
        })
        .from(donations)
        .where(eq(donations.status, "PAID"))
        .orderBy(desc(donations.paidAt))
        .limit(8),
    ]);

    return { leaderboard, recent, unavailable: false };
  } catch (error) {
    // Halaman tetap tampil dengan form walau database belum dikonfigurasi.
    console.error("Gagal memuat data donasi:", error);

    return { leaderboard: [], recent: [], unavailable: true };
  }
}

export default async function DonatePage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL("/donate", siteUrl).toString();
  const { leaderboard, recent, unavailable } = await loadDonationData();

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
        name: "Donate",
        item: pageUrl,
      },
    ],
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Donate untuk Haqqi AnnaZili",
    description:
      "Halaman dukungan dana untuk development website dan proyek belajar Haqqi AnnaZili, dengan donasi QRIS dan leaderboard donatur.",
    inLanguage: "id-ID",
    dateModified: getContentUpdatedAt().toISOString(),
    isPartOf: {
      "@id": new URL("/#website", siteUrl).toString(),
    },
    about: {
      "@id": new URL("/#person", siteUrl).toString(),
    },
  };

  return (
    <section className="section-pad pt-36 sm:pt-44">
      <JsonLd data={[breadcrumbJsonLd, webPageJsonLd]} />
      <div className="content-wrap">
        <div data-scroll-reveal>
          <p className="eyebrow">Donate</p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            Kalau portfolionya membantu,
            <span className="text-[var(--muted)]">
              {" "}
              <WordRotator
                words={["boleh dibalas.", "balik lagi.", "boleh dibayar."]}
                className="text-[var(--text)]"
              />
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Semua project di portfolio ini saya kerjakan sendiri, jadi donasi
            ini langsung dipakai untuk server, API, dan biaya belajar.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="cta-panel" data-scroll-reveal>
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">
              Isi data donasi
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Isi nama dan nominal, lalu tekan konfirmasi. Halaman pembayaran
              QRIS dibuka di tab baru, dan leaderboard di halaman ini ikut
              diperbarui begitu pembayaran selesai.
            </p>

            <div className="mt-7">
              <DonateForm
                minimumAmount={MIN_DONATION_AMOUNT}
                maximumAmount={MAX_DONATION_AMOUNT}
              />
            </div>
          </div>

          <div className="space-y-6">
            <section
              className="donate-card"
              aria-labelledby="leaderboard-heading"
              data-scroll-reveal
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2
                  id="leaderboard-heading"
                  className="text-xl font-semibold tracking-[-0.03em]"
                >
                  Leaderboard
                </h2>
                <span className="eyebrow">Top {leaderboard.length || 10}</span>
              </div>

              {leaderboard.length > 0 ? (
                <ol className="mt-5">
                  {leaderboard.map((entry, index) => (
                    <li key={entry.name} className="leaderboard-row">
                      <span className="leaderboard-rank" aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className="leaderboard-name">
                        {entry.displayName}
                        <span className="leaderboard-meta">
                          {entry.count} donasi
                        </span>
                      </span>
                      <span className="leaderboard-total">
                        {rupiahFormatter.format(entry.total)}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {unavailable
                    ? "Leaderboard belum aktif karena database belum terhubung."
                    : "Belum ada donasi yang tercatat. Kamu bisa jadi yang pertama."}
                </p>
              )}
            </section>

            {recent.length > 0 ? (
              <section
                className="donate-card"
                aria-labelledby="recent-heading"
                data-scroll-reveal
              >
                <h2
                  id="recent-heading"
                  className="text-xl font-semibold tracking-[-0.03em]"
                >
                  Donasi terbaru
                </h2>
                <ul className="mt-5 space-y-3">
                  {recent.map((entry) => (
                    <li
                      key={`${entry.name}-${entry.paidAt?.toISOString() ?? ""}`}
                      className="flex items-baseline justify-between gap-4 text-sm"
                    >
                      <span className="text-[var(--soft)]">{entry.name}</span>
                      <span className="font-semibold">
                        {rupiahFormatter.format(entry.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="donate-card" data-scroll-reveal>
              <h2 className="eyebrow">Dana saya dipakai untuk</h2>
              <ul className="mt-5 space-y-4">
                {donationPurposes.map((purpose) => (
                  <li key={purpose.title}>
                    <p className="text-sm font-semibold">{purpose.title}</p>
                    <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                      {purpose.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <p
          className="mt-12 border-t border-[var(--line)] pt-6 text-sm leading-6 text-[var(--muted)]"
          data-scroll-reveal
        >
          Pembayaran diproses lewat QRIS. Nama yang kamu isi maksimal{" "}
          {MAX_DONOR_NAME_LENGTH} karakter dan pesan maksimal{" "}
          {MAX_DONATION_MESSAGE_LENGTH} karakter, keduanya tampil di halaman
          ini. Status donasi hanya berubah menjadi lunas setelah pembayaran
          dikonfirmasi penyedia QRIS.
        </p>
      </div>
    </section>
  );
}
