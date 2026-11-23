import type { Certificate, Experience, Project } from "@/types";

export const profile = {
  name: "Haqqi AnnaZili",
  alternateNames: ["Haqqi Annazili", "Haqqi Anna Zili"],
  location: "Jakarta, Indonesia",
  role: "IT Support & Web Developer",
  email: "lily@lydev.id",
  whatsapp: {
    display: "+62 838-7274-9541",
    url: "https://wa.me/6283872749541",
  },
  instagram: {
    handle: "@zlyzyzz",
    url: "https://www.instagram.com/zlyzyzz/",
  },
  github: {
    handle: "@zyilzzz77",
    url: "https://github.com/zyilzzz77",
  },
};

export const hardSkills = [
  "IT Support",
  "Web Development",
  "Frontend Development",
  "Backend & API",
  "TypeScript & JavaScript",
  "Python",
  "Database (SQL & NoSQL)",
  "Cloud & Deployment",
  "Computer Networking",
  "Cisco IOS & Packet Tracer",
  "Linux Server (Debian)",
  "Machine Learning",
  "Generative AI",
  "Automation",
];

export const softSkills = [
  "Pemecahan Masalah",
  "Berpikir Kritis",
  "Cepat Belajar",
  "Manajemen Waktu",
  "Kerja Sama Tim",
  "Komunikasi",
  "Teliti dan Rapi",
  "Adaptif",
];

