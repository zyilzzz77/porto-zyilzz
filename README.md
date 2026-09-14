# Haqqi AnnaZili — Portfolio

Portfolio personal berbasis Next.js, TypeScript, dan Tailwind CSS.

## Menjalankan secara lokal

```bash
pnpm install
pnpm dev
```

Buka `http://localhost:3000`.

## Pemeriksaan proyek

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Deploy ke Vercel

1. Push repository ini ke GitHub.
2. Import repository dari dashboard Vercel.
3. Pilih framework preset **Next.js**.
4. Gunakan perintah build `pnpm build` dan biarkan output directory pada
   pengaturan bawaan Next.js.
5. Tambahkan environment variable berikut:

   ```text
   NEXT_PUBLIC_SITE_URL=https://zyilzz.my.id
   ```

   Tanpa variabel tersebut, proyek memakai `VERCEL_PROJECT_PRODUCTION_URL`,
   lalu jatuh ke `https://zyilzz.my.id` saat production build. Nilai ini
   penting agar canonical dan sitemap tidak menunjuk ke URL preview deployment.
6. Deploy.

## SEO dan indexing

- `robots.txt`, `sitemap.xml`, `llms.txt`, canonical URL, Open Graph, Twitter
  Card, Web App Manifest, serta schema Person, WebSite, ProfilePage,
  CollectionPage, ItemList, School, Breadcrumb, dan FAQ dibuat otomatis.
- `llms.txt` menyediakan ringkasan faktual situs untuk AI answer engine
  (ChatGPT, Perplexity, Gemini). Isinya diambil langsung dari
  `data/portfolio.ts`, jadi tidak perlu diperbarui manual.
- Canonical dan sitemap memakai `NEXT_PUBLIC_SITE_URL`. Isi variabel ini di
  Vercel dengan `https://zyilzz.my.id`.
- `lastModified` pada sitemap dihitung otomatis dari tanggal berjalan dengan
  revalidasi 24 jam. Schema `dateModified` juga ikut otomatis.
- Setelah website online dan bisa diakses publik, daftarkan domain ke Google
  Search Console lalu submit `https://zyilzz.my.id/sitemap.xml`.
- Gunakan URL Inspection untuk meminta indexing halaman `/` dan
  `/experience/smkn-69-jakarta`.
- Jika Search Console memberi verification token, tambahkan:

  ```text
  GOOGLE_SITE_VERIFICATION=token_dari_google
  BING_SITE_VERIFICATION=token_dari_bing
  ```

- Lakukan langkah serupa di Bing Webmaster Tools agar website memiliki jalur
  penemuan tambahan dan muncul di jawaban Bing Copilot.

Aktivitas GitHub diambil dari halaman kontribusi publik dan disegarkan setiap
lima menit. Jika GitHub tidak dapat diakses sementara, komponen menampilkan
fallback tanpa membuat seluruh halaman gagal.
