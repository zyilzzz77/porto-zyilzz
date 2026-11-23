/**
 * Tanggal konten diperbarui diambil sekali per build, bukan per request,
 * sehingga `dateModified` dan `lastmod` tidak berubah-ubah saat halaman
 * direvalidasi. Nilainya berasal dari waktu build atau commit deployment.
 */
const contentUpdatedAt = new Date(
  process.env.NEXT_PUBLIC_CONTENT_UPDATED_AT ??
    process.env.BUILD_TIME ??
    process.env.VERCEL_GIT_COMMIT_AUTHOR_DATE ??
    new Date().toISOString(),
);

export function getContentUpdatedAt() {
  return contentUpdatedAt;
}
