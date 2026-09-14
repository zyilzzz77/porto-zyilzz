import { certificates, profile, projects } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl();
  const url = (pathname: string) => new URL(pathname, siteUrl).toString();
  const isLive = (status: string) => status === "Live";

  const body = `# Haqqi AnnaZili

> Haqqi AnnaZili (juga ditulis Haqqi Annazili) adalah siswa jurusan SIJA di SMK Negeri 69 Jakarta, Cakung, Jakarta Timur, yang mengerjakan web development full-stack dan eksplorasi AI. Ia membangun dan merilis beberapa produk web seperti exisel.web.id dan mailtemps.space.

## Fakta utama

- Nama: ${profile.name}
- Ejaan alternatif: ${profile.alternateNames.join(", ")}
- Peran: ${profile.role}
- Sekolah: SMK Negeri 69 Jakarta (SMKN 69 Jakarta), konsentrasi keahlian SIJA (Sistem Informasi Jaringan dan Aplikasi), sejak 2025
- Domisili: ${profile.location}
- Fokus: web development, programming, jaringan, dan AI
- Teknologi: React, Next.js, TypeScript, Node.js, Python, Tailwind CSS, PostgreSQL, MongoDB, AWS
- Kontak: ${profile.email}

## Halaman utama

- [Portfolio](${url("/")}): profil, proyek pilihan, sertifikat, dan ringkasan perjalanan belajar.
- [Proyek](${url("/projects")}): daftar proyek web yang dibangun.
- [Perjalanan](${url("/experience")}): riwayat pendidikan dan pembelajaran.
- [Sertifikat](${url("/certificates")}): kredensial course yang sudah diselesaikan.
- [SMKN 69 Jakarta](${url("/experience/smkn-69-jakarta")}): profil sekolah, lokasi, jurusan SIJA, dan keterkaitannya dengan Haqqi AnnaZili.
- [Kontak](${url("/contact")}): email dan WhatsApp.

## Proyek

${projects
  .map(
    (project) =>
      `- ${project.title}: ${project.description}${
        isLive(project.status) && project.href
          ? ` Tersedia di ${project.href}`
          : " (demo sedang tidak aktif)"
      }`,
  )
  .join("\n")}

## Sertifikat

${certificates
  .map(
    (certificate) =>
      `- ${certificate.title} dari ${certificate.issuer} (${certificate.issuedAt})${
        certificate.verifyUrl
          ? ` — verifikasi: ${certificate.verifyUrl}`
          : ""
      }`,
  )
  .join("\n")}

## Catatan situs

- Repositori GitHub: ${profile.github.url}
- Instagram: ${profile.instagram.url}
- Sitemap: ${url("/sitemap.xml")}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