export const technologies = [
  {
    name: "React.js",
    href: "https://react.dev/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    href: "https://nextjs.org/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    monochrome: true,
  },
  {
    name: "Express.js",
    href: "https://expressjs.com/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    monochrome: true,
  },
  {
    name: "Golang",
    href: "https://go.dev/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
  },
  {
    name: "Hono",
    href: "https://hono.dev/",
    icon: "https://cdn.simpleicons.org/hono/E36002",
  },
  {
    name: "Node.js",
    href: "https://nodejs.org/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "AWS",
    href: "https://aws.amazon.com/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    monochrome: true,
  },
  {
    name: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    href: "https://www.typescriptlang.org/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "Prisma",
    href: "https://www.prisma.io/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    monochrome: true,
  },
  {
    name: "MongoDB",
    href: "https://www.mongodb.com/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    href: "https://www.postgresql.org/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Manifest V3",
    href: "https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg",
  },
  {
    name: "React Native",
    href: "https://reactnative.dev/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Redis",
    href: "https://redis.io/",
    icon: "https://cdn.simpleicons.org/redis/FF4438",
  },
  {
    name: "Docker",
    href: "https://www.docker.com/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  },
  {
    name: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
];

export const projects: Project[] = [
  {
    slug: "ular-tangga-sejarah-pendudukan-jepang",
    title: "Ular Tangga Sejarah: Pendudukan Jepang",
    description:
      "Media pembelajaran sejarah interaktif bertema masa pendudukan Jepang di Indonesia (1942-1945). Permainan ular tangga tiga dimensi untuk 2-4 pemain ini memadukan kartu soal berbatas waktu, tangga perjuangan, dan ular penindasan yang membawa pion menuju Proklamasi 17 Agustus 1945.",
    category: "Platform Pembelajaran",
    status: "Live",
    tags: [
      "Media Pembelajaran Interaktif",
      "Papan Permainan 3D",
      "Kuis Sejarah",
      "Dadu Real-Time",
    ],
    image: "/projects/ular-tangga-sejarah-jepang.png",
    href: "https://ulartanggapenjajahanjepanghusanzili.vercel.app/",
  },
  {
    slug: "lydev-pay",
    title: "pay.lydev.id",
    description:
      "Payment gateway QRIS dengan REST API untuk membuat transaksi, memeriksa status, dan menerima webhook, serta dashboard untuk mengelola project dan kunci API.",
    category: "Payment Gateway",
    status: "Live",
    tags: ["Pembayaran QRIS", "REST API", "Webhook", "Dasbor Merchant"],
    image: "/projects/lydev-pay.jpg",
    href: "https://pay.lydev.id/",
  },
  {
    slug: "exisel-web-id",
    title: "exisel.web.id",
    description:
      "Platform ekstrakurikuler terpadu yang membantu siswa menemukan informasi ekstrakurikuler, bertanya melalui ExsiBot, melakukan absensi dengan barcode, dan mendaftar kegiatan dalam satu tempat.",
    category: "Platform Sekolah",
    status: "Live",
    tags: [
      "Direktori Ekstrakurikuler",
      "ExsiBot",
      "Absensi Barcode",
      "Pendaftaran",
    ],
    image: "/projects/exisel-web-id.png",
    href: "https://exisel.web.id/",
  },
  {
    slug: "mailtemps-space",
    title: "mailtemps.space",
    description:
      "Layanan email sementara gratis yang membuat alamat email sekali pakai tanpa registrasi. Kotak masuk sementara dapat menerima email verifikasi, tidak memuat pelacak pihak ketiga, dan kedaluwarsa secara otomatis.",
    category: "Utilitas Web",
    status: "Live",
    tags: [
      "Email Sementara",
      "Email Sekali Pakai",
      "Kotak Masuk Terima Saja",
      "Kedaluwarsa Otomatis",
    ],
    image: "/projects/mailtemps-space.png",
    href: "https://mailtemps.space/",
  },
  {
    slug: "jejak-bangsa",
    title: "Jejak Bangsa",
    description:
      "Media pembelajaran sejarah interaktif tentang Pergerakan Nasional Indonesia 1900-1928, dilengkapi materi ringkas, kumpulan video, e-book 15 halaman, dan kuis 10 soal yang dinilai secara otomatis.",
    category: "Platform Pembelajaran",
    status: "Live",
    tags: [
      "Media Pembelajaran Interaktif",
      "Materi Sejarah",
      "E-book",
      "Kuis Nilai Otomatis",
    ],
    image: "/projects/web-mapel-namsel.png",
    href: "https://web-mapel-namsel.vercel.app/",
  },
  {
    slug: "lab-web-server-debian-virtualbox",
    title: "Lab Web Server Debian di VirtualBox",
    description:
      "Praktik konfigurasi web server Debian pada mesin virtual VirtualBox untuk memperdalam administrasi server Linux dan pengelolaan layanan web dalam lingkungan virtual.",
    category: "Administrasi Server",
    status: "Exploration",
    tags: ["Debian", "VirtualBox", "Web Server", "Linux"],
    availabilityNote:
      "Lab menggunakan mesin virtual dan tidak menyediakan tautan demo publik.",
  },
  {
    slug: "archivejkt48-app",
    title: "archivejkt48.app",
    description:
      "Arsip foto dan video JKT48 lintas generasi dengan fitur pencarian dan filter. Dirancang untuk merapikan koleksi yang tersebar di banyak folder.",
    category: "Arsip Digital",
    status: "Temporarily Offline",
    tags: ["Arsip Media", "Pencarian & Filter", "Web Responsif"],
    availabilityNote:
      "Demo belum tersedia karena masa aktif server belum diperpanjang.",
  },
  {
    slug: "bikinqrisdinamis-app",
    title: "bikinqrisdinamis.app",
    description:
      "Eksperimen alur QRIS dinamis: membuat transaksi, menampilkan kode pembayaran, lalu memantau statusnya melalui webhook.",
    category: "Integrasi Pembayaran",
    status: "Temporarily Offline",
    tags: ["QRIS Dinamis", "Payment Gateway", "Alur Transaksi"],
    availabilityNote:
      "Demo belum tersedia karena masa aktif server belum diperpanjang.",
  },
  {
    slug: "inversave-space",
    title: "inversave.space",
    description:
      "Alat untuk mengunduh video dari beberapa platform media sosial melalui satu alur kerja: tempelkan tautan, pilih format, lalu unduh.",
    category: "Utilitas Media",
    status: "Temporarily Offline",
    tags: ["Pemrosesan Media", "Platform Media Sosial", "Alur Unduh"],
    availabilityNote:
      "Demo belum tersedia karena masa aktif server belum diperpanjang.",
  },
];

export const experiences: Experience[] = [
  {
    period: "2025 - Sekarang",
    title: "Siswa SIJA",
    organization: "SMKN 69 Jakarta",
    logo: "/logos/smkn-69-jakarta.png",
    logoAlt: "Logo SMK Negeri 69 Jakarta",
    href: "/experience/smkn-69-jakarta",
    description:
      "Mempelajari Sistem Informasi Jaringan dan Aplikasi, dengan porsi praktik yang besar pada pemrograman dan pengembangan aplikasi.",
    highlights: [
      "Mengembangkan fondasi pemrograman dan sistem",
      "Aktif mengerjakan tugas berbasis proyek",
    ],
  },
  {
    period: "2026 - Sekarang",
    title: "Developer Independen",
    organization: "Proyek pribadi",
    description:
      "Mengembangkan produk web dan bot sambil memperdalam arsitektur aplikasi, pengalaman pengguna, dan deployment.",
    highlights: [
      "Mengembangkan proyek end-to-end dari ide hingga prototipe",
      "Bereksperimen dengan otomasi, integrasi API, dan AI",
    ],
  },
  {
    period: "2026",
    title: "Jaringan Komputer & IT Support",
    organization: "Praktik mandiri · SMKN 69 Jakarta",
    description:
      "Menyusun topologi jaringan pada Cisco Packet Tracer, mengonfigurasi access point dan switch, mengelola web server di Debian, serta menangani konfigurasi perangkat melalui Cisco IOS dan perbaikan laptop, mulai dari pemasangan ulang sistem hingga pengecekan perangkat keras.",
    highlights: [
      "Merancang topologi jaringan dan menyimulasikannya di Cisco Packet Tracer",
      "Mengonfigurasi access point, switch, dan perangkat melalui Cisco IOS",
      "Mengelola web server pada sistem operasi Debian",
      "Memperbaiki laptop: instalasi sistem, pembersihan, dan pengecekan perangkat keras",
    ],
    imageSlots: [
      "Topologi jaringan di Cisco Packet Tracer",
      "Konfigurasi access point",
      "Konfigurasi switch",
      "Perbaikan laptop",
    ],
  },
  {
    period: "2026",
    title: "Jalur Belajar AI & Data",
    organization: "Dicoding · Microsoft · AWS · IOE",
    description:
      "Jalur belajar terstruktur yang mencakup Python, machine learning, cloud, data science, dan generative AI.",
    highlights: [
      "Menyelesaikan enam kredensial pelatihan",
      "Menerapkan pembelajaran melalui notebook dan proyek mandiri",
    ],
  },
];

export const certificates: Certificate[] = [
  {
    slug: "microsoft-elevate-skill-sprint",
    title:
      "Belajar Penerapan Data Science dengan Microsoft Fabric dan Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer: "Microsoft Elevate · Dicoding Indonesia",
    issuedAt: "30 September 2026",
    credential: "PREZKU5OM6",
    category: "AI & Data",
    image: "/certificates/microsoft-elevate-skill-sprint-preview.png",
    file: "/certificates/microsoft-elevate-skill-sprint.pdf",
    verifyUrl: "https://www.dicoding.com/elevate/certificates/PREZKU5OM6",
  },
  {
    slug: "berinovasi-dengan-ai-plan-kemenpora",
    title: "Berinovasi dengan AI (15 Learning Hours)",
    issuer: "Yayasan Plan International Indonesia · Kemenpora",
    issuedAt: "30 September 2026",
    credential: "4bQE4C3nFg",
    category: "AI & Data",
    image: "/certificates/berinovasi-dengan-ai-plan-kemenpora-preview.png",
    file: "/certificates/berinovasi-dengan-ai-plan-kemenpora.pdf",
    verifyUrl:
      "https://lms.kitakerja.id/mod/customcert/verify_certificate.php?code=4bQE4C3nFg&qrcode=1",
  },
  {
    slug: "bitsmikro-innovative-vibecode",
    title: "Champion Award - Bitsmikro Innovative Vibecode 2026",
    issuer: "Universitas Mikroskil · Bitsmikro",
    issuedAt: "2026",
    category: "AI & Data",
    image: "/certificates/sertifikat-haqqiannazili-preview.png",
    file: "/certificates/sertifikat-haqqiannazili.pdf",
  },
  {
    slug: "ai-career-readiness-asean-foundation",
    title: "AI Career Readiness Training",
    issuer: "ASEAN Foundation · LinkedIn",
    issuedAt: "22 September 2026",
    category: "AI & Data",
    image: "/certificates/ai-career-readiness-asean-foundation.png",
  },
  {
    slug: "mooc-pelatihan-uiux-bkpm",
    title: "MOOC Pelatihan UI/UX - Self Learning",
    issuer: "Kementerian Investasi dan Hilirisasi · BKPM",
    issuedAt: "16 September 2026",
    credential: "8253/MOOC/KEMINVESHIL-BKPM/2026",
    category: "Programming",
    image: "/certificates/mooc-pelatihan-uiux-bkpm-preview.png",
    file: "/certificates/mooc-pelatihan-uiux-bkpm.pdf",
  },
  {
    slug: "fundamental-associate-network-administrator-dta",
    title: "Fundamental of Associate Network Administrator - Nasional",
    issuer: "Digital Talent Scholarship · Komdigi",
    issuedAt: "13 September 2026",
    credential: "21212087840-13507/DTA/BLSDM.Komdigi/2026",
    category: "Cloud",
    image:
      "/certificates/fundamental-associate-network-administrator-dta-preview.png",
    file: "/certificates/fundamental-associate-network-administrator-dta.pdf",
  },
  {
    slug: "graphic-design-uiux-series",
    title: "Graphic Design & UI/UX Series (Online Event)",
    issuer: "Komunitas Desain & UI/UX",
    issuedAt: "26-27 Agustus 2026",
    category: "Programming",
    image: "/certificates/graphic-design-uiux-series-preview.png",
    file: "/certificates/graphic-design-uiux-series.pdf",
  },
  {
    slug: "ai-ready-asean-youth",
    title: "AI Ready ASEAN - AI Learning Modules for Youth",
    issuer: "ASEAN Foundation",
    issuedAt: "12 Agustus 2026",
    category: "AI & Data",
    image: "/certificates/ai-ready-asean-youth-preview.png",
    file: "/certificates/ai-ready-asean-youth.pdf",
  },
  {
    slug: "genai-azure",
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer: "Dicoding Indonesia",
    issuedAt: "25 Juli 2026",
    credential: "RVZK0V27NZD5",
    category: "AI & Data",
    image: "/certificates/genai-azure-dicoding-preview.png",
    file: "/certificates/genai-azure-dicoding.pdf",
    verifyUrl: "https://www.dicoding.com/certificates/RVZK0V27NZD5",
  },
  {
    slug: "data-science-fabric",
    title: "Belajar Penerapan Data Science dengan Microsoft Fabric",
    issuer: "Dicoding Indonesia",
    issuedAt: "24 Juli 2026",
    credential: "KEXLQOJRRPG2",
    category: "AI & Data",
    image: "/certificates/data-science-fabric-dicoding-preview.png",
    file: "/certificates/data-science-fabric-dicoding.pdf",
    verifyUrl: "https://www.dicoding.com/certificates/KEXLQOJRRPG2",
  },
  {
    slug: "machine-learning",
    title: "Belajar Machine Learning untuk Pemula",
    issuer: "Dicoding Indonesia",
    issuedAt: "17 Juli 2026",
    credential: "N9ZON8KM8XG5",
    category: "AI & Data",
    image: "/certificates/machine-learning-dicoding-preview.png",
    file: "/certificates/machine-learning-dicoding.pdf",
    verifyUrl: "https://www.dicoding.com/certificates/N9ZON8KM8XG5",
  },
  {
    slug: "python",
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia",
    issuedAt: "15 Juli 2026",
    credential: "72ZDJGR0JZYW",
    category: "Programming",
    image: "/certificates/python-dicoding-preview.png",
    file: "/certificates/python-dicoding.pdf",
    verifyUrl: "https://www.dicoding.com/certificates/72ZDJGR0JZYW",
  },
  {
    slug: "ai-fluency",
    title: "AI Fluency Training",
    issuer: "IOE · Microsoft",
    issuedAt: "13 Juli 2026",
    category: "AI & Data",
    image: "/certificates/ai-fluency-ioe-microsoft.png",
  },
  {
    slug: "cloud-genai-aws",
    title: "Belajar Dasar Cloud dan Gen AI di AWS",
    issuer: "Dicoding Indonesia",
    issuedAt: "10 Juli 2026",
    credential: "98XW0MVG0XM3",
    category: "Cloud",
    image: "/certificates/cloud-genai-aws-dicoding-preview.png",
    file: "/certificates/cloud-genai-aws-dicoding.pdf",
    verifyUrl: "https://www.dicoding.com/certificates/98XW0MVG0XM3",
  },
  {
    slug: "spec-driven-development-kiro",
    title: "Spec-Driven Development dengan Kiro",
    issuer: "Dicoding Indonesia",
    issuedAt: "10 Juli 2026",
    credential: "JLX1VOW0JZ72",
    category: "Programming",
    image: "/certificates/spec-driven-development-kiro-dicoding-preview.png",
    file: "/certificates/spec-driven-development-kiro-dicoding.pdf",
    verifyUrl: "https://www.dicoding.com/certificates/JLX1VOW0JZ72",
  },
];
