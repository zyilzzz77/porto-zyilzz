import type { Certificate, Experience, Project } from "@/types";

export const profile = {
  name: "Haqqi AnnaZili",
  location: "Jakarta, Indonesia",
  role: "Developer & AI Explorer",
  email: "enzilaja@gmail.com",
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

export const skills = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Python",
  "Machine Learning",
  "Generative AI",
  "Cloud",
  "Automation",
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
    slug: "exisel-web-id",
    title: "exisel.web.id",
    description:
      "Website ekstrakurikuler terpadu yang membantu siswa menemukan informasi ekskul, bertanya melalui ExsiBot, melakukan absensi dengan barcode, dan mendaftar kegiatan dalam satu platform.",
    category: "School Platform",
    status: "Live",
    tags: ["Extracurricular Directory", "ExsiBot", "Barcode Attendance", "Registration"],
    href: "https://exisel.web.id/",
  },
  {
    slug: "archivejkt48-app",
    title: "archivejkt48.app",
    description:
      "Platform arsip digital yang saya rancang untuk mengorganisasi dan menyimpan koleksi foto serta video member JKT48 dari berbagai generasi dalam satu pengalaman penelusuran yang terstruktur.",
    category: "Digital Archive",
    status: "Temporarily Offline",
    tags: ["Media Archive", "Search & Filtering", "Responsive Web"],
    availabilityNote:
      "Demo sedang tidak tersedia karena masa layanan server belum diperpanjang.",
  },
  {
    slug: "bikinqrisdinamis-app",
    title: "bikinqrisdinamis.app",
    description:
      "Aplikasi web eksperimental untuk mengimplementasikan alur pembayaran berbasis QRIS dinamis, mulai dari pembuatan transaksi hingga pengelolaan status pembayaran melalui integrasi payment gateway.",
    category: "Payment Integration",
    status: "Temporarily Offline",
    tags: ["Dynamic QRIS", "Payment Gateway", "Transaction Flow"],
    availabilityNote:
      "Demo sedang tidak tersedia karena masa layanan server belum diperpanjang.",
  },
  {
    slug: "inversave-space",
    title: "inversave.space",
    description:
      "Web utility untuk memproses tautan dan mengunduh video dari berbagai platform media sosial melalui alur yang sederhana, cepat, dan responsif.",
    category: "Media Utility",
    status: "Temporarily Offline",
    tags: ["Media Processing", "Social Platforms", "Download Workflow"],
    availabilityNote:
      "Demo sedang tidak tersedia karena masa layanan server belum diperpanjang.",
  },
];

export const experiences: Experience[] = [
  {
    period: "2025 - Sekarang",
    title: "Student - SIJA",
    organization: "SMKN 69 Jakarta",
    logo: "/logos/smkn-69-jakarta.png",
    logoAlt: "Logo SMK Negeri 69 Jakarta",
    href: "/experience/smkn-69-jakarta",
    description:
      "Mempelajari Sistem Informatika, Jaringan, dan Aplikasi dengan fokus yang semakin kuat pada software development.",
    highlights: [
      "Mengembangkan fondasi pemrograman dan sistem",
      "Aktif mengerjakan tugas berbasis proyek",
    ],
  },
  {
    period: "2026 - Sekarang",
    title: "Independent Developer",
    organization: "Personal Projects",
    description:
      "Membangun produk web dan bot sambil memperdalam arsitektur aplikasi, pengalaman pengguna, dan deployment.",
    highlights: [
      "Mengembangkan proyek end-to-end dari ide hingga prototipe",
      "Bereksperimen dengan otomasi, integrasi API, dan AI",
    ],
  },
  {
    period: "2026",
    title: "AI & Data Learning Track",
    organization: "Dicoding · Microsoft · AWS · IOE",
    description:
      "Jalur belajar terstruktur yang mencakup Python, machine learning, cloud, data science, dan generative AI.",
    highlights: [
      "Menyelesaikan enam kredensial course",
      "Menerapkan pembelajaran melalui notebook dan proyek mandiri",
    ],
  },
];

export const certificates: Certificate[] = [
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
];
