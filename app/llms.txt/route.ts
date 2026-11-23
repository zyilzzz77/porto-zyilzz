import { creativeWorks } from "@/data/creative";
import { certificates, profile, projects } from "@/data/portfolio";
import { getContentUpdatedAt } from "@/lib/content-meta";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl();
  const url = (pathname: string) => new URL(pathname, siteUrl).toString();
  const isLive = (status: string) => status === "Live";

  const body = `# Haqqi AnnaZili

> Haqqi AnnaZili (juga ditulis Haqqi Annazili) adalah siswa konsentrasi SIJA di SMK Negeri 69 Jakarta, Cakung, Jakarta Timur, yang bergerak di IT support, pengembangan web full-stack, dan eksplorasi AI. Ia membangun dan merilis beberapa produk web seperti pay.lydev.id (payment gateway QRIS yang ia kembangkan sendiri), exisel.web.id, dan mailtemps.space.

## Fakta utama

- Nama: ${profile.name}
- Ejaan alternatif: ${profile.alternateNames.join(", ")}
- Peran: ${profile.role}
- Sekolah: SMK Negeri 69 Jakarta (SMKN 69 Jakarta), konsentrasi keahlian SIJA (Sistem Informasi Jaringan dan Aplikasi), sejak 2025
- Domisili: ${profile.location}
- Fokus: IT support, pengembangan web, pemrograman, jaringan, dan AI
- Teknologi: React, Next.js, TypeScript, Node.js, Python, Tailwind CSS, PostgreSQL, MongoDB, AWS
- Jaringan & sistem: Cisco IOS, Cisco Packet Tracer, konfigurasi access point dan switch, web server Debian, perbaikan perangkat laptop
- Kontak: ${profile.email}

## Halaman utama

- [Portofolio](${url("/")}): profil, proyek pilihan, sertifikat, dan ringkasan perjalanan belajar.
- [Proyek](${url("/projects")}): daftar proyek web dan lab server Debian di VirtualBox.
- [Kreatif](${url("/creative")}): karya fotografi, potret siswa, dan hasil editing foto serta video di SMKN 69 Jakarta.
- [Perjalanan](${url("/experience")}): riwayat pendidikan dan pembelajaran.
- [Sertifikat](${url("/certificates")}): kredensial pelatihan yang telah diselesaikan.
- [SMKN 69 Jakarta](${url("/experience/smkn-69-jakarta")}): profil sekolah, lokasi, jurusan SIJA, dan keterkaitannya dengan Haqqi AnnaZili.
- [Kontak](${url("/contact")}): email dan WhatsApp.

## Proyek

${projects
  .map(
    (project) =>
      `- ${project.title}: ${project.description}${
        isLive(project.status) && project.href
          ? ` Tersedia di ${project.href}`
          : project.availabilityNote
            ? ` ${project.availabilityNote}`
            : ""
      }`,
  )
  .join("\n")}

## Karya kreatif

${creativeWorks
  .map(
    (work) =>
      `- ${work.title} (${work.category}, ${work.year}, ${work.location}): ${work.description}${
        work.tools?.length ? ` Alat: ${work.tools.join(", ")}.` : ""
      }${work.instagramUrl ? ` Instagram: ${work.instagramUrl}` : ""}`,
  )
  .join("\n")}

## Sertifikat

${certificates
  .map(
    (certificate) =>
      `- ${certificate.title} dari ${certificate.issuer} (${certificate.issuedAt})${
        certificate.verifyUrl
          ? `, verifikasi: ${certificate.verifyUrl}`
          : ""
      }`,
  )
  .join("\n")}

## Catatan situs

- Repositori GitHub: ${profile.github.url}
- Instagram: ${profile.instagram.url}
- Kontak: ${profile.email} (email, dibalas setiap hari)
- Diperbarui: ${getContentUpdatedAt().toISOString().slice(0, 10)}
- Sitemap: ${url("/sitemap.xml")}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
