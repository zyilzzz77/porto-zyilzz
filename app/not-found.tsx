import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="section-pad flex min-h-[82vh] items-center pt-36">
      <div className="content-wrap">
        <p className="eyebrow">Kesalahan 404</p>
        <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
          Halaman yang dicari tidak tersedia.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Tautan mungkin sudah berubah atau alamatnya salah ketik. Silakan
          kembali ke beranda, melihat daftar proyek, atau menghubungi saya.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="button button-primary">
            Kembali ke beranda <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/projects" className="button button-secondary">
            Lihat proyek <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/contact" className="button button-secondary">
            Hubungi saya <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
