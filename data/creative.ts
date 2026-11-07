import type { CreativeWork } from "@/types";

/**
 * Karya fotografi & editing.
 *
 * Cara menambah karya:
 * 1. Taruh file foto di public/creative/ (WebP, sisi terpanjang ~2000px).
 *    Sertakan juga versi JPG bila gambar dipakai sebagai OG image.
 * 2. Isi images dengan src, alt, width, dan height sesuai file asli.
 *    Untuk before/after, masukkan dua gambar dan isi label-nya.
 * 3. Hapus placeholder: true supaya gambar bisa dibuka di lightbox.
 * 4. Untuk hasil editing yang dipublikasikan di Instagram, isi instagramUrl.
 */
export const creativeWorks: CreativeWork[] = [
  {
    slug: "dokumentasi-kegiatan-sekolah",
    title: "Dokumentasi Kegiatan Sekolah",
    category: "Photography",
    description:
      "Liputan acara Peringatan Maulid Nabi di SMKN 69 Jakarta: penampilan rebana, pidato di mimbar, barisan siswi, sampai layar OBS yang dipakai untuk siaran. Empat foto ini dipilih dari liputan lapangan lalu dirapikan warnanya.",
    year: "2026",
    location: "SMKN 69 Jakarta",
    role: "Fotografer",
    images: [
      {
        src: "/creative/dokumentasi-siswa-smkn-69-01.webp",
        alt: "Siswa SMKN 69 Jakarta memainkan rebana di bawah tenda biru saat acara sekolah",
        width: 1600,
        height: 900,
      },
      {
        src: "/creative/dokumentasi-siswa-smkn-69-02.webp",
        alt: "Siswa SMKN 69 Jakarta berpidato di mimbar dengan banner Peringatan Maulid Nabi",
        width: 1600,
        height: 900,
      },
      {
        src: "/creative/dokumentasi-siswa-smkn-69-03.webp",
        alt: "Layar laptop menampilkan OBS Studio dengan preview siaran acara Maulid Nabi di SMKN 69 Jakarta",
        width: 1600,
        height: 1066,
      },
      {
        src: "/creative/dokumentasi-siswa-smkn-69-04.webp",
        alt: "Siswi SMKN 69 Jakarta berbaris di bawah tenda biru saat acara sekolah",
        width: 1600,
        height: 1066,
      },
    ],
    tools: ["Kamera", "Lightroom"],
  },
  {
    slug: "recap-dokumentasi-gladi-tka",
    title: "Rekap Dokumentasi Gladi TKA",
    category: "Editing",
    description:
      "Foto mentah dari lab komputer SMKN 69 Jakarta diolah menjadi poster rekap dokumentasi Gladi Tes Kemampuan Akademik. Prosesnya mencakup seleksi foto, penyusunan layout polaroid, penyesuaian warna, dan penataan tipografi.",
    year: "2026",
    location: "SMKN 69 Jakarta",
    role: "Fotografer & Editor",
    cover: "/creative/recap-gladi-tka-poster.webp",
    images: [
      {
        src: "/creative/recap-gladi-tka-original.webp",
        alt: "Siswa SMKN 69 Jakarta mengerjakan tes di lab komputer, tampak dari samping",
        width: 1400,
        height: 2494,
        label: "Asli",
      },
      {
        src: "/creative/recap-gladi-tka-poster.webp",
        alt: "Poster Recap Dokumentasi Gladi Tes Kemampuan Akademik SMKN 69 Jakarta berisi kolase foto siswa di lab komputer",
        width: 1080,
        height: 1440,
        label: "Hasil editing",
      },
    ],
  },
  {
    slug: "street-photography",
    title: "Street Photography",
    category: "Photography",
    description:
      "Street photography di Jakarta: suasana Stasiun Jakarta, gedung Jasindo di Kota Tua, dan Galeri MRT di balik pepohonan. Empat frame yang merekam ritme kota dari pagi sampai siang.",
    year: "2026",
    location: "Jakarta",
    role: "Fotografer",
    images: [
      {
        src: "/creative/cahaya-pagi-stasiun.webp",
        alt: "Deretan gate tiket di peron stasiun Jakarta saat pagi, lantai memantulkan cahaya matahari",
        width: 1200,
        height: 1600,
      },
      {
        src: "/creative/street-photography-stasiun-jakarta.webp",
        alt: "Penumpang berjalan di hall Stasiun Jakarta di bawah langit-langit melengkung",
        width: 1100,
        height: 1650,
      },
      {
        src: "/creative/street-photography-gedung-jasindo.webp",
        alt: "Gedung Jasindo di kawasan Kota Tua Jakarta dengan atap merah dan lapangan di depannya",
        width: 1600,
        height: 2400,
      },
      {
        src: "/creative/street-photography-galeri-mrt-jakarta.webp",
        alt: "Fasad Galeri MRT Jakarta di balik pepohonan dan pagar besi",
        width: 1600,
        height: 900,
      },
    ],
    tools: ["Kamera", "Lightroom"],
  },
];
