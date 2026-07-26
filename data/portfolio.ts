import type { Certificate, Experience, Project } from "@/types";

export const profile = {
  name: "Haqqi AnnaZili",
  location: "Jakarta, Indonesia",
  role: "Developer & AI Explorer",
  email: "enzilaja@gmail.com",
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
    slug: "finance-telegram-bot",
    title: "Finance Telegram Bot",
    description:
      "Asisten percakapan untuk merangkum informasi keuangan dan menghadirkan pembaruan penting langsung di Telegram.",
    category: "Automation",
    status: "Building",
    stack: ["Python", "Telegram API", "Data"],
  },
  {
    slug: "gdrive-telegram-assistant",
    title: "Google Drive Assistant",
    description:
      "Alur kerja berbasis bot untuk membantu pencarian, pengelolaan, dan distribusi berkas Drive dengan lebih praktis.",
    category: "Productivity",
    status: "Exploration",
    stack: ["Python", "Google Drive API", "Bot"],
  },
  {
    slug: "jadwal-sholat",
    title: "Jadwal Sholat Web",
    description:
      "Pengalaman web yang tenang dan responsif untuk melihat waktu ibadah harian dengan informasi yang mudah dipindai.",
    category: "Web App",
    status: "Live",
    stack: ["Next.js", "API", "Responsive UI"],
  },
  {
    slug: "media-downloader-bot",
    title: "Media Downloader Bot",
    description:
      "Eksperimen otomasi untuk menerima tautan, memproses media, dan mengirimkan hasilnya kembali melalui antarmuka chat.",
    category: "Automation",
    status: "Building",
    stack: ["Python", "Telegram API", "Media"],
  },
];

export const experiences: Experience[] = [
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
  {
    period: "2025 - Sekarang",
    title: "Student - SIJA",
    organization: "SMKN 69 Jakarta",
    logo: "/logos/smkn-69-jakarta.png",
    logoAlt: "Logo SMK Negeri 69 Jakarta",
    description:
      "Mempelajari Sistem Informatika, Jaringan, dan Aplikasi dengan fokus yang semakin kuat pada software development.",
    highlights: [
      "Mengembangkan fondasi pemrograman dan sistem",
      "Aktif mengerjakan tugas berbasis proyek",
    ],
  },
];

export const certificates: Certificate[] = [
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
