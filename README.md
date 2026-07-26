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
5. Tambahkan environment variable berikut bila memakai custom domain:

   ```text
   NEXT_PUBLIC_SITE_URL=https://domain-kamu.com
   ```

   Tanpa variabel tersebut, proyek otomatis memakai production URL dari
   Vercel. Jangan isi dengan URL localhost untuk deployment production.
6. Deploy.

## SEO dan indexing

- `robots.txt`, `sitemap.xml`, canonical URL, Open Graph, Web App Manifest,
  serta schema Person, WebSite, School, Breadcrumb, dan FAQ dibuat otomatis.
- Setelah website sudah online dan bisa diakses publik, daftarkan domain ke
  Google Search Console lalu submit `https://domain-kamu.com/sitemap.xml`.
- Gunakan URL Inspection untuk meminta indexing halaman `/` dan
  `/experience/smkn-69-jakarta`.
- Jika Search Console memberi verification token, tambahkan:

  ```text
  GOOGLE_SITE_VERIFICATION=token_dari_google
  ```
- Lakukan langkah serupa di Bing Webmaster Tools agar website memiliki jalur
  penemuan tambahan.

Aktivitas GitHub diambil dari halaman kontribusi publik dan disegarkan setiap
lima menit. Jika GitHub tidak dapat diakses sementara, komponen menampilkan
fallback tanpa membuat seluruh halaman gagal.
