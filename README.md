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
5. Deploy. Proyek ini tidak memerlukan environment variable untuk tampilan
   portfolio dan aktivitas GitHub publik.

Aktivitas GitHub diambil dari halaman kontribusi publik dan disegarkan setiap
lima menit. Jika GitHub tidak dapat diakses sementara, komponen menampilkan
fallback tanpa membuat seluruh halaman gagal.
